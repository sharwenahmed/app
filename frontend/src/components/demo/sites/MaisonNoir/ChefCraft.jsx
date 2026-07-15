import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ChefCraft() {
  return (
    <section
      id="chef"
      className="relative overflow-hidden bg-[#050608] px-6 py-32"
    >
      <div className="absolute right-[-180px] top-24 hidden h-[500px] w-[500px] rounded-full bg-[#C9A25B]/10 blur-[140px] md:block" />
      <div className="absolute left-[-160px] bottom-12 h-[420px] w-[420px] rounded-full bg-[#4A1418]/20 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-5">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#C9A25B]">
            Craftsmanship
          </p>

          <h2 className="font-serif text-6xl leading-[0.9] tracking-tight lg:text-7xl">
            The Person
            <br />
            Behind
            <br />
            Every Plate.
          </h2>

          <p className="mt-8 text-lg leading-8 text-white/60">
            Every evening service begins hours before the first reservation.
            Ingredients are inspected one by one, sauces simmer slowly, and
            every steak is cooked over open flame with precision, patience, and
            restraint.
          </p>

          <p className="mt-6 text-lg leading-8 text-white/60">
            Luxury isn’t excess. It’s consistency.
          </p>

          <a
            href="#story"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-[#C9A25B]/40 px-6 py-3 text-[#C9A25B] transition hover:bg-[#C9A25B] hover:text-black"
          >
            Meet Our Philosophy
            <ArrowUpRight size={18} />
          </a>
        </div>

        {/* Right */}
        <div className="relative lg:col-span-7">
          <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] shadow-[0_50px_140px_-70px_rgba(201,162,91,0.45)]">
            <img
              loading="lazy"
              decoding="async"
              src="/images/MaisonNoir/people/chef.webp"
              alt="Maison Noir executive chef plating a dish"
              className="h-[720px] w-full object-cover object-center"
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-[#C9A25B]/20 bg-white/[0.04] p-7 backdrop-blur-xl">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#C9A25B]">
                Experience
              </p>

              <div className="flex items-end gap-4">
                <h3 className="font-serif text-6xl leading-none text-white">
                  18
                </h3>

                <p className="pb-1 text-sm leading-relaxed text-white/58">
                  Years mastering open-fire cuisine
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/35 p-7">
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#C9A25B]">
                Service Ritual
              </p>

              <p className="font-serif text-2xl leading-tight text-white/86">
                Every plate leaves the kitchen only when heat, timing, and
                silence agree.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}