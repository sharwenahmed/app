import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "One of the finest dining experiences in Halifax. Quiet, cinematic, and impossibly well executed.",
    source: "The Coast Magazine",
    detail: "Restaurant Review",
  },
  {
    quote:
      "Maison Noir feels less like dinner and more like an evening you remember months later.",
    source: "Halifax Dining Journal",
    detail: "Editor's Choice",
  },
  {
    quote:
      "The service, the wine, the fire, the room — every detail feels intentional.",
    source: "Guest Review",
    detail: "Private Dining",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const item = testimonials[active];

  return (
    <section
      id="testimonials"
      className="relative bg-[#050505] px-6 py-32 md:py-44 overflow-hidden border-t border-white/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,91,0.12),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto text-center">
        <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-8">
          The Room Remembers
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={reduce ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? {} : { opacity: 0, y: -18, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center gap-1 mb-10">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#C9A25B] text-[#C9A25B]"
                />
              ))}
            </div>

            <blockquote className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
              “{item.quote}”
            </blockquote>

            <div className="mt-12">
              <div className="text-[#C9A25B] tracking-[0.25em] uppercase text-xs">
                {item.source}
              </div>
              <div className="mt-3 text-white/45">
                {item.detail}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all ${
                active === index
                  ? "w-10 bg-[#C9A25B]"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}