"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

type State = "idle" | "sending" | "sent";

export function ContactSection() {
  const [form,  setForm]  = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<State>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state !== "idle") return;
    setState("sending");

    setTimeout(() => {
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:hassanmezher084@gmail.com?subject=${encodeURIComponent("Portfolio contact")}&body=${encodeURIComponent(body)}`;
      setState("sent");
    }, 900);
  }

  const inputBase =
    "w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:opacity-30";
  const inputStyle = { borderColor: "var(--line)", color: "var(--foreground)" };

  const focusStyle = (accentVar: string) => ({
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = accentVar;
      e.currentTarget.style.boxShadow = `0 0 0 3px ${accentVar}18`;
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = "var(--line)";
      e.currentTarget.style.boxShadow = "none";
    },
  });

  return (
    <section id="contact" className="px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center lg:text-left"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--neon-pink)" }}>
            Contact
          </p>
          <h2
            className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl md:text-5xl"
            style={{ color: "var(--foreground)", fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Let&apos;s talk.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed mx-auto lg:mx-0" style={{ color: "var(--muted)" }}>
            Open to full-time roles, freelance projects, and interesting collaborations.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">

          {/* Left — Social links */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-4">
              {[
                {
                  icon: <Mail size={18} />,
                  label: "Email",
                  value: "hassanmezher084@gmail.com",
                  href: "mailto:hassanmezher084@gmail.com",
                },
                {
                  icon: <Linkedin size={18} />,
                  label: "LinkedIn",
                  value: "hassan-mezher",
                  href: "https://www.linkedin.com/in/hassan-mezher-7475b6304/",
                },
                {
                  icon: <Github size={18} />,
                  label: "GitHub",
                  value: "hassanlmezher",
                  href: "https://github.com/hassanlmezher",
                },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 hover:border-opacity-60 hover:-translate-y-0.5"
                  style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.02)" }}
                >
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-xl border"
                    style={{ borderColor: "var(--line)", color: "var(--muted)" }}
                  >
                    {icon}
                  </span>
                  <div>
                    <p className="text-xs font-medium" style={{ color: "var(--subtle)" }}>{label}</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div
              className="mt-8 rounded-2xl border p-5"
              style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="size-2 rounded-full" style={{ background: "var(--neon-green)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Available now</span>
              </div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Response time typically under 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-7"
            style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.02)" }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium" style={{ color: "var(--subtle)" }}>Name</span>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputBase}
                  style={inputStyle}
                  {...focusStyle("var(--neon-blue)")}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium" style={{ color: "var(--subtle)" }}>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={inputBase}
                  style={inputStyle}
                  {...focusStyle("var(--neon-blue)")}
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium" style={{ color: "var(--subtle)" }}>Message</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project or opportunity..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={`${inputBase} resize-none`}
                style={inputStyle}
                {...(focusStyle("var(--neon-blue)") as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              />
            </label>

            <button
              type="submit"
              disabled={state !== "idle"}
              className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
              style={{ background: "var(--neon-blue)" }}
            >
              {state === "idle"    && "Send message"}
              {state === "sending" && (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/30" style={{ borderTopColor: "white" }} />
                  Sending…
                </>
              )}
              {state === "sent" && "✓ Message sent!"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
