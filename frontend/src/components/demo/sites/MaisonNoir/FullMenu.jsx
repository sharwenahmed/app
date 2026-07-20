import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

import SectionGlow from "@/components/demo/ui/SectionGlow";
import SectionHeader from "@/components/demo/ui/SectionHeader";
import LuxuryButton from "@/components/demo/ui/LuxuryButton";

const categories = [
  "Starters",
  "Steaks",
  "Seafood",
  "Sides",
  "Desserts",
  "Cocktails",
];

const getCategoryId = (category) =>
  `menu-${category.toLowerCase().replace(/\s+/g, "-")}`;

const featuredImages = {
  Starters: {
    image: "/images/MaisonNoir/menu/starters/bone-marrow-toast.webp",
    title: "Bone Marrow Toast",
    subtitle: "Roasted marrow, grilled sourdough, parsley salad.",
  },
  Steaks: {
    image: "/images/MaisonNoir/menu/steaks/45-day-dry-aged-ribeye.webp",
    title: "45-Day Dry-Aged Ribeye",
    subtitle: "Prime ribeye aged in-house, smoked marrow butter.",
  },
  Seafood: {
    image: "/images/MaisonNoir/menu/seafood/butter-poached-atlantic-lobster.webp",
    title: "Butter Poached Atlantic Lobster",
    subtitle: "Atlantic lobster with saffron butter.",
  },
  Sides: {
    image: "/images/MaisonNoir/menu/sides/black-truffle-fries.webp",
    title: "Black Truffle Fries",
    subtitle: "Parmesan, herbs and truffle.",
  },
  Desserts: {
    image: "/images/MaisonNoir/menu/desserts/dark-chocolate-torte.webp",
    title: "Dark Chocolate Torte",
    subtitle: "Chocolate ganache, espresso cream.",
  },
  Cocktails: {
    image: "/images/MaisonNoir/menu/cocktails/the-noir-old-fashioned.webp",
    title: "The Noir Old Fashioned",
    subtitle: "Bourbon, cacao bitters, orange oil.",
  },
};

export const menuItems = {
  Starters: [
    ["Bone Marrow Toast", "$24", "Roasted marrow, grilled sourdough, parsley salad.", "/images/MaisonNoir/menu/starters/bone-marrow-toast.webp"],
    ["Truffle Steak Tartare", "$28", "Hand-cut prime beef, cured yolk, black truffle.", "/images/MaisonNoir/menu/starters/truffle-steak-tartare.webp"],
    ["Oysters Noir", "$32", "Six oysters, champagne mignonette, lemon oil.", "/images/MaisonNoir/menu/starters/oysters-noir.webp"],
    ["Charred Spanish Octopus", "$29", "Potato espuma, smoked paprika, herb oil.", "/images/MaisonNoir/menu/starters/charred-spanish-octopus.webp"],
    ["Burrata & Heirloom Tomatoes", "$22", "Burrata, roasted tomatoes, basil oil.", "/images/MaisonNoir/menu/starters/burrata-heirloom-tomatoes.webp"],
    ["Foie Gras Torchon", "$34", "Brioche, fig jam, aged balsamic.", "/images/MaisonNoir/menu/starters/foie-gras-torchon.webp"],
    ["Caviar Potato Crisp", "$38", "Yukon crisp, crème fraîche, Ossetra caviar.", "/images/MaisonNoir/menu/starters/caviar-potato-crisp.webp"],
    ["Smoked Caesar Salad", "$18", "Romaine hearts, parmesan snow, anchovy dressing.", "/images/MaisonNoir/menu/starters/smoked-caesar-salad.webp"],
  ],
  Steaks: [
    ["45-Day Dry-Aged Ribeye", "$68", "16 oz ribeye, smoked marrow butter, sea salt.", "/images/MaisonNoir/menu/steaks/45-day-dry-aged-ribeye.webp"],
    ["Black Truffle Filet Mignon", "$74", "8 oz filet, pommes purée, truffle jus.", "/images/MaisonNoir/menu/steaks/black-truffle-filet-mignon.webp"],
    ["A5 Japanese Wagyu", "$128", "4 oz wagyu, binchotan charcoal, smoked salt.", "/images/MaisonNoir/menu/steaks/a5-japanese-wagyu.webp"],
    ["Tomahawk for Two", "$145", "32 oz dry-aged tomahawk, roasted garlic, house sauce.", "/images/MaisonNoir/menu/steaks/tomahawk-for-two.webp"],
    ["Prime New York Strip", "$62", "14 oz striploin, peppercorn jus, charred rosemary.", "/images/MaisonNoir/menu/steaks/prime-new-york-strip.webp"],
  ],
  Seafood: [
    ["Butter Poached Atlantic Lobster", "$58", "Saffron butter, preserved lemon.", "/images/MaisonNoir/menu/seafood/butter-poached-atlantic-lobster.webp"],
    ["Seared Nova Scotia Scallops", "$42", "Brown butter, cauliflower silk.", "/images/MaisonNoir/menu/seafood/seared-nova-scotia-scallops.webp"],
    ["Miso Black Cod", "$46", "Miso glaze, sesame, charred scallion.", "/images/MaisonNoir/menu/seafood/miso-black-cod.webp"],
    ["King Crab Legs", "$72", "Drawn butter, lemon, sea salt.", "/images/MaisonNoir/menu/seafood/king-crab-legs.webp"],
    ["Bluefin Tuna Crudo", "$27", "Citrus, chili oil, crispy shallot.", "/images/MaisonNoir/menu/seafood/bluefin-tuna-crudo.webp"],
    ["Jumbo Garlic Prawns", "$36", "Garlic butter, smoked chili, parsley.", "/images/MaisonNoir/menu/seafood/jumbo-garlic-prawns.webp"],
    ["Maison Noir Seafood Tower", "$118", "Oysters, lobster, crab, prawns, seasonal sauces.", "/images/MaisonNoir/menu/seafood/maison-noir-seafood-tower.webp"],
    ["Charcoal-Grilled Halibut", "$44", "Beurre blanc, fennel, open flame finish.", "/images/MaisonNoir/menu/seafood/charcoal-grilled-halibut.webp"],
  ],
  Sides: [
    ["Pommes Purée", "$14", "Cultured butter, chives.", "/images/MaisonNoir/menu/sides/pommes-puree.webp"],
    ["Black Truffle Fries", "$17", "Parmesan, herbs, black truffle aioli.", "/images/MaisonNoir/menu/sides/black-truffle-fries.webp"],
    ["Mac & Gruyère", "$18", "Gruyère, aged cheddar, black pepper crumb.", "/images/MaisonNoir/menu/sides/mac-and-gruyere.webp"],
    ["Creamed Spinach", "$15", "Garlic cream, nutmeg.", "/images/MaisonNoir/menu/sides/creamed-spinach.webp"],
    ["Charred Broccolini", "$16", "Lemon oil, chili crisp, toasted almond.", "/images/MaisonNoir/menu/sides/charred-broccolini.webp"],
    ["Roasted Wild Mushrooms", "$17", "Thyme, garlic butter.", "/images/MaisonNoir/menu/sides/roasted-wild-mushrooms.webp"],
    ["Maple Bacon Brussels Sprouts", "$16", "Cider glaze, toasted seeds.", "/images/MaisonNoir/menu/sides/maple-bacon-brussels-sprouts.webp"],
    ["Charred Asparagus", "$18", "Hollandaise, smoked salt.", "/images/MaisonNoir/menu/sides/charred-asparagus.webp"],
  ],
  Desserts: [
    ["Dark Chocolate Torte", "$18", "Chocolate ganache, espresso cream, salted crumble.", "/images/MaisonNoir/menu/desserts/dark-chocolate-torte.webp"],
    ["Vanilla Bean Crème Brûlée", "$16", "Burnt sugar, citrus, almond tuile.", "/images/MaisonNoir/menu/desserts/vanilla-bean-creme-brulee.webp"],
    ["Basque Cheesecake", "$17", "Burnt vanilla top, berry compote.", "/images/MaisonNoir/menu/desserts/basque-cheesecake.webp"],
    ["Whiskey Caramel Cake", "$19", "Caramel cream, toasted pecan.", "/images/MaisonNoir/menu/desserts/whiskey-caramel-cake.webp"],
    ["Espresso Affogato", "$14", "Vanilla gelato, hot espresso, cocoa dust.", "/images/MaisonNoir/menu/desserts/espresso-affogato.webp"],
    ["Lemon Tart", "$16", "Italian meringue, citrus curd.", "/images/MaisonNoir/menu/desserts/lemon-tart.webp"],
  ],
  Cocktails: [
    ["The Noir Old Fashioned", "$19", "Bourbon, cacao bitters, orange oil, smoked cherry.", "/images/MaisonNoir/menu/cocktails/the-noir-old-fashioned.webp"],
    ["Cellar Martini", "$21", "Vodka, dry vermouth, olive oil wash, sea salt.", "/images/MaisonNoir/menu/cocktails/cellar-martini.webp"],
    ["Midnight Manhattan", "$20", "Rye, sweet vermouth, black cherry, bitters.", "/images/MaisonNoir/menu/cocktails/midnight-manhattan.webp"],
    ["Gold Rush", "$18", "Bourbon, honey, lemon, smoked ice.", "/images/MaisonNoir/menu/cocktails/gold-rush.webp"],
    ["Velvet Negroni", "$19", "Gin, Campari, vermouth, orange oil.", "/images/MaisonNoir/menu/cocktails/velvet-negroni.webp"],
    ["Charcoal Whiskey Sour", "$18", "Whiskey, lemon, egg white, activated charcoal.", "/images/MaisonNoir/menu/cocktails/charcoal-whiskey-sour.webp"],
    ["Pearl Gimlet", "$17", "Gin, lime cordial, basil, mineral salt.", "/images/MaisonNoir/menu/cocktails/pearl-gimlet.webp"],
    ["Smoked Boulevardier", "$21", "Bourbon, Campari, vermouth, oak smoke.", "/images/MaisonNoir/menu/cocktails/smoked-boulevardier.webp"],
    ["Noir Espresso Martini", "$20", "Vodka, espresso, coffee liqueur, vanilla.", "/images/MaisonNoir/menu/cocktails/noir-espresso-martini.webp"],
    ["Amber Spritz", "$17", "Aperitivo, sparkling wine, citrus.", "/images/MaisonNoir/menu/cocktails/amber-spritz.webp"],
    ["Cognac Sidecar", "$22", "Cognac, orange liqueur, lemon, sugared rim.", "/images/MaisonNoir/menu/cocktails/cognac-sidecar.webp"],
    ["After Midnight", "$23", "Dark rum, amaro, cacao, bitters.", "/images/MaisonNoir/menu/cocktails/after-midnight.webp"],
  ],
};

