export const conciergeOpeningMessage =
  "Good evening. I’m the Maison Concierge. I can guide you through the menu, private dining, and the evening ahead.";

export const conciergeQuickActions = [
  "Choose my steak",
  "Explore the menu",
  "Plan private dining",
  "Dietary questions",
  "Reserve a table",
];

export const conciergeFallbackMessage =
  "I may not have understood that perfectly. I can help with the menu, steak recommendations, private dining, dietary considerations, or reservations.";

export const createConciergeContext = () => ({
  currentTopic: null,
  previousIntent: null,
  previousRecommendation: null,
  dietaryPreference: null,
  occasion: null,
  partySize: null,
  preferredDrinkCategory: null,
});

const menuFacts = {
  starters:
    "Starters include Bone Marrow Toast, Truffle Steak Tartare, Oysters Noir, Charred Spanish Octopus, Burrata & Heirloom Tomatoes, Foie Gras Torchon, Caviar Potato Crisp, and Smoked Caesar Salad.",
  steaks:
    "The steak list includes 45-Day Dry-Aged Ribeye, Black Truffle Filet Mignon, A5 Japanese Wagyu, Tomahawk for Two, and Prime New York Strip.",
  seafood:
    "Seafood includes Butter Poached Atlantic Lobster, Seared Nova Scotia Scallops, Miso Black Cod, King Crab Legs, Bluefin Tuna Crudo, Jumbo Garlic Prawns, Maison Noir Seafood Tower, and Charcoal-Grilled Halibut.",
  sides:
    "Sides include Pommes Puree, Black Truffle Fries, Mac & Gruyere, Creamed Spinach, Charred Broccolini, Roasted Wild Mushrooms, Maple Bacon Brussels Sprouts, and Charred Asparagus.",
  desserts:
    "Desserts include Dark Chocolate Torte, Vanilla Bean Creme Brulee, Basque Cheesecake, Whiskey Caramel Cake, Espresso Affogato, and Lemon Tart.",
  cocktails:
    "Cocktails include The Noir Old Fashioned, Cellar Martini, Midnight Manhattan, Gold Rush, Velvet Negroni, Charcoal Whiskey Sour, Pearl Gimlet, Smoked Boulevardier, Noir Espresso Martini, Amber Spritz, Cognac Sidecar, and After Midnight.",
};

const responses = {
  greeting:
    "Good evening. I can help you choose a course, narrow down a steak, plan private dining, answer dietary questions, or guide you toward reservations.",
  menuOverview:
    "The menu is organized as Starters, Steaks, Seafood, Sides, Desserts, and Cocktails. A polished path would be oysters or bone marrow, a steak or lobster course, a composed side, then chocolate torte or an after-dinner cocktail. Would you like something richer, lighter, or designed to share?",
  steakRecommendation:
    "I can absolutely help with that. Do you prefer a richer cut, a leaner and more tender cut, something dramatic to share, or a premium tasting experience?",
  richSteak:
    "For rich and flavorful, choose the 45-Day Dry-Aged Ribeye. It is the strongest match for depth, smoke, marrow butter, and a classic Maison Noir steakhouse feeling.",
  leanSteak:
    "For tender and lean, choose the Black Truffle Filet Mignon. It is the most polished steak choice if you want softness, restraint, and truffle jus rather than a heavier cut.",
  sharingSteak:
    "For a dramatic sharing experience, choose the Tomahawk for Two. It is listed as a 32 oz dry-aged tomahawk with roasted garlic and house sauce, designed as the table centerpiece.",
  premiumSteak:
    "For the most premium steak experience, choose the A5 Japanese Wagyu. It is the most indulgent option on the menu and best treated as a smaller, luxurious course.",
  balancedSteak:
    "For a balanced classic steak, choose the Prime New York Strip. It gives you structure, charred rosemary, and a steakhouse profile without going as rich as the ribeye.",
  seafood:
    `${menuFacts.seafood} If you want luxury and comfort, I would start with the lobster. If you want something cleaner, the scallops, halibut, or crudo are better fits.`,
  starters:
    `${menuFacts.starters} For a signature opening, I would choose Bone Marrow Toast for richness, Oysters Noir for brightness, or Truffle Steak Tartare for a classic steakhouse start.`,
  sides:
    `${menuFacts.sides} For steak, Pommes Puree is the most elegant pairing, Black Truffle Fries are more indulgent, and Charred Broccolini or Asparagus keeps the table lighter.`,
  desserts:
    `${menuFacts.desserts} For the deepest finish, choose Dark Chocolate Torte. For something classic, choose Creme Brulee. For a lighter close, the Lemon Tart is the cleanest option.`,
  cocktails:
    `${menuFacts.cocktails} For a dark classic, choose The Noir Old Fashioned or Midnight Manhattan. For something brighter, Gold Rush or Pearl Gimlet will feel more lifted.`,
  cocktailPairing:
    "With steak, The Noir Old Fashioned, Midnight Manhattan, or Smoked Boulevardier fit the darker steakhouse profile. For something brighter, Gold Rush or Pearl Gimlet will feel more lifted.",
  whiskyPairing:
    "For a whisky-leaning drink, choose The Noir Old Fashioned, Charcoal Whiskey Sour, Midnight Manhattan, or Smoked Boulevardier depending on whether you want classic, lifted, dark, or smoky.",
  winePairing:
    "For pairings, dry-aged steak wants a structured red, filet works with a softer red, seafood suits Champagne or a mineral white, and dessert can move toward espresso, amaro, or a richer after-dinner pour. Would you prefer wine, whisky, or a cocktail pairing?",
  privateDining:
    "Private dining can be shaped three ways: the Private Room for up to 14 guests, the Chef's Table for 6 to 8 guests, or a Full Evening by request. Will the evening be intimate, celebratory, or business-focused?",
  anniversary:
    "For an anniversary, I would keep the evening slow and intimate: Private Room if you want quiet, oysters or bone marrow to begin, a ribeye or filet depending on taste, cellar pairings, and a dessert finish. Mention the anniversary in the reservation request so the restaurant can confirm details directly.",
  birthday:
    "For a birthday, the best path is celebratory without becoming loud: Tomahawk for Two or a steak-led table, shared sides, cocktails, and a dessert moment. If it is a larger group, the Private Room is the better fit.",
  corporate:
    "For a corporate dinner, I would choose either the Private Room or Full Evening depending on group size. Keep the menu direct: starters to share, a steak or seafood choice, cellar-selected pairings, and a paced dessert course.",
  proposal:
    "For a proposal, I would choose the most intimate pacing: request a quieter table or private dining, keep the meal slow, and mention the proposal in the reservation request. The restaurant team should confirm any special arrangements directly.",
  celebration:
    "For a celebration, I would shape the evening around a slower table: a polished starter, a steak or seafood centerpiece, shared sides, and a dessert or cocktail finish. Mention the occasion in the reservation request so the restaurant can confirm any details directly.",
  dietary:
    "I can help narrow the menu around preferences such as gluten-conscious, dairy-conscious, seafood-free, vegetarian-leaning, vegan, halal, or lighter dining. Allergy requirements and serious restrictions must be confirmed directly with the restaurant before dining.",
  dairyQuestions:
    "Several listed dishes mention butter, cream, cheese, ganache, or creme. The page does not confirm dairy-free substitutions, so please confirm dairy restrictions directly with the restaurant.",
  severeAllergies:
    "For serious allergies, please confirm directly with Maison Noir before dining. I can point out menu areas to discuss, but I cannot guarantee allergy safety, preparation methods, cross-contact controls, or ingredient substitutions.",
  vegetarian:
    "Vegetarian-leaning options shown on the menu include Burrata & Heirloom Tomatoes, several sides, and desserts. Vegan or halal suitability is not confirmed on the page, so please verify directly with the restaurant before relying on it.",
  dressCode:
    "No formal dress policy is posted here, but the room is clearly designed for refined evening attire. Smart dinner wear, tailored pieces, and elevated casual looks will fit the atmosphere best.",
  hours:
    "The Visit section lists Maison Noir as open daily from 5:00 PM to Midnight.",
  location:
    "Maison Noir is listed at 17 Bishop's Landing in Halifax, Nova Scotia. The phone number shown for reservations and private dining is (902) 555-0198.",
  parking:
    "I do not see a posted parking policy in the Maison Noir page. The restaurant is listed at Bishop's Landing in Halifax, so I would confirm parking directly with the restaurant or check nearby harbour-area parking before arriving.",
  reservations:
    "I can take you to the reservation area now. Please complete the request there; I have not completed or confirmed a reservation for you.",
  reservationAvailability:
    "I cannot see live availability and I will not invent it. The reservation section lets you request a date, time, guest count, and occasion, but the restaurant must confirm whether that table is actually available.",
  atmosphere:
    "Maison Noir is built around low light, open flame, cellar-led service, black-glass luxury, and a slower evening pace. It should feel intimate, polished, and cinematic rather than casual or rushed.",
  priceExpectations:
    "From the listed menu, starters run about $18 to $38, steaks about $62 to $145, seafood about $27 to $118, sides about $14 to $18, desserts about $14 to $19, and cocktails about $17 to $23.",
  chef:
    "The chef experience is centered on open flame, dry-aged beef, seafood, and precise pacing. For the closest view of the kitchen, the Chef's Table private dining format is listed for 6 to 8 guests.",
  tasting:
    "For a tasting-style evening, I would build a guided route: a bright starter, a steak or seafood centerpiece, one polished side, dessert, and a pairing. The Chef's Table mentions a guided tasting menu, but the restaurant should confirm the final format.",
  farewell:
    "My pleasure. I’ll be here if you want help choosing a course, planning the evening, or moving toward a reservation.",
  unrelated:
    "I’m here as the Maison Noir concierge, so I can only help with the restaurant, menu, private dining, dietary considerations, and reservations. Let’s keep the evening beautifully on course.",
};

