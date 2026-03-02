import {
  Navigation,
  Crew,
  About,
  Results,
  Team,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAFAFA]">
      <Navigation />
      <Crew />
      <About />
      <Results />
      <Team />
      <Footer />
    </main>
  );
}