const categoryHeadlines = {
  Starters: "Begin quietly.",
  Steaks: "The fire speaks here.",
  Seafood: "From Atlantic waters.",
  Sides: "Designed to accompany.",
  Desserts: "The final memory.",
  Cocktails: "Poured after dark.",
};

const categoryHeroMotion = {
  Starters: {
    cardInitial: {
      opacity: 0,
      y: 70,
      scale: 0.97,
      clipPath: "inset(14% 0% 14% 0% round 1.75rem)",
    },
    cardAnimate: {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
    },
    imageInitial: {
      scale: 1.12,
      y: 24,
      filter: "brightness(0.78) contrast(1.08)",
    },
    imageAnimate: {
      scale: 1.02,
      y: 0,
      filter: "brightness(0.96) contrast(1.05)",
    },
    sweepInitial: { x: "-130%", opacity: 0 },
    sweepAnimate: { x: "130%", opacity: [0, 0.45, 0] },
  },

  Steaks: {
    cardInitial: {
      opacity: 0,
      y: 90,
      rotateX: 6,
      scale: 0.955,
      clipPath: "inset(18% 10% 18% 10% round 1.75rem)",
    },
    cardAnimate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
    },
    imageInitial: {
      scale: 1.18,
      y: 36,
      filter: "brightness(0.68) contrast(1.2) saturate(0.92)",
    },
    imageAnimate: {
      scale: 1.04,
      y: 0,
      filter: "brightness(1) contrast(1.08) saturate(1)",
    },
    sweepInitial: { x: "-150%", opacity: 0 },
    sweepAnimate: { x: "150%", opacity: [0, 0.75, 0] },
  },

  Seafood: {
    cardInitial: {
      opacity: 0,
      x: -42,
      y: 46,
      scale: 0.97,
      clipPath: "inset(0% 18% 0% 18% round 1.75rem)",
    },
    cardAnimate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
    },
    imageInitial: {
      scale: 1.14,
      x: 32,
      filter: "brightness(0.8) contrast(1.05) saturate(0.9)",
    },
    imageAnimate: {
      scale: 1.03,
      x: 0,
      filter: "brightness(0.98) contrast(1.04) saturate(1)",
    },
    sweepInitial: { x: "130%", opacity: 0 },
    sweepAnimate: { x: "-130%", opacity: [0, 0.4, 0] },
  },

  Sides: {
    cardInitial: {
      opacity: 0,
      x: 42,
      y: 36,
      scale: 0.975,
      clipPath: "inset(8% 8% 8% 8% round 1.75rem)",
    },
    cardAnimate: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
    },
    imageInitial: {
      scale: 1.1,
      x: -24,
      filter: "brightness(0.78) contrast(1.08)",
    },
    imageAnimate: {
      scale: 1.02,
      x: 0,
      filter: "brightness(0.96) contrast(1.05)",
    },
    sweepInitial: { x: "-120%", opacity: 0 },
    sweepAnimate: { x: "120%", opacity: [0, 0.35, 0] },
  },

  Desserts: {
    cardInitial: {
      opacity: 0,
      y: 58,
      scale: 0.94,
      clipPath: "circle(42% at 50% 55%)",
    },
    cardAnimate: {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: "circle(100% at 50% 50%)",
    },
    imageInitial: {
      scale: 1.2,
      filter: "brightness(0.72) contrast(1.08) saturate(0.88)",
    },
    imageAnimate: {
      scale: 1.04,
      filter: "brightness(0.98) contrast(1.05) saturate(1)",
    },
    sweepInitial: { y: "120%", opacity: 0 },
    sweepAnimate: { y: "-120%", opacity: [0, 0.35, 0] },
  },

  Cocktails: {
    cardInitial: {
      opacity: 0,
      y: 80,
      rotateZ: -1.2,
      scale: 0.96,
      clipPath: "inset(0% 0% 22% 0% round 1.75rem)",
    },
    cardAnimate: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      scale: 1,
      clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
    },
    imageInitial: {
      scale: 1.16,
      y: 28,
      filter: "brightness(0.7) contrast(1.15) saturate(0.85)",
    },
    imageAnimate: {
      scale: 1.03,
      y: 0,
      filter: "brightness(1) contrast(1.08) saturate(1.05)",
    },
    sweepInitial: { x: "-160%", opacity: 0 },
    sweepAnimate: { x: "160%", opacity: [0, 0.85, 0] },
  },
};