const dishExamples = (name, category) => [
  `Tell me about ${name}`,
  `Should I order ${name}?`,
  `What is ${name}?`,
  `Is ${name} a good ${category} choice?`,
];

const buildDishDocument = (category, [name, price, description]) => ({
  id: `${category.toLowerCase().replace(/\s+/g, "-")}-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`,
  category,
  title: name,
  searchText: `${name}. ${category}. ${description}. Price ${price}. Menu item recommendation questions.`,
  exampleQuestions: dishExamples(name, category),
  answer: `${name} is listed under ${category} at ${price}. ${description}`,
  relatedActions: ["Explore the menu"],
});

const menuItemsForKnowledge = {
  Starters: [
    ["Bone Marrow Toast", "$24", "Roasted marrow, grilled sourdough, parsley salad."],
    ["Truffle Steak Tartare", "$28", "Hand-cut prime beef, cured yolk, black truffle."],
    ["Oysters Noir", "$32", "Six oysters, champagne mignonette, lemon oil."],
    ["Charred Spanish Octopus", "$29", "Potato espuma, smoked paprika, herb oil."],
    ["Burrata & Heirloom Tomatoes", "$22", "Burrata, roasted tomatoes, basil oil."],
    ["Foie Gras Torchon", "$34", "Brioche, fig jam, aged balsamic."],
    ["Caviar Potato Crisp", "$38", "Yukon crisp, creme fraiche, Ossetra caviar."],
    ["Smoked Caesar Salad", "$18", "Romaine hearts, parmesan snow, anchovy dressing."],
  ],
  Steaks: [
    ["45-Day Dry-Aged Ribeye", "$68", "16 oz ribeye, smoked marrow butter, sea salt."],
    ["Black Truffle Filet Mignon", "$74", "8 oz filet, pommes puree, truffle jus."],
    ["A5 Japanese Wagyu", "$128", "4 oz wagyu, binchotan charcoal, smoked salt."],
    ["Tomahawk for Two", "$145", "32 oz dry-aged tomahawk, roasted garlic, house sauce."],
    ["Prime New York Strip", "$62", "14 oz striploin, peppercorn jus, charred rosemary."],
  ],
  Seafood: [
    ["Butter Poached Atlantic Lobster", "$58", "Saffron butter, preserved lemon."],
    ["Seared Nova Scotia Scallops", "$42", "Brown butter, cauliflower silk."],
    ["Miso Black Cod", "$46", "Miso glaze, sesame, charred scallion."],
    ["King Crab Legs", "$72", "Drawn butter, lemon, sea salt."],
    ["Bluefin Tuna Crudo", "$27", "Citrus, chili oil, crispy shallot."],
    ["Jumbo Garlic Prawns", "$36", "Garlic butter, smoked chili, parsley."],
    ["Maison Noir Seafood Tower", "$118", "Oysters, lobster, crab, prawns, seasonal sauces."],
    ["Charcoal-Grilled Halibut", "$44", "Beurre blanc, fennel, open flame finish."],
  ],
  Sides: [
    ["Pommes Puree", "$14", "Cultured butter, chives."],
    ["Black Truffle Fries", "$17", "Parmesan, herbs, black truffle aioli."],
    ["Mac & Gruyere", "$18", "Gruyere, aged cheddar, black pepper crumb."],
    ["Creamed Spinach", "$15", "Garlic cream, nutmeg."],
    ["Charred Broccolini", "$16", "Lemon oil, chili crisp, toasted almond."],
    ["Roasted Wild Mushrooms", "$17", "Thyme, garlic butter."],
    ["Maple Bacon Brussels Sprouts", "$16", "Cider glaze, toasted seeds."],
    ["Charred Asparagus", "$18", "Hollandaise, smoked salt."],
  ],
  Desserts: [
    ["Dark Chocolate Torte", "$18", "Chocolate ganache, espresso cream, salted crumble."],
    ["Vanilla Bean Creme Brulee", "$16", "Burnt sugar, citrus, almond tuile."],
    ["Basque Cheesecake", "$17", "Burnt vanilla top, berry compote."],
    ["Whiskey Caramel Cake", "$19", "Caramel cream, toasted pecan."],
    ["Espresso Affogato", "$14", "Vanilla gelato, hot espresso, cocoa dust."],
    ["Lemon Tart", "$16", "Italian meringue, citrus curd."],
  ],
  Cocktails: [
    ["The Noir Old Fashioned", "$19", "Bourbon, cacao bitters, orange oil, smoked cherry."],
    ["Cellar Martini", "$21", "Vodka, dry vermouth, olive oil wash, sea salt."],
    ["Midnight Manhattan", "$20", "Rye, sweet vermouth, black cherry, bitters."],
    ["Gold Rush", "$18", "Bourbon, honey, lemon, smoked ice."],
    ["Velvet Negroni", "$19", "Gin, Campari, vermouth, orange oil."],
    ["Charcoal Whiskey Sour", "$18", "Whiskey, lemon, egg white, activated charcoal."],
    ["Pearl Gimlet", "$17", "Gin, lime cordial, basil, mineral salt."],
    ["Smoked Boulevardier", "$21", "Bourbon, Campari, vermouth, oak smoke."],
    ["Noir Espresso Martini", "$20", "Vodka, espresso, coffee liqueur, vanilla."],
    ["Amber Spritz", "$17", "Aperitivo, sparkling wine, citrus."],
    ["Cognac Sidecar", "$22", "Cognac, orange liqueur, lemon, sugared rim."],
    ["After Midnight", "$23", "Dark rum, amaro, cacao, bitters."],
  ],
};

