"use client";

import { Hero3DScene } from "@/components/Hero3DScene";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
  Server,
  Terminal,
  X,
} from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "API", href: "#api" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const contactLinks = {
  email: "hassanmezher084@gmail.com",
  linkedin: "https://www.linkedin.com/in/hassan-mezher-7475b6304/",
  github: "https://github.com/hassanlmezher",
  cv: "/Hassan_Mezher_CV.pdf",
};

const projects = [
  {
    name: "Shopora",
    endpoint: "/projects/shopora",
    type: "Full-stack commerce",
    description: "Buyer, seller, and admin flows with shop approvals, product control, favorites, cart, checkout, and order history.",
    stack: ["React", "TypeScript", "Zustand", "Express", "MongoDB", "Playwright"],
  },
  {
    name: "Family ToDo",
    endpoint: "/projects/family-todo",
    type: "Group productivity",
    description: "Shared groups, invited members, task lists, assigned responsibilities, and clean REST API boundaries.",
    stack: ["React", "Zustand", "Express", "PostgreSQL"],
  },
  {
    name: "Notes API",
    endpoint: "/projects/notes-api",
    type: "Secure data app",
    description: "Authentication, CRUD notes, ownership checks, Prisma schema design, Supabase Postgres, and API testing.",
    stack: ["React", "Express", "Prisma", "Supabase", "Postman"],
  },
];

const stack = {
  client: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
  server: ["Node.js", "Express.js", "REST APIs", "PostgreSQL", "MongoDB", "Prisma"],
  tools: ["Git", "GitHub", "Playwright", "Postman", "Vercel", "PM2"],
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

function Method({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "blue" | "orange" | "pink" }) {
  const color = {
    green: "text-lime-300",
    blue: "text-sky-300",
    orange: "text-orange-300",
    pink: "text-rose-300",
  }[tone];

  return <span className={`font-mono font-semibold ${color}`}>{children}</span>;
}

function ApiShell({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-[1.6rem] bg-[#101827] p-5 text-white shadow-[0_26px_80px_rgba(15,23,42,0.18)] ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <Database size={22} className="text-lime-300" />
        <span className="font-mono text-xs text-slate-400">{title}</span>
      </div>
      {children}
    </motion.div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">{children}</span>;
}

function Hero() {
  return (
    <section className="grid min-h-[calc(100svh-74px)] items-center px-5 pb-8 pt-8 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }} className="max-w-3xl">
          <motion.div variants={fadeUp} className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <Terminal size={15} className="text-blue-600" />
            portfolio.init()
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-7xl">
            Hassan Mezher builds clean web apps from UI to API.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Computer Science graduate and full-stack web developer focused on sharp interfaces, reliable backend logic, and practical product details.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#api" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600">
              Read the API
              <ArrowUpRight size={18} />
            </a>
            <a href={contactLinks.cv} download className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:border-slate-950">
              Download CV
              <Download size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}>
          <Hero3DScene />
        </motion.div>
      </div>
    </section>
  );
}

function StickyNav() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > window.innerHeight - 110);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 border-y border-slate-200 bg-white/88 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">HM</span>
          <span className="text-sm font-semibold text-slate-950">Hassan Mezher</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
              {item.label}
            </a>
          ))}
        </div>

        <a href={`mailto:${contactLinks.email}`} className="hidden min-h-10 items-center gap-2 rounded-full bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-slate-950 md:inline-flex">
          Contact
          <Mail size={16} />
        </a>

        <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-950 md:hidden">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-3 grid max-w-7xl gap-1 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl md:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              {item.label}
            </a>
          ))}
        </div>
      ) : null}

      <motion.div initial={false} animate={{ scaleX: stuck ? 1 : 0 }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-slate-950" />
    </div>
  );
}

function ApiSection() {
  return (
    <section id="api" className="px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <ApiShell title="GET /profile" className="lg:min-h-[330px]">
          <pre className="overflow-hidden font-mono text-sm leading-7 text-slate-300 sm:text-base">
            <span className="text-slate-500">{"{"}</span>
            {"\n  "}
            <span className="text-sky-300">&quot;name&quot;</span>: <span className="text-lime-300">&quot;Hassan Mezher&quot;</span>,
            {"\n  "}
            <span className="text-sky-300">&quot;role&quot;</span>: <span className="text-lime-300">&quot;Full-Stack Web Developer&quot;</span>,
            {"\n  "}
            <span className="text-sky-300">&quot;education&quot;</span>: <span className="text-lime-300">&quot;Computer Science Graduate&quot;</span>,
            {"\n  "}
            <span className="text-sky-300">&quot;experience&quot;</span>: <span className="text-lime-300">&quot;Hurdle Solutions · Remote&quot;</span>,
            {"\n  "}
            <span className="text-sky-300">&quot;focus&quot;</span>: [<span className="text-lime-300">&quot;clean UI&quot;</span>, <span className="text-lime-300">&quot;APIs&quot;</span>, <span className="text-lime-300">&quot;shipping&quot;</span>]
            {"\n"}
            <span className="text-slate-500">{"}"}</span>
          </pre>
        </ApiShell>

        <ApiShell title="GET /stack" className="lg:min-h-[330px]">
          <div className="grid gap-4">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                <p className="mb-3 font-mono text-sm text-lime-300">/{group}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ApiShell>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
              <span className="size-1.5 rounded-full bg-blue-600" />
              GET /projects
            </p>
            <h2 className="max-w-2xl text-balance text-4xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl">Selected work, reduced to signal.</h2>
          </div>
          <p className="max-w-sm text-slate-600">Three projects are enough here: one commerce system, one collaboration app, and one secure API-driven product.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="group rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,23,42,0.10)]"
            >
              <div className="mb-6 rounded-[1.3rem] bg-[#101827] p-4 font-mono text-sm text-white">
                <p className="mb-4 text-slate-500">200 OK</p>
                <p>
                  <Method tone={index === 0 ? "green" : index === 1 ? "blue" : "orange"}>GET</Method> {project.endpoint}
                </p>
              </div>
              <p className="text-sm font-semibold text-blue-600">{project.type}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">{project.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    window.location.href = `mailto:${contactLinks.email}?subject=${encodeURIComponent("Portfolio contact")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" className="px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[1.5rem] bg-[#101827] p-6 text-white">
          <Server className="text-lime-300" size={24} />
          <h2 className="mt-8 text-balance text-4xl font-semibold tracking-[-0.04em]">POST /contact</h2>
          <p className="mt-4 text-slate-300">Use this endpoint for roles, project ideas, or collaboration.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${contactLinks.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-950 hover:bg-lime-200">
              <Mail size={17} />
              Email
            </a>
            <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white hover:bg-white/10">
              <Linkedin size={17} />
              LinkedIn
            </a>
            <a href={contactLinks.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white hover:bg-white/10">
              <Github size={17} />
              GitHub
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid content-between gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Name
              <input name="name" required className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-600 focus:bg-white" />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-700">
              Email
              <input name="email" type="email" required className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none transition focus:border-blue-600 focus:bg-white" />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Message
            <textarea name="message" required className="min-h-32 resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-600 focus:bg-white" />
          </label>
          <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-slate-950 sm:w-fit">
            Send request
            <ArrowUpRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 px-5 py-6 text-sm text-slate-500 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Hassan Mezher.</p>
        <p className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-blue-600" />
          Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <StickyNav />
      <ApiSection />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}
