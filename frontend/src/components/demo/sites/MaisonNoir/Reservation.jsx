import React, { useState } from "react";
import { CalendarDays, Clock3, Users, Gift, CheckCircle2 } from "lucide-react";

import LuxuryButton from "@/components/demo/ui/LuxuryButton";
import GlassCard from "@/components/demo/ui/GlassCard";
import SectionGlow from "@/components/demo/ui/SectionGlow";

const times = ["5:30 PM", "6:00 PM", "7:00 PM", "7:30 PM", "8:30 PM", "9:00 PM"];
const guests = ["2", "3", "4", "5", "6", "Private Room"];
const occasions = ["Dinner", "Anniversary", "Birthday", "Business", "Date Night"];

export default function Reservation() {
  const [selectedTime, setSelectedTime] = useState("7:30 PM");
  const [selectedGuests, setSelectedGuests] = useState("2");
  const [selectedOccasion, setSelectedOccasion] = useState("Anniversary");

  return (
    <section
      id="reserve"
      className="relative bg-[#020202] border-t border-white/10 overflow-hidden"
    >
      <SectionGlow />

      <div className="relative max-w-7xl mx-auto px-6 py-36">
        <div className="text-center max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-[#C9A25B] text-xs mb-6">
            Reservations
          </p>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tight">
            Your Table
            <br />
            Awaits.
          </h2>

          <p className="mt-8 text-white/60 text-xl leading-relaxed">
            Select your evening. We’ll prepare the rest.
          </p>
        </div>

        <GlassCard className="mt-24 max-w-6xl mx-auto p-6 md:p-10">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 rounded-[2rem] border border-white/10 bg-black/35 p-6">
              <CalendarDays className="text-[#C9A25B] mb-5" />

              <label className="text-sm uppercase tracking-[0.3em] text-white/40">
                Date
              </label>

              <input
                type="date"
                className="mt-4 w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 text-white outline-none focus:border-[#C9A25B]/60"
              />

              <div className="mt-6">
                <label className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="mt-4 w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-[#C9A25B]/60"
                />
              </div>

              <div className="mt-6">
                <label className="text-sm uppercase tracking-[0.3em] text-white/40">
                  Phone
                </label>

                <input
                  type="tel"
                  placeholder="(902) 555-0000"
                  className="mt-4 w-full rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 text-white placeholder:text-white/30 outline-none focus:border-[#C9A25B]/60"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-[#C9A25B]" />
                  <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                    Guests
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {guests.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedGuests(item)}
                      className={`rounded-full px-5 py-3 text-sm transition ${
                        selectedGuests === item
                          ? "bg-[#C9A25B] text-black"
                          : "border border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock3 className="w-5 h-5 text-[#C9A25B]" />
                  <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                    Time
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-full px-5 py-3 text-sm transition ${
                        selectedTime === time
                          ? "bg-[#C9A25B] text-black"
                          : "border border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-5 h-5 text-[#C9A25B]" />
                  <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                    Occasion
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {occasions.map((item) => (
                    <button
                      key={item}
                      onClick={() => setSelectedOccasion(item)}
                      className={`rounded-full px-5 py-3 text-sm transition ${
                        selectedOccasion === item
                          ? "bg-[#C9A25B] text-black"
                          : "border border-white/10 text-white/60 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Special requests, allergies, wine preferences..."
                className="w-full min-h-[130px] rounded-[2rem] bg-white/[0.04] border border-white/10 px-6 py-5 text-white placeholder:text-white/30 outline-none focus:border-[#C9A25B]/60"
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/10 pt-8">
                <div className="flex items-start gap-3 text-white/55">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A25B] mt-0.5" />
                  <p>
                    {selectedGuests} guests · {selectedTime} · {selectedOccasion}
                  </p>
                </div>

                <LuxuryButton href="#visit" className="w-fit">
                  Request Reservation
                </LuxuryButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}