export default function SectionHeader({
    eyebrow,
    title,
    description,
  }) {
    return (
      <div className="max-w-5xl">
  
        <p className="text-[#C9A25B] tracking-[0.35em] uppercase text-xs mb-5">
          {eyebrow}
        </p>
  
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tight">
          {title}
        </h2>
  
        {description && (
          <p className="mt-8 text-lg text-white/55 max-w-xl leading-relaxed">
            {description}
          </p>
        )}
  
      </div>
    );
  }