import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The room felt private without ever feeling hidden. Every course arrived with the kind of timing you only notice when it is perfect.",
    source: "Amelia R.",
    detail: "Anniversary Dinner",
    note: "Velvet Room",
  },
  {
    quote:
      "Maison Noir does not rush the evening. The fire, the wine, the silence between courses — everything felt intentional.",
    source: "The Coast Magazine",
    detail: "Restaurant Review",
    note: "Editor’s Choice",
  },
  {
    quote:
      "We booked the private room for a client dinner and it felt effortless. Polished service, beautiful pacing, and no detail out of place.",
    source: "Julian M.",
    detail: "Executive Dinner",
    note: "Private Dining",
  },
  {
    quote:
      "The steak was memorable, but the atmosphere is what stayed with us. Dark, warm, cinematic, and completely unlike anywhere else in the city.",
    source: "Halifax Dining Journal",
    detail: "Guest Experience",
    note: "Main Dining Room",
  },
  {
    quote:
      "It felt like the entire evening had been choreographed. Not theatrical, not loud — just perfectly paced.",
    source: "Maya S.",
    detail: "Birthday Dinner",
    note: "Chef’s Table",
  },
  {
    quote:
      "The wine pairing changed the whole meal. Each pour felt like it belonged exactly where it arrived.",
    source: "Daniel K.",
    detail: "Wine Pairing",
    note: "The Cellar",
  },
  {
    quote:
      "A rare restaurant where the service is present without interrupting the conversation. That takes real discipline.",
    source: "Elaine W.",
    detail: "Guest Review",
    note: "Service",
  },
  {
    quote:
      "The dry-aged ribeye was exceptional, but the marrow butter made it unforgettable.",
    source: "Marcus B.",
    detail: "Signature Steak",
    note: "Open Flame",
  },
  {
    quote:
      "Maison Noir understands restraint. Nothing felt overdone, and that made every detail feel more expensive.",
    source: "Sofia L.",
    detail: "Evening Review",
    note: "Atmosphere",
  },
  {
    quote:
      "We came for dinner and ended up staying for nearly three hours. The room makes time slow down.",
    source: "Priya N.",
    detail: "Date Night",
    note: "Dining Room",
  },
  {
    quote:
      "The private dining room was intimate, warm, and completely seamless for our team dinner.",
    source: "Thomas A.",
    detail: "Corporate Dinner",
    note: "Private Room",
  },
  {
    quote:
      "Every plate had confidence. No unnecessary decoration, no noise — just fire, texture, and precision.",
    source: "Nora C.",
    detail: "Tasting Menu",
    note: "Chef’s Table",
  },
  {
    quote:
      "The lighting alone changes the mood. It feels like stepping into a restaurant built for long conversations.",
    source: "Victor H.",
    detail: "Guest Review",
    note: "Ambience",
  },
  {
    quote:
      "The cocktail service was quiet and beautiful. It felt like the evening began before the first course arrived.",
    source: "Leah M.",
    detail: "Cocktail Hour",
    note: "The Pour",
  },
  {
    quote:
      "A polished, cinematic restaurant with the confidence to let silence do some of the work.",
    source: "North End Dining Notes",
    detail: "Feature Mention",
    note: "Press",
  },
  {
    quote:
      "The dessert arrived like a final scene. Small, dark, rich, and exactly enough.",
    source: "Camille T.",
    detail: "Final Course",
    note: "Dessert",
  },
  {
    quote:
      "The staff remembered our pacing. That is the kind of service you feel rather than notice.",
    source: "Andrew P.",
    detail: "Anniversary Dinner",
    note: "Service",
  },
  {
    quote:
      "The room, the steak, the wine, the fire — everything felt connected.",
    source: "Rachel D.",
    detail: "Guest Review",
    note: "Full Evening",
  },
  {
    quote:
      "Maison Noir feels like a restaurant designed for people who love restaurants.",
    source: "Halifax Table Guide",
    detail: "Dining Feature",
    note: "Review",
  },
  {
    quote:
      "It was luxurious without being stiff. That balance is incredibly hard to get right.",
    source: "Isabelle V.",
    detail: "Private Celebration",
    note: "Velvet Room",
  },
];