const manualKnowledgeDocuments = [
  {
    id: "restaurant-overview",
    category: "restaurant",
    title: "Restaurant Overview",
    searchText:
      "Maison Noir luxury steakhouse fire cellar atmosphere complete evening menu private gatherings Halifax harbour intimate dining.",
    exampleQuestions: [
      "What is Maison Noir?",
      "Tell me about the restaurant",
      "What kind of restaurant is this?",
      "What is the Maison Noir experience?",
    ],
    answer:
      "Maison Noir is presented as a luxury steakhouse experience built around fire, cellar, atmosphere, private gatherings, and a complete evening course by course.",
    relatedActions: ["Explore the menu", "Reserve a table"],
  },
  {
    id: "atmosphere",
    category: "experience",
    title: "Atmosphere",
    searchText:
      "atmosphere vibe low light black velvet gold fire cinematic intimate polished open flame cellar-led celebrations slow evening pace",
    exampleQuestions: [
      "What is the atmosphere like?",
      "Is Maison Noir romantic?",
      "What is the vibe?",
      "Is it quiet or lively?",
    ],
    answer: responses.atmosphere,
    relatedActions: ["Plan private dining"],
  },
  {
    id: "dress-code",
    category: "visit",
    title: "Dress Code",
    searchText:
      "dress code attire what to wear refined evening attire smart dinner wear tailored elevated casual",
    exampleQuestions: [
      "What should I wear?",
      "Is there a dress code?",
      "Can I wear jeans?",
      "Is it formal?",
    ],
    answer: responses.dressCode,
    relatedActions: [],
  },
  {
    id: "location",
    category: "visit",
    title: "Location",
    searchText:
      "location address directions Halifax Nova Scotia 17 Bishop's Landing phone contact reservations private dining",
    exampleQuestions: [
      "Where are you located?",
      "What is the address?",
      "How do I call Maison Noir?",
      "Is it in Halifax?",
    ],
    answer: responses.location,
    relatedActions: [],
  },
  {
    id: "hours",
    category: "visit",
    title: "Hours",
    searchText:
      "hours open close closing time open daily 5:00 PM Midnight evening service",
    exampleQuestions: [
      "What time are you open?",
      "When do you close?",
      "Are you open tonight?",
      "What are the hours?",
    ],
    answer: responses.hours,
    relatedActions: ["Reserve a table"],
  },
  {
    id: "parking",
    category: "visit",
    title: "Parking",
    searchText:
      "parking valet garage car where to park Bishop's Landing Halifax parking policy not posted",
    exampleQuestions: [
      "Is there parking?",
      "Do you have valet?",
      "Where should I park?",
      "Is there a garage nearby?",
    ],
    answer: responses.parking,
    relatedActions: [],
  },
  {
    id: "reservations",
    category: "reservation",
    title: "Reservations",
    searchText:
      "reserve reservation booking book a table request date time guests occasion name phone special requests allergies wine preferences",
    exampleQuestions: [
      "Can you book a table?",
      "Reserve a table",
      "I want to make a booking",
      "Take me to reservations",
    ],
    answer: responses.reservations,
    relatedActions: ["Reserve a table"],
  },
  {
    id: "reservation-availability",
    category: "reservation",
    title: "Reservation Availability",
    searchText:
      "availability table tonight available Saturday eight 7:30 slot open table fully booked cannot see live availability",
    exampleQuestions: [
      "Is there a table available tonight?",
      "Can you book Saturday at eight?",
      "Do you have availability?",
      "Are you fully booked?",
    ],
    answer: responses.reservationAvailability,
    relatedActions: ["Reserve a table"],
    safetyLevel: "reservation",
  },
  {
    id: "cancellation-questions",
    category: "reservation",
    title: "Cancellation Questions",
    searchText:
      "cancellation cancel reservation policy change booking deposit no cancellation policy posted website",
    exampleQuestions: [
      "What is the cancellation policy?",
      "Can I cancel a reservation?",
      "Is there a deposit?",
      "Can I change my booking?",
    ],
    answer:
      "I do not see a cancellation, deposit, or change policy posted in the Maison Noir page. Please confirm cancellation or booking changes directly with the restaurant team.",
    relatedActions: ["Reserve a table"],
    safetyLevel: "policy",
  },
  {
    id: "private-dining",
    category: "private dining",
    title: "Private Dining",
    searchText:
      "private dining private room chef table full evening buyout intimate dinner business anniversary birthdays tasting menus around table",
    exampleQuestions: [
      "Tell me about private dining",
      "Can we dine privately?",
      "Do you have a private room?",
      "Plan private dining",
    ],
    answer: responses.privateDining,
    relatedActions: ["Plan private dining", "Reserve a table"],
  },
  {
    id: "private-room-capacity",
    category: "private dining",
    title: "Private Room Capacity",
    searchText:
      "private room capacity up to 14 guests twelve people group dinner candlelit room anniversaries birthdays executive dinners",
    exampleQuestions: [
      "Can twelve people dine privately?",
      "How many seats are in the private room?",
      "Can we bring 14 guests?",
      "Is there room for a group?",
    ],
    answer:
      "The Private Room is listed for up to 14 guests, with a candlelit setting for anniversaries, birthdays, and executive dinners.",
    relatedActions: ["Plan private dining"],
  },
  {
    id: "chefs-table",
    category: "private dining",
    title: "Chef's Table",
    searchText:
      "chef table chefs table 6-8 guests closer view kitchen guided tasting menu open flame chef experience",
    exampleQuestions: [
      "Tell me about the chef's table",
      "How many guests fit at the chef table?",
      "Can the chef guide the meal?",
      "Is there a tasting menu?",
    ],
    answer:
      "The Chef's Table is listed for 6 to 8 guests and offers a closer view of the kitchen, built around a guided tasting menu.",
    relatedActions: ["Plan private dining"],
  },
  {
    id: "corporate-dinners",
    category: "private dining",
    title: "Corporate Dinners",
    searchText:
      "corporate dinner business executive client company team brand dinner private room full evening group dining",
    exampleQuestions: [
      "Can we host a corporate dinner?",
      "I am hosting clients",
      "Is this good for business dining?",
      "Can we plan an executive dinner?",
    ],
    answer: responses.corporate,
    relatedActions: ["Plan private dining"],
  },
  {
    id: "anniversary-dinners",
    category: "private dining",
    title: "Anniversary Dinners",
    searchText:
      "anniversary dinner romantic intimate date night celebration private room oysters cellar pairings dessert",
    exampleQuestions: [
      "Help me plan an anniversary evening",
      "Is Maison Noir good for an anniversary?",
      "What should we order for a romantic night?",
      "I want an intimate celebration",
    ],
    answer: responses.anniversary,
    relatedActions: ["Reserve a table", "Plan private dining"],
  },
  {
    id: "birthday-dinners",
    category: "private dining",
    title: "Birthday Dinners",
    searchText:
      "birthday dinner celebration milestone party private room tomahawk shared sides cocktails dessert moment",
    exampleQuestions: [
      "Can I plan a birthday dinner?",
      "What should we order for a birthday?",
      "Is Maison Noir good for a celebration?",
      "Can we celebrate a milestone?",
    ],
    answer: responses.birthday,
    relatedActions: ["Plan private dining", "Reserve a table"],
  },
  {
    id: "proposals",
    category: "private dining",
    title: "Proposals",
    searchText:
      "proposal propose engagement romantic intimate celebration private room anniversary date night special requests",
    exampleQuestions: [
      "I am proposing. What would you recommend?",
      "Can I plan a proposal dinner?",
      "What is best for an engagement night?",
      "Can the evening feel romantic?",
    ],
    answer: responses.proposal,
    relatedActions: ["Reserve a table", "Plan private dining"],
  },
  {
    id: "group-dining",
    category: "private dining",
    title: "Group Dining",
    searchText:
      "group dining private room up to 14 guests full evening by request buyout celebrations business dinners",
    exampleQuestions: [
      "Can we bring a group?",
      "What is best for group dining?",
      "Can fourteen people come?",
      "Do you host group dinners?",
    ],
    answer:
      "For groups, Maison Noir lists a Private Room for up to 14 guests and a Full Evening by request for larger private restaurant-style occasions.",
    relatedActions: ["Plan private dining"],
  },
  {
    id: "menu-overview",
    category: "menu",
    title: "Menu Overview",
    searchText:
      "menu overview starters steaks seafood sides desserts cocktails complete evening course by course refined seasonal fire patience restraint",
    exampleQuestions: [
      "Walk me through the menu",
      "What should I order?",
      "What courses are on the menu?",
      "Help me explore the menu",
    ],
    answer: responses.menuOverview,
    relatedActions: ["Explore the menu"],
  },
  {
    id: "rich-steak-recommendations",
    category: "steak",
    title: "Rich Steak Recommendations",
    searchText:
      "rich juicy flavorful flavourful heavily marbled ribeye dry-aged smoke marrow butter juiciest steak",
    exampleQuestions: [
      "What steak is the juiciest?",
      "I want something heavily marbled",
      "Which steak is most flavorful?",
      "What is the richest steak?",
    ],
    answer: responses.richSteak,
    relatedActions: ["Choose my steak"],
  },
  {
    id: "lean-tender-steak-recommendations",
    category: "steak",
    title: "Lean and Tender Steak Recommendations",
    searchText:
      "lean tender not too fatty filet mignon softer polished restrained truffle jus tender steak",
    exampleQuestions: [
      "Which cut is tender but not too fatty?",
      "I want something lean",
      "What is the most tender steak?",
      "Should I order filet?",
    ],
    answer: responses.leanSteak,
    relatedActions: ["Choose my steak"],
  },
  {
    id: "sharing-steaks",
    category: "steak",
    title: "Sharing Steaks",
    searchText:
      "sharing steak two people tomahawk for two dramatic centerpiece dry-aged roasted garlic house sauce",
    exampleQuestions: [
      "What should two people share?",
      "Which steak is best for sharing?",
      "Tell me about the tomahawk",
      "What comes with the tomahawk?",
    ],
    answer:
      "For sharing, choose the Tomahawk for Two. It is listed as a 32 oz dry-aged tomahawk with roasted garlic and house sauce, designed as the most dramatic shared steak.",
    relatedActions: ["Choose my steak"],
  },
  {
    id: "premium-steak-experiences",
    category: "steak",
    title: "Premium Steak Experiences",
    searchText:
      "premium luxury luxurious most expensive indulgent A5 Japanese Wagyu binchotan charcoal smoked salt",
    exampleQuestions: [
      "I want your most luxurious steak",
      "Should I order Wagyu?",
      "What is the premium steak?",
      "What is the most indulgent cut?",
    ],
    answer: responses.premiumSteak,
    relatedActions: ["Choose my steak"],
  },
  {
    id: "classic-steak-recommendations",
    category: "steak",
    title: "Classic Steak Recommendations",
    searchText:
      "classic balanced new york strip striploin peppercorn jus charred rosemary steakhouse choice",
    exampleQuestions: [
      "What is the classic steak choice?",
      "I want a balanced steak",
      "Tell me about the New York Strip",
      "What steak is not too rich?",
    ],
    answer: responses.balancedSteak,
    relatedActions: ["Choose my steak"],
  },
  {
    id: "wine-pairings",
    category: "pairings",
    title: "Wine Pairings",
    searchText:
      "wine pairing cellar red wine white wine champagne ribeye filet seafood dessert bottle",
    exampleQuestions: [
      "What wine pairs with ribeye?",
      "Help me choose a bottle",
      "What wine should I drink with filet?",
      "What pairs with seafood?",
    ],
    answer: responses.winePairing,
    relatedActions: [],
  },
  {
    id: "cocktail-pairings",
    category: "pairings",
    title: "Cocktail Pairings",
    searchText:
      "cocktail pairing old fashioned manhattan martini smoked boulevardier steak seafood dessert after dinner drink",
    exampleQuestions: [
      "What cocktail should I order with steak?",
      "What cocktail is smoky?",
      "What should I drink after dinner?",
      "Which cocktail goes with steak?",
    ],
    answer: responses.cocktailPairing,
    relatedActions: [],
  },
  {
    id: "whisky-pairings",
    category: "pairings",
    title: "Whisky Pairings",
    searchText:
      "whisky whiskey bourbon old fashioned whiskey sour boulevardier after steak rich dinner",
    exampleQuestions: [
      "I like whisky. What should I drink?",
      "What whisky cocktail should I get?",
      "Is bourbon good after steak?",
      "What should I pair with a rich steak?",
    ],
    answer: responses.whiskyPairing,
    relatedActions: [],
  },
  {
    id: "side-pairings",
    category: "pairings",
    title: "Side Pairings",
    searchText:
      "side pairings sides with steak ribeye filet wagyu tomahawk pommes puree truffle fries broccolini asparagus mushrooms",
    exampleQuestions: [
      "What sides go with ribeye?",
      "What should I pair with filet?",
      "Which sides work with tomahawk?",
      "What sides should we share?",
    ],
    answer: responses.sides,
    relatedActions: ["Explore the menu"],
  },
  {
    id: "dessert-pairings",
    category: "pairings",
    title: "Dessert Pairings",
    searchText:
      "dessert after rich steak chocolate torte creme brulee lemon tart affogato cheesecake whiskey caramel cake",
    exampleQuestions: [
      "What dessert works after a rich steak?",
      "What dessert should I order after ribeye?",
      "What is a lighter dessert?",
      "What dessert pairs with cocktails?",
    ],
    answer: responses.desserts,
    relatedActions: ["Explore the menu"],
  },
  {
    id: "vegetarian-options",
    category: "dietary",
    title: "Vegetarian Options",
    searchText:
      "vegetarian options meatless no meat burrata heirloom tomatoes sides desserts plant based not confirmed vegan",
    exampleQuestions: [
      "My partner does not eat meat. What can they order?",
      "Do you have vegetarian options?",
      "What is meatless?",
      "Can a vegetarian eat here?",
    ],
    answer: responses.vegetarian,
    relatedActions: ["Dietary questions"],
    safetyLevel: "dietary",
  },
  {
    id: "vegan-questions",
    category: "dietary",
    title: "Vegan Questions",
    searchText:
      "vegan plant based dairy free egg free no animal products not confirmed menu restaurant direct verification",
    exampleQuestions: [
      "Can a vegan eat here?",
      "Do you have vegan dishes?",
      "What is fully plant based?",
      "Is the menu vegan friendly?",
    ],
    answer:
      "The page does not confirm vegan dishes. Some sides may sound vegetable-forward, but vegan suitability and preparation details must be confirmed directly with the restaurant.",
    relatedActions: ["Dietary questions"],
    safetyLevel: "dietary",
  },
  {
    id: "gluten-conscious-questions",
    category: "dietary",
    title: "Gluten-Conscious Questions",
    searchText:
      "gluten gluten-free gluten conscious celiac bread sourdough pasta mac cross contact restaurant confirmation",
    exampleQuestions: [
      "Do you have gluten-free options?",
      "Can someone with celiac eat here?",
      "What has gluten?",
      "Can I avoid bread?",
    ],
    answer:
      "I can help identify items to discuss, but the page does not confirm gluten-free preparation. Please confirm gluten restrictions and any cross-contact concerns directly with the restaurant.",
    relatedActions: ["Dietary questions"],
    safetyLevel: "dietary",
  },
  {
    id: "dairy-questions",
    category: "dietary",
    title: "Dairy Questions",
    searchText:
      "dairy butter cream cheese milk lactose dairy free marrow butter pommes puree burrata creme brulee ganache restaurant confirmation",
    exampleQuestions: [
      "Do you have anything without dairy?",
      "I need dairy-free food",
      "Which items have butter?",
      "Can you avoid cream?",
    ],
    answer: responses.dairyQuestions,
    relatedActions: ["Dietary questions"],
    safetyLevel: "dietary",
  },
  {
    id: "halal-questions",
    category: "dietary",
    title: "Halal Questions",
    searchText:
      "halal beef wagyu steak alcohol pork bacon dietary not confirmed restaurant verification",
    exampleQuestions: [
      "Is the steak halal?",
      "Do you have halal options?",
      "Can I order halal beef?",
      "Is anything halal certified?",
    ],
    answer:
      "Halal suitability is not confirmed on the Maison Noir page. Please verify directly with the restaurant before relying on any item as halal.",
    relatedActions: ["Dietary questions"],
    safetyLevel: "dietary",
  },
  {
    id: "severe-allergies",
    category: "dietary",
    title: "Severe Allergies",
    searchText:
      "severe allergy allergies allergic nut shellfish dairy gluten anaphylaxis cross contact guarantee safety emergency speak directly restaurant team",
    exampleQuestions: [
      "Is this safe for someone with a severe nut allergy?",
      "Can you guarantee no shellfish?",
      "I have an anaphylactic allergy",
      "Can you avoid cross contamination?",
    ],
    answer: responses.severeAllergies,
    relatedActions: ["Dietary questions"],
    safetyLevel: "critical",
  },
  {
    id: "general-dietary-restrictions",
    category: "dietary",
    title: "General Dietary Restrictions",
    searchText:
      "dietary restrictions allergy gluten dairy vegetarian vegan halal seafood-free lighter menu special requests restaurant confirmation",
    exampleQuestions: [
      "I have dietary restrictions",
      "Can you help with allergies?",
      "What should I write in special requests?",
      "Can the kitchen accommodate restrictions?",
    ],
    answer: responses.dietary,
    relatedActions: ["Dietary questions"],
    safetyLevel: "dietary",
  },
  {
    id: "pricing-expectations",
    category: "menu",
    title: "Pricing Expectations",
    searchText:
      "price prices cost expensive budget menu range starters steaks seafood sides desserts cocktails",
    exampleQuestions: [
      "How expensive is dinner likely to be?",
      "What are the prices like?",
      "How much is steak?",
      "What is the cocktail price range?",
    ],
    answer: responses.priceExpectations,
    relatedActions: ["Explore the menu"],
  },
  {
    id: "service-style",
    category: "experience",
    title: "Service Style",
    searchText:
      "service style refined hospitality slow pacing cellar-led evenings private gatherings prepared table atmosphere",
    exampleQuestions: [
      "What is the service like?",
      "Is dinner rushed?",
      "How is the evening paced?",
      "Is it fine dining?",
    ],
    answer:
      "The page presents Maison Noir as refined, atmospheric, and paced around a complete evening rather than a rushed meal, with cellar-led celebrations and private gatherings.",
    relatedActions: [],
  },
  {
    id: "celebration-planning",
    category: "private dining",
    title: "Celebration Planning",
    searchText:
      "celebration birthday anniversary proposal milestone special occasion private room dessert cocktails reservation request",
    exampleQuestions: [
      "Help me plan a celebration",
      "What should we do for a milestone?",
      "Can I mention a special occasion?",
      "What is best for a special night?",
    ],
    answer: responses.celebration,
    relatedActions: ["Reserve a table", "Plan private dining"],
  },
  {
    id: "business-dining",
    category: "private dining",
    title: "Business Dining",
    searchText:
      "business dining corporate executive clients company dinner private room full evening brand dinners",
    exampleQuestions: [
      "Can we host a business dinner?",
      "Is it good for clients?",
      "Can we do a company event?",
      "What is best for executives?",
    ],
    answer: responses.corporate,
    relatedActions: ["Plan private dining"],
  },
  {
    id: "opening-greetings",
    category: "general",
    title: "Opening Greetings",
    searchText:
      "hello hi good evening concierge help start begin welcome",
    exampleQuestions: [
      "Hello",
      "Good evening",
      "Can you help me?",
      "Hi Maison Concierge",
    ],
    answer: responses.greeting,
    relatedActions: conciergeQuickActions,
  },
  {
    id: "closing-greetings",
    category: "general",
    title: "Closing Greetings",
    searchText:
      "goodbye bye thanks thank you perfect that helps farewell",
    exampleQuestions: [
      "Thank you",
      "That helps",
      "Goodbye",
      "Perfect thanks",
    ],
    answer: responses.farewell,
    relatedActions: [],
  },
  {
    id: "unrelated-questions",
    category: "unrelated",
    title: "Unrelated Questions",
    searchText:
      "unrelated weather sports hockey game stocks code homework flight hotel politics outside restaurant",
    exampleQuestions: [
      "Who won the hockey game?",
      "What is the weather?",
      "Write me code",
      "Book me a flight",
    ],
    answer: responses.unrelated,
    relatedActions: conciergeQuickActions,
    safetyLevel: "redirect",
  },
  {
    id: "unknown-questions",
    category: "fallback",
    title: "Unknown Questions",
    searchText:
      "unknown unclear fallback did not understand menu steak recommendations private dining dietary considerations reservations",
    exampleQuestions: [
      "I am not sure what I need",
      "Can you help?",
      "What can you answer?",
      "I have a question",
    ],
    answer: conciergeFallbackMessage,
    relatedActions: conciergeQuickActions,
  },
];

