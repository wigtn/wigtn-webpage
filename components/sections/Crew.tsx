"use client";

import Image from "next/image";
export function Crew() {

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
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
    </section>
  );
}
