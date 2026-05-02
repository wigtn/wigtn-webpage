import {
  Navigation,
  Crew,
  Marquee,
  About,
  Pillars,
  Products,
  FeaturedWork,
  Team,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative h-screen overflow-y-auto bg-[#FAFAFA] scroll-smooth">
      <Navigation />
      <Crew />
      <Marquee />
      <FeaturedWork />
      <Pillars />
      <About />
      <Products />
      <Team />
      <Footer />
    </main>
  );
}
