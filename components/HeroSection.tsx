"use client";

import { usePortfolioStore } from "@/lib/store";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import dynamic from "next/dynamic";

const Hero3DScene = dynamic(() => import("./Hero3DScene").then(m => ({ default: m.Hero3DScene })), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export function HeroSection() {
  const { setDocsDrawerOpen } = usePortfolioStore();

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-64px)] items-center pt-8 lg:pt-0"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1fr_1.4fr] lg:gap-12 lg:py-0">

        {/* ── Left: Text content ── */}
        <div className="flex flex-col items-center text-center order-2 lg:order-1 lg:items-start lg:text-left">

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: "var(--line)", background: "var(--chip)" }}
          >
            <span
              className="size-1.5 rounded-full"
              style={{ background: "var(--neon-green)" }}
            />
            <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
              Available for opportunities
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-outfit), sans-serif",
            }}
          >
            Full-Stack
            <br />
            Developer
            <br />
            <span style={{ color: "var(--neon-blue)" }}>&amp; Designer.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-sm text-base leading-relaxed mx-auto lg:mx-0"
            style={{ color: "var(--muted)" }}
          >
            CS graduate building clean interfaces and reliable APIs.
            Currently at Hurdle Solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
              style={{
                background: "var(--neon-blue)",
                boxShadow: "0 4px 24px rgba(77,143,255,0.3)",
              }}
            >
              View my work
              <ArrowRight size={15} />
            </a>
            <a
              href="/Hassan_Mezher_CV.pdf"
              download="Hassan_Mezher_CV.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                borderColor: "var(--line-bright)",
                color: "var(--muted)",
                background: "var(--chip)",
              }}
            >
              <Download size={15} />
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex items-center justify-center gap-5 lg:justify-start"
          >
            {[
              { label: "GitHub",   href: "https://github.com/hassanlmezher" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/hassan-mezher-7475b6304/" },
              { label: "Email",    href: "mailto:hassanmezher084@gmail.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: "var(--subtle)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--foreground)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--subtle)")}
              >
                {label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right: 3D Globe ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative flex h-[450px] sm:h-[500px] w-full items-center justify-center overflow-visible order-1 lg:order-2 lg:h-auto lg:min-h-[600px]"
        >
          {/* Subtle glow ring behind globe */}
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              background: "radial-gradient(circle, rgba(77,143,255,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
              borderRadius: "50%",
            }}
          />
          {/* Mobile: fill the container; Desktop: overflow right for drama */}
          <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[120%]">
            <Hero3DScene />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
