"use client";

export function Footer() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm" style={{ color: "var(--subtle)" }}>
          © 2026 Hassan Mezher
        </span>
        <span className="text-xs" style={{ color: "var(--subtle)" }}>
          Built with Next.js · TypeScript · Tailwind · Framer Motion · Three.js
        </span>
      </div>
    </footer>
  );
}
