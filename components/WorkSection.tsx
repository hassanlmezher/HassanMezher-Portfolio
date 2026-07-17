"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Pause } from "lucide-react";

const projects = [
  {
    name: "Shopora",
    description:
      "Shopora is a modern, responsive multi-vendor storefront marketplace featuring dual merchant-admin portals, secure JWT authentication, and interactive shopping flows. The application utilizes a modern tech stack consisting of React, TypeScript, Vite, and Tailwind CSS on the client side, backed by an Express/Node.js API, a MongoDB database, and comprehensive automated test coverage via Playwright.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express", "MongoDB", "Playwright"],
    video: "/projects-video/shopora.mp4",
    accent: "#4d8fff",
    tag: "E-Commerce · Multi-Vendor",
    href: "https://github.com/hassanlmezher/shopora-project",
  },
  {
    name: "Salon Pastel",
    description:
      "Salon Pastel is a premium, mobile-first booking web application designed for a luxury salon, featuring an elegant user interface and a seamless appointment scheduling flow with dynamic availability calculation and timezone management. It was built using Next.js, React, TypeScript, and Tailwind CSS, with interactive animations powered by Framer Motion and database integration via Supabase.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase"],
    video: "/projects-video/salonPastel.mp4",
    accent: "#e879f9",
    tag: "Booking · Luxury",
    href: "https://github.com/hassanlmezher/Salon-Pastel",
  },
];

// ─── Video Player Card ────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
        setPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300"
      style={{
        borderColor: "var(--line)",
        background: "rgba(255,255,255,0.02)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = project.accent + "55";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.35)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* ── Video wrapper ───────────────────────────────────────── */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#060a14]">
        <video
          ref={videoRef}
          src={project.video}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(5,7,15,0.55))",
          }}
        />

        {/* Accent glow on bottom edge */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, ${project.accent}88, transparent)`,
          }}
        />

        {/* Controls: play button */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause video" : "Play video"}
            className="flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{
              borderColor: project.accent + "55",
              background: "rgba(5,7,15,0.65)",
              color: project.accent,
            }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
      </div>

      {/* ── Card body ───────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Tag */}
        <span
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: project.accent }}
        >
          {project.tag}
        </span>

        {/* Title */}
        <h3
          className="text-xl font-bold sm:text-2xl"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-outfit), sans-serif",
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className="mt-3 text-sm leading-relaxed sm:text-[0.9375rem]"
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>

        {/* Stack pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border px-2 py-0.5 text-xs"
              style={{
                borderColor: "var(--line)",
                color: "var(--subtle)",
                background: "var(--chip)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: project.accent }}
        >
          View on GitHub <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.article>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export function WorkSection() {
  return (
    <section id="work" className="px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center lg:text-left"
        >
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "var(--neon-green)" }}
          >
            Work
          </p>
          <h2
            className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl md:text-5xl"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-outfit), sans-serif",
            }}
          >
            Selected projects.
          </h2>
        </motion.div>

        {/* Project grid — single col on mobile, 2 cols on lg+ */}
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
