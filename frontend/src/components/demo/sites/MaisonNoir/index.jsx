import Navbar from "./Navbar";
import Hero from "./Hero";
import OpeningArrivalGate from "./OpeningArrivalGate";
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
import SignatureToFullMenuTransition from "./SignatureToFullMenuTransition";
import ExperienceShell, { SceneChapter } from "./ExperienceShell";

const maisonNoirScenes = [
  {
    id: "top",
    number: "01",
    title: "Arrival",
    label: "Opening Scene",
    marker: "ARRIVAL",
    mood: "Black velvet / gold fire",
    accent: "rgba(201,162,91,0.55)",
    glowA: "rgba(201,162,91,0.18)",
    glowB: "rgba(255,112,42,0.14)",
    x: "50%",
    y: "20%",
  },
  {
    id: "menu",
    number: "02",
    title: "Signature",
    label: "Featured Plates",
    marker: "SIGNATURE",
    mood: "First taste / house icons",
    accent: "rgba(246,211,139,0.52)",
    glowA: "rgba(201,162,91,0.15)",
    glowB: "rgba(255,146,72,0.12)",
    x: "20%",
    y: "62%",
  },
  {
    id: "full-menu",
    number: "03",
    title: "Course Theater",
    label: "Full Menu",
    marker: "COURSES",
    mood: "Guided route / fire / cellar",
    accent: "rgba(201,162,91,0.62)",
    glowA: "rgba(255,92,38,0.15)",
    glowB: "rgba(201,162,91,0.16)",
    x: "78%",
    y: "56%",
  },
  {
    id: "story",
    number: "04",
    title: "Philosophy",
    label: "The Room",
    marker: "ROOM",
    mood: "Restraint / patience / atmosphere",
    accent: "rgba(201,162,91,0.48)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.06)",
    x: "36%",
    y: "44%",
  },
  {
    id: "chef",
    number: "05",
    title: "Craft",
    label: "Open Flame",
    marker: "FIRE",
    mood: "Knife / ember / precision",
    accent: "rgba(255,105,42,0.58)",
    glowA: "rgba(255,92,38,0.18)",
    glowB: "rgba(201,162,91,0.12)",
    x: "80%",
    y: "36%",
  },
  {
    id: "private",
    number: "06",
    title: "Private Dining",
    label: "The Cellar",
    marker: "CELLAR",
    mood: "Closed room / gold service",
    accent: "rgba(201,162,91,0.58)",
    glowA: "rgba(201,162,91,0.14)",
    glowB: "rgba(85,46,26,0.2)",
    x: "24%",
    y: "72%",
  },
  {
    id: "gallery",
    number: "07",
    title: "Gallery",
    label: "Visual Proof",
    marker: "DETAILS",
    mood: "Texture / smoke / glass",
    accent: "rgba(246,211,139,0.48)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.07)",
    x: "62%",
    y: "48%",
  },
  {
    id: "testimonials",
    number: "08",
    title: "Proof",
    label: "Guest Response",
    marker: "PROOF",
    mood: "Reputation / trust / memory",
    accent: "rgba(201,162,91,0.5)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.05)",
    x: "34%",
    y: "66%",
  },
  {
    id: "reserve",
    number: "09",
    title: "Reserve",
    label: "Book the Evening",
    marker: "RESERVE",
    mood: "Table held / room prepared",
    accent: "rgba(201,162,91,0.7)",
    glowA: "rgba(201,162,91,0.2)",
    glowB: "rgba(255,112,42,0.12)",
    x: "50%",
    y: "70%",
  },
  {
    id: "visit",
    number: "10",
    title: "Visit",
    label: "Final Details",
    marker: "VISIT",
    mood: "Address / hours / arrival",
    accent: "rgba(201,162,91,0.46)",
    glowA: "rgba(201,162,91,0.12)",
    glowB: "rgba(255,255,255,0.05)",
    x: "72%",
    y: "32%",
  },
];

export default function MaisonNoir() {
  return (
    <main className="relative bg-[#050505] text-[#F5F2EB] selection:bg-[#C9A25B] selection:text-black">
      <ExperienceShell scenes={maisonNoirScenes}>
        <div
          className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />        <div className="pointer-events-none fixed inset-0 z-[59] bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,91,0.08),transparent_35%)]" />

        <Navbar />

        <OpeningArrivalGate />

        <SceneChapter sceneId="top">
          <Hero />
        </SceneChapter>

        <SceneChapter sceneId="menu">
          <SignatureMenu />
        </SceneChapter>

        <SignatureToFullMenuTransition />

        <SceneChapter sceneId="full-menu">
          <FullMenu />
        </SceneChapter>
        <SceneChapter sceneId="story">
          <Philosophy />
        </SceneChapter>

        <SceneChapter sceneId="chef">
          <ChefCraft />
        </SceneChapter>

        <SceneChapter sceneId="private">
          <PrivateDining />
        </SceneChapter>

        <SceneChapter sceneId="gallery">
          <Gallery />
        </SceneChapter>

        <SceneChapter sceneId="testimonials">
          <Testimonials />
        </SceneChapter>

        <SceneChapter sceneId="reserve">
          <Reservation />
        </SceneChapter>

        <SceneChapter sceneId="visit">
          <Visit />
        </SceneChapter>

        <Footer />
      </ExperienceShell>
    </main>
  );
}
