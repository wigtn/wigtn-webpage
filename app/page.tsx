import {
  Navigation,
  Crew,
  About,
  NowStrip,
  Achievements,
  LiveProducts,
  InDevelopment,
  ResearchAndOSS,
  Team,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAFAFA]">
      <Navigation />
      <Crew />
      <About />
      <NowStrip />
      <Achievements />
      <LiveProducts />
      <InDevelopment />
      <ResearchAndOSS />
      <Team />
      <Footer />
    </main>
  );
}
