import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";

import LuxuryButton from "@/components/demo/ui/LuxuryButton";
import GlassCard from "@/components/demo/ui/GlassCard";
import SectionGlow from "@/components/demo/ui/SectionGlow";
import SectionHeader from "@/components/demo/ui/SectionHeader";

export default function Visit() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const detailsY = useTransform(scrollYProgress, [0, 0.48, 1], [34, 0, -12]);
  const mapY = useTransform(scrollYProgress, [0, 1], [42, -8]);
  const mapOpacity = useTransform(scrollYProgress, [0.1, 0.42, 1], [0.58, 1, 0.92]);
  const closingLight = useTransform(scrollYProgress, [0.2, 0.78, 1], [0.5, 0.24, 0.08]);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative bg-[#040303] px-6 py-32 md:py-44 overflow-hidden border-t border-white/10"
    >
      <SectionGlow />

      <div className="absolute left-[-180px] bottom-10 w-[520px] h-[520px] rounded-full bg-[#4A1418]/25 blur-[150px]" />
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { opacity: closingLight }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_30%,rgba(201,162,91,0.16),transparent_42%)]"
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        {/* LEFT */}

        <motion.div
          style={reduce ? undefined : { y: detailsY }}
          className="lg:col-span-5"
        >
          <SectionHeader
            eyebrow="Visit Maison Noir"
            title={
              <>
                Hidden in the heart
                <br />
                of Halifax.
              </>
            }
            description="Steps from the harbour, Maison Noir opens each evening for intimate dining, private gatherings, and cellar-led celebrations."
          />

          <div className="mt-10 space-y-6">
            <div className="flex gap-4">
              <MapPin className="w-5 h-5 text-[#C9A25B] mt-1" />
              <div>
                <div className="text-white font-medium">
                  17 Bishop's Landing
                </div>
                <div className="text-white/45">
                  Halifax, Nova Scotia
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="w-5 h-5 text-[#C9A25B] mt-1" />
              <div>
                <div className="text-white font-medium">
                  Open Daily
                </div>
                <div className="text-white/45">
                  5:00 PM – Midnight
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="w-5 h-5 text-[#C9A25B] mt-1" />
              <div>
                <div className="text-white font-medium">
                  (902) 555-0198
                </div>
                <div className="text-white/45">
                  Reservations & Private Dining
                </div>
              </div>
            </div>
          </div>

          <LuxuryButton
            href="https://www.google.com/maps/search/?api=1&query=Bishop%27s+Landing+Halifax+NS"
            className="mt-10"
          >
            Get Directions
          </LuxuryButton>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          style={reduce ? undefined : { y: mapY, opacity: mapOpacity }}
          className="lg:col-span-7"
        >
  <GlassCard className="relative min-h-[620px] overflow-hidden p-0">
    <iframe
      title="Maison Noir location map"
      src="https://www.google.com/maps?q=Bishop%27s%20Landing%20Halifax%20NS&output=embed"
      className="absolute inset-0 w-full h-full grayscale contrast-125 brightness-75"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />

    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/20" />

    <div className="absolute bottom-8 left-8 right-8">
      <GlassCard className="bg-black/65 p-6">
        <p className="text-[#C9A25B] tracking-[0.3em] uppercase text-[10px] mb-3">
          Downtown Halifax
        </p>

        <p className="font-serif text-3xl leading-tight">
          Steps from the harbour, hidden inside the city’s evening glow.
        </p>
      </GlassCard>
    </div>
  </GlassCard>
</motion.div>
      </div>
    </section>
  );
}
