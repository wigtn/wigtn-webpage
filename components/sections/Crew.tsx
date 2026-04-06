"use client";

import Image from "next/image";

export function Crew() {
  const scrollToAbout = () => {
    const aboutEl = document.getElementById("about");
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center relative snap-start">
      <div className="text-center px-6">
        <Image
          src="/wigtn_logo.png"
          alt="WIGTN"
          width={420}
          height={294}
          className="mx-auto mb-8 mix-blend-multiply"
          priority
        />
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          We prove ourselves by what we build, not how long we&apos;ve built.
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
}
