"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants";
import type { NavItem } from "@/types";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollIds = NAV_ITEMS.filter((item): item is NavItem & { id: string } =>
    Boolean(item.id),
  ).map((item) => item.id);

  const updateActiveSection = useCallback(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const scrollTop = main.scrollTop;
    setIsScrolled(scrollTop > 50);

    let currentSection = "";

    for (const sectionId of scrollIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = sectionId;
        }
      }
    }

    setActiveSection(currentSection);
    // scrollIds is derived from a static module-level constant, so its
    // reference identity is stable for the lifetime of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    // rAF-throttle the scroll handler so we run at most one
    // getBoundingClientRect sweep per frame even when the browser fires
    // dozens of scroll events per wheel tick. Without this, every scroll
    // pixel was triggering N section measurements + a setState round-trip.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateActiveSection();
      });
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    updateActiveSection();
    return () => {
      main.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [updateActiveSection]);

  const handleScrollClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  // On the home page the logo scrolls back to the top of the snap container
  // (Next's <Link> alone wouldn't scroll the inner <main>, only the window).
  // Off-home, fall through so <Link> handles the route change normally.
  const handleLogoClick = (e: React.MouseEvent) => {
    if (!isHome) return;
    e.preventDefault();
    const main = document.querySelector("main");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderNavLink = (item: NavItem, mobile = false) => {
    const baseClass = mobile
      ? "block w-full py-5 text-2xl font-semibold tracking-tight transition-colors"
      : "text-sm transition-colors";
    const isActive = item.id ? activeSection === item.id : false;
    const stateClass = isActive
      ? "text-violet font-semibold"
      : mobile
        ? "text-foreground hover:text-violet"
        : "text-gray-600 hover:text-violet";

    if (item.href) {
      return (
        <Link
          key={item.label}
          href={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`${baseClass} ${stateClass}`}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        key={item.label}
        href={`#${item.id}`}
        onClick={(e) => handleScrollClick(e, item.id!)}
        className={`${baseClass} ${stateClass}`}
      >
        {item.label}
      </a>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#FAFAFA] ${
          isScrolled ? "border-b border-gray-200" : ""
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="text-xl font-bold text-foreground hover:text-violet transition-colors"
            >
              WIGTN
            </Link>

            <div className="hidden md:flex items-center gap-5">
              {NAV_ITEMS.map((item) => renderNavLink(item))}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-white pt-20 md:hidden shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
        >
          {/* Thin violet seam at the top of the panel — separates the menu
              from the header so the white-on-white doesn't blur. */}
          <div
            aria-hidden
            className="absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/30 to-transparent"
          />
          <nav className="flex flex-col px-6 pt-2 divide-y divide-black/[0.07]">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>{renderNavLink(item, true)}</div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
