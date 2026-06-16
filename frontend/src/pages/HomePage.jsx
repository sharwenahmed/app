```jsx
import React from "react";
// import useSmoothScroll from "@/hooks/useSmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import WhyModern from "@/components/sections/WhyModern";
import WhyADesigns from "@/components/sections/WhyADesigns";
import DemoGallery from "@/components/sections/DemoGallery";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import About from "@/components/sections/About";
import Founder from "@/components/sections/Founder";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  // useSmoothScroll();

  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <WhyModern />
        <WhyADesigns />
        <DemoGallery />
        <BeforeAfter />
        <Services />
        <Process />
        <Pricing />
        <About />
        <Founder />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
```