function TestimonialCard({ testimonial, depth = 0 }) {
  return (
    <article
      tabIndex={0}
      style={{ marginTop: depth }}
      className="mx-3 flex h-[24rem] w-[min(26rem,82vw)] flex-none flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 shadow-[0_45px_130px_-95px_rgba(201,162,91,0.8)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#C9A25B]/35 hover:bg-[#C9A25B]/[0.055] focus:outline-none focus:ring-1 focus:ring-[#C9A25B]/45"
    >
      <div>
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="h-3.5 w-3.5 fill-[#C9A25B] text-[#C9A25B]"
              />
            ))}
          </div>

          <Quote className="h-7 w-7 text-[#C9A25B]/45" />
        </div>

        <p className="font-serif text-2xl leading-tight tracking-[-0.035em] text-white md:text-3xl">
          “{testimonial.quote}”
        </p>
      </div>

      <div className="border-t border-white/10 pt-6">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[#C9A25B]">
          {testimonial.source}
        </p>

        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
          <span className="text-white/48">{testimonial.detail}</span>
          <span className="text-white/30">{testimonial.note}</span>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);
  const marqueeItems = [...testimonials, ...testimonials];
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const edgeLightX = useTransform(scrollYProgress, [0, 1], ["-18%", "58%"]);
  const edgeLightOpacity = useTransform(scrollYProgress, [0.08, 0.46, 0.86], [0, 0.42, 0]);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: "20% 0px 20% 0px",
        threshold: 0.1,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-28 md:py-40"
    >
      <style>
        {`
          @keyframes maison-noir-testimonials-marquee {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          .maison-noir-testimonials-track {
            animation: maison-noir-testimonials-marquee var(--duration) linear infinite;
          }

          .maison-noir-testimonials-track:hover {
            animation-play-state: paused;
          }

          .maison-noir-testimonials-track:focus-within {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(201,162,91,0.13),transparent_42%)]" />
      <div className="pointer-events-none absolute left-[-180px] top-24 h-[520px] w-[520px] rounded-full bg-[#4A1418]/22 blur-[150px]" />
      <div className="pointer-events-none absolute right-[-180px] bottom-10 h-[520px] w-[520px] rounded-full bg-[#C9A25B]/8 blur-[150px]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.9)]" />
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { x: edgeLightX, opacity: edgeLightOpacity }}
        className="pointer-events-none absolute top-[46%] h-px w-[54vw] bg-gradient-to-r from-transparent via-[#C9A25B]/80 to-transparent shadow-[0_0_42px_rgba(201,162,91,0.62)]"
      />

      <div className="relative mx-auto mb-16 max-w-7xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 34 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-8">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#C9A25B]">
              The Room Remembers
            </p>

            <h2 className="font-serif text-[clamp(4rem,9vw,8.6rem)] leading-[0.86] tracking-[-0.065em] text-white">
              What lingers
              <br />
              after the last course.
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-lg leading-8 text-white/55">
              Notes from guests, private dining hosts, and reviewers who came
              for dinner and left remembering the room.
            </p>
          </div>
        </motion.div>
      </div>

      {reduce ? (
        <div className="relative mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`${testimonial.source}-${testimonial.detail}`}
              testimonial={testimonial}
              depth={0}
            />
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#050505] to-transparent md:w-44" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#050505] to-transparent md:w-44" />

          <div
            className="maison-noir-testimonials-track flex w-max will-change-transform"
            style={{
              "--duration": "95s",
              animationPlayState: inView ? "running" : "paused",
            }}
          >
            {marqueeItems.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.source}-${testimonial.detail}-${index}`}
                testimonial={testimonial}
                depth={index % 2 === 0 ? 0 : 18}
              />
            ))}
          </div>
        </div>
      )}

      <div className="relative mx-auto mt-12 max-w-7xl px-6">
        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-8">
          {[
            "Open-fire signatures",
            "Private dining",
            "Cellar pairings",
            "Slow luxury service",
            "Anniversary dinners",
            "Chef’s table",
          ].map((note) => (
            <span
              key={note}
              className="rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/42"
            >
              {note}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
