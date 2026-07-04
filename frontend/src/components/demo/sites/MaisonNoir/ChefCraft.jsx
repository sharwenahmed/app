import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ChefCraft() {
  return (
    <section
      id="chef"
      className="relative bg-[#050608] py-32 px-6 overflow-hidden"
    >
<div className="hidden md:block absolute right-[-180px] top-24 w-[500px] h-[500px] rounded-full bg-[#C9A25B]/10 blur-[140px]" />
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">

        {/* Left */}

        <div className="lg:col-span-5">

          <p className="uppercase tracking-[0.35em] text-xs text-[#C9A25B] mb-6">
            Craftsmanship
          </p>

          <h2 className="font-serif text-6xl lg:text-7xl leading-[0.9] tracking-tight">
            The Person
            <br />
            Behind
            <br />
            Every Plate.
          </h2>

          <p className="mt-8 text-white/60 leading-8 text-lg">
            Every evening service begins hours before the first reservation.
            Ingredients are inspected one by one, sauces simmer slowly,
            and every steak is cooked over open flame with precision,
            patience, and restraint.
          </p>

          <p className="mt-6 text-white/60 leading-8 text-lg">
            Luxury isn't excess.
            It's consistency.
          </p>

          <button className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/40 px-6 py-3 text-[#C9A25B] hover:bg-[#C9A25B] hover:text-black transition">
            Meet Our Philosophy
            <ArrowUpRight size={18} />
          </button>

        </div>

        {/* Right */}

        <div className="lg:col-span-7 relative">

          <div className="overflow-hidden rounded-[40px] border border-white/10">

            <img
              loading="lazy"
              decoding="async"
              src="/images/MaisonNoir/chef.webp"
              alt="Chef"
              className="w-full h-[760px] object-cover"
            />

          </div>

          <div className="absolute bottom-8 left-8 rounded-3xl bg-black/70 backdrop-blur-xl border border-white/10 p-7">

            <p className="text-[#C9A25B] uppercase tracking-[0.3em] text-[10px]">
              Experience
            </p>

            <h3 className="font-serif text-5xl mt-2">
              18
            </h3>

            <p className="text-white/60">
              Years mastering open-fire cuisine
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}