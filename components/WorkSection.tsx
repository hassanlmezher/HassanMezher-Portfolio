"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name:        "Shopora",
    description: "Full-stack e-commerce platform with buyer, seller, and admin roles — shop approvals, product management, cart, checkout, and order history.",
    stack:       ["React", "TypeScript", "Express", "MongoDB"],
    mockup:      "/shopora_mockup.png",
    accent:      "#4d8fff",
    tag:         "E-Commerce",
    href:        "https://github.com/hassanlmezher",
  },
  {
    name:        "Family ToDo",
    description: "Collaborative task manager for groups — shared lists, member invites, task assignment, and a clean REST API.",
    stack:       ["React", "Zustand", "Express", "PostgreSQL"],
    mockup:      "/family_todo_mockup.png",
    accent:      "#00ff88",
    tag:         "Productivity",
    href:        "https://github.com/hassanlmezher",
  },
  {
    name:        "Notes API",
    description: "Secure notes app with JWT authentication, ownership checks, Prisma ORM, and Supabase Postgres.",
    stack:       ["Express", "Prisma", "Supabase", "PostgreSQL"],
    mockup:      "/notes_api_mockup.png",
    accent:      "#ffb347",
    tag:         "API / Backend",
    href:        "https://github.com/hassanlmezher",
  },
];

export function WorkSection() {
  return (
    <section id="work" className="px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center lg:text-left"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--neon-green)" }}>
            Work
          </p>
          <h2
            className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl md:text-5xl"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Selected projects.
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              className="group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: "var(--line)",
                background: "rgba(255,255,255,0.02)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = project.accent + "44";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Screenshot */}
              <div className="relative aspect-video overflow-hidden bg-[#060a14]">
                <Image
                  src={project.mockup}
                  alt={`${project.name} screenshot`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(5,7,15,0.6))" }}
                />
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-5">
                {/* Tag */}
                <span
                  className="mb-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: project.accent }}
                >
                  {project.tag}
                </span>

                <h3
                  className="text-lg font-bold"
                  style={{ color: "var(--foreground)", fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  {project.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {project.description}
                </p>

                {/* Stack pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border px-2 py-0.5 text-xs"
                      style={{ borderColor: "var(--line)", color: "var(--subtle)", background: "var(--chip)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: project.accent }}
                >
                  View on GitHub <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
