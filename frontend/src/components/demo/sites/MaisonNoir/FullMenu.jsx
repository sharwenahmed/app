import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    image: "/images/MaisonNoir/starters/bone-marrow-toast.webp",
    title: "Bone Marrow Toast",
    subtitle: "Roasted marrow, grilled sourdough, parsley salad.",
  },
  Steaks: {
    image: "/images/MaisonNoir/steaks/45-day-dry-aged-ribeye.webp",
    title: "45-Day Dry-Aged Ribeye",
    subtitle: "Prime ribeye aged in-house, smoked marrow butter.",
  },
  Seafood: {
    image: "/images/MaisonNoir/seafood/butter-poached-atlantic-lobster.webp",
    title: "Butter Poached Atlantic Lobster",
    subtitle: "Atlantic lobster with saffron butter.",
  },
  Sides: {
    image: "/images/MaisonNoir/sides/black-truffle-fries.webp",
    title: "Black Truffle Fries",
    subtitle: "Parmesan, herbs and truffle.",
  },
  Desserts: {
    image: "/images/MaisonNoir/desserts/dark-chocolate-torte.webp",
    title: "Dark Chocolate Torte",
    subtitle: "Chocolate ganache, espresso cream.",
  },
  Cocktails: {
    image: "/images/MaisonNoir/cocktails/the-noir-old-fashioned.webp",
    title: "The Noir Old Fashioned",
    subtitle: "Bourbon, cacao bitters, orange oil.",
  },
};

