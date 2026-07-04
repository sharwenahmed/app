import React from "react";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#030303] border-t border-white/10 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,162,91,0.08),transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        <div className="grid lg:grid-cols-4 gap-16">

          {/* Logo */}

          <div>

            <h2 className="font-serif text-5xl">
              Maison Noir
            </h2>

            <p className="mt-5 text-white/50 leading-7">
              A luxury steakhouse crafted around
              unforgettable evenings,
              exceptional ingredients,
              and timeless hospitality.
            </p>

          </div>

          {/* Visit */}

          <div>

            <h3 className="uppercase tracking-[0.3em] text-xs text-[#C9A25B] mb-6">
              Visit
            </h3>

            <div className="space-y-4 text-white/60">

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 mt-1 text-[#C9A25B]" />
                <span>17 Bishop's Landing, Halifax</span>
              </div>

              <div className="flex gap-3">
                <Phone className="w-4 h-4 mt-1 text-[#C9A25B]" />
                <span>(902) 555-0198</span>
              </div>

              <div className="flex gap-3">
                <Mail className="w-4 h-4 mt-1 text-[#C9A25B]" />
                <span>hello@maisonnoir.ca</span>
              </div>

            </div>

          </div>

          {/* Hours */}

          <div>

            <h3 className="uppercase tracking-[0.3em] text-xs text-[#C9A25B] mb-6">
              Opening Hours
            </h3>

            <div className="space-y-3 text-white/60">

              <div>Monday - Thursday</div>
              <div>5 PM — 11 PM</div>

              <div className="pt-4">
                Friday - Sunday
              </div>

              <div>5 PM — Midnight</div>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="uppercase tracking-[0.3em] text-xs text-[#C9A25B] mb-6">
              Follow
            </h3>

            <a
              href="#"
              className="inline-flex items-center gap-3 text-white/60 hover:text-[#C9A25B] transition"
            >
              <Instagram />
              Instagram
            </a>

          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-white/35 text-sm">

          <div>
            © 2026 Maison Noir. All rights reserved.
          </div>

          <div>
            Designed by <span className="text-[#C9A25B]">A-Designs</span>
          </div>

        </div>

      </div>

    </footer>
  );
}