import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

export default function LuxuryButton({
  children,
  href,
  variant = "gold",
  className = "",
}) {
  const classes = clsx(
    "group inline-flex items-center gap-2 rounded-full px-7 py-4 font-medium transition-all duration-500",
    "hover:-translate-y-1 hover:scale-[1.02] active:scale-95",
    {
      "bg-[#C9A25B] text-black hover:bg-[#e2bd6f] shadow-[0_25px_60px_-25px_rgba(201,162,91,0.9)]":
        variant === "gold",

      "border border-white/15 text-white hover:bg-white/10":
        variant === "outline",

      "border border-[#C9A25B]/40 text-[#C9A25B] hover:bg-[#C9A25B] hover:text-black":
        variant === "ghost",
    },
    className
  );

  return (
    <a href={href} className={classes}>
      <span>{children}</span>

      <ArrowUpRight
        className="
          w-4 h-4
          transition-transform duration-500
          group-hover:translate-x-1
          group-hover:-translate-y-1
        "
      />
    </a>
  );
}