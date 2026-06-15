import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, MapPin } from "lucide-react";
import { HOME } from "@/constants/testIds";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="aurora aurora-purple -left-32 -bottom-32 w-[420px] h-[420px] opacity-25" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="relative inline-flex w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-500 shadow-[0_0_24px_rgba(168,85,247,0.55)]">
                <span className="absolute inset-[3px] rounded-md bg-black/60 grid place-items-center text-xs font-bold text-white">
                  A
                </span>
              </span>
              <span className="font-display text-xl font-medium">A-Designs</span>
            </div>
            <p className="mt-5 text-white/65 max-w-md font-body leading-relaxed">
              A Halifax-based web design studio crafting premium websites for local
              businesses across Nova Scotia and beyond.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/65">
              <MapPin className="w-4 h-4 text-purple-300" />
              Halifax, Nova Scotia, Canada
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-6">
            <div>
              <div className="text-xs tracking-eyebrow text-purple-300/80 mb-3">Explore</div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <a href="#work" className="hover:text-white">
                    Demo Gallery
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-xs tracking-eyebrow text-purple-300/80 mb-3">Industries</div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Restaurants & Cafes</li>
                <li>Barbershops</li>
                <li>Hair Salons</li>
                <li>Roofing Companies</li>
                <li>Cleaning Companies</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs tracking-eyebrow text-purple-300/80 mb-3">Contact</div>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+19029894072"
                data-testid={HOME.footerPhone}
                className="flex items-center gap-2 text-white/80 hover:text-white"
              >
                <Phone className="w-4 h-4 text-purple-300" />
                902-989-4072
              </a>
              <a
                href="mailto:sharwen.ahmed@yahoo.com"
                data-testid={HOME.footerEmail}
                className="flex items-center gap-2 text-white/80 hover:text-white break-all"
              >
                <Mail className="w-4 h-4 text-purple-300" />
                sharwen.ahmed@yahoo.com
              </a>
              <a
                href="https://www.instagram.com/adesignshalifax/"
                target="_blank"
                rel="noreferrer"
                data-testid={HOME.footerInstagram}
                className="flex items-center gap-2 text-white/80 hover:text-white"
              >
                <Instagram className="w-4 h-4 text-purple-300" />
                @adesignshalifax
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/45">
          <div>© {new Date().getFullYear()} A-Designs. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="hover:text-white/80">
              Admin
            </Link>
            <span>Built in Halifax</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
