/**
 * A tiny inline "website" rendered to look like a real boutique site for the
 * given concept. Used inside DesktopMockup / MobileMockup.
 */
import React from "react";

export function FakeBrowserChrome({ url }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-black/40">
      <span className="dot bg-[#ff5f57]/80" />
      <span className="dot bg-[#febc2e]/80" />
      <span className="dot bg-[#28c840]/80" />
      <div className="ml-3 flex-1 truncate">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 text-[10px] tracking-wide text-white/60">
          <span className="opacity-60">https://</span>
          <span className="text-white/85">{url}</span>
        </div>
      </div>
    </div>
  );
}

export function MicroSite({ demo, variant = "desktop" }) {
  const { palette, hero, mobileHero, heroTitle, heroSub, nav, cta, stats, name } = demo;
  const image = variant === "mobile" ? mobileHero || hero : hero;

  return (
    <div
      className="w-full h-full font-display"
      style={{ background: palette.bg, color: palette.text }}
    >
      {/* Mini nav */}
      <div
        className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-sm"
            style={{
              background: `linear-gradient(135deg, ${palette.accent}, transparent)`,
            }}
          />
          <span className="text-[11px] font-semibold tracking-tight">{name}</span>
        </div>
        {variant === "desktop" && (
          <div className="hidden sm:flex items-center gap-4 text-[10px] opacity-70">
            {nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        )}
        <div
          className="text-[10px] font-medium px-2.5 py-1 rounded-full"
          style={{
            background: palette.accent,
            color: palette.bg,
          }}
        >
          {cta}
        </div>
      </div>

      {/* Hero */}
      <div className="relative">
        <div
          className="w-full"
          style={{
            aspectRatio: variant === "mobile" ? "9 / 12" : "16 / 7",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${palette.bg}00 30%, ${palette.bg}cc 100%)`,
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
          <div
            className="text-[9px] tracking-[0.18em] uppercase opacity-80"
            style={{ color: palette.accent }}
          >
            {demo.tagline}
          </div>
          <div
            className="mt-1 font-medium leading-tight line-clamp-3"
            style={{
              fontSize: variant === "mobile" ? "0.7rem" : "1.35rem",
              maxWidth: variant === "mobile" ? "95%" : "75%",
            }}
          >
            {heroTitle}
          </div>
          {variant === "desktop" && (
            <div
              className="mt-1.5 text-[10px] opacity-70 max-w-[60%]"
              style={{ color: palette.text }}
            >
              {heroSub}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div
              key={s.v + s.k}
              className="rounded-lg p-2 text-center"
              style={{ background: palette.surface, border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="text-[11px] font-semibold" style={{ color: palette.accent }}>
                {s.k}
              </div>
              <div className="text-[8px] opacity-70 tracking-wide uppercase">{s.v}</div>
            </div>
          ))}
        </div>
        {variant === "desktop" && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div
              className="col-span-2 rounded-lg overflow-hidden"
              style={{ background: palette.surface, border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="h-16"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "saturate(0.9)",
                }}
              />
              <div className="p-2">
                <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
                <div className="h-1.5 w-1/2 rounded-full bg-white/10 mt-1" />
              </div>
            </div>
            <div
              className="rounded-lg p-2"
              style={{ background: palette.surface, border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="h-1.5 w-2/3 rounded-full bg-white/20" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/10 mt-1.5" />
              <div className="h-1.5 w-3/4 rounded-full bg-white/10 mt-1.5" />
              <div
                className="mt-2 text-[9px] py-1 rounded-md text-center font-medium"
                style={{ background: palette.accent, color: palette.bg }}
              >
                {cta}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
