"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const updateActiveSection = useCallback(() => {
    // The scroll container is <main>, not window
    const main = document.querySelector("main");
    if (!main) return;

    const scrollTop = main.scrollTop;
    setIsScrolled(scrollTop > 50);

    const sections = NAV_ITEMS.map(item => item.id);
    let currentSection = "";

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = sectionId;
        }
      }
    }

    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    main.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => main.removeEventListener("scroll", updateActiveSection);
  }, [updateActiveSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.querySelector("main");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
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
            <a
              href="#"
              onClick={handleLogoClick}
              className="text-xl font-bold text-foreground hover:text-violet transition-colors"
            >
              WIGTN
            </a>

            <div className="hidden md:flex items-center gap-5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-sm transition-colors ${
                    activeSection === item.id
                      ? "text-violet font-medium"
                      : "text-gray-600 hover:text-violet"
                  }`}
                >
                  {item.label}
                </a>
              ))}
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
        <div className="fixed inset-0 z-30 bg-[#FAFAFA] pt-20 md:hidden">
          <nav className="flex flex-col items-center gap-6 px-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`text-lg transition-colors ${
                  activeSection === item.id
                    ? "text-violet font-medium"
                    : "text-foreground hover:text-violet"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