const dishKnowledgeDocuments = Object.entries(menuItemsForKnowledge).flatMap(
  ([category, items]) => items.map((item) => buildDishDocument(category, item))
);

export const conciergeKnowledgeDocuments = [
  ...manualKnowledgeDocuments,
  ...dishKnowledgeDocuments,
];

const spellingVariations = [
  ["rib eye", "ribeye"],
  ["rib-eye", "ribeye"],
  ["fillet", "filet"],
  ["filet mignon", "filet"],
  ["newyork", "new york"],
  ["ny strip", "new york strip"],
  ["strip loin", "striploin"],
  ["wagu", "wagyu"],
  ["tomohawk", "tomahawk"],
  ["toma hawk", "tomahawk"],
  ["resy", "reservation"],
  ["rez", "reservation"],
  ["bookings", "booking"],
  ["anniversery", "anniversary"],
  ["anniv", "anniversary"],
  ["birth day", "birthday"],
  ["bday", "birthday"],
  ["gluton", "gluten"],
  ["glutten", "gluten"],
  ["dairyfree", "dairy free"],
  ["vegitarian", "vegetarian"],
  ["veggie", "vegetarian"],
  ["restuarant", "restaurant"],
  ["restraunt", "restaurant"],
  ["chefs table", "chef table"],
  ["chef's table", "chef table"],
  ["whiskey", "whisky"],
  ["proposing", "proposal"],
  ["propose", "proposal"],
  ["juiciest", "juicy"],
  ["juicier", "juicy"],
  ["heavily marbled", "marbled"],
  ["dine privately", "private dining"],
  ["privately", "private"],
  ["twelve", "12"],
  ["fourteen", "14"],
  ["eight", "8"],
  ["six", "6"],
  ["seven", "7"],
];

