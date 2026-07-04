import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DEMOS } from "@/data/demos";
import DemoLoader from "@/components/demo/DemoLoader";
import DemoBrowser from "@/components/demo/DemoBrowser";
import DemoSalesCTA from "@/components/demo/DemoSalesCTA";
import DemoSiteRenderer from "@/components/demo/DemoSiteRenderer";
function getAllDemos() {
  return Object.values(DEMOS).flat();
}

export default function DemoExperience() {
  const { slug } = useParams();
  const demo = useMemo(() => getAllDemos().find((item) => item.slug === slug), [slug]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  },[slug]);

  if (!demo) return <Navigate to="/" replace />;
  if (loading) return <DemoLoader demo={demo} />;

  return (
    <main className="min-h-screen bg-[#030008] text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-hidden">
      <div className="aurora aurora-purple left-[-220px] top-[8%] w-[560px] h-[560px] opacity-25" />
      <div className="aurora aurora-violet right-[-220px] bottom-[10%] w-[520px] h-[520px] opacity-20" />

      <div className="relative max-w-[1280px] mx-auto mb-5 sm:mb-7 flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to A-Designs
        </Link>
        <div className="hidden sm:block text-xs tracking-[0.24em] uppercase text-white/35">
          Designed by A-Designs
        </div>
      </div>

      <div className="relative">
        <DemoBrowser demo={demo}>
        <DemoSiteRenderer demo={demo} />        </DemoBrowser>
        <DemoSalesCTA demo={demo} />
      </div>
    </main>
  );
}
