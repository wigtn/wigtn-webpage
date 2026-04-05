import {
  Navigation,
  Crew,
  About,
  Products,
  OpenSource,
  Hackathon,
  Team,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAFAFA]">
      <Navigation />
      <Crew />
      <About />
      <Products />
      <OpenSource />
      <Hackathon />
      <Team />
      <Footer />
    </main>
  );
}
