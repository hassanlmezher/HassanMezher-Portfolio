"use client";

import { usePortfolioStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

/* ── Endpoint catalogue ─────────────────────────────────────── */
const endpoints = [
  {
    method:      "GET",
    path:        "/profile",
    color:       "#00ff88",
    status:      200,
    description: "Returns a JSON object of Hassan's professional profile — name, role, education, experience, and focus areas.",
    response: `{
  "name": "Hassan Mezher",
  "role": "Full-Stack Web Developer",
  "education": "CS Graduate",
  "experience": "Hurdle Solutions",
  "focus": ["clean UI", "APIs", "shipping"]
}`,
  },
  {
    method:      "GET",
    path:        "/stack",
    color:       "#4d8fff",
    status:      200,
    description: "Returns the full technology dependency tree — client layer, server layer, and toolchain.",
    response: `{
  "CLIENT_LAYER": { "REACT": "^19", "NEXT_JS": "^16", ... },
  "SERVER_LAYER": { "NODE_JS": "^22", "EXPRESS": "^4", ... },
  "TOOLCHAIN": { "GIT": "^2", "PLAYWRIGHT": "^1", ... }
}`,
  },
  {
    method:      "GET",
    path:        "/projects",
    color:       "#ffb347",
    status:      200,
    description: "Returns an array of full-stack projects including Shopora, Family ToDo, and Notes API.",
    response: `[
  { "name": "Shopora", "type": "commerce", "status": 200 },
  { "name": "Family ToDo", "type": "productivity" },
  { "name": "Notes API", "type": "secure-data" }
]`,
  },
  {
    method:      "POST",
    path:        "/contact",
    color:       "#ff6b9d",
    status:      201,
    description: "Sends a message directly to Hassan. Required fields: name, email, message.",
    response: `{
  "status": "201 Created",
  "message": "Request received",
  "response_time": "<24h"
}`,
  },
];

/* ── Component ─────────────────────────────────────────────── */
export function ApiDocsDrawer() {
  const { docsDrawerOpen, setDocsDrawerOpen } = usePortfolioStore();

  return (
    <AnimatePresence>
      {docsDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={() => setDocsDrawerOpen(false)}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
            className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-4xl overflow-hidden rounded-t-3xl border-t border-x"
            style={{
              borderColor: "var(--glass-border)",
              background: "var(--surface-solid)",
              maxHeight: "85svh",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div
                className="h-1 w-10 rounded-full"
                style={{ background: "var(--line-bright)" }}
              />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between border-b px-6 py-4"
              style={{ borderColor: "var(--glass-border)" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c940]" />
                  </div>
                  <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                    api-docs.json — hassan-portfolio
                  </span>
                </div>
                <h2
                  className="text-xl font-bold tracking-tight"
                  style={{ color: "var(--foreground)", fontFamily: "var(--font-outfit), var(--font-inter)" }}
                >
                  API Reference
                </h2>
                <p className="mt-0.5 font-mono text-xs" style={{ color: "var(--muted)" }}>
                  Base URL: <span style={{ color: "var(--neon-blue)" }}>https://hassan-mezher.dev/api</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDocsDrawerOpen(false)}
                className="grid size-9 place-items-center rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: "var(--glass-border)",
                  background: "var(--surface)",
                  color: "var(--muted)",
                }}
                aria-label="Close API docs"
              >
                <X size={16} />
              </button>
            </div>

            {/* Endpoint list */}
            <div className="overflow-y-auto px-6 py-5" style={{ maxHeight: "calc(85svh - 120px)" }}>
              <div className="grid gap-4">
                {endpoints.map((ep) => (
                  <div
                    key={ep.path}
                    className="overflow-hidden rounded-2xl border transition-all duration-200 hover:scale-[1.005]"
                    style={{
                      borderColor: ep.color + "33",
                      background: ep.color + "08",
                    }}
                  >
                    {/* Endpoint header */}
                    <div
                      className="flex items-center justify-between border-b px-5 py-3"
                      style={{ borderColor: ep.color + "22" }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="rounded-md px-2.5 py-1 font-mono text-xs font-bold"
                          style={{ background: ep.color + "22", color: ep.color }}
                        >
                          {ep.method}
                        </span>
                        <span
                          className="font-mono text-sm font-semibold"
                          style={{ color: "var(--foreground)" }}
                        >
                          {ep.path}
                        </span>
                      </div>
                      <span
                        className="rounded-full border px-2.5 py-1 font-mono text-xs"
                        style={{
                          borderColor: "rgba(0,255,136,0.3)",
                          background: "rgba(0,255,136,0.08)",
                          color: "var(--neon-green)",
                        }}
                      >
                        {ep.status} {ep.status === 200 ? "OK" : "Created"}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="grid gap-4 p-5 sm:grid-cols-[1fr_1fr]">
                      <div>
                        <p className="font-mono text-xs mb-2" style={{ color: "var(--muted)" }}>
                          // Description
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                          {ep.description}
                        </p>
                        <a
                          href={`#${ep.path.replace("/", "")}`}
                          onClick={() => setDocsDrawerOpen(false)}
                          className="mt-3 inline-flex items-center gap-1 font-mono text-xs transition-colors hover:underline"
                          style={{ color: ep.color }}
                        >
                          View section <ArrowUpRight size={11} />
                        </a>
                      </div>
                      <div
                        className="overflow-hidden rounded-xl border p-3"
                        style={{ borderColor: "rgba(255,255,255,0.08)", background: "#030507" }}
                      >
                        <p className="font-mono text-xs mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                          // Example response
                        </p>
                        <pre
                          className="font-mono text-xs leading-5 overflow-auto"
                          style={{ color: "#86efac", whiteSpace: "pre-wrap" }}
                        >
                          {ep.response}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