const normalizeInput = (value) => {
  let text = String(value || "")
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/&/g, " and ");

  spellingVariations.forEach(([from, to]) => {
    text = text.replace(new RegExp(`\\b${from}\\b`, "g"), to);
  });

  return text
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/'/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export const normalizeConciergeText = normalizeInput;

const tokenize = (text) => text.split(" ").filter(Boolean);

const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "do",
  "for",
  "get",
  "have",
  "i",
  "is",
  "it",
  "me",
  "my",
  "should",
  "the",
  "there",
  "to",
  "we",
  "what",
  "with",
  "you",
]);

const hasPhrase = (text, phrase) => {
  const normalizedPhrase = normalizeInput(phrase);
  return ` ${text} `.includes(` ${normalizedPhrase} `);
};

const hasAny = (text, terms) => terms.some((term) => hasPhrase(text, term));

const overlapScore = (inputTokens, example) => {
  const meaningfulInputTokens = inputTokens.filter((token) => !stopWords.has(token));
  const exampleTokens = tokenize(normalizeInput(example)).filter(
    (token) => !stopWords.has(token)
  );
  if (!inputTokens.length || !exampleTokens.length) return 0;

  const inputSet = new Set(meaningfulInputTokens);
  const overlap = exampleTokens.filter((token) => inputSet.has(token)).length;
  const coverage = overlap / Math.max(exampleTokens.length, 1);
  const density = overlap / Math.max(meaningfulInputTokens.length, 1);

  return overlap >= 2 ? (coverage + density) * 2.4 : 0;
};

const weightedTerms = (terms, weight = 2) =>
  terms.map((term) => ({
    term,
    weight,
  }));

