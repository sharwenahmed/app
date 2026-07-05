import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const featuredImages = {
  Starters: {
    image: "/images/MaisonNoir/starters.webp",
    title: "Bone Marrow Toast",
    subtitle: "Roasted marrow, grilled sourdough, parsley salad.",
  },
  Steaks: {
    image: "/images/MaisonNoir/ribeye.webp",
    title: "45-Day Dry-Aged Ribeye",
    subtitle: "Prime ribeye aged in-house, smoked marrow butter.",
  },
  Seafood: {
    image: "/images/MaisonNoir/seafood.webp",
    title: "Butter Poached Atlantic Lobster",
    subtitle: "Atlantic lobster with saffron butter.",
  },
  Sides: {
    image: "/images/MaisonNoir/sides.webp",
    title: "Black Truffle Fries",
    subtitle: "Parmesan, herbs and truffle.",
  },
  Desserts: {
    image: "/images/MaisonNoir/dessert.webp",
    title: "Dark Chocolate Torte",
    subtitle: "Chocolate ganache, espresso cream.",
  },
  Cocktails: {
    image: "/images/MaisonNoir/cocktail.webp",
    title: "The Noir Old Fashioned",
    subtitle: "Bourbon, cacao bitters, orange oil.",
  },
};

const menuItems = {
  Starters: [
    ["Bone Marrow Toast", "$24", "Roasted marrow, grilled sourdough, parsley salad."],
    ["Truffle Steak Tartare", "$28", "Hand-cut prime beef, cured yolk, black truffle."],
    ["Oysters Noir", "$32", "Six oysters, champagne mignonette, lemon oil."],
    ["Charred Spanish Octopus", "$29", "Potato espuma, smoked paprika, herb oil."],
    ["Burrata & Heirloom Tomatoes", "$22", "Burrata, roasted tomatoes, basil oil."],
    ["Foie Gras Torchon", "$34", "Brioche, fig jam, aged balsamic."],
    ["Caviar Potato Crisp", "$38", "Yukon crisp, crème fraîche, Ossetra caviar."],
    ["Smoked Caesar Salad", "$18", "Romaine hearts, parmesan snow, anchovy dressing."],
  ],
  Steaks: [
    ["45-Day Dry-Aged Ribeye", "$68", "16 oz ribeye, smoked marrow butter, sea salt."],
    ["Black Truffle Filet Mignon", "$74", "8 oz filet, pommes purée, truffle jus."],
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
    ["Pommes Purée", "$14", "Cultured butter, chives."],
    ["Black Truffle Fries", "$17", "Parmesan, herbs, black truffle aioli."],
    ["Mac & Gruyère", "$18", "Gruyère, aged cheddar, black pepper crumb."],
    ["Creamed Spinach", "$15", "Garlic cream, nutmeg."],
    ["Charred Broccolini", "$16", "Lemon oil, chili crisp, toasted almond."],
    ["Roasted Wild Mushrooms", "$17", "Thyme, garlic butter."],
    ["Maple Bacon Brussels Sprouts", "$16", "Cider glaze, toasted seeds."],
    ["Charred Asparagus", "$18", "Hollandaise, smoked salt."],
  ],
  Desserts: [
    ["Dark Chocolate Torte", "$18", "Chocolate ganache, espresso cream, salted crumble."],
    ["Vanilla Bean Crème Brûlée", "$16", "Burnt sugar, citrus, almond tuile."],
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

const categoryHeadlines = {
  Starters: "Begin quietly.",
  Steaks: "The fire speaks here.",
  Seafood: "From Atlantic waters.",
  Sides: "Designed to accompany.",
  Desserts: "The final memory.",
  Cocktails: "Poured after dark.",
};

export default function FullMenu() {
  const [active, setActive] = useState("Starters");
  const sectionRefs = useRef({});

  const scrollToCategory = (category) => {
    setActive(category);
    sectionRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.dataset?.category) {
          setActive(visible.target.dataset.category);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0.05,
      }
    );

    categories.forEach((category) => {
      const el = sectionRefs.current[category];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const featured = featuredImages[active];

  return (
    <section
      id="full-menu"
      className="relative bg-[#050404] px-6 py-24 md:py-36 overflow-visible border-t border-white/10"
    >
      <SectionGlow />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14">
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

      <div className="sticky top-0 z-50 -mx-6 bg-[#050404]/90 backdrop-blur-2xl border-y border-white/10 shadow-[0_24px_70px_-40px_rgba(201,162,91,0.55)]">
        <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`shrink-0 rounded-full px-5 py-3 text-sm transition-all duration-300 ${
                  active === category
                    ? "bg-[#C9A25B] text-black shadow-[0_18px_45px_-20px_rgba(201,162,91,0.9)]"
                    : "border border-white/10 text-white/60 hover:text-white hover:border-[#C9A25B]/50 hover:bg-white/[0.03]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto pt-14">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-20">
            {categories.map((category) => (
              <section
                key={category}
                ref={(el) => {
                  sectionRefs.current[category] = el;
                }}
                data-category={category}
                className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-10"
              >
                <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-4">
                  {category}
                </p>

                <h3 className="font-serif text-5xl md:text-6xl mb-10">
                  {categoryHeadlines[category]}
                </h3>

                <div className="lg:hidden mb-10 rounded-[1.5rem] overflow-hidden border border-white/10">
                  <img
                    src={featuredImages[category].image}
                    alt={featuredImages[category].title}
                    onError={(e) => {
                      e.currentTarget.src = "/images/MaisonNoir/ribeye.webp";
                    }}
                    className="w-full aspect-[4/5] object-cover opacity-90"
                  />
                </div>

                <div className="divide-y divide-white/10">
                  {menuItems[category].map(([name, price, desc]) => (
                    <div
                      key={name}
                      className="grid sm:grid-cols-[1fr_auto] gap-4 py-6 group"
                    >
                      <div>
                        <h4 className="font-serif text-2xl md:text-3xl group-hover:text-[#C9A25B] transition">
                          {name}
                        </h4>

                        <p className="mt-2 text-white/50 leading-relaxed max-w-2xl">
                          {desc}
                        </p>
                      </div>

                      <div className="font-serif text-2xl text-[#C9A25B]">
                        {price}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28 rounded-[2rem] overflow-hidden border border-white/10 bg-black/35 backdrop-blur-xl shadow-[0_40px_110px_-60px_rgba(201,162,91,0.55)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={featured.image}
                  src={featured.image}
                  alt={featured.title}
                  onError={(e) => {
                    e.currentTarget.src = "/images/MaisonNoir/ribeye.webp";
                  }}
                  initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                  transition={{ duration: 0.45 }}
                  className="w-full aspect-[4/5] object-cover"
                />
              </AnimatePresence>

              <div className="p-8">
                <p className="uppercase tracking-[0.35em] text-xs text-[#C9A25B] mb-3">
                  {active}
                </p>

                <h3 className="font-serif text-4xl mb-4">
                  {featured.title}
                </h3>

                <p className="text-white/60 leading-relaxed">
                  {featured.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}