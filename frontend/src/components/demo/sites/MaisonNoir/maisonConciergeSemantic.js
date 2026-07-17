import {
  conciergeFallbackMessage,
  conciergeKnowledgeDocuments,
  createConciergeContext,
  getConciergeResponse,
  getCriticalConciergeResponse,
  normalizeConciergeText,
} from "./maisonConciergeKnowledge";

let transformersPromise = null;
let extractorPromise = null;
let documentEmbeddingsPromise = null;
let activeDevice = null;

const MODEL_ID = "Xenova/all-MiniLM-L6-v2";
const HIGH_CONFIDENCE = 0.52;
const MEDIUM_CONFIDENCE = 0.38;

const dotProduct = (a, b) => {
  const length = Math.min(a.length, b.length);
  let total = 0;

  for (let index = 0; index < length; index += 1) {
    total += a[index] * b[index];
  }

  return total;
};

const getDocumentText = (document) =>
  [
    document.title,
    document.category,
    document.searchText,
    ...(document.exampleQuestions || []),
  ].join(". ");

const getClarifyingQuestion = (document) => {
  if (!document) {
    return "Would you like help with the menu, private dining, dietary questions, or reservations?";
  }

  if (document.category === "steak") {
    return "Do you prefer rich, tender, classic, premium, or something designed to share?";
  }

  if (document.category === "private dining") {
    return "Will the evening be intimate, celebratory, or business-focused?";
  }

  if (document.category === "pairings") {
    return "Would you prefer wine, whisky, or a cocktail pairing?";
  }

  if (document.category === "dietary") {
    return "Is this a preference, or is there a serious allergy the restaurant should confirm directly?";
  }

  if (document.category === "reservation") {
    return "Would you like me to take you to the reservation request area?";
  }

  return "Would you like a menu recommendation, private dining guidance, or reservation help?";
};

const canCombineDocuments = (first, second) => {
  if (!first || !second) return false;
  if (first.id === second.id) return false;
  if (first.safetyLevel === "critical" || second.safetyLevel === "critical") return false;
  if (first.category === "unrelated" || second.category === "unrelated") return false;
  if (first.category === "fallback" || second.category === "fallback") return false;
  if (first.category === "reservation" && second.category !== "reservation") return false;
  if (second.category === "reservation" && first.category !== "reservation") return false;

  return first.category === second.category || first.category === "pairings" || second.category === "pairings";
};

const buildContextFromDocument = (document, previousContext, fallbackContext) => {
  const context = {
    ...(fallbackContext || previousContext || createConciergeContext()),
  };

  if (!document) return context;

  context.currentTopic = document.category;
  context.previousIntent = document.id;

  if (document.category === "steak") {
    context.previousRecommendation = document.title;
  }

  if (document.category === "pairings") {
    if (document.id.includes("wine")) context.preferredDrinkCategory = "wine";
    if (document.id.includes("whisky")) context.preferredDrinkCategory = "whisky";
    if (document.id.includes("cocktail")) context.preferredDrinkCategory = "cocktail";
  }

  if (document.id.includes("anniversary")) context.occasion = "anniversary";
  if (document.id.includes("birthday")) context.occasion = "birthday";
  if (document.id.includes("corporate") || document.id.includes("business")) {
    context.occasion = "business";
  }
  if (document.id.includes("proposal")) context.occasion = "proposal";

  if (document.safetyLevel === "dietary" || document.safetyLevel === "critical") {
    context.dietaryPreference = document.id;
  }

  return context;
};

async function loadTransformers() {
  if (!transformersPromise) {
    transformersPromise = import("@huggingface/transformers");
  }

  return transformersPromise;
}

async function createExtractor(device) {
  const { env, pipeline } = await loadTransformers();

  env.allowLocalModels = false;
  env.allowRemoteModels = true;
  env.useBrowserCache = true;

  return pipeline("feature-extraction", MODEL_ID, {
    device,
    dtype: "q8",
  });
}

async function getExtractor() {
  if (extractorPromise) return extractorPromise;

  extractorPromise = (async () => {
    if (typeof navigator !== "undefined" && navigator.gpu) {
      try {
        const extractor = await createExtractor("webgpu");
        activeDevice = "webgpu";
        return extractor;
      } catch (error) {
        console.warn("Maison Concierge WebGPU embedding fallback:", error);
      }
    }

    const extractor = await createExtractor("wasm");
    activeDevice = "wasm";
    return extractor;
  })();

  return extractorPromise;
}