const categoryHeroDetails = {
  Starters: {
    label: "Opening Ritual",
    mood: "Smoke, salt, acid",
    noteA: "First impression",
    noteB: "Designed to awaken",
  },
  Steaks: {
    label: "The Fire Course",
    mood: "Charcoal, marrow, restraint",
    noteA: "Open flame",
    noteB: "Aged in-house",
  },
  Seafood: {
    label: "Atlantic Passage",
    mood: "Cold water, clean finish",
    noteA: "Coastal precision",
    noteB: "Butter & brine",
  },
  Sides: {
    label: "The Supporting Cast",
    mood: "Texture, comfort, balance",
    noteA: "Built to share",
    noteB: "Table classics",
  },
  Desserts: {
    label: "Final Memory",
    mood: "Cream, bitter, sweet",
    noteA: "Slow finish",
    noteB: "After the flame",
  },
  Cocktails: {
    label: "After Dark",
    mood: "Smoke, glass, gold",
    noteA: "Low light",
    noteB: "Last pour",
  },
};

const categoryHeroStage = {
  Starters: {
    giantWord: "OPENING",
    eyebrow: "Opening Ritual",
    title: "Begin quietly.",
    story:
      "A first impression of smoke, salt, acid, and restraint. The evening begins before the flame speaks.",
    notes: ["Bone marrow", "Champagne acid", "Smoke"],
    sideLabel: "First signal",
    visual: "curtain",
    imagePosition: "md:right-12 md:top-12",
    textPosition: "md:left-16 md:bottom-14",
    giantPosition: "left-[-0.06em] top-2",
  },

  Steaks: {
    giantWord: "FIRE",
    eyebrow: "The Fire Course",
    title: "The fire speaks here.",
    story:
      "Dry-aged beef, marrow butter, charcoal heat, and a room built around patience.",
    notes: ["Dry-aged", "Open flame", "Marrow butter"],
    sideLabel: "Charcoal / Bone / Salt",
    visual: "fire",
    imagePosition: "md:right-10 md:bottom-10",
    textPosition: "md:left-16 md:bottom-14",
    giantPosition: "left-[-0.04em] top-0",
  },

  Seafood: {
    giantWord: "ATLANTIC",
    eyebrow: "Atlantic Passage",
    title: "From Atlantic waters.",
    story:
      "Cold water, clean cuts, butter, brine, and a slower kind of luxury.",
    notes: ["Cold water", "Butter", "Brine"],
    sideLabel: "Coastal precision",
    visual: "tide",
    imagePosition: "md:right-14 md:top-10",
    textPosition: "md:left-16 md:bottom-14",
    giantPosition: "left-[-0.08em] top-6",
  },

  Sides: {
    giantWord: "TABLE",
    eyebrow: "The Supporting Cast",
    title: "Designed to accompany.",
    story:
      "Texture, comfort, and balance. Every detail exists to complete the table.",
    notes: ["Shared plates", "Texture", "Balance"],
    sideLabel: "Built around the table",
    visual: "grid",
    imagePosition: "md:right-12 md:top-12",
    textPosition: "md:left-16 md:bottom-14",
    giantPosition: "left-[-0.04em] top-3",
  },

  Desserts: {
    giantWord: "AFTER",
    eyebrow: "Final Memory",
    title: "The final memory.",
    story:
      "Cream, bitter chocolate, burnt sugar, and the last quiet moment before leaving.",
    notes: ["Chocolate", "Cream", "Burnt sugar"],
    sideLabel: "After the flame",
    visual: "bloom",
    imagePosition: "md:right-14 md:top-10",
    textPosition: "md:left-16 md:bottom-14",
    giantPosition: "left-[-0.03em] top-4",
  },

  Cocktails: {
    giantWord: "NIGHT",
    eyebrow: "After Dark",
    title: "Poured after dark.",
    story:
      "Smoke, glass, citrus oil, low light, and one last gold reflection.",
    notes: ["Smoke", "Glass", "Gold"],
    sideLabel: "Last pour",
    visual: "prism",
    imagePosition: "md:right-10 md:bottom-10",
    textPosition: "md:left-16 md:bottom-14",
    giantPosition: "left-[-0.04em] top-2",
  },
};


const categoryPortalFX = {
  Starters: {
    colorA: "rgba(201,162,91,0.55)",
    colorB: "rgba(255,244,210,0.22)",
    spark: "rgba(246,211,139,0.95)",
    glow: "rgba(201,162,91,0.22)",
  },
  Steaks: {
    colorA: "rgba(255,92,38,0.62)",
    colorB: "rgba(201,162,91,0.28)",
    spark: "rgba(255,138,76,0.95)",
    glow: "rgba(255,92,38,0.24)",
  },
  Seafood: {
    colorA: "rgba(160,215,255,0.5)",
    colorB: "rgba(201,162,91,0.18)",
    spark: "rgba(190,230,255,0.95)",
    glow: "rgba(120,190,255,0.2)",
  },
  Sides: {
    colorA: "rgba(201,162,91,0.42)",
    colorB: "rgba(180,220,150,0.2)",
    spark: "rgba(226,212,158,0.95)",
    glow: "rgba(201,162,91,0.18)",
  },
  Desserts: {
    colorA: "rgba(255,210,170,0.5)",
    colorB: "rgba(255,180,220,0.2)",
    spark: "rgba(255,226,190,0.95)",
    glow: "rgba(255,210,170,0.22)",
  },
  Cocktails: {
    colorA: "rgba(201,162,91,0.58)",
    colorB: "rgba(170,120,255,0.22)",
    spark: "rgba(246,211,139,0.95)",
    glow: "rgba(170,120,255,0.2)",
  },
};


