import React from "react";
import { motion } from "framer-motion";

export default function DemoBrowser({ demo, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.97, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-[1280px] mx-auto rounded-[2rem] overflow-hidden bg-black/70 ring-1 ring-white/10 shadow-[0_40px_140px_-40px_rgba(147,51,234,0.65)]"
    >
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 bg-white/[0.045] border-b border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]/90" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]/90" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]/90" />
        </div>
        <div className="min-w-0 flex-1 flex justify-center">
          <div className="max-w-full truncate rounded-full bg-black/35 border border-white/10 px-4 py-1.5 text-[11px] sm:text-xs text-white/65">
            <span className="text-emerald-300/80">●</span>{" "}
            <span className="text-white/40">https://</span>
            <span className="text-white/80">{demo?.url || `${demo?.slug || "demo"}.ca`}</span>
          </div>
        </div>
        <div className="hidden md:block text-xs text-white/45">Live Preview</div>
      </div>
      <div className="bg-[#050505]">{children}</div>
    </motion.div>
  );
}
