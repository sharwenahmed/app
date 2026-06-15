import React from "react";
import { FakeBrowserChrome, MicroSite } from "./MicroSite";

export default function DesktopMockup({ demo, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_50px_120px_-40px_rgba(147,51,234,0.5)] bg-black/40 ${className}`}
    >
      <FakeBrowserChrome url={demo.url} />
      <div className="aspect-[16/10] w-full overflow-hidden">
        <MicroSite demo={demo} variant="desktop" />
      </div>
    </div>
  );
}