const menuItems = {
  Starters: [
    ["Bone Marrow Toast", "$24", "Roasted marrow, grilled sourdough, parsley salad.", "/images/MaisonNoir/starters/bone-marrow-toast.webp"],
    ["Truffle Steak Tartare", "$28", "Hand-cut prime beef, cured yolk, black truffle.", "/images/MaisonNoir/starters/truffle-steak-tartare.webp"],
    ["Oysters Noir", "$32", "Six oysters, champagne mignonette, lemon oil.", "/images/MaisonNoir/starters/oysters-noir.webp"],
    ["Charred Spanish Octopus", "$29", "Potato espuma, smoked paprika, herb oil.", "/images/MaisonNoir/starters/charred-spanish-octopus.webp"],
    ["Burrata & Heirloom Tomatoes", "$22", "Burrata, roasted tomatoes, basil oil.", "/images/MaisonNoir/starters/burrata-heirloom-tomatoes.webp"],
    ["Foie Gras Torchon", "$34", "Brioche, fig jam, aged balsamic.", "/images/MaisonNoir/starters/foie-gras-torchon.webp"],
    ["Caviar Potato Crisp", "$38", "Yukon crisp, crème fraîche, Ossetra caviar.", "/images/MaisonNoir/starters/caviar-potato-crisp.webp"],
    ["Smoked Caesar Salad", "$18", "Romaine hearts, parmesan snow, anchovy dressing.", "/images/MaisonNoir/starters/smoked-caesar-salad.webp"],
  ],
  Steaks: [
    ["45-Day Dry-Aged Ribeye", "$68", "16 oz ribeye, smoked marrow butter, sea salt.", "/images/MaisonNoir/steaks/45-day-dry-aged-ribeye.webp"],
    ["Black Truffle Filet Mignon", "$74", "8 oz filet, pommes purée, truffle jus.", "/images/MaisonNoir/steaks/black-truffle-filet-mignon.webp"],
    ["A5 Japanese Wagyu", "$128", "4 oz wagyu, binchotan charcoal, smoked salt.", "/images/MaisonNoir/steaks/a5-japanese-wagyu.webp"],
    ["Tomahawk for Two", "$145", "32 oz dry-aged tomahawk, roasted garlic, house sauce.", "/images/MaisonNoir/steaks/tomahawk-for-two.webp"],
    ["Prime New York Strip", "$62", "14 oz striploin, peppercorn jus, charred rosemary.", "/images/MaisonNoir/steaks/prime-new-york-strip.webp"],
  ],
  Seafood: [
    ["Butter Poached Atlantic Lobster", "$58", "Saffron butter, preserved lemon.", "/images/MaisonNoir/seafood/butter-poached-atlantic-lobster.webp"],
    ["Seared Nova Scotia Scallops", "$42", "Brown butter, cauliflower silk.", "/images/MaisonNoir/seafood/seared-nova-scotia-scallops.webp"],
    ["Miso Black Cod", "$46", "Miso glaze, sesame, charred scallion.", "/images/MaisonNoir/seafood/miso-black-cod.webp"],
    ["King Crab Legs", "$72", "Drawn butter, lemon, sea salt.", "/images/MaisonNoir/seafood/king-crab-legs.webp"],
    ["Bluefin Tuna Crudo", "$27", "Citrus, chili oil, crispy shallot.", "/images/MaisonNoir/seafood/bluefin-tuna-crudo.webp"],
    ["Jumbo Garlic Prawns", "$36", "Garlic butter, smoked chili, parsley.", "/images/MaisonNoir/seafood/jumbo-garlic-prawns.webp"],
    ["Maison Noir Seafood Tower", "$118", "Oysters, lobster, crab, prawns, seasonal sauces.", "/images/MaisonNoir/seafood/maison-noir-seafood-tower.webp"],
    ["Charcoal-Grilled Halibut", "$44", "Beurre blanc, fennel, open flame finish.", "/images/MaisonNoir/seafood/charcoal-grilled-halibut.webp"],
  ],
  Sides: [
    ["Pommes Purée", "$14", "Cultured butter, chives.", "/images/MaisonNoir/sides/pommes-puree.webp"],
    ["Black Truffle Fries", "$17", "Parmesan, herbs, black truffle aioli.", "/images/MaisonNoir/sides/black-truffle-fries.webp"],
    ["Mac & Gruyère", "$18", "Gruyère, aged cheddar, black pepper crumb.", "/images/MaisonNoir/sides/mac-and-gruyere.webp"],
    ["Creamed Spinach", "$15", "Garlic cream, nutmeg.", "/images/MaisonNoir/sides/creamed-spinach.webp"],
    ["Charred Broccolini", "$16", "Lemon oil, chili crisp, toasted almond.", "/images/MaisonNoir/sides/charred-broccolini.webp"],
    ["Roasted Wild Mushrooms", "$17", "Thyme, garlic butter.", "/images/MaisonNoir/sides/roasted-wild-mushrooms.webp"],
    ["Maple Bacon Brussels Sprouts", "$16", "Cider glaze, toasted seeds.", "/images/MaisonNoir/sides/maple-bacon-brussels-sprouts.webp"],
    ["Charred Asparagus", "$18", "Hollandaise, smoked salt.", "/images/MaisonNoir/sides/charred-asparagus.webp"],
  ],
  Desserts: [
    ["Dark Chocolate Torte", "$18", "Chocolate ganache, espresso cream, salted crumble.", "/images/MaisonNoir/desserts/dark-chocolate-torte.webp"],
    ["Vanilla Bean Crème Brûlée", "$16", "Burnt sugar, citrus, almond tuile.", "/images/MaisonNoir/desserts/vanilla-bean-creme-brulee.webp"],
    ["Basque Cheesecake", "$17", "Burnt vanilla top, berry compote.", "/images/MaisonNoir/desserts/basque-cheesecake.webp"],
    ["Whiskey Caramel Cake", "$19", "Caramel cream, toasted pecan.", "/images/MaisonNoir/desserts/whiskey-caramel-cake.webp"],
    ["Espresso Affogato", "$14", "Vanilla gelato, hot espresso, cocoa dust.", "/images/MaisonNoir/desserts/espresso-affogato.webp"],
    ["Lemon Tart", "$16", "Italian meringue, citrus curd.", "/images/MaisonNoir/desserts/lemon-tart.webp"],
  ],
  Cocktails: [
    ["The Noir Old Fashioned", "$19", "Bourbon, cacao bitters, orange oil, smoked cherry.", "/images/MaisonNoir/cocktails/the-noir-old-fashioned.webp"],
    ["Cellar Martini", "$21", "Vodka, dry vermouth, olive oil wash, sea salt.", "/images/MaisonNoir/cocktails/cellar-martini.webp"],
    ["Midnight Manhattan", "$20", "Rye, sweet vermouth, black cherry, bitters.", "/images/MaisonNoir/cocktails/midnight-manhattan.webp"],
    ["Gold Rush", "$18", "Bourbon, honey, lemon, smoked ice.", "/images/MaisonNoir/cocktails/gold-rush.webp"],
    ["Velvet Negroni", "$19", "Gin, Campari, vermouth, orange oil.", "/images/MaisonNoir/cocktails/velvet-negroni.webp"],
    ["Charcoal Whiskey Sour", "$18", "Whiskey, lemon, egg white, activated charcoal.", "/images/MaisonNoir/cocktails/charcoal-whiskey-sour.webp"],
    ["Pearl Gimlet", "$17", "Gin, lime cordial, basil, mineral salt.", "/images/MaisonNoir/cocktails/pearl-gimlet.webp"],
    ["Smoked Boulevardier", "$21", "Bourbon, Campari, vermouth, oak smoke.", "/images/MaisonNoir/cocktails/smoked-boulevardier.webp"],
    ["Noir Espresso Martini", "$20", "Vodka, espresso, coffee liqueur, vanilla.", "/images/MaisonNoir/cocktails/noir-espresso-martini.webp"],
    ["Amber Spritz", "$17", "Aperitivo, sparkling wine, citrus.", "/images/MaisonNoir/cocktails/amber-spritz.webp"],
    ["Cognac Sidecar", "$22", "Cognac, orange liqueur, lemon, sugared rim.", "/images/MaisonNoir/cocktails/cognac-sidecar.webp"],
    ["After Midnight", "$23", "Dark rum, amaro, cacao, bitters.", "/images/MaisonNoir/cocktails/after-midnight.webp"],
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

function CategoryBar({ active, onSelect }) {
  return (
    <div className="bg-[#050404]/95 backdrop-blur-2xl border-y border-white/10 shadow-[0_24px_70px_-40px_rgba(201,162,91,0.55)]">
      <div className="max-w-7xl mx-auto px-6 py-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-3 min-w-max">
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

export default function FullMenu() {
  const [active, setActive] = useState("Starters");

  const [selectedByCategory, setSelectedByCategory] = useState(() => ({
    Starters: menuItems.Starters[0],
    Steaks: menuItems.Steaks[0],
    Seafood: menuItems.Seafood[0],
    Sides: menuItems.Sides[0],
    Desserts: menuItems.Desserts[0],
    Cocktails: menuItems.Cocktails[0],
  }));

  const [showFixedBar, setShowFixedBar] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cardOffsets, setCardOffsets] = useState({});

  const fullMenuRef = useRef(null);
  const inlineBarRef = useRef(null);
  const endRef = useRef(null);
  const sectionRefs = useRef({});
  const menuGridRefs = useRef({});
  const cardRefs = useRef({});

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

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const updateStickyState = () => {
      const inlineBar = inlineBarRef.current;
      const end = endRef.current;

      if (!inlineBar || !end) return;

      const barRect = inlineBar.getBoundingClientRect();
      const endRect = end.getBoundingClientRect();

      const shouldShow = barRect.top <= 0 && endRect.top > window.innerHeight * 0.25;
      setShowFixedBar(shouldShow);

      let current = "Starters";

      categories.forEach((category) => {
        const el = sectionRefs.current[category];
        if (!el) return;

        if (el.getBoundingClientRect().top <= 140) {
          current = category;
        }
      });

      setActive(current);

      if (window.innerWidth >= 1024) {
        const nextOffsets = {};
        const topOffset = 96;

        categories.forEach((category) => {
          const grid = menuGridRefs.current[category];
          const card = cardRefs.current[category];

          if (!grid || !card) return;

          const gridTop = grid.getBoundingClientRect().top + window.scrollY;
          const gridHeight = grid.offsetHeight;
          const cardHeight = card.offsetHeight;
          const maxOffset = Math.max(gridHeight - cardHeight, 0);
          const rawOffset = window.scrollY + topOffset - gridTop;

          nextOffsets[category] = Math.min(Math.max(rawOffset, 0), maxOffset);
        });

        setCardOffsets((prev) => {
          const prevString = JSON.stringify(prev);
          const nextString = JSON.stringify(nextOffsets);

          return prevString === nextString ? prev : nextOffsets;
        });
      } else {
        setCardOffsets({});
      }
    };

    updateStickyState();

    document.addEventListener("scroll", updateStickyState, true);
    window.addEventListener("resize", updateStickyState);

    return () => {
      document.removeEventListener("scroll", updateStickyState, true);
      window.removeEventListener("resize", updateStickyState);
    };
  }, []);


  const fixedBar =
    mounted && showFixedBar
      ? createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed top-0 left-0 right-0 z-[99999]"
          >
            <CategoryBar active={active} onSelect={scrollToCategory} />
          </motion.div>
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
      {fixedBar}

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

      <div ref={inlineBarRef} className="relative z-20 -mx-6">
        <CategoryBar active={active} onSelect={scrollToCategory} />
      </div>

      <div className="relative max-w-7xl mx-auto pt-14">
        <div className="space-y-24">
          {categories.map((category) => {
            const selected = selectedByCategory[category] || menuItems[category][0];

            const selectedImage =
              selected?.[3] ||
              featuredImages[category]?.image ||
              "/images/MaisonNoir/ribeye.webp";

            const selectedName = selected?.[0] || featuredImages[category].title;
            const selectedPrice = selected?.[1] || "";
            const selectedDesc = selected?.[2] || featuredImages[category].subtitle;
            const cardOffset = cardOffsets[category] || 0;

            return (
              <section
                key={category}
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

                      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 shadow-[0_35px_90px_-55px_rgba(201,162,91,0.5)]">
                        <img
                          src={featuredImages[category].image}
                          alt={featuredImages[category].title}
                          onError={(e) => {
                            e.currentTarget.src = "/images/MaisonNoir/ribeye.webp";
                          }}
                          className="w-full aspect-[16/10] md:aspect-[16/8] object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                        <div className="absolute left-5 right-5 bottom-5 md:left-7 md:right-7 md:bottom-7">
                          <p className="text-[#C9A25B] tracking-[0.3em] uppercase text-[10px] mb-2">
                            Featured
                          </p>

                          <h4 className="font-serif text-3xl md:text-4xl">
                            {featuredImages[category].title}
                          </h4>

                          <p className="mt-2 text-white/60 max-w-xl leading-relaxed">
                            {featuredImages[category].subtitle}
                          </p>
                        </div>
                      </div>
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
                          <button
                            key={name}
                            onClick={() => {
                              setActive(category);
                              setSelectedByCategory((prev) => ({
                                ...prev,
                                [category]: item,
                              }));
                            }}
                            className={`w-full text-left grid sm:grid-cols-[1fr_auto] gap-4 py-6 group transition-all duration-300 ${isSelected
                              ? "rounded-2xl bg-white/[0.035] px-5 border border-[#C9A25B]/30"
                              : "border-b border-white/10 hover:px-4"
                              }`}
                          >
                            <div>
                              <h4
                                className={`font-serif text-2xl md:text-3xl transition ${isSelected
                                  ? "text-[#C9A25B]"
                                  : "group-hover:text-[#C9A25B]"
                                  }`}
                              >
                                {name}
                              </h4>

                              <p className="mt-2 text-white/50 leading-relaxed max-w-2xl">
                                {desc}
                              </p>
                            </div>

                            <div className="font-serif text-2xl text-[#C9A25B]">
                              {price}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="hidden lg:block lg:col-span-5 relative">
                    <div
                      ref={(el) => {
                        cardRefs.current[category] = el;
                      }}
                      style={{ transform: `translateY(${cardOffset}px)` }}
                      className="rounded-[2rem] overflow-hidden border border-white/10 bg-black backdrop-blur-xl shadow-[0_50px_120px_-55px_rgba(201,162,91,0.45)] transition-transform duration-150 ease-out will-change-transform"
                    >
                      <AnimatePresence mode="sync">
                        <motion.div
                          key={`${category}-${selectedName}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="relative"
                        >
                          <img
                            src={selectedImage}
                            alt={selectedName}
                            onError={(e) => {
                              e.currentTarget.src = featuredImages[category].image;
                            }}
                            className="w-full aspect-[16/10] object-cover brightness-110 contrast-105" />

                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                        </motion.div>
                      </AnimatePresence>

                      <div className="p-6">
                        <div className="flex items-start justify-between gap-5">
                          <div>
                            <p className="uppercase tracking-[0.35em] text-[11px] text-[#C9A25B] mb-2">
                              {category}
                            </p>

                            <h3 className="font-serif text-3xl leading-tight">
                              {selectedName}
                            </h3>
                          </div>

                          <div className="font-serif text-4xl text-[#C9A25B]">
                            {selectedPrice}
                          </div>
                        </div>

                        <p className="mt-4 text-white/60 leading-relaxed text-base">
                          {selectedDesc}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <span className="rounded-full border border-[#C9A25B]/25 px-4 py-2 text-sm text-[#C9A25B]">
                            House Signature
                          </span>

                          <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60">
                            Open Flame
                          </span>

                          <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60">
                            Chef Recommended
                          </span>
                        </div>

                        <button className="mt-6 w-full rounded-full bg-[#C9A25B] py-3 text-base font-medium text-black transition hover:scale-[1.02] hover:bg-[#d6b36d]">
                          Reserve This Dish
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </section>
            );
          })}
        </div>
      </div>
      <div ref={endRef} className="h-px" />
    </section>
  );
}