const intentDefinitions = [
  {
    intent: "greeting",
    topic: "general",
    threshold: 2.2,
    terms: weightedTerms(["hello", "hi", "hey", "good evening", "bonjour"], 3),
    examples: [
      "Hello",
      "Hi concierge",
      "Good evening",
      "Can you help me tonight?",
      "Hey Maison Noir",
    ],
    response: responses.greeting,
  },
  {
    intent: "menu overview",
    topic: "menu",
    terms: weightedTerms(["menu", "overview", "explore", "courses", "food", "dinner", "recommend meal"], 2.8),
    examples: [
      "Walk me through the menu",
      "What should I order for dinner?",
      "Show me the menu structure",
      "What courses do you have?",
      "Help me explore the food",
    ],
    response: responses.menuOverview,
  },
  {
    intent: "steak recommendation",
    topic: "steak",
    terms: weightedTerms(["steak", "cut", "beef", "ribeye", "filet", "tomahawk", "wagyu", "striploin", "new york strip"], 3),
    examples: [
      "Help me choose a steak",
      "Which steak should I get?",
      "What cut of beef do you recommend?",
      "I want a steak recommendation",
      "Which steak is the best?",
    ],
    response: responses.steakRecommendation,
  },
  {
    intent: "rich steak recommendation",
    topic: "steak",
    terms: weightedTerms(["rich", "flavorful", "flavourful", "marbled", "juicy", "marrow", "smoky", "smoke", "ribeye", "dry aged", "deep"], 3.4),
    examples: [
      "I want something rich",
      "What steak is the juiciest?",
      "Which steak is most flavorful?",
      "Give me a marbled steak",
      "I like smoky beef",
      "I want the ribeye",
    ],
    response: responses.richSteak,
    recommendation: "45-Day Dry-Aged Ribeye",
  },
  {
    intent: "lean steak recommendation",
    topic: "steak",
    terms: weightedTerms(["lean", "tender", "soft", "filet", "lighter", "restrained", "delicate"], 3.4),
    examples: [
      "I want something tender",
      "Which steak is leaner?",
      "Recommend a filet",
      "I do not want a heavy steak",
      "What is the softest steak?",
    ],
    response: responses.leanSteak,
    recommendation: "Black Truffle Filet Mignon",
  },
  {
    intent: "steak for sharing",
    topic: "steak",
    threshold: 3.2,
    terms: weightedTerms(["share", "sharing", "two", "dramatic", "centerpiece", "tomahawk", "big steak", "comes with"], 3.4),
    examples: [
      "What steak should we share?",
      "I want something dramatic for two",
      "Is the tomahawk good for sharing?",
      "Which steak is a centerpiece?",
      "We want one steak together",
    ],
    response: responses.sharingSteak,
    recommendation: "Tomahawk for Two",
  },
  {
    intent: "premium steak recommendation",
    topic: "steak",
    terms: weightedTerms(["premium", "luxury", "luxurious", "best", "indulgent", "wagyu", "a5", "special"], 3.2),
    examples: [
      "What is the most premium steak?",
      "I want the most luxurious cut",
      "Should I get wagyu?",
      "What is the special steak?",
      "Give me the indulgent option",
    ],
    response: responses.premiumSteak,
    recommendation: "A5 Japanese Wagyu",
  },
  {
    intent: "balanced steak recommendation",
    topic: "steak",
    terms: weightedTerms(["balanced", "classic", "strip", "striploin", "new york", "not too rich"], 3.2),
    examples: [
      "I want a balanced steak",
      "What is the classic steak choice?",
      "Tell me about the New York strip",
      "I want steak but not too rich",
      "What is a safe classic cut?",
    ],
    response: responses.balancedSteak,
    recommendation: "Prime New York Strip",
  },
  {
    intent: "seafood",
    topic: "menu",
    terms: weightedTerms(["seafood", "lobster", "scallops", "cod", "crab", "tuna", "prawns", "halibut", "oysters"], 3),
    examples: [
      "What seafood do you have?",
      "Recommend seafood",
      "Tell me about the lobster",
      "Is there crab on the menu?",
      "I want something from the Atlantic",
    ],
    response: responses.seafood,
  },
  {
    intent: "starters",
    topic: "menu",
    threshold: 3,
    terms: weightedTerms(["starter", "starters", "start", "begin", "beginning", "first course", "appetizer", "appetizers", "opening", "oysters", "tartare", "bone marrow", "burrata"], 3),
    examples: [
      "What should we start with?",
      "Recommend an appetizer",
      "Tell me about starters",
      "Should I get oysters?",
      "What is a good opening course?",
    ],
    response: responses.starters,
  },
  {
    intent: "sides",
    topic: "menu",
    terms: weightedTerms(["side", "sides", "fries", "pommes", "mushrooms", "asparagus", "broccolini", "spinach", "mac"], 3),
    examples: [
      "What sides go with steak?",
      "Recommend a side",
      "Should I get truffle fries?",
      "What should we share with the ribeye?",
      "Tell me about the sides",
    ],
    response: responses.sides,
  },
  {
    intent: "desserts",
    topic: "menu",
    terms: weightedTerms(["dessert", "desserts", "chocolate", "torte", "brulee", "cheesecake", "cake", "affogato", "tart"], 3),
    examples: [
      "What dessert should I get?",
      "Do you have chocolate dessert?",
      "Tell me about desserts",
      "What is a lighter dessert?",
      "Should I order creme brulee?",
    ],
    response: responses.desserts,
  },
  {
    intent: "cocktails",
    topic: "drinks",
    terms: weightedTerms(["cocktail", "cocktails", "martini", "manhattan", "old fashioned", "negroni", "spritz", "gimlet", "sidecar"], 3),
    examples: [
      "Recommend a cocktail",
      "What should I drink after dinner?",
      "Tell me about the martini",
      "What cocktail is smoky?",
      "Do you have an old fashioned?",
    ],
    response: responses.cocktails,
  },
  {
    intent: "wine pairing",
    topic: "pairing",
    terms: weightedTerms(["wine", "pairing", "pair", "bottle", "cellar", "champagne", "red wine", "white wine", "whisky"], 3.2),
    examples: [
      "What wine pairs with ribeye?",
      "Help me choose a bottle",
      "Should I get Champagne?",
      "Pair a drink with seafood",
      "Would whisky work after steak?",
    ],
    response: responses.winePairing,
  },
  {
    intent: "cocktail pairing",
    topic: "pairing",
    threshold: 3.2,
    terms: weightedTerms(["cocktail pairing", "cocktail", "drink", "old fashioned", "manhattan", "boulevardier", "order with steak", "with steak"], 3.3),
    examples: [
      "What cocktail should I order with steak?",
      "Which cocktail goes with ribeye?",
      "What drink works with steak?",
      "Should I get an old fashioned?",
      "What is a good cocktail pairing?",
    ],
    response: responses.cocktailPairing,
  },
  {
    intent: "whisky pairing",
    topic: "pairing",
    threshold: 3.1,
    terms: weightedTerms(["whisky", "bourbon", "old fashioned", "whisky cocktail", "whiskey sour", "boulevardier", "after steak"], 3.4),
    examples: [
      "I like whisky. What should I drink?",
      "What whisky cocktail should I get?",
      "Is bourbon good after steak?",
      "What should I pair with a rich steak?",
      "Which drink is smoky and dark?",
    ],
    response: responses.whiskyPairing,
  },
  {
    intent: "private dining",
    topic: "private dining",
    terms: weightedTerms(["private dining", "private room", "event", "group dinner", "chef table", "buyout", "private", "group", "guests", "people"], 3.1),
    examples: [
      "Plan private dining",
      "Do you have a private room?",
      "Can twelve people dine privately?",
      "I need a group dinner",
      "Tell me about the chef table",
      "Can we book a buyout?",
    ],
    response: responses.privateDining,
  },
  {
    intent: "anniversary dinner",
    topic: "private dining",
    terms: weightedTerms(["anniversary", "romantic", "date night", "couple", "intimate", "proposal"], 3.3),
    examples: [
      "I am planning an anniversary dinner",
      "What should we do for a romantic night?",
      "Is Maison Noir good for a date night?",
      "Help me plan a proposal dinner",
      "I want an intimate celebration",
    ],
    response: responses.anniversary,
  },
  {
    intent: "proposal dinner",
    topic: "private dining",
    threshold: 3.1,
    terms: weightedTerms(["proposal", "engagement", "propose", "romantic", "special arrangements", "quieter table"], 3.4),
    examples: [
      "I am proposing. What would you recommend?",
      "Can I plan a proposal dinner?",
      "What is best for an engagement night?",
      "Can the evening feel romantic?",
      "I want to propose at dinner",
    ],
    response: responses.proposal,
  },
  {
    intent: "birthday dinner",
    topic: "private dining",
    terms: weightedTerms(["birthday", "celebration", "celebrate", "party", "milestone"], 3.2),
    examples: [
      "I am planning a birthday dinner",
      "What is good for a celebration?",
      "Can we celebrate a milestone there?",
      "Help me plan a birthday",
      "What should a party order?",
    ],
    response: responses.birthday,
  },
  {
    intent: "corporate dinner",
    topic: "private dining",
    terms: weightedTerms(["corporate", "business", "client", "executive", "team dinner", "company", "brand dinner"], 3.4),
    examples: [
      "Plan a corporate dinner",
      "I am hosting clients",
      "Is this good for an executive dinner?",
      "We need a company dinner",
      "Can we do a business event?",
    ],
    response: responses.corporate,
  },
  {
    intent: "dietary restrictions",
    topic: "dietary",
    terms: weightedTerms(["dietary", "restriction", "gluten", "dairy", "halal", "vegan", "vegetarian", "avoid", "dairy free"], 3),
    examples: [
      "I have dietary restrictions",
      "Can you help with gluten free options?",
      "Do you have dairy free dishes?",
      "Is anything halal?",
      "I need to avoid shellfish",
    ],
    response: responses.dietary,
  },
  {
    intent: "dairy questions",
    topic: "dietary",
    threshold: 3.1,
    terms: weightedTerms(["dairy", "dairy free", "without dairy", "butter", "cream", "cheese", "milk", "lactose"], 3.5),
    examples: [
      "Do you have anything without dairy?",
      "I need dairy-free food",
      "Which items have butter?",
      "Can you avoid cream?",
      "Is there cheese in many dishes?",
    ],
    response: responses.dairyQuestions,
  },
  {
    intent: "severe allergies",
    topic: "dietary",
    terms: weightedTerms(["allergy", "allergies", "allergic", "anaphylaxis", "severe", "cross contact", "cross contamination", "shellfish allergy", "nut allergy"], 3.8),
    examples: [
      "I have a severe allergy",
      "Can you guarantee no shellfish?",
      "Is the kitchen safe for nuts?",
      "I am allergic to dairy",
      "Can you avoid cross contamination?",
    ],
    response: responses.severeAllergies,
  },
  {
    intent: "vegetarian options",
    topic: "dietary",
    terms: weightedTerms(["vegetarian", "vegan", "plant based", "meatless", "no meat"], 3.5),
    examples: [
      "Do you have vegetarian options?",
      "Can a vegan eat here?",
      "What can I order without meat?",
      "Are there plant based dishes?",
      "I need a vegetarian dinner",
    ],
    response: responses.vegetarian,
  },
  {
    intent: "dress code",
    topic: "visit",
    threshold: 3,
    terms: weightedTerms(["dress", "attire", "wear", "clothes", "outfit", "dress code"], 3.4),
    examples: [
      "What should I wear?",
      "Is there a dress code?",
      "Can I wear jeans?",
      "What attire fits Maison Noir?",
      "Is it formal?",
    ],
    response: responses.dressCode,
  },
  {
    intent: "hours",
    topic: "visit",
    terms: weightedTerms(["hours", "open", "close", "closing", "tonight", "time", "daily"], 3.1),
    examples: [
      "What time are you open?",
      "When does Maison Noir close?",
      "Are you open tonight?",
      "What are the hours?",
      "When can we arrive?",
    ],
    response: responses.hours,
  },
  {
    intent: "location",
    topic: "visit",
    terms: weightedTerms(["location", "address", "where", "directions", "phone", "bishop", "halifax", "contact"], 3.2),
    examples: [
      "Where is Maison Noir?",
      "What is the address?",
      "How do I call the restaurant?",
      "Is it in Halifax?",
      "Give me directions",
    ],
    response: responses.location,
  },
  {
    intent: "parking",
    topic: "visit",
    terms: weightedTerms(["parking", "park", "valet", "garage", "car"], 3.6),
    examples: [
      "Is there parking?",
      "Do they have valet?",
      "Where should I park?",
      "Is there a garage nearby?",
      "Can I bring a car?",
    ],
    response: responses.parking,
  },
  {
    intent: "reservations",
    topic: "reservation",
    terms: weightedTerms(["reserve", "reservation", "booking", "book a table", "request reservation", "table"], 3.4),
    examples: [
      "Reserve a table",
      "I want to book a table",
      "Take me to reservations",
      "Can I make a booking?",
      "Help me request a reservation",
    ],
    response: responses.reservations,
    action: "reserve",
  },
  {
    intent: "reservation availability",
    topic: "reservation",
    terms: weightedTerms(["availability", "available", "table tonight", "open table", "slot", "fully booked"], 3.8),
    examples: [
      "Do you have availability tonight?",
      "Is there a table at 7:30?",
      "Are you fully booked?",
      "Can I get a table tonight?",
      "What times are available?",
    ],
    response: responses.reservationAvailability,
  },
  {
    intent: "restaurant atmosphere",
    topic: "experience",
    terms: weightedTerms(["atmosphere", "vibe", "mood", "experience", "romantic", "luxury", "fancy", "quiet"], 3),
    examples: [
      "What is the atmosphere like?",
      "Is Maison Noir romantic?",
      "What is the vibe?",
      "Is it a fancy restaurant?",
      "Describe the experience",
    ],
    response: responses.atmosphere,
  },
  {
    intent: "price expectations",
    topic: "menu",
    terms: weightedTerms(["price", "prices", "cost", "expensive", "budget", "how much", "range"], 3.4),
    examples: [
      "How expensive is it?",
      "What are the prices like?",
      "How much should I expect to spend?",
      "What is the steak price range?",
      "Is Maison Noir pricey?",
    ],
    response: responses.priceExpectations,
  },
  {
    intent: "chef",
    topic: "experience",
    terms: weightedTerms(["chef", "kitchen", "open flame", "fire", "grill", "craft"], 3.2),
    examples: [
      "Tell me about the chef",
      "Is there an open kitchen?",
      "What is the chef table?",
      "Do they cook over fire?",
      "What is the kitchen experience?",
    ],
    response: responses.chef,
  },
  {
    intent: "tasting experience",
    topic: "experience",
    terms: weightedTerms(["tasting", "tasting menu", "course", "guided", "progression", "journey"], 3.3),
    examples: [
      "Can I do a tasting menu?",
      "Plan a tasting experience",
      "What is a good course progression?",
      "Can the chef guide the meal?",
      "I want a full evening experience",
    ],
    response: responses.tasting,
  },
  {
    intent: "farewell",
    topic: "general",
    threshold: 2.4,
    terms: weightedTerms(["bye", "goodbye", "thanks", "thank you", "perfect", "that helps"], 3),
    examples: [
      "Thank you",
      "That helps",
      "Goodbye",
      "Perfect thanks",
      "Bye concierge",
    ],
    response: responses.farewell,
  },
  {
    intent: "unrelated question",
    topic: "unrelated",
    threshold: 3,
    terms: weightedTerms(["weather", "sports", "stock", "politics", "code", "homework", "movie", "flight", "hotel", "recipe", "hockey", "game", "won"], 3.5),
    examples: [
      "What is the weather tomorrow?",
      "Who won the game?",
      "Write me code",
      "What stocks should I buy?",
      "Book me a flight",
    ],
    response: responses.unrelated,
  },
];

