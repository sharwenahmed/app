import React from "react";
import { MicroSite } from "./MicroSite";

export default function MobileMockup({ demo, className = "" }) {
  return (
    <div
      className={`relative mx-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_-30px_rgba(147,51,234,0.5)] bg-black ${className}`}
      style={{ width: "100%", maxWidth: 220, aspectRatio: "9 / 19" }}
    >
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-20 h-5 rounded-full bg-black/90 border border-white/10" />
      <div className="w-full h-full overflow-hidden">
        <MicroSite demo={demo} variant="mobile" />
      </div>
    </div>
  );
}