const tensorToVectors = (tensor, expectedRows) => {
  const data = Array.from(tensor.data || []);
  const dims = tensor.dims || [];

  if (expectedRows <= 1) return [data];

  const rows = dims.length >= 2 ? dims[0] : expectedRows;
  const columns = Math.max(Math.floor(data.length / rows), 1);

  return Array.from({ length: rows }, (_, rowIndex) =>
    data.slice(rowIndex * columns, (rowIndex + 1) * columns)
  );
};

async function embedTexts(texts) {
  const extractor = await getExtractor();
  const input = texts.length === 1 ? texts[0] : texts;
  const output = await extractor(input, {
    pooling: "mean",
    normalize: true,
  });

  return tensorToVectors(output, texts.length);
}

async function getDocumentEmbeddings() {
  if (!documentEmbeddingsPromise) {
    documentEmbeddingsPromise = (async () => {
      const documentTexts = conciergeKnowledgeDocuments.map(getDocumentText);
      const vectors = await embedTexts(documentTexts);

      return conciergeKnowledgeDocuments.map((document, index) => ({
        document,
        vector: vectors[index] || [],
      }));
    })();
  }

  return documentEmbeddingsPromise;
}

export async function prepareSemanticConcierge() {
  await getDocumentEmbeddings();
  return {
    device: activeDevice,
    documentCount: conciergeKnowledgeDocuments.length,
  };
}

const keywordBoostForDocument = (document, normalizedText, fallback) => {
  let boost = 0;
  const haystack = normalizeConciergeText(
    `${document.title} ${document.category} ${document.searchText}`
  );

  normalizeConciergeText(fallback.intent || "")
    .split(" ")
    .filter(Boolean)
    .forEach((token) => {
      if (haystack.includes(token)) boost += 0.025;
    });

  normalizedText
    .split(" ")
    .filter((token) => token.length > 3)
    .forEach((token) => {
      if (haystack.includes(token)) boost += 0.012;
    });

  if (fallback.action === "reserve" && document.category === "reservation") {
    boost += 0.05;
  }

  return Math.min(boost, 0.12);
};

export async function getSemanticConciergeResponse(
  input,
  context = createConciergeContext(),
  fallback = getConciergeResponse(input, context)
) {
  const critical = getCriticalConciergeResponse(input, context);
  if (critical) return critical;

  try {
    const normalizedText = normalizeConciergeText(input);
    const [queryVector] = await embedTexts([normalizedText]);
    const documentEmbeddings = await getDocumentEmbeddings();

    const ranked = documentEmbeddings
      .map(({ document, vector }) => {
        const semanticScore = dotProduct(queryVector, vector);
        const keywordBoost = keywordBoostForDocument(document, normalizedText, fallback);

        return {
          document,
          score: semanticScore + keywordBoost,
        };
      })
      .sort((a, b) => b.score - a.score);

    const [best, second] = ranked;

    if (!best || best.score < MEDIUM_CONFIDENCE) {
      return {
        ...fallback,
        message: conciergeFallbackMessage,
      };
    }

    const shouldCombine =
      best.score >= HIGH_CONFIDENCE &&
      second &&
      second.score >= MEDIUM_CONFIDENCE &&
      best.score - second.score < 0.06 &&
      canCombineDocuments(best.document, second.document);

    const answer = shouldCombine
      ? `${best.document.answer}\n\n${second.document.answer}`
      : best.document.answer;

    const mediumSuffix =
      best.score >= HIGH_CONFIDENCE ? "" : ` ${getClarifyingQuestion(best.document)}`;

    return {
      intent: best.document.id,
      message: `${answer}${mediumSuffix}`,
      action:
        best.document.relatedActions?.includes("Reserve a table") &&
        best.document.category === "reservation"
          ? "reserve"
          : fallback.action || null,
      context: buildContextFromDocument(best.document, context, fallback.context),
    };
  } catch (error) {
    console.warn("Maison Concierge semantic retrieval unavailable:", error);
    return fallback;
  }
}
