"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Sparkles,
  Users,
  Shield,
  Handshake,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pill } from "@/components/ui/Pill";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { ENGAGEMENT_MODELS, INDUSTRIES } from "@/lib/constants";
import { ClientRequestForm } from "@/components/forms/ClientRequestForm";

const REASONS = [
  {
    glyph: "01",
    icon: Sparkles,
    title: "Curated short lists",
    body:
      "We send three candidates, not thirty. Each one comes with written notes on why they fit — and where they might not. No spray-and-pray.",
  },
  {
    glyph: "02",
    icon: Users,
    title: "Engineers vetted by engineers",
    body:
      "Our screens are run by people who've shipped Java services and written automation suites. Resumes get read; code gets discussed.",
  },
  {
    glyph: "03",
    icon: Shield,
    title: "Compliance and payroll, handled",
    body:
      "Contracts, W-2s, 1099s, multi-state tax, background checks, e-Verify. You get an engineer on Monday; we keep the back office quiet.",
  },
  {
    glyph: "04",
    icon: Handshake,
    title: "A representation pact",
    body:
      "We don't poach our own placements. Every engineer we put on your team is off-limits to our outreach for the duration of the engagement.",
  },
];

const PROCESS = [
  {
    label: "Brief",
    detail:
      "A 30-minute discovery call. We learn the role, the team, and the bar.",
  },
  {
    label: "Source",
    detail:
      "Vendor-network depth and direct outreach. We know the rooms — and the people in them.",
  },
  {
    label: "Vet",
    detail:
      "Engineers screen engineers. Reference checks land before submission, not after.",
  },
  {
    label: "Present",
    detail:
      "A short list — usually three candidates. Each one written up with notes you can forward.",
  },
  {
    label: "Place",
    detail:
      "Onboarding support, day-30 check-in, six-month review. We stay on the line.",
  },
];

const CLIENT_QUOTES = [
  {
    tag: "FINANCE",
    body: "First short list in eleven days. Two of three made it to onsite.",
  },
  {
    tag: "HEALTHCARE",
    body: "They flagged a HIPAA gap in our JD before sourcing. Saved us a quarter.",
  },
  {
    tag: "RETAIL",
    body: "Six engineers in three quarters. Same bar each time. No surprises.",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ClientsPage() {
  return (
    <main className="bg-bone">
      {/* ============================================================
          HERO
         ============================================================ */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 lg:pt-28 pb-20 sm:pb-28 lg:pb-36">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(27,27,27,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,27,27,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 80%)",
          }}
        />

        <Container size="wide" className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta flex items-center gap-3"
              >
                <span className="size-1.5 rounded-full bg-terracotta animate-float-slow" />
                For hiring teams
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: easeOut }}
                className="heading-editorial mt-6 text-[clamp(2.6rem,6.8vw,5.8rem)] text-ink"
              >
                Hire engineers who were{" "}
                <span className="heading-editorial-italic text-terracotta">
                  chosen,
                </span>
                <br />
                not shuffled.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: easeOut }}
                className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-ink-muted"
              >
                A staffing partner that treats your role like its own. We send
                short lists, not stacks. Every candidate is briefed, vetted, and
                accountable — and so are we.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.32, ease: easeOut }}
                className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <Button href="#request" variant="primary" size="lg" withArrow>
                  Request talent
                </Button>
                <Button href="#process" variant="ghost" size="lg">
                  How we work
                </Button>
                <a
                  href="/about"
                  className="ml-2 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink link-editorial"
                >
                  Or read our story
                  <ArrowUpRight className="size-3.5" />
                </a>
              </motion.div>
            </div>

            {/* Testimonial card */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
              >
                <Card
                  variant="paper"
                  className="relative p-8 sm:p-10 overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent"
                  />
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-muted/70 mb-6">
                    What clients tell us
                  </p>
                  <ul className="space-y-6">
                    {CLIENT_QUOTES.map((q) => (
                      <li key={q.tag} className="flex gap-4">
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-terracotta-deep shrink-0 pt-[2px] w-[5.5rem]">
                          {q.tag} —
                        </span>
                        <span className="font-display italic text-[1.05rem] text-ink leading-snug">
                          &ldquo;{q.body}&rdquo;
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-ink/[0.06] flex items-baseline justify-between">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted/60">
                      Anonymized · with permission
                    </p>
                    <span className="font-display italic text-sm text-ink-muted">
                      Fig. 02
                    </span>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          WHY TSH — 4 reasons
         ============================================================ */}
      <section className="py-24 sm:py-32 lg:py-40 relative">
        <Container size="wide">
          <div className="max-w-2xl mb-14 sm:mb-20">
            <Eyebrow number="01">Why companies hire through TSH</Eyebrow>
            <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
              Quiet posture.{" "}
              <span className="heading-editorial-italic text-terracotta">
                Loud results.
              </span>
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              We&rsquo;re not the biggest staffing firm you&rsquo;ll meet. We&rsquo;re
              the one you&rsquo;ll keep calling. Here&rsquo;s what changes when you
              hire through us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {REASONS.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    duration: 0.65,
                    delay: i * 0.08,
                    ease: easeOut,
                  }}
                >
                  <Card
                    variant="raised"
                    className="h-full p-8 sm:p-10 group transition-all duration-500"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="size-12 rounded-2xl bg-terracotta/10 ring-1 ring-terracotta/20 inline-flex items-center justify-center text-terracotta-deep">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-display italic text-3xl text-terracotta/40 leading-none">
                        {r.glyph}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-[1.65rem] text-ink leading-tight tracking-tight mb-4">
                      {r.title}
                    </h3>
                    <p className="text-[0.95rem] text-ink-muted leading-relaxed">
                      {r.body}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================
          ENGAGEMENT MODELS
         ============================================================ */}
      <section className="py-24 sm:py-32 lg:py-40 bg-ash/40 relative">
        <Container size="wide">
          <div className="max-w-2xl mb-14 sm:mb-20">
            <Eyebrow number="02">Engagement models</Eyebrow>
            <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
              Three shapes.{" "}
              <span className="heading-editorial-italic text-terracotta">
                One standard
              </span>{" "}
              of care.
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              How you bring an engineer onto your team should bend to your
              hiring posture, not ours. Pick the model that fits the role —
              we&rsquo;ll deliver the same craft either way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            {ENGAGEMENT_MODELS.map((m, i) => {
              const bestFor = m.detail.replace(/^Best for:\s*/i, "");
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: easeOut,
                  }}
                >
                  <Card
                    variant="paper"
                    className="h-full p-8 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col"
                  >
                    <div
                      aria-hidden
                      className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-terracotta/40 to-transparent"
                    />
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
                      Model {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-5 font-display italic text-3xl sm:text-4xl text-ink leading-[1.05] tracking-tight">
                      {m.label}
                    </h3>
                    <p className="mt-6 text-[0.98rem] text-ink-muted leading-relaxed flex-grow">
                      {m.summary}
                    </p>
                    <div className="mt-8 pt-6 border-t border-ink/[0.06]">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-moss-deep mb-2">
                        Best for
                      </p>
                      <p className="font-display italic text-[1.05rem] text-ink leading-snug">
                        {bestFor}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============================================================
          PROCESS
         ============================================================ */}
      <section
        id="process"
        className="py-24 sm:py-32 lg:py-40 bg-bone scroll-mt-24"
      >
        <Container size="wide">
          <div className="max-w-2xl mb-16 sm:mb-20">
            <Eyebrow number="03">Our process</Eyebrow>
            <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
              Brief{" "}
              <span className="text-ink/30">·</span> Source{" "}
              <span className="text-ink/30">·</span>{" "}
              <span className="heading-editorial-italic text-terracotta">
                Vet
              </span>{" "}
              <span className="text-ink/30">·</span> Present{" "}
              <span className="text-ink/30">·</span> Place
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              Five steps from the first call to your engineer&rsquo;s six-month
              review. No black boxes, no hand-offs to a junior recruiter.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12 relative">
            <div
              aria-hidden
              className="absolute top-7 left-7 right-7 h-px bg-gradient-to-r from-terracotta/30 via-ink/15 to-moss/30 hidden lg:block"
            />
            {PROCESS.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-display italic text-5xl text-terracotta leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-muted">
                    Step {i + 1} of 5
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink mb-2">
                  {step.label}
                </h3>
                <p className="text-[0.95rem] text-ink-muted leading-relaxed max-w-[28ch]">
                  {step.detail}
                </p>
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ============================================================
          INDUSTRIES STRIP
         ============================================================ */}
      <section className="py-20 sm:py-24 bg-bone-200/60 border-y border-ink/[0.05]">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
            <div className="max-w-md">
              <Eyebrow number="04">Industries served</Eyebrow>
              <h2 className="mt-4 heading-editorial text-3xl sm:text-4xl text-ink">
                Where we&rsquo;ve{" "}
                <span className="heading-editorial-italic text-terracotta">
                  done the work.
                </span>
              </h2>
            </div>
            <p className="text-[0.95rem] text-ink-muted leading-relaxed max-w-md">
              We&rsquo;ve placed engineers across these five sectors. Each one
              comes with its own vocabulary, regulatory weight, and definition
              of &ldquo;done.&rdquo;
            </p>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {INDUSTRIES.map((ind, i) => (
              <motion.li
                key={ind.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group block bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl px-5 py-5 hover:ring-ink/15 hover:bg-bone transition-all duration-300"
                >
                  <Pill variant="default" className="mb-4">
                    № {String(i + 1).padStart(2, "0")}
                  </Pill>
                  <p className="font-display text-[1.05rem] text-ink leading-tight">
                    {ind.name}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-terracotta-deep group-hover:gap-2 transition-all">
                    Read more
                    <ArrowUpRight className="size-3" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ============================================================
          REQUEST FORM
         ============================================================ */}
      <section
        id="request"
        className="py-24 sm:py-32 lg:py-40 bg-bone scroll-mt-24"
      >
        <Container size="default">
          <div className="max-w-2xl mb-12 sm:mb-16">
            <Eyebrow number="05">Request talent</Eyebrow>
            <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
              Request{" "}
              <span className="heading-editorial-italic text-terracotta">
                talent.
              </span>
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              One short form. A real person reads every submission — usually
              within the same business day. The more context you give us, the
              tighter the short list.
            </p>
          </div>

          <ClientRequestForm />

          <p className="mt-8 text-sm text-ink-muted/80 max-w-xl leading-relaxed">
            Prefer email? Write to{" "}
            <a
              href="mailto:hello@techstaffinghub.com"
              className="text-ink underline underline-offset-4 decoration-terracotta decoration-1 hover:decoration-2 transition-all"
            >
              hello@techstaffinghub.com
            </a>{" "}
            with a JD and a sense of urgency. We answer with a plan, not a
            template.
          </p>
        </Container>
      </section>

      {/* ============================================================
          CTA BAND
         ============================================================ */}
      <CtaBand />
    </main>
  );
}
