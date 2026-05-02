"use client";

import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pill } from "@/components/ui/Pill";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";
import { SERVICES } from "@/lib/constants";

const NAV_ITEMS = [
  { id: "qa", label: "QA Engineering", number: "01" },
  { id: "java", label: "Java Development", number: "02" },
];

const SERVICE_QUOTES: Record<string, string> = {
  "qa-engineering":
    "QA is not a phase at the end. It's the conscience of the build.",
  "java-development":
    "Backend work rewards patience. We staff for the long compile.",
};

const NOT_DOING = [
  "We don't run a body shop.",
  "We don't pretend to staff outside our two specializations.",
  "We don't poach engineers we've placed.",
  "We don't ghost candidates after submission.",
];

export default function ServicesPage() {
  return (
    <main className="bg-bone">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20">
        <Container size="wide" className="relative">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta inline-flex items-center gap-3"
            >
              <span className="size-1.5 rounded-full bg-terracotta" />
              Services
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="heading-editorial mt-7 text-[clamp(2.75rem,6.5vw,5.5rem)] text-ink"
            >
              Two specializations.{" "}
              <span className="heading-editorial-italic text-terracotta">
                Both, deep.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-ink-muted"
            >
              We staff QA Engineering and Java Development — and we leave the
              rest of the alphabet to firms who claim to do everything. Narrow
              focus is what makes a short list short. It's also what makes the
              list good.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button href="#qa" variant="primary" size="lg" withArrow>
                QA Engineering
              </Button>
              <Button href="#java" variant="outline" size="lg" withArrow>
                Java Development
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Sticky in-page nav + content */}
      <section className="relative pb-12">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Mobile pill row */}
            <nav
              aria-label="Services in-page navigation"
              className="lg:hidden sticky top-[68px] z-20 -mx-6 sm:-mx-8 px-6 sm:px-8 py-3 bg-bone/85 backdrop-blur border-y border-ink/[0.05]"
            >
              <ul className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {NAV_ITEMS.map((n) => (
                  <li key={n.id}>
                    <a
                      href={`#${n.id}`}
                      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-bone-200 text-ink-muted hover:text-ink ring-1 ring-ink/[0.06] font-mono text-[0.7rem] uppercase tracking-[0.16em] whitespace-nowrap"
                    >
                      <span className="text-terracotta">{n.number}</span>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop left rail */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-[88px]">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted/70 mb-5">
                  On this page
                </p>
                <ul className="space-y-1.5 border-l border-ink/[0.08]">
                  {NAV_ITEMS.map((n) => (
                    <li key={n.id}>
                      <a
                        href={`#${n.id}`}
                        className="group flex items-baseline gap-3 -ml-px pl-5 py-2 border-l border-transparent hover:border-terracotta transition-colors duration-300"
                      >
                        <span className="font-mono text-[0.7rem] tracking-[0.16em] text-terracotta">
                          {n.number}
                        </span>
                        <span className="font-display italic text-lg text-ink-muted group-hover:text-ink transition-colors">
                          {n.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-12 pt-8 border-t border-ink/[0.08]">
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Don't see what you need? We'd rather refer you out than
                    pretend.
                  </p>
                  <a
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-terracotta link-editorial"
                  >
                    Talk to us
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Service sections */}
            <div className="lg:col-span-9 space-y-24 sm:space-y-32">
              {SERVICES.map((svc, idx) => {
                const isQA = svc.slug === "qa-engineering";
                const accent = isQA ? "terracotta" : "moss";
                const number = String(idx + 1).padStart(2, "0");
                const anchorId = isQA ? "qa" : "java";

                return (
                  <motion.section
                    key={svc.slug}
                    id={anchorId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.7 }}
                    className="scroll-mt-28"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                      {/* Left: title + summary */}
                      <div className="lg:col-span-5">
                        <Eyebrow number={number} color={isQA ? "terracotta" : "moss"}>
                          {svc.name}
                        </Eyebrow>
                        <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl text-ink leading-[1.02]">
                          {svc.name.split(" ")[0]}{" "}
                          <span
                            className={`heading-editorial-italic ${
                              isQA ? "text-terracotta" : "text-moss-deep"
                            }`}
                          >
                            {svc.name.split(" ").slice(1).join(" ").toLowerCase()}.
                          </span>
                        </h2>
                        <p className="mt-6 text-[1.02rem] text-ink-muted leading-[1.8]">
                          {svc.summary}
                        </p>

                        <div className="mt-10 pl-5 border-l-2 border-ink/15">
                          <p
                            className={`font-display italic text-lg sm:text-xl leading-snug tracking-tight ${
                              isQA ? "text-terracotta-deep" : "text-moss-deep"
                            }`}
                          >
                            &ldquo;{SERVICE_QUOTES[svc.slug]}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Right: deliverables + roles */}
                      <div className="lg:col-span-7">
                        <div className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-7 sm:p-9">
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">
                            What we deliver
                          </p>
                          <ul className="mt-6 space-y-4">
                            {svc.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-3">
                                <span
                                  className={`mt-[3px] inline-flex items-center justify-center size-5 rounded-full ${
                                    accent === "terracotta"
                                      ? "bg-terracotta/12 text-terracotta-deep"
                                      : "bg-moss/15 text-moss-deep"
                                  }`}
                                >
                                  <Check className="size-3" strokeWidth={2.5} />
                                </span>
                                <span className="text-[0.98rem] text-ink leading-relaxed">
                                  {d}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-10 pt-8 border-t border-ink/[0.08]">
                            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">
                              Roles we place
                            </p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {svc.roles.map((r) => (
                                <Pill
                                  key={r}
                                  variant={isQA ? "terracotta" : "moss"}
                                >
                                  {r}
                                </Pill>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* What we don't do */}
      <section className="relative py-24 sm:py-32 mt-12 bg-bone-50 border-y border-ink/[0.05]">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <Eyebrow number="03">What we don't do</Eyebrow>
              <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl text-ink leading-[1.05]">
                Saying{" "}
                <span className="heading-editorial-italic text-terracotta">
                  no
                </span>{" "}
                is part of the work.
              </h2>
              <p className="mt-6 text-[1.02rem] text-ink-muted leading-relaxed">
                A short list of things we will not do, even when asked nicely.
                These aren't policies — they're the shape of the firm.
              </p>
            </div>

            <ul className="lg:col-span-7 space-y-6 sm:space-y-7">
              {NOT_DOING.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex items-baseline gap-5 pb-6 sm:pb-7 border-b border-ink/[0.08] last:border-b-0 last:pb-0"
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta shrink-0 mt-1">
                    №&nbsp;0{i + 1}
                  </span>
                  <p className="font-display italic text-2xl sm:text-3xl text-ink leading-snug tracking-tight">
                    {line}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
