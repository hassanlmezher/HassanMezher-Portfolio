"use client";

import { motion } from "framer-motion";
import { User, Code, GraduationCap, Briefcase, MapPin, Sparkles, Layout, Server, Wrench } from "lucide-react";

const skills = [
  {
    group: "Frontend",
    icon: <Layout size={18} />,
    color: "var(--neon-blue)",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
  },
  {
    group: "Backend",
    icon: <Server size={18} />,
    color: "var(--neon-green)",
    items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    group: "Toolchain",
    icon: <Wrench size={18} />,
    color: "var(--neon-amber)",
    items: ["Git", "Supabase", "Playwright", "Postman", "Figma", "Vercel"],
  },
];

const facts = [
  { label: "Name",       value: "Hassan Mezher",            icon: <User size={16} /> },
  { label: "Role",       value: "Full-Stack Developer",     icon: <Code size={16} /> },
  { label: "Education",  value: "CS Graduate",              icon: <GraduationCap size={16} /> },
  { label: "Experience", value: "Hurdle Solutions",         icon: <Briefcase size={16} /> },
  { label: "Location",   value: "Remote",                   icon: <MapPin size={16} /> },
  { label: "Focus",      value: "Clean UI · Reliable APIs", icon: <Sparkles size={16} /> },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function ApiSection() {
  return (
    <section id="api" className="px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center lg:text-left"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--neon-blue)" }}>
            About
          </p>
          <h2
            className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl md:text-5xl"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Who I am.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed mx-auto lg:mx-0" style={{ color: "var(--muted)" }}>
            A full-stack developer who cares about both the pixel and the query plan. I build products end-to-end — from design system to deployment.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">

          {/* Left — Profile facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1"
            style={{ 
              borderColor: "var(--line)", 
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(77,143,255,0.3)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px -10px rgba(77,143,255,0.15)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div className="p-6 sm:p-8">
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest sm:mb-8" style={{ color: "var(--subtle)" }}>
                Profile
              </p>
              <dl className="space-y-6">
                {facts.map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-3 text-sm font-medium" style={{ color: "var(--subtle)" }}>
                      <span className="grid size-8 place-items-center rounded-lg bg-white/5" style={{ color: "var(--muted)" }}>
                        {icon}
                      </span>
                      {label}
                    </dt>
                    <dd className="text-sm font-semibold text-right" style={{ color: "var(--foreground)" }}>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 border-t pt-8" style={{ borderColor: "var(--line)" }}>
                <div className="inline-flex items-center gap-2.5 rounded-full border px-4 py-2" style={{ borderColor: "var(--line)", background: "rgba(0,255,136,0.05)" }}>
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "var(--neon-green)" }}></span>
                    <span className="relative inline-flex size-2.5 rounded-full" style={{ background: "var(--neon-green)" }}></span>
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--neon-green)" }}>Open to full-time &amp; freelance</span>
                </div>
              </div>
            </div>
            
            {/* Top gradient glow overlay */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--neon-blue)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-50" />
          </motion.div>

          {/* Right — Skills */}
          <div className="grid gap-6 sm:grid-cols-3">
            {skills.map((group, i) => (
              <motion.div
                key={group.group}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1"
                style={{ 
                  borderColor: "var(--line)", 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = group.color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px -10px ${group.color}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center gap-3 sm:mb-6">
                    <span className="grid size-10 place-items-center rounded-xl" style={{ background: `${group.color}15`, color: group.color }}>
                      {group.icon}
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--foreground)" }}>
                      {group.group}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                        style={{ borderColor: "var(--line)", color: "var(--muted)", background: "rgba(255,255,255,0.02)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
                          (e.currentTarget as HTMLElement).style.borderColor = group.color;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Top gradient glow overlay */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-50" style={{ color: group.color }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
