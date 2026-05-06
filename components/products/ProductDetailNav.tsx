"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function ProductDetailNav() {
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAFAFA] border-b border-gray-200">
      <nav className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Back + Logo */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-violet transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.productDetail.back}</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/"
              aria-label="WIGTN — back to home"
              className="inline-flex items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/WIGTN_LOGO_NAVY.png"
                alt="WIGTN"
                width={1600}
                height={800}
                unoptimized
                className="h-[34px] w-auto"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
