"use client";

import { usePortfolioStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "About",    href: "#api"     },
  { label: "Work",     href: "#work"    },
  { label: "Contact",  href: "#contact" },
];

export function Navbar() {
  const { theme, toggleTheme, mobileNavOpen, setMobileNavOpen } = usePortfolioStore();
  const barRef = useRef<HTMLDivElement>(null);

  // Sync theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("hm-theme") as "light" | "dark" | null;
    if (saved && saved !== theme) usePortfolioStore.getState().setTheme(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress  = docHeight > 0 ? scrollTop / docHeight : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors duration-300"
      style={{
        background: theme === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(5, 7, 15, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "var(--line)",
      }}
    >
      {/* Scroll progress bar */}
      <div
        ref={barRef}
        className="absolute bottom-0 left-0 h-px origin-left"
        style={{ width: "100%", background: "var(--neon-blue)", transform: "scaleX(0)" }}
      />

      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Wordmark */}
        <a
          href="#"
          className="text-sm font-bold tracking-tight"
          style={{ color: "var(--foreground)", fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Hassan<span style={{ color: "var(--neon-blue)" }}>.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-150 hover:opacity-100"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--foreground)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-lg border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: "var(--line)",
              background: "var(--chip)",
              color: "var(--muted)",
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a
            href="#contact"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-150 hover:opacity-90 md:block"
            style={{ background: "var(--neon-blue)", color: "#fff" }}
          >
            Get in touch
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg border md:hidden"
            style={{ borderColor: "var(--line)", background: "var(--chip)", color: "var(--muted)" }}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t md:hidden"
            style={{ borderColor: "var(--line)" }}
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileNavOpen(false)}
                className="mt-2 rounded-lg px-3 py-2.5 text-center text-sm font-semibold"
                style={{ background: "var(--neon-blue)", color: "#fff" }}
              >
                Get in touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
