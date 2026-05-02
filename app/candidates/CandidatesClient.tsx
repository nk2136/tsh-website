"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/sections/CtaBand";
import { CandidateApplyForm } from "@/components/forms/CandidateApplyForm";
import { cn } from "@/lib/utils";

const BENEFITS = [
  {
    n: "01",
    title: "Honest representation",
    body:
      "We share the rate, the role, and the real story behind every submission. No 'great opportunity' euphemisms. If the bill rate is $95, you'll know — and you'll know our cut.",
  },
  {
    n: "02",
    title: "Vendor-network depth",
    body:
      "Six years of relationships with MSP and VMS partners means we walk into rooms most agencies never see. Better rooms, faster, with fewer middlemen between you and the hiring manager.",
  },
  {
    n: "03",
    title: "Interview prep with engineers",
    body:
      "Mock rounds led by working engineers, not script-readers. We prep system-design walkthroughs, behavioral framing, and the questions you should be asking back. You'll walk in calm.",
  },
  {
    n: "04",
    title: "RTR transparency",
    body:
      "You see every Right-to-Represent submission before it goes out — client name, rate, role spec. Nothing leaves our desk without your sign-off. Ever.",
  },
  {
    n: "05",
    title: "Long-arc support",
    body:
      "We check in at week one, month three, and month six. Not to upsell — to make sure the fit is real. If it isn't, we help you course-correct without burning the bridge.",
  },
  {
    n: "06",
    title: "Document portal access",
    body:
      "A secure place for your resume, RTRs, timesheets, and offer letters. Audit-grade history, accessible to you for as long as you want it. Yes, even after you leave us.",
  },
];

const TIMELINE = [
  {
    n: "01",
    label: "Apply",
    body:
      "You share a resume and book a 30-minute conversation. We don't run keyword searches — we listen. What you've built, what you'd avoid, what 'a good year' looks like for you.",
  },
  {
    n: "02",
    label: "Vetting",
    body:
      "We dig into the work, not the buzzwords. We discuss the kinds of roles you'd actually want — comp, stack, team shape, manager style — so when something fitting appears, we both already know.",
  },
  {
    n: "03",
    label: "Match",
    body:
      "When a real requirement lands that fits the profile we built together, we pitch it to you first. You see the rate, the client, the spec. If it's a no, we move on without drama.",
  },
  {
    n: "04",
    label: "Submit",
    body:
      "You approve every submission. We prep you — mock interviews, manager intel, the things the JD doesn't say. Then we represent you, and only you, into that role.",
  },
  {
    n: "05",
    label: "Place",
    body:
      "First-day onboarding, paperwork, a check-in at the end of week one. Then a real conversation at the six-month mark, on a coffee, not a calendar invite.",
  },
];

const FAQS = [
  {
    q: "Do I have to pay TSH anything?",
    a: "Never. Candidates pay zero — not for representation, not for interview prep, not for resume help. Our fees are paid by the client when we make a placement. If anyone in staffing tries to charge you a candidate-side fee, walk.",
  },
  {
    q: "How does the bill rate / pay rate spread work?",
    a: "On contract roles, the client pays a bill rate. You receive a pay rate. The spread covers our payroll, benefits, employer taxes, insurance, and our margin. We'll tell you both numbers before you sign anything — that's the deal.",
  },
  {
    q: "Can I see the rate before I'm submitted?",
    a: "Yes. You'll see the bill rate, the proposed pay rate, and the role spec on every Right-to-Represent. We don't submit anyone blind — that's how candidates end up underpriced and clients end up surprised.",
  },
  {
    q: "What if I'm already submitted by another vendor?",
    a: "Tell us upfront. We won't double-submit you — that puts the role at risk and damages your reputation with the hiring manager. If another agency has you in for a role, we'll find you a different one and circle back later.",
  },
  {
    q: "Will TSH share my resume without permission?",
    a: "No. Your resume stays in our private archive. It goes nowhere without an explicit Right-to-Represent for a specific client and role, signed by you. No 'flooding the market' to see what sticks.",
  },
  {
    q: "What if a role isn't right after I start?",
    a: "It happens — sometimes the team's shape only becomes clear once you're inside it. Tell us early. We've successfully transitioned engineers to other clients mid-engagement, and we've coached managers when the issue was fixable. Honesty travels faster than discomfort.",
  },
  {
    q: "What benefits do you offer?",
    a: "On W-2 contracts: medical, dental, vision, 401(k) with match after 90 days, PTO accrual, and paid holidays. On C2H, benefits start with us and continue with the client after conversion. We'll send a benefits summary the moment we make you an offer — not buried, not vague.",
  },
  {
    q: "How long does placement usually take?",
    a: "From first conversation to first day, the median is 3–5 weeks for engineers we've already vetted. The first call to vetting is 1–2 weeks. The right requirement showing up is the variable. We don't push roles to make our number — we wait for the right one.",
  },
];

