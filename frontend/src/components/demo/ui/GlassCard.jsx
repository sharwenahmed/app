import clsx from "clsx";

export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={clsx(
        `
        rounded-[2rem]
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        shadow-[0_40px_120px_-50px_rgba(0,0,0,0.7)]
        `,
        className
      )}
    >
      {children}
    </div>
  );
}