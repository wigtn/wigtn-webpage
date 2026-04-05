import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation, Footer } from "@/components/sections";
import { ProjectsIndex } from "./ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects | WIGTN",
  description:
    "Everything WIGTN has shipped — products, models, papers, open-source tools, and hackathon entries.",
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-[#FAFAFA]">
      <Navigation />
      <Suspense fallback={null}>
        <ProjectsIndex />
      </Suspense>
      <Footer />
    </main>
  );
}
