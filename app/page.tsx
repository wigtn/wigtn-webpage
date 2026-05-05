import {
  Navigation,
  Crew,
  WhatWeDo,
  Categories,
  Team,
  Footer,
} from "@/components/sections";
import { BackgroundDecor } from "@/components/BackgroundDecor";

export default function Home() {
  return (
    <main className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#FAFAFA] scroll-smooth">
      {/* Inner relative wrapper grows to total content height so
          BackgroundDecor's absolute layer spans the full scroll, not just
          the viewport. */}
      <div className="relative">
        <BackgroundDecor />
        <Navigation />
        <Crew />
        <WhatWeDo />
        <Categories />
        <Team />
        <Footer />
      </div>
    </main>
  );
}