export const conciergeIntentExamples = intentDefinitions.flatMap((definition) =>
  definition.examples.map((example) => ({
    intent: definition.intent,
    example,
  }))
);

const contextBoost = (definition, normalizedText, context) => {
  let boost = 0;

  if (context.currentTopic === definition.topic) boost += 1.6;
  if (context.previousIntent === definition.intent) boost += 0.8;

  if (
    definition.intent === "sides" &&
    hasAny(normalizedText, ["side", "sides", "fries", "pommes", "mushrooms", "asparagus", "broccolini", "spinach"])
  ) {
    boost += 3.2;
  }

  if (
    definition.intent === "desserts" &&
    hasAny(normalizedText, ["dessert", "desserts", "chocolate", "torte", "brulee", "cake", "affogato", "tart"])
  ) {
    boost += 3.2;
  }

  if (
    definition.intent === "cocktail pairing" &&
    hasAny(normalizedText, ["cocktail", "drink", "old fashioned", "manhattan", "boulevardier", "with steak"])
  ) {
    boost += 3.2;
  }

  if (
    definition.intent === "whisky pairing" &&
    hasAny(normalizedText, ["whisky", "bourbon", "whisky cocktail", "old fashioned", "whiskey sour"])
  ) {
    boost += 3.4;
  }

  if (
    definition.intent === "dairy questions" &&
    hasAny(normalizedText, ["dairy", "dairy free", "without dairy", "butter", "cream", "cheese", "milk"])
  ) {
    boost += 3.2;
  }

  if (
    definition.intent === "unrelated question" &&
    hasAny(normalizedText, ["weather", "sports", "stock", "politics", "code", "homework", "movie", "flight", "hotel", "hockey", "game"])
  ) {
    boost += 4.2;
  }

  if (context.currentTopic === "steak") {
    if (definition.topic === "steak") boost += 1.8;
    if (definition.intent === "rich steak recommendation" && hasPhrase(normalizedText, "rich")) boost += 3.6;
    if (definition.intent === "lean steak recommendation" && hasPhrase(normalizedText, "lean")) boost += 3.6;
    if (definition.intent === "lean steak recommendation" && hasPhrase(normalizedText, "tender")) boost += 3.4;
    if (definition.intent === "steak for sharing" && hasPhrase(normalizedText, "sharing")) boost += 3.6;
    if (definition.intent === "premium steak recommendation" && hasPhrase(normalizedText, "premium")) boost += 3.6;
    if (definition.intent === "balanced steak recommendation" && hasPhrase(normalizedText, "classic")) boost += 3.2;
  }

  if (context.currentTopic === "private dining") {
    if (definition.intent === "anniversary dinner" && hasPhrase(normalizedText, "intimate")) boost += 2.8;
    if (definition.intent === "birthday dinner" && hasPhrase(normalizedText, "celebratory")) boost += 2.8;
    if (definition.intent === "corporate dinner" && hasPhrase(normalizedText, "business")) boost += 3.2;
  }

  return boost;
};

