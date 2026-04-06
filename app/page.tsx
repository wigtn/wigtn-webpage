import {
  Navigation,
  Crew,
  About,
  Products,
  FeaturedWork,
  Team,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative h-screen overflow-y-auto snap-y snap-mandatory bg-[#FAFAFA]">
      <Navigation />
      <Crew />
      <About />
      <Products />

      {/* From here on: one snap point, then free px-based scrolling */}
      <div className="snap-start">
        <FeaturedWork />
        <Team />
        <Footer />
      </div>
    </main>
  );
}
