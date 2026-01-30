"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants";
import { LANGUAGES } from "@/constants/translations";
import { useLanguage } from "@/lib/i18n";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Find current active section
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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#FAFAFA] ${
          isScrolled ? "border-b border-gray-200" : ""
        }`}
      >
        <nav className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-xl font-bold text-foreground hover:text-violet transition-colors"
            >
              WIGTN
            </a>

            {/* Right: Desktop Menu + Language */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm transition-colors ${
                    activeSection === item.id
                      ? "text-violet font-medium"
                      : "text-gray-600 hover:text-violet"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Language Selector */}
              <div className="flex items-center gap-1 text-sm text-gray-500 border-l border-gray-300 pl-5">
                {LANGUAGES.map((lang, index) => (
                  <span key={lang.code} className="flex items-center">
                    <button
                      onClick={() => setLanguage(lang.code)}
                      className={`transition-colors ${
                        language === lang.code
                          ? "text-violet font-medium"
                          : "hover:text-violet"
                      }`}
                    >
                      {lang.short}
                    </button>
                    {index < LANGUAGES.length - 1 && (
                      <span className="mx-1 text-gray-300">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#FAFAFA] pt-20 md:hidden">
          <nav className="flex flex-col items-center gap-6 px-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleMobileNavClick}
                className={`text-lg transition-colors ${
                  activeSection === item.id
                    ? "text-violet font-medium"
                    : "text-foreground hover:text-violet"
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Language Selector */}
            <div className="flex items-center gap-2 mt-4 text-sm">
              {LANGUAGES.map((lang, index) => (
                <span key={lang.code} className="flex items-center">
                  <button
                    onClick={() => setLanguage(lang.code)}
                    className={`transition-colors ${
                      language === lang.code
                        ? "text-violet font-medium"
                        : "text-gray-500 hover:text-violet"
                    }`}
                  >
                    {lang.short}
                  </button>
                  {index < LANGUAGES.length - 1 && (
                    <span className="mx-2 text-gray-300">|</span>
                  )}
                </span>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
