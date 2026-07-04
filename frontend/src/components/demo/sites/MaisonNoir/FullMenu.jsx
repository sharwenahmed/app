import React, { useState } from "react";

import GlassCard from "@/components/demo/ui/GlassCard";
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
    ["45-Day Dry-Aged Ribeye", "$68", "16 oz ribeye, smoked marrow butter, sea salt.", "/images/MaisonNoir/ribeye.webp"],
    ["Black Truffle Filet Mignon", "$74", "8 oz filet, pommes purée, truffle jus.", "/images/MaisonNoir/fillet.webp"],
    ["A5 Japanese Wagyu", "$128", "4 oz wagyu, binchotan charcoal, smoked salt.", "/images/MaisonNoir/wagyu.webp"],
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
    ["Dark Chocolate Torte", "$18", "Chocolate ganache, espresso cream, salted crumble.", "/images/MaisonNoir/dessert.webp"],
    ["Vanilla Bean Crème Brûlée", "$16", "Burnt sugar, citrus, almond tuile."],
    ["Basque Cheesecake", "$17", "Burnt vanilla top, berry compote."],
    ["Whiskey Caramel Cake", "$19", "Caramel cream, toasted pecan."],
    ["Espresso Affogato", "$14", "Vanilla gelato, hot espresso, cocoa dust."],
    ["Lemon Tart", "$16", "Italian meringue, citrus curd."],
  ],

  Cocktails: [
    ["The Noir Old Fashioned", "$19", "Bourbon, cacao bitters, orange oil, smoked cherry.", "/images/MaisonNoir/cocktail.webp"],
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

export default function FullMenu() {
  const [active, setActive] = useState("Starters");
  const items = menuItems[active];
  const featured = items.find((item) => item[3]);

  return (
    <section
      id="full-menu"
      className="relative bg-[#050404] px-6 py-32 md:py-44 overflow-hidden border-t border-white/10"
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

        <div className="sticky top-28 z-20 mb-12 -mx-6 px-6 py-4 bg-[#050404]/80 backdrop-blur-xl border-y border-white/10">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-full px-5 py-3 text-sm transition-all duration-300 ${
                  active === category
                    ? "bg-[#C9A25B] text-black shadow-[0_18px_45px_-20px_rgba(201,162,91,0.9)]"
                    : "border border-white/10 text-white/60 hover:text-white hover:border-[#C9A25B]/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <GlassCard className="p-6 md:p-10">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className={featured ? "lg:col-span-7" : "lg:col-span-12"}>
              <div className="mb-10">
                <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-4">
                  {active}
                </p>

                <h3 className="font-serif text-5xl md:text-6xl">
                  {active === "Starters" && "Begin quietly."}
                  {active === "Steaks" && "The fire speaks here."}
                  {active === "Seafood" && "From Atlantic waters."}
                  {active === "Sides" && "Designed to accompany."}
                  {active === "Desserts" && "The final memory."}
                  {active === "Cocktails" && "Poured after dark."}
                </h3>
              </div>

              <div className="divide-y divide-white/10">
                {items.map(([name, price, desc]) => (
                  <div
                    key={name}
                    className="grid sm:grid-cols-[1fr_auto] gap-4 py-6 group"
                  >
                    <div>
                      <h4 className="font-serif text-2xl md:text-3xl group-hover:text-[#C9A25B] transition">
                        {name}
                      </h4>

                      <p className="mt-2 text-white/48 leading-relaxed max-w-2xl">
                        {desc}
                      </p>
                    </div>

                    <div className="font-serif text-2xl text-[#C9A25B]">
                      {price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {featured && (
              <div className="lg:col-span-5">
                <div className="sticky top-48 rounded-[2rem] overflow-hidden border border-white/10 bg-black/35">
                  <img
                    src={featured[3]}
                    alt={featured[0]}
                    className="w-full aspect-[4/5] object-cover opacity-90"
                  />

                  <div className="p-6">
                    <p className="text-[#C9A25B] tracking-[0.3em] uppercase text-[10px] mb-3">
                      Featured
                    </p>

                    <h4 className="font-serif text-3xl">
                      {featured[0]}
                    </h4>

                    <p className="mt-3 text-white/50">
                      {featured[2]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}