function CategoryHeroStage({
  category,
  stage,
  image,
}) {
  const stageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });

  const giantY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const giantX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.98, 1.04, 1]);
  const frameScale = useTransform(scrollYProgress, [0.12, 0.52], [0.15, 1]);

  const imageClasses = {
    Starters:
      "md:left-[48%] md:right-10 md:top-10 md:bottom-14 rounded-[2.2rem] rotate-[-1deg]",
    Steaks:
      "md:left-[46%] md:right-6 md:top-16 md:bottom-6 rounded-[2rem] rotate-[1deg]",
    Seafood:
      "md:left-[47%] md:right-8 md:top-10 md:bottom-12 rounded-tl-[5rem] rounded-br-[4rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem]",
    Sides:
      "md:left-[47%] md:right-10 md:top-14 md:bottom-10 rounded-[1.5rem] rotate-[-1deg]",
    Desserts:
      "md:left-[52%] md:right-12 md:top-10 md:bottom-12 rounded-full",
    Cocktails:
      "md:left-[48%] md:right-8 md:top-12 md:bottom-10 rounded-[2rem] rotate-[1deg]",
  };

  const atmosphere = {
    Starters:
      "radial-gradient(circle at 20% 35%, rgba(201,162,91,0.18), transparent 32%), radial-gradient(circle at 86% 82%, rgba(110,70,35,0.22), transparent 40%)",
    Steaks:
      "radial-gradient(circle at 72% 80%, rgba(255,92,38,0.28), transparent 34%), radial-gradient(circle at 30% 40%, rgba(201,162,91,0.13), transparent 36%)",
    Seafood:
      "radial-gradient(circle at 78% 42%, rgba(120,190,255,0.18), transparent 36%), radial-gradient(circle at 25% 80%, rgba(201,162,91,0.12), transparent 32%)",
    Sides:
      "radial-gradient(circle at 78% 72%, rgba(201,162,91,0.18), transparent 35%), linear-gradient(90deg, rgba(201,162,91,0.07), transparent 45%)",
    Desserts:
      "radial-gradient(circle at 72% 48%, rgba(255,210,170,0.2), transparent 34%), radial-gradient(circle at 38% 76%, rgba(201,162,91,0.12), transparent 38%)",
    Cocktails:
      "radial-gradient(circle at 76% 42%, rgba(170,120,255,0.2), transparent 34%), radial-gradient(circle at 78% 82%, rgba(201,162,91,0.15), transparent 36%)",
  };

  const visualLines = {
    curtain: ["left-[14%]", "left-[28%]", "left-[42%]", "left-[56%]", "left-[70%]"],
    fire: ["left-[18%]", "left-[34%]", "left-[50%]", "left-[66%]", "left-[82%]"],
    tide: ["top-[24%]", "top-[38%]", "top-[52%]", "top-[66%]", "top-[80%]"],
    grid: ["left-[18%]", "left-[34%]", "left-[50%]", "left-[66%]", "left-[82%]"],
    bloom: ["left-[40%]", "left-[50%]", "left-[60%]"],
    prism: ["left-[20%]", "left-[38%]", "left-[56%]", "left-[74%]"],
  };

  return (
    <motion.div
      ref={stageRef}
      data-course-hero
      initial={{ opacity: 0, y: 90, scale: 0.965 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.34 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative min-h-[720px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 p-6 shadow-[0_45px_120px_-65px_rgba(201,162,91,0.65)] md:min-h-[620px] md:p-12"
    >
      <div
        style={{ background: atmosphere[category] || atmosphere.Starters }}
        className="pointer-events-none absolute inset-0 z-0 opacity-90"
      />

      <motion.div
        style={{ y: giantY, x: giantX }}
        className={`pointer-events-none absolute ${stage.giantPosition} z-0 select-none font-serif text-[clamp(6rem,16vw,17rem)] leading-none tracking-[-0.09em] text-white/[0.095] mix-blend-screen`}
      >
        {stage.giantWord}
      </motion.div>

      <motion.div
        style={{ scaleX: frameScale }}
        className="absolute left-8 right-8 top-8 z-30 h-px origin-left bg-gradient-to-r from-transparent via-[#C9A25B]/80 to-transparent md:left-12 md:right-12"
      />

      <motion.div
        style={{ scaleY: frameScale }}
        className="absolute bottom-8 left-8 top-8 z-30 w-px origin-top bg-gradient-to-b from-transparent via-[#C9A25B]/60 to-transparent md:bottom-12 md:left-12 md:top-12"
      />

      <div className="absolute right-6 top-6 z-50 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white/55 backdrop-blur-xl md:right-10 md:top-10">
        {stage.sideLabel}
      </div>

      <div className="absolute left-7 top-10 z-50 hidden h-[calc(100%-5rem)] flex-col md:flex">
        <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.36em] text-white/40">
          Maison Noir / {category}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden md:block">
        {stage.visual === "tide" &&
          visualLines.tide.map((line, index) => (
            <motion.div
              key={`${category}-tide-${line}`}
              initial={{ x: index % 2 === 0 ? "-18%" : "18%", opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.1,
                delay: 0.22 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`absolute left-20 right-20 ${line} h-px bg-gradient-to-r from-transparent via-white/18 to-transparent`}
            />
          ))}

        {stage.visual !== "tide" &&
          (visualLines[stage.visual] || visualLines.curtain).map((line, index) => (
            <motion.div
              key={`${category}-line-${line}`}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.95,
                delay: 0.18 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`absolute top-16 bottom-16 ${line} w-px origin-top bg-gradient-to-b from-transparent via-[#C9A25B]/22 to-transparent`}
            />
          ))}
      </div>

      <div className="relative z-40 mb-8 overflow-hidden rounded-[1.5rem] border border-white/10 md:hidden">
        <img
          src={image.image}
          alt={image.title}
          onError={(event) => {
            event.currentTarget.src = "/images/MaisonNoir/menu/steaks/45-day-dry-aged-ribeye.webp";
          }}
          className="aspect-[16/11] w-full object-cover brightness-110 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      </div>

      <motion.div
        style={{ y: imageY, scale: imageScale }}
        initial={{ opacity: 0, x: 60, filter: "brightness(0.72) contrast(1.12)" }}
        whileInView={{ opacity: 1, x: 0, filter: "brightness(1) contrast(1.06)" }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 1.05,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`absolute z-30 hidden overflow-hidden border border-white/10 bg-black shadow-[0_38px_110px_-54px_rgba(201,162,91,0.72)] md:block ${imageClasses[category] || imageClasses.Starters}`}
      >
        <img
          src={image.image}
          alt={image.title}
          onError={(event) => {
            event.currentTarget.src = "/images/MaisonNoir/menu/steaks/45-day-dry-aged-ribeye.webp";
          }}
          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.055] ${
            category === "Desserts" ? "aspect-square" : ""
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        <motion.div
          initial={{ x: "-130%", opacity: 0 }}
          whileInView={{ x: "130%", opacity: [0, 0.75, 0] }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1.2,
            delay: 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-[#F6D38B]/25 to-transparent blur-sm"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.38 }}
        transition={{
          duration: 0.85,
          delay: 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-50 flex min-h-[390px] max-w-[42rem] flex-col justify-end md:min-h-[520px] md:w-[43%] md:pl-12 md:pr-8"
      >
        <p className="text-[10px] uppercase tracking-[0.36em] text-[#C9A25B]">
          {stage.eyebrow}
        </p>

        <h4 className="mt-5 font-serif text-4xl leading-[0.95] text-white md:text-6xl">
          {image.title}
        </h4>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/62">
          {stage.story}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {stage.notes.map((note, index) => (
            <motion.span
              key={`${category}-${note}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.38 }}
              transition={{
                duration: 0.5,
                delay: 0.42 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-full border border-white/10 bg-black/25 px-5 py-2 text-[10px] uppercase tracking-[0.22em] text-white/58 backdrop-blur-md"
            >
              {note}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}


function CategoryBar({ active, onSelect }) {
  const focusGlow = {
    Starters: "rgba(201,162,91,0.18)",
    Steaks: "rgba(255,92,38,0.2)",
    Seafood: "rgba(120,190,255,0.16)",
    Sides: "rgba(180,220,150,0.14)",
    Desserts: "rgba(255,180,220,0.14)",
    Cocktails: "rgba(170,120,255,0.16)",
  };

  return (
    <div className="relative overflow-hidden bg-[#050404]/95 backdrop-blur-2xl border-y border-white/10 shadow-[0_24px_70px_-40px_rgba(201,162,91,0.55)]">
      <motion.div
        aria-hidden="true"
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: `radial-gradient(circle at 50% 0%, ${focusGlow[active] || focusGlow.Starters}, transparent 58%)`,
        }}
        className="pointer-events-none absolute inset-0"
      />

      <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto no-scrollbar">
        <div className="relative z-10 flex gap-3 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`shrink-0 rounded-full px-5 py-3 text-sm transition-colors duration-200 ${active === category
                ? "bg-[#C9A25B] text-black"
                : "border border-white/10 text-white/60 hover:text-white hover:border-[#C9A25B]/50 hover:bg-white/[0.03]"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


function CategoryHeroFX({ category }) {
  if (category === "Starters") {
    return (
      <div className="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden md:block">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <motion.div
            key={`starter-curtain-${item}`}
            initial={{ y: "0%" }}
            whileInView={{ y: "-115%" }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{
              duration: 1.05,
              delay: 0.18 + item * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              left: `${item * 16.666}%`,
              width: "16.666%",
            }}
            className="absolute top-0 h-full bg-gradient-to-b from-black/90 via-[#130c07]/80 to-black/90"
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{
            duration: 0.9,
            delay: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-8 right-8 top-1/2 h-px origin-center bg-gradient-to-r from-transparent via-[#C9A25B]/80 to-transparent"
        />
      </div>
    );
  }

  if (category === "Steaks") {
    return (
      <div className="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden md:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{
            duration: 1.2,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background:
              "radial-gradient(circle at 50% 100%, rgba(201,82,36,0.5), transparent 52%)",
          }}
          className="absolute inset-x-0 bottom-0 h-2/3 mix-blend-screen"
        />

        {[14, 23, 31, 46, 58, 69, 78, 88].map((left, index) => (
          <motion.span
            key={`steak-ember-${left}`}
            initial={{ opacity: 0, y: 34, scale: 0.6 }}
            whileInView={{
              opacity: [0, 0.9, 0],
              y: [-8, -42, -78],
              scale: [0.7, 1.2, 0.65],
            }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{
              duration: 1.8 + index * 0.12,
              delay: 0.35 + index * 0.08,
              ease: "easeOut",
            }}
            style={{
              left: `${left}%`,
              bottom: `${12 + (index % 3) * 8}%`,
            }}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#F6D38B] shadow-[0_0_22px_rgba(246,211,139,0.95)]"
          />
        ))}
      </div>
    );
  }

  if (category === "Seafood") {
    return (
      <div className="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden md:block">
        {[18, 31, 44, 57, 70].map((top, index) => (
          <motion.div
            key={`sea-wave-${top}`}
            initial={{ x: index % 2 === 0 ? "-18%" : "18%", opacity: 0 }}
            whileInView={{ x: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{
              duration: 1.15,
              delay: 0.22 + index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ top: `${top}%` }}
            className="absolute left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
          />
        ))}

        <motion.div
          initial={{ opacity: 0, x: "35%" }}
          whileInView={{ opacity: 1, x: "-8%" }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{
            duration: 1.6,
            delay: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background:
              "linear-gradient(115deg, transparent, rgba(180,220,255,0.24), transparent)",
          }}
          className="absolute inset-y-0 right-0 w-1/2 blur-md"
        />
      </div>
    );
  }

  if (category === "Sides") {
    return (
      <div className="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden md:block">
        {[18, 34, 50, 66, 82].map((left, index) => (
          <motion.div
            key={`sides-vertical-${left}`}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{
              duration: 0.9,
              delay: 0.18 + index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ left: `${left}%` }}
            className="absolute top-8 bottom-8 w-px origin-top bg-gradient-to-b from-transparent via-[#C9A25B]/35 to-transparent"
          />
        ))}

        {[26, 50, 74].map((top, index) => (
          <motion.div
            key={`sides-horizontal-${top}`}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{
              duration: 0.9,
              delay: 0.28 + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ top: `${top}%` }}
            className="absolute left-8 right-8 h-px origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        ))}
      </div>
    );
  }

  if (category === "Desserts") {
    return (
      <div className="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden md:block">
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={`dessert-ring-${ring}`}
            initial={{ opacity: 0, scale: 0.45 }}
            whileInView={{ opacity: [0, 0.55, 0], scale: [0.45, 1.15, 1.55] }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{
              duration: 1.8,
              delay: 0.28 + ring * 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F6D38B]/35"
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{
            duration: 1.2,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(246,211,139,0.28), transparent 42%)",
          }}
          className="absolute inset-0 mix-blend-screen"
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden md:block">
      {[12, 27, 44, 62, 79].map((left, index) => (
        <motion.div
          key={`cocktail-prism-${left}`}
          initial={{ opacity: 0, y: 60, rotate: -18 }}
          whileInView={{ opacity: [0, 0.75, 0], y: -70, rotate: 18 }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{
            duration: 1.45,
            delay: 0.22 + index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ left: `${left}%` }}
          className="absolute bottom-0 h-40 w-px bg-gradient-to-t from-transparent via-[#F6D38B]/70 to-transparent blur-[1px]"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, x: "-45%" }}
        whileInView={{ opacity: 1, x: "18%" }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{
          duration: 1.55,
          delay: 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          background:
            "linear-gradient(110deg, transparent, rgba(255,255,255,0.28), rgba(201,162,91,0.18), transparent)",
        }}
        className="absolute inset-y-0 left-0 w-1/2 rotate-12 blur-sm"
      />
    </div>
  );
}


function CategoryHeroPortalFX({ category }) {
  const portal = categoryPortalFX[category] || categoryPortalFX.Starters;

  const particles = [
    { left: 12, top: 22, x: 90, y: -55 },
    { left: 22, top: 68, x: -70, y: -95 },
    { left: 34, top: 34, x: 110, y: 65 },
    { left: 46, top: 76, x: -95, y: -55 },
    { left: 58, top: 26, x: 80, y: 90 },
    { left: 68, top: 62, x: -120, y: -70 },
    { left: 78, top: 38, x: 95, y: -100 },
    { left: 88, top: 72, x: -80, y: 70 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[35] hidden overflow-hidden md:block">
      <motion.div
        initial={{ opacity: 0, scale: 0.72 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{
          duration: 1.1,
          delay: 0.16,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: `conic-gradient(from 0deg, transparent, ${portal.colorA}, transparent, ${portal.colorB}, transparent, ${portal.colorA}, transparent)`,
            WebkitMaskImage:
              "radial-gradient(circle, transparent 42%, black 44%, black 48%, transparent 51%)",
            maskImage:
              "radial-gradient(circle, transparent 42%, black 44%, black 48%, transparent 51%)",
          }}
          className="h-full w-full rounded-full opacity-70 blur-[1px]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.45 }}
        whileInView={{ opacity: [0, 0.9, 0.25], scale: [0.45, 1.08, 1] }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{
          duration: 1.4,
          delay: 0.26,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${portal.glow}, transparent 46%)`,
        }}
        className="absolute inset-0 mix-blend-screen"
      />

      {[0, 1, 2, 3, 4, 5, 6].map((slice) => (
        <motion.div
          key={`portal-slice-${category}-${slice}`}
          initial={{
            opacity: 0.95,
            y: 0,
            rotate: 0,
          }}
          whileInView={{
            opacity: 0,
            y: slice % 2 === 0 ? "-115%" : "115%",
            rotate: slice % 2 === 0 ? -7 : 7,
          }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{
            duration: 1.05,
            delay: 0.12 + slice * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            left: `${slice * 14.285}%`,
            width: "14.285%",
            background: `linear-gradient(180deg, rgba(0,0,0,0.96), ${portal.glow}, rgba(0,0,0,0.96))`,
          }}
          className="absolute inset-y-0 z-[42]"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: [0, 1, 0.35], scaleX: 1 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{
          duration: 0.95,
          delay: 0.72,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          background: `linear-gradient(90deg, transparent, ${portal.spark}, transparent)`,
        }}
        className="absolute left-10 right-10 top-1/2 z-[45] h-px origin-center shadow-[0_0_30px_rgba(246,211,139,0.9)]"
      />

      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: [0, 0.9, 0.25], scaleY: 1 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{
          duration: 0.95,
          delay: 0.78,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          background: `linear-gradient(180deg, transparent, ${portal.spark}, transparent)`,
        }}
        className="absolute bottom-10 top-10 left-1/2 z-[45] w-px origin-center shadow-[0_0_30px_rgba(246,211,139,0.9)]"
      />

      {particles.map((particle, index) => (
        <motion.span
          key={`portal-particle-${category}-${index}`}
          initial={{
            opacity: 0,
            scale: 0.3,
            x: 0,
            y: 0,
          }}
          whileInView={{
            opacity: [0, 1, 0],
            scale: [0.3, 1.4, 0.4],
            x: particle.x,
            y: particle.y,
          }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{
            duration: 1.7 + index * 0.08,
            delay: 0.48 + index * 0.075,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: portal.spark,
            boxShadow: `0 0 22px ${portal.spark}`,
          }}
          className="absolute z-[46] h-1.5 w-1.5 rounded-full"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, rotate: -18, scale: 0.75 }}
        whileInView={{ opacity: [0, 0.55, 0], rotate: 18, scale: 1.25 }}
        viewport={{ once: true, amount: 0.42 }}
        transition={{
          duration: 1.65,
          delay: 0.58,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          borderColor: portal.colorA,
        }}
        className="absolute left-1/2 top-1/2 z-[44] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border"
      />
    </div>
  );
}

export default function FullMenu({ onAddToCart = () => {} }) {
  const [active, setActive] = useState("Starters");

  const [selectedByCategory, setSelectedByCategory] = useState(() => ({
    Starters: menuItems.Starters[0],
    Steaks: menuItems.Steaks[0],
    Seafood: menuItems.Seafood[0],
    Sides: menuItems.Sides[0],
    Desserts: menuItems.Desserts[0],
    Cocktails: menuItems.Cocktails[0],
  }));

  const [mounted, setMounted] = useState(false);
  const [dishPreview, setDishPreview] = useState({
    visible: false,
    x: 0,
    y: 0,
    category: null,
    item: null,
  });
  const [dishBurst, setDishBurst] = useState(null);


  const fullMenuRef = useRef(null);
  const heroVideoRef = useRef(null);
  const dishPreviewRafRef = useRef(null);
  const menuGridRefs = useRef({});
  const menuCardRefs = useRef({});
  const menuCardRafRef = useRef(null);
  const pendingDishPreviewRef = useRef(null);
  const sectionRefs = useRef({});

  const scrollToCategory = (category) => {
    setActive(category);

    const el = sectionRefs.current[category];
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 92;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };


  const handleDishPreviewMove = (category, item, event) => {
    if (window.innerWidth < 1024) return;

    const previewWidth = 280;
    const previewHeight = 245;
    const offset = 28;

    let x = event.clientX + offset;
    let y = event.clientY - 34;

    if (x > window.innerWidth - previewWidth - 18) {
      x = event.clientX - previewWidth - offset;
    }

    if (y > window.innerHeight - previewHeight - 18) {
      y = window.innerHeight - previewHeight - 18;
    }

    if (y < 18) {
      y = 18;
    }

    pendingDishPreviewRef.current = {
      visible: true,
      x,
      y,
      category,
      item,
    };

    if (dishPreviewRafRef.current) return;

    dishPreviewRafRef.current = window.requestAnimationFrame(() => {
      dishPreviewRafRef.current = null;

      const nextPreview = pendingDishPreviewRef.current;
      if (!nextPreview) return;

      setDishPreview((prev) => {
        const isSameItem =
          prev.category === nextPreview.category &&
          prev.item?.[0] === nextPreview.item?.[0];
        const isSamePosition =
          Math.abs(prev.x - nextPreview.x) < 0.5 &&
          Math.abs(prev.y - nextPreview.y) < 0.5;

        return prev.visible && isSameItem && isSamePosition ? prev : nextPreview;
      });
    });
  };

  const hideDishPreview = () => {
    pendingDishPreviewRef.current = null;

    if (dishPreviewRafRef.current) {
      window.cancelAnimationFrame(dishPreviewRafRef.current);
      dishPreviewRafRef.current = null;
    }

    setDishPreview((prev) => (prev.visible ? { ...prev, visible: false } : prev));
  };



  const handleDishSelect = (category, item, event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setActive(category);
    setSelectedByCategory((prev) => ({
      ...prev,
      [category]: item,
    }));

    setDishPreview((prev) => ({
      ...prev,
      visible: false,
    }));

    setDishBurst({
      id: `${category}-${item[0]}-${Date.now()}`,
      category,
      item,
      x: rect.left + rect.width * 0.72,
      y: rect.top + rect.height * 0.5,
    });

    window.setTimeout(() => {
      setDishBurst(null);
    }, 950);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play?.().catch(() => {});
          return;
        }

        video.pause?.();
      },
      {
        threshold: 0.08,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause?.();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (dishPreviewRafRef.current) {
        window.cancelAnimationFrame(dishPreviewRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const resetMenuCards = () => {
      categories.forEach((category) => {
        const card = menuCardRefs.current[category];
        if (!card) return;

        card.style.transform = "translate3d(0, 0, 0)";
        card.style.willChange = "auto";
      });
    };

    const updateMenuCards = () => {
      menuCardRafRef.current = null;

      if (window.innerWidth < 1024) {
        resetMenuCards();
        return;
      }

      categories.forEach((category) => {
        const grid = menuGridRefs.current[category];
        const card = menuCardRefs.current[category];
        if (!grid || !card) return;

        const gridRect = grid.getBoundingClientRect();
        const cardHeight = card.offsetHeight;
        const maxOffset = Math.max(grid.offsetHeight - cardHeight, 0);
        const rawOffset = 96 - gridRect.top;
        const cardOffset = Math.min(Math.max(rawOffset, 0), maxOffset);

        card.style.transform = `translate3d(0, ${cardOffset}px, 0)`;
        card.style.willChange = cardOffset > 0 && cardOffset < maxOffset ? "transform" : "auto";
      });
    };

    const scheduleMenuCardUpdate = () => {
      if (menuCardRafRef.current) return;
      menuCardRafRef.current = window.requestAnimationFrame(updateMenuCards);
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(scheduleMenuCardUpdate)
        : null;

    categories.forEach((category) => {
      const grid = menuGridRefs.current[category];
      const card = menuCardRefs.current[category];

      if (grid) resizeObserver?.observe(grid);
      if (card) resizeObserver?.observe(card);
    });

    scheduleMenuCardUpdate();

    window.addEventListener("scroll", scheduleMenuCardUpdate, { passive: true });
    window.addEventListener("resize", scheduleMenuCardUpdate);

    return () => {
      if (menuCardRafRef.current) {
        window.cancelAnimationFrame(menuCardRafRef.current);
        menuCardRafRef.current = null;
      }

      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleMenuCardUpdate);
      window.removeEventListener("resize", scheduleMenuCardUpdate);
      resetMenuCards();
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
          ?.target?.dataset?.category;

        if (current) {
          setActive((previous) => (previous === current ? previous : current));
        }
      },
      {
        rootMargin: "-22% 0px -62% 0px",
        threshold: [0, 0.18, 0.32],
      }
    );

    categories.forEach((category) => {
      const el = sectionRefs.current[category];
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const dishPreviewPortal =
    mounted
      ? createPortal(
        <AnimatePresence>
          {dishPreview.visible && dishPreview.item ? (
            <motion.div
              key={`${dishPreview.category}-${dishPreview.item[0]}`}
              initial={{
                opacity: 0,
                scale: 0.88,
                rotateX: 8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                x: dishPreview.x,
                y: dishPreview.y,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                rotateX: -6,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.7,
              }}
              className="pointer-events-none fixed left-0 top-0 z-[100000] hidden w-[280px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/75 shadow-[0_35px_100px_-45px_rgba(201,162,91,0.75)] backdrop-blur-2xl lg:block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={dishPreview.item[3]}
                  alt={dishPreview.item[0]}
                  className="h-40 w-full object-cover brightness-110 contrast-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <motion.div
                  initial={{ x: "-130%", opacity: 0 }}
                  animate={{ x: "130%", opacity: [0, 0.75, 0] }}
                  transition={{
                    duration: 1.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-[#F6D38B]/30 to-transparent blur-sm"
                />

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[9px] uppercase tracking-[0.28em] text-[#C9A25B]">
                    {dishPreview.category}
                  </p>

                  <div className="mt-1 flex items-end justify-between gap-4">
                    <h4 className="font-serif text-xl leading-tight text-white">
                      {dishPreview.item[0]}
                    </h4>

                    <span className="font-serif text-2xl text-[#C9A25B]">
                      {dishPreview.item[1]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative p-4">
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A25B]/60 to-transparent" />

                <p className="text-sm leading-relaxed text-white/60">
                  {dishPreview.item[2]}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full border border-[#C9A25B]/25 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#C9A25B]/80">
                    Preview
                  </span>

                  <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                    Move to explore
                  </span>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body
      )
      : null;

  return (
    <section
      id="full-menu"
      ref={fullMenuRef}
      className="relative bg-[#050404] px-6 py-24 md:py-36 overflow-visible border-t border-white/10"
    >
      {dishPreviewPortal}

      <SectionGlow />

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-[54rem] overflow-hidden border-b border-white/10">
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-75 saturate-[1.08] contrast-[1.08] brightness-[1.18]"
          src="/images/MaisonNoir/videos/hero/chef-grilling-steak.mp4"
          poster="/images/MaisonNoir/branding/hero.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(201,162,91,0.18),transparent_34%),radial-gradient(circle_at_84%_62%,rgba(255,115,42,0.14),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050404]/88 via-[#050404]/38 to-[#050404]/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050404]/42 via-transparent to-[#050404]/92" />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.78)]" />

        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          whileInView={{ x: "120%", opacity: [0, 0.82, 0] }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 2.8, delay: 0.35, ease: "easeInOut" }}
          className="absolute left-[-30%] top-[46%] h-72 w-[160%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[#F6D38B]/12 to-transparent blur-xl"
        />

        <div className="absolute right-10 top-32 hidden rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[9px] uppercase tracking-[0.34em] text-white/38 backdrop-blur-xl lg:block">
          Chef in motion / fire table
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex min-h-[34rem] flex-col justify-end gap-10 pb-16 pt-28 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="The Full Menu"
            title={
              <>
                A complete evening,
                <br />
                course by course.
              </>
            }
            description="Browse the full Maison Noir menu — refined, seasonal, and built around fire, patience, and restraint."
          />

          <LuxuryButton href="#reserve" variant="ghost">
            Reserve After Viewing
          </LuxuryButton>
        </div>
      </div>

      <div className="sticky top-0 z-[99999] -mx-6 border-t border-white/10 bg-[#050404]/70 backdrop-blur-xl">
        <CategoryBar active={active} onSelect={scrollToCategory} />
      </div>

      <div className="relative max-w-7xl mx-auto pt-14">
        <div className="space-y-24">
          {categories.map((category) => {
            const selected = selectedByCategory[category] || menuItems[category][0];

            const selectedImage =
              selected?.[3] ||
              featuredImages[category]?.image ||
              "/images/MaisonNoir/menu/steaks/45-day-dry-aged-ribeye.webp";
            const selectedName = selected?.[0] || featuredImages[category].title;
            const selectedPrice = selected?.[1] || "";
            const selectedDesc = selected?.[2] || featuredImages[category].subtitle;
            const heroStage = categoryHeroStage[category] || categoryHeroStage.Starters;
            return (
              <section
                key={category}
                id={getCategoryId(category)}
                ref={(el) => {
                  sectionRefs.current[category] = el;
                }}
                data-category={category}
                className="relative overflow-visible scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-10"
              >
                <div>
                  <div className="mb-10">
                    <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-4">
                      {category}
                    </p>

                    <h3 className="font-serif text-5xl md:text-6xl mb-8">
                      {categoryHeadlines[category]}
                    </h3>

                    <CategoryHeroStage
                      category={category}
                      stage={heroStage}
                      image={featuredImages[category]}
                    />
                  </div>

                  <div
                    ref={(el) => {
                      menuGridRefs.current[category] = el;
                    }}
                    className="grid lg:grid-cols-12 gap-12 items-start"
                  >
                    <div className="lg:col-span-7 divide-y divide-white/10">
                      {menuItems[category].map((item) => {
                        const [name, price, desc] = item;
                        const isSelected = selected?.[0] === name;

                        return (
                          <div
                            key={name}
                            onMouseEnter={(event) => handleDishPreviewMove(category, item, event)}
                            onMouseMove={(event) => handleDishPreviewMove(category, item, event)}
                            onMouseLeave={hideDishPreview}
                            className={`relative w-full py-6 group overflow-hidden transition-all duration-300 ease-out ${isSelected
                              ? "rounded-2xl bg-white/[0.04] px-5 border border-[#C9A25B]/35 shadow-[0_20px_70px_-55px_rgba(201,162,91,0.65)]"
                              : "border-b border-white/10 hover:px-4 hover:bg-white/[0.018]"
                              }`}
                          >
                            <span
                              className={`absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-[#C9A25B] to-transparent transition-transform duration-300 ease-out ${isSelected ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100"
                                }`}
                            />

                            <button
                              type="button"
                              onClick={() => {
                                setActive(category);
                                setSelectedByCategory((prev) => ({
                                  ...prev,
                                  [category]: item,
                                }));
                              }}
                              className="relative w-full text-left grid sm:grid-cols-[1fr_auto] gap-4"
                            >
                              <div>
                                <h4
                                  className={`font-serif text-2xl md:text-3xl transition-all duration-300 ease-out ${isSelected
                                    ? "translate-x-1 text-[#C9A25B]"
                                    : "text-white group-hover:translate-x-1 group-hover:text-[#C9A25B]"
                                    }`}
                                >
                                  {name}
                                </h4>

                                <p className="mt-2 text-white/45 leading-relaxed max-w-2xl transition-all duration-300 ease-out group-hover:text-white/65">
                                  {desc}
                                </p>
                              </div>

                              <div
                                className={`font-serif text-2xl transition-all duration-300 ease-out ${isSelected
                                  ? "text-[#C9A25B]"
                                  : "text-[#C9A25B]/75 group-hover:text-[#C9A25B] group-hover:translate-x-[-2px]"
                                  }`}
                              >
                                {price}
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => onAddToCart({ category, item })}
                              className="relative mt-4 rounded-full border border-[#C9A25B]/25 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#C9A25B]/82 transition hover:border-[#C9A25B]/60 hover:bg-[#C9A25B] hover:text-black"
                            >
                              Add to order
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="hidden lg:block lg:col-span-5 lg:self-stretch relative">
                      <div
                        ref={(el) => {
                          menuCardRefs.current[category] = el;
                        }}
                        className="rounded-[2rem] overflow-hidden border border-white/10 bg-black backdrop-blur-xl shadow-[0_50px_120px_-55px_rgba(201,162,91,0.45)]"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${category}-${selectedName}-image`}
                            initial={{ opacity: 0, scale: 1.035 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.985 }}
                            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                          >
                            <img
                              src={selectedImage}
                              alt={selectedName}
                              onError={(e) => {
                                e.currentTarget.src = featuredImages[category].image;
                              }}
                              className="w-full aspect-[16/10] object-cover brightness-110 contrast-105"
                            />

                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                          </motion.div>
                        </AnimatePresence>

                        <motion.div
                          key={`${category}-${selectedName}-divider`}
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{
                            duration: 0.55,
                            delay: 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-px w-full origin-left bg-gradient-to-r from-transparent via-[#C9A25B]/70 to-transparent"
                        />

                        <motion.div
                          key={`${category}-${selectedName}-content`}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                          className="p-6"
                        >
                          <div className="flex items-start justify-between gap-5">
                            <motion.div
                              key={`${category}-${selectedName}-title`}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.48,
                                delay: 0.12,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <motion.p
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.36,
                                  delay: 0.14,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="uppercase tracking-[0.35em] text-[11px] text-[#C9A25B] mb-2"
                              >
                                {category}
                              </motion.p>

                              <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.46,
                                  delay: 0.18,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="font-serif text-3xl leading-tight"
                              >
                                {selectedName}
                              </motion.h3>
                            </motion.div>

                            <motion.div
                              key={`${category}-${selectedName}-price`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.42, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                              className="font-serif text-4xl text-[#C9A25B]"
                            >
                              {selectedPrice}
                            </motion.div>
                          </div>

                          <motion.p
                            key={`${category}-${selectedName}-desc`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.44, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-4 text-white/60 leading-relaxed text-base"
                          >
                            {selectedDesc}
                          </motion.p>

                          <motion.div
                            className="mt-6 flex flex-wrap gap-3"
                            initial="hidden"
                            animate="show"
                            variants={{
                              hidden: {},
                              show: {
                                transition: {
                                  staggerChildren: 0.08,
                                  delayChildren: 0.30,
                                },
                              },
                            }}
                          >
                            {[
                              {
                                text: "House Signature",
                                className:
                                  "rounded-full border border-[#C9A25B]/25 px-4 py-2 text-sm text-[#C9A25B]",
                              },
                              {
                                text: "Open Flame",
                                className:
                                  "rounded-full border border-white/10 px-4 py-2 text-sm text-white/60",
                              },
                              {
                                text: "Chef Recommended",
                                className:
                                  "rounded-full border border-white/10 px-4 py-2 text-sm text-white/60",
                              },
                            ].map((badge) => (
                              <motion.span
                                key={badge.text}
                                variants={{
                                  hidden: {
                                    opacity: 0,
                                    y: 8,
                                  },
                                  show: {
                                    opacity: 1,
                                    y: 0,
                                  },
                                }}
                                transition={{
                                  duration: 0.35,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className={badge.className}
                              >
                                {badge.text}
                              </motion.span>
                            ))}
                          </motion.div>

                          <motion.button
                            type="button"
                            key={`${category}-${selectedName}-button`}
                            onClick={() => onAddToCart({ category, item: selected })}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                              scale: 1.025,
                              boxShadow: "0 18px 55px -22px rgba(201, 162, 91, 0.85)",
                            }}
                            whileTap={{ scale: 0.985 }}
                            transition={{
                              duration: 0.42,
                              delay: 0.42,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="mt-6 w-full rounded-full bg-[#C9A25B] py-3 text-base font-medium text-black transition-colors hover:bg-[#d6b36d]"
                          >
                            Add to order
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
