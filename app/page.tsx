import {
  Navigation,
  Crew,
  About,
  WhatWeDo,
  Products,
  Plugins,
  Team,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FAFAFA]">
      <Navigation />
      <Crew />
      <About />
      <WhatWeDo />
      <Products />
      <Plugins />
      <Team />
      <Footer />
    </main>
  );
}