export function CandidatesClient() {
  return (
    <>
      <Hero />
      <Benefits />
      <Timeline />
      <ApplySection />
      <Faq />
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 lg:pt-28 pb-20 sm:pb-28 lg:pb-36 bg-bone">
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
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta flex items-center gap-3"
            >
              <span className="size-1.5 rounded-full bg-terracotta animate-float-slow" />
              For engineers
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="heading-editorial mt-6 text-[clamp(2.75rem,7vw,6rem)] text-ink"
            >
              Placement, with the{" "}
              <span className="heading-editorial-italic text-terracotta">
                patience
              </span>{" "}
              to do it right.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-ink-muted"
            >
              You're not a CSV row. We work with QA, SDET, and Java engineers
              who want to be represented by people who can actually read their
              resume — and who'll wait for the right requirement instead of
              shoving you into the wrong one.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Button href="#apply" variant="primary" size="lg" withArrow>
                Apply now
              </Button>
              <Button href="/about" variant="outline" size="lg">
                Read our story
              </Button>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[440px] mx-auto lg:ml-auto lg:mr-0"
            >
              <div className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-3xl p-8 lg:p-10 shadow-paper">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted mb-5">
                  We place
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <Pill variant="terracotta">QA</Pill>
                  <Pill variant="terracotta">Java</Pill>
                  <Pill variant="terracotta">SDET</Pill>
                  <Pill variant="terracotta">Lead</Pill>
                </div>

                <blockquote className="font-display italic text-xl sm:text-2xl text-ink leading-snug tracking-tight">
                  &ldquo;They sent two roles in eight months. The second one
                  was the one. I'm still there.&rdquo;
                </blockquote>
                <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink-muted">
                  SDET · placed 2024
                </p>

                <div className="mt-8 pt-6 border-t border-ink/[0.08]">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-muted/70">
                    Fig. 02 — A profile that's actually read.
                  </p>
                </div>
              </div>

              <div
                aria-hidden
                className="absolute -z-10 -top-6 -right-6 size-24 rounded-full bg-terracotta/15 blur-2xl"
              />
              <div
                aria-hidden
                className="absolute -z-10 -bottom-8 -left-6 size-32 rounded-full bg-moss/15 blur-3xl"
              />
            </motion.aside>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Benefits() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-bone-50/60">
      <Container size="wide">
        <div className="max-w-2xl mb-14 sm:mb-20">
          <Eyebrow number="01">What you get with TSH</Eyebrow>
          <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
            Six things we do{" "}
            <span className="heading-editorial-italic text-terracotta">
              differently
            </span>
            .
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            Not a list of perks. A list of operating habits. Each one is a
            line in the contract you'll sign with us — most of which you've
            probably never seen from another agency.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {BENEFITS.map((b, i) => (
            <motion.li
              key={b.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group bg-bone ring-1 ring-ink/[0.06] rounded-3xl p-7 lg:p-8 hover:shadow-paper-lifted transition-shadow duration-500"
            >
              <span className="inline-flex items-center justify-center size-10 rounded-full bg-terracotta/10 ring-1 ring-terracotta/20 text-terracotta-deep font-mono text-[0.72rem] tracking-[0.14em] font-medium">
                {b.n}
              </span>
              <h3 className="mt-6 font-display text-2xl text-ink leading-tight tracking-tight">
                {b.title}
              </h3>
              <p className="mt-3 text-[0.95rem] text-ink-muted leading-relaxed">
                {b.body}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Timeline() {
  return (
    <section id="process" className="py-24 sm:py-32 lg:py-40 bg-bone">
      <Container size="wide">
        <div className="max-w-2xl mb-16 sm:mb-20">
          <Eyebrow number="02">How placement works</Eyebrow>
          <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
            Five steps,{" "}
            <span className="heading-editorial-italic text-terracotta">
              measured
            </span>{" "}
            in care.
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            We're not optimizing for time-to-fill. We're optimizing for the
            placement still being right at month nine. That changes the shape
            of the process, in ways that matter.
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-1 hidden lg:block" aria-hidden>
            <div className="sticky top-24 ml-3 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-terracotta/0 via-terracotta/40 to-moss/30" />
          </div>

          <ol className="lg:col-span-11 space-y-12 sm:space-y-16">
            {TIMELINE.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-10 items-baseline relative"
              >
                <div className="sm:col-span-3 flex sm:flex-col items-baseline sm:items-start gap-4 sm:gap-2">
                  <span className="font-display italic text-6xl sm:text-7xl text-terracotta leading-none">
                    {s.n}
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted">
                    Step {i + 1} of {TIMELINE.length}
                  </span>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="font-display text-3xl sm:text-4xl text-ink mb-3 tracking-tight">
                    {s.label}
                  </h3>
                  <p className="text-ink-muted leading-relaxed text-[1.02rem] max-w-2xl">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function ApplySection() {
  return (
    <section
      id="apply"
      className="py-24 sm:py-32 lg:py-40 bg-bone-50/60 relative overflow-hidden scroll-mt-20"
    >
      <div
        aria-hidden
        className="absolute -top-24 right-0 size-80 rounded-full bg-terracotta/10 blur-3xl pointer-events-none"
      />
      <Container size="default" className="relative">
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <Eyebrow number="03">Apply</Eyebrow>
          <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
            Apply in{" "}
            <span className="heading-editorial-italic text-terracotta">
              three steps.
            </span>
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            It takes about four minutes. A real person — not a parser — reads
            every application. We'll write back, even when the answer is
            &ldquo;not yet&rdquo;.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <CandidateApplyForm />
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted/70 font-mono">
          Your information is held privately. Resumes are never shared without
          a signed Right-to-Represent.
        </p>
      </Container>
    </section>
  );
}

function Faq() {
  const reduceMotion = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 lg:py-40 bg-bone">
      <Container size="default">
        <div className="max-w-2xl mb-14 sm:mb-20">
          <Eyebrow number="04">Frequently, frankly</Eyebrow>
          <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
            Questions{" "}
            <span className="heading-editorial-italic text-terracotta">
              worth answering
            </span>
            .
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            The ones we hear most often, answered the way we'd want them
            answered if we were on your side of the table.
          </p>
        </div>

        <ul className="divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
          {FAQS.map((faq, i) => {
            const open = openIdx === i;
            return (
              <li key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-start justify-between gap-6 py-6 sm:py-7 text-left group"
                >
                  <div className="flex items-baseline gap-4 sm:gap-5 min-w-0">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta shrink-0 mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl sm:text-2xl text-ink leading-snug tracking-tight">
                      {faq.q}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 size-9 rounded-full inline-flex items-center justify-center ring-1 ring-ink/10 text-ink-muted group-hover:text-ink group-hover:ring-ink/30 transition-all duration-300",
                      open && "rotate-180 bg-ink text-bone ring-ink"
                    )}
                  >
                    <ChevronDown className="size-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      initial={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={
                        reduceMotion
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1 }
                      }
                      exit={
                        reduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-12 sm:pl-14 pr-4 pb-7 max-w-3xl">
                        <p className="text-ink-muted leading-relaxed text-[1.02rem]">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <p className="mt-12 text-sm text-ink-muted">
          Didn't see yours?{" "}
          <Link
            href="/contact"
            className="text-ink link-editorial inline-flex items-center gap-1"
          >
            Ask us directly <ArrowUpRight className="size-3.5" />
          </Link>
        </p>
      </Container>
    </section>
  );
}
