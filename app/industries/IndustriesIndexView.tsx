"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { INDUSTRIES } from "@/lib/constants";

const CONSISTENCIES = [
  {
    label: "Engineering quality",
    body:
      "The same vetting bar applies whether we're staffing a community bank or a Series B SaaS team. We test on the actual work — code, design questions, judgment under ambiguity — not trivia.",
  },
  {
    label: "Compliance posture",
    body:
      "We treat audit logs, data handling, and contractor records as load-bearing artifacts. Every engagement carries the paperwork it needs, before it needs it.",
  },
  {
    label: "Placement honesty",
    body:
      "We tell candidates what the rate is and what the work really involves. We tell clients which submission feels strong and which feels like a stretch. Honest both ways, every time.",
  },
];

export function IndustriesIndexView() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-bone pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(27,27,27,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,27,27,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 35%, black 30%, transparent 80%)",
          }}
        />
        <Container size="default" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta flex items-center justify-center gap-3">
              <span className="size-1.5 rounded-full bg-terracotta animate-float-slow" />
              Industries
            </p>
            <h1 className="mt-7 heading-editorial text-[clamp(2.75rem,6.5vw,5.5rem)] text-ink">
              We&apos;ve placed engineers across{" "}
              <span className="heading-editorial-italic text-terracotta">
                five sectors
              </span>{" "}
              — each with its own grammar.
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-lg text-ink-muted leading-relaxed">
              The work changes — what a great QA engineer looks like inside a
              regional bank is not what they look like inside a marketplace
              platform. The judgment doesn&apos;t. We&apos;ve done enough of
              both to know the difference.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* GRID */}
      <section className="py-20 sm:py-28 bg-bone-50 border-y border-ink/[0.06]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {INDUSTRIES.map((industry, idx) => {
              const numeral = String(idx + 1).padStart(2, "0");
              const isFeature = idx === 0;
              return (
                <motion.div
                  key={industry.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={isFeature ? "lg:col-span-2" : ""}
                >
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="block group h-full"
                  >
                    <Card
                      variant="raised"
                      className={
                        isFeature
                          ? "p-10 sm:p-14 lg:p-16 h-full"
                          : "p-8 sm:p-10 h-full"
                      }
                    >
                      <div
                        className={
                          isFeature
                            ? "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                            : ""
                        }
                      >
                        <div className={isFeature ? "lg:col-span-7" : ""}>
                          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-terracotta">
                            № {numeral}
                            <span className="ml-3 text-ink-muted/60">
                              Sector
                            </span>
                          </p>
                          <h3
                            className={
                              isFeature
                                ? "mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink"
                                : "mt-5 heading-editorial text-3xl sm:text-4xl text-ink"
                            }
                          >
                            {industry.name}
                          </h3>
                          {isFeature && (
                            <p className="mt-4 font-display italic text-xl text-ink-muted/90 leading-snug max-w-md">
                              The most complex of the five — and the one we
                              know best.
                            </p>
                          )}
                        </div>

                        <div
                          className={
                            isFeature
                              ? "lg:col-span-5 lg:pl-6 lg:border-l lg:border-ink/[0.08]"
                              : "mt-5"
                          }
                        >
                          <p
                            className={
                              isFeature
                                ? "text-[1.02rem] text-ink-muted leading-relaxed"
                                : "text-[0.98rem] text-ink-muted leading-relaxed"
                            }
                          >
                            {industry.blurb}
                          </p>

                          <span className="mt-7 inline-flex items-center gap-1.5 text-sm text-terracotta-deep group-hover:text-terracotta transition-colors">
                            Read the deep dive
                            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* WHAT STAYS CONSISTENT */}
      <section className="py-24 sm:py-32 bg-bone">
        <Container size="wide">
          <div className="max-w-2xl mb-14">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
              The constants
            </p>
            <h2 className="mt-4 heading-editorial text-4xl sm:text-5xl text-ink">
              What stays consistent{" "}
              <span className="heading-editorial-italic text-terracotta">
                across sectors.
              </span>
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              Five industries, one discipline. The vocabulary changes — the
              judgment, the standards, the tone of the work — does not.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {CONSISTENCIES.map((c, idx) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted/80">
                  № {String(idx + 1).padStart(2, "0")} · {c.label}
                </p>
                <div className="mt-3 h-px w-10 bg-terracotta/60" />
                <p className="mt-5 text-[1.02rem] text-ink-muted leading-relaxed">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
