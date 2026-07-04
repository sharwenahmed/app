import Navbar from "./Navbar";
import Hero from "./Hero";
import SignatureMenu from "./SignatureMenu";
import Philosophy from "./Philosophy";
import ChefCraft from "./ChefCraft";
import PrivateDining from "./PrivateDining";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import Reservation from "./Reservation";
import Visit from "./Visit";
import Footer from "./Footer";
import FullMenu from "./FullMenu";
export default function MaisonNoir() {
  return (
    <main className="relative bg-[#050505] text-[#F5F2EB] overflow-x-hidden selection:bg-[#C9A25B] selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="pointer-events-none fixed inset-0 z-[59] bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,91,0.08),transparent_35%)]" />

      <Navbar />
      <Hero />
      <SignatureMenu />
      <FullMenu />
      <Philosophy />
      <ChefCraft />
      <PrivateDining />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Visit />
      <Footer />
    </main>
  );
}