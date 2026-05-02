"use client";

import { SOCIAL_LINKS } from "@/constants";
import { GitHubIcon } from "@/components/ui/icons";

export function Footer() {

  return (
    <footer className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left - Logo & Tagline */}
          <div>
            <span className="text-xl font-bold text-foreground block">WIGTN</span>
            <span className="text-sm text-gray-400">
              We prove ourselves by what we build, not how long we&apos;ve built.
            </span>
          </div>

          {/* Right - Contact */}
          <div className="text-left md:text-right">
            <span className="text-sm text-gray-400 block mb-1">Contact us</span>
            <a
              href="mailto:contact@wigtn.com"
              className="text-foreground hover:text-violet transition-colors"
            >
              contact@wigtn.com
            </a>
          </div>
        </div>

        {/* Bottom - Copyright & GitHub */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="text-gray-400 text-sm">
            We build fast. We ship real products. &copy; {new Date().getFullYear()} WIGTN
          </span>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet transition-colors"
          >
            <span>GitHub</span>
            <GitHubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