const scoreIntent = (definition, normalizedText, tokens, context) => {
  let score = contextBoost(definition, normalizedText, context);
  const tokenSet = new Set(tokens);

  definition.terms.forEach(({ term, weight }) => {
    const normalizedTerm = normalizeInput(term);
    const termTokens = tokenize(normalizedTerm);

    if (termTokens.length > 1) {
      if (hasPhrase(normalizedText, normalizedTerm)) score += weight + 1.2;
      return;
    }

    if (tokenSet.has(normalizedTerm)) score += weight;
  });

  definition.examples.forEach((example) => {
    score += overlapScore(tokens, example);
  });

  return score;
};

const getBestIntent = (normalizedText, context) => {
  const tokens = tokenize(normalizedText);
  const ranked = intentDefinitions
    .map((definition) => ({
      definition,
      score: scoreIntent(definition, normalizedText, tokens, context),
    }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const threshold = best.definition.threshold || 3.8;

  if (!best || best.score < threshold) {
    return {
      definition: {
        intent: "unknown question",
        topic: context.currentTopic || "general",
        response: conciergeFallbackMessage,
      },
      score: 0,
    };
  }

  return best;
};

const nextContext = (previousContext, best, normalizedText) => {
  const definition = best.definition;
  let dietaryPreference = previousContext.dietaryPreference || null;
  let occasion = previousContext.occasion || null;
  let partySize = previousContext.partySize || null;
  let preferredDrinkCategory = previousContext.preferredDrinkCategory || null;

  if (hasPhrase(normalizedText, "gluten")) dietaryPreference = "gluten-conscious";
  if (hasPhrase(normalizedText, "dairy")) dietaryPreference = "dairy-conscious";
  if (hasPhrase(normalizedText, "vegetarian")) dietaryPreference = "vegetarian";
  if (hasPhrase(normalizedText, "vegan")) dietaryPreference = "vegan";
  if (hasPhrase(normalizedText, "halal")) dietaryPreference = "halal";
  if (hasPhrase(normalizedText, "allergy")) dietaryPreference = "allergy";

  if (hasPhrase(normalizedText, "anniversary")) occasion = "anniversary";
  if (hasPhrase(normalizedText, "birthday")) occasion = "birthday";
  if (hasPhrase(normalizedText, "corporate") || hasPhrase(normalizedText, "business")) {
    occasion = "business";
  }
  if (hasPhrase(normalizedText, "proposal")) occasion = "proposal";

  const partyMatch = normalizedText.match(/\b([2-9]|1[0-9]|20)\s+(people|guests|person)\b/);
  if (partyMatch) partySize = Number(partyMatch[1]);

  if (hasPhrase(normalizedText, "wine")) preferredDrinkCategory = "wine";
  if (hasPhrase(normalizedText, "whisky")) preferredDrinkCategory = "whisky";
  if (hasPhrase(normalizedText, "cocktail")) preferredDrinkCategory = "cocktail";

  return {
    currentTopic: definition.topic,
    previousIntent: definition.intent,
    previousRecommendation:
      definition.recommendation || previousContext.previousRecommendation || null,
    dietaryPreference,
    occasion,
    partySize,
    preferredDrinkCategory,
  };
};

const criticalResponse = (intent, topic, message, action = null) => ({
  intent,
  topic,
  message,
  action,
});

export function getCriticalConciergeResponse(
  input,
  context = createConciergeContext()
) {
  const normalizedText = normalizeInput(input);

  if (!normalizedText) return null;

  const withContext = (payload) => ({
    ...payload,
    context: {
      ...context,
      currentTopic: payload.topic,
      previousIntent: payload.intent,
    },
  });

  if (
    hasAny(normalizedText, [
      "emergency",
      "medical emergency",
      "choking",
      "cant breathe",
      "cannot breathe",
      "anaphylaxis",
      "hospital",
      "ambulance",
    ])
  ) {
    return withContext(
      criticalResponse(
        "emergency",
        "safety",
        "If this is an emergency or someone may be having a serious allergic reaction, contact local emergency services immediately. For food allergy planning, speak directly with the restaurant team before dining.",
        null,
        context
      )
    );
  }

  if (
    hasAny(normalizedText, [
      "severe allergy",
      "serious allergy",
      "nut allergy",
      "shellfish allergy",
      "anaphylactic",
      "anaphylaxis",
      "cross contact",
      "cross contamination",
      "guarantee no",
      "allergen free",
    ])
  ) {
    return withContext(
      criticalResponse(
        "severe allergies",
        "dietary",
        responses.severeAllergies,
        null,
        context
      )
    );
  }

  if (
    hasAny(normalizedText, [
      "availability",
      "available tonight",
      "table tonight",
      "table available",
      "fully booked",
      "saturday at eight",
      "book saturday",
    ])
  ) {
    return withContext(
      criticalResponse(
        "reservation availability",
        "reservation",
        responses.reservationAvailability,
        null,
        context
      )
    );
  }

  if (
    hasAny(normalizedText, [
      "reserve a table",
      "make a reservation",
      "request reservation",
      "take me to reservation",
      "go to reservation",
      "book a table",
      "booking",
    ])
  ) {
    return withContext(
      criticalResponse(
        "reservations",
        "reservation",
        responses.reservations,
        "reserve",
        context
      )
    );
  }

  return null;
}

export function getConciergeResponse(input, context = createConciergeContext()) {
  const normalizedText = normalizeInput(input);

  if (!normalizedText) {
    return {
      intent: "empty",
      message: "",
      action: null,
      context,
    };
  }

  const critical = getCriticalConciergeResponse(input, context);
  if (critical) return critical;

  const best = getBestIntent(normalizedText, context);
  const definition = best.definition;

  return {
    intent: definition.intent,
    message: definition.response,
    action: definition.action || null,
    context: nextContext(context, best, normalizedText),
  };
}
