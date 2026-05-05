import {
  Navigation,
  Crew,
  WhatWeDo,
  Categories,
  Team,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative h-screen overflow-y-auto overflow-x-hidden bg-[#FAFAFA] scroll-smooth">
      <Navigation />
      <Crew />
      <WhatWeDo />
      <Categories />
      <Team />
      <Footer />
    </main>
  );
}
