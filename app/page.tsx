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
    <main className="relative h-screen overflow-y-auto snap-y snap-proximity bg-[#FAFAFA]">
      <Navigation />
      <Crew />
      <About />
      <Products />
      <FeaturedWork />
      <Team />
      <Footer />
    </main>
  );
}
