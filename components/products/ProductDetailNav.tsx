"use client";

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
              className="text-xl font-bold text-foreground hover:text-violet transition-colors"
            >
              WIGTN
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
