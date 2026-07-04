import React, { Suspense, lazy } from "react";
import DemoPlaceholderSite from "@/components/demo/DemoPlaceholderSite";
import DemoLoader from "@/components/demo/DemoLoader";

const MaisonNoir = lazy(() => import("@/components/demo/sites/MaisonNoir"));

export default function DemoSiteRenderer({ demo }) {
  if (demo.slug === "luxury-steakhouse") {
    return (
      <Suspense fallback={<DemoLoader demo={demo} />}>
        <MaisonNoir />
      </Suspense>
    );
  }

  return <DemoPlaceholderSite demo={demo} />;
}