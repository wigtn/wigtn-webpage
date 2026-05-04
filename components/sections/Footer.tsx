"use client";

import { SOCIAL_LINKS } from "@/constants";
import { GitHubIcon } from "@/components/ui/icons";

export function Footer() {

  return (
    <footer id="contact" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left - Logo & Tagline */}
          <div>
            <span className="text-xl font-bold text-foreground block">WIGTN</span>
            <span className="text-sm text-gray-400">
              We prove ourselves by what we build, not how long we&apos;ve built.
            </span>
          </div>

          {/* Right - Contact
              Opens Gmail's web compose window with the recipient
              pre-filled instead of relying on the OS mailto handler.
              A click that doesn't open *anything* (when no mailto
              handler is registered) reads as broken. Opens in a new
              tab so the user doesn't lose the WIGTN page on send. */}
          <div className="text-left md:text-right">
            <span className="text-sm text-gray-400 block mb-1">Contact us</span>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@wigtn.com"
              target="_blank"
              rel="noopener noreferrer"
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
