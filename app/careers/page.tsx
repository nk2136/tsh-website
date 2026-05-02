import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllRoles } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles on the TSH internal team — recruiters, interview helpers, and operations. We hire deliberately for our own house, the same way we hire for clients.",
};

const WHY = [
  {
    title: "Calm, not breathless.",
    body: "We don't run on quarterly hair-on-fire. The pace is deliberate, the deadlines real but reasonable, and the calendar is mostly your own.",
  },
  {
    title: "No-bullshit metrics.",
    body: "We measure retention, not submissions-per-week. We share comp ranges with the team. We don't gamify anyone's pipeline.",
  },
  {
    title: "Respect for engineers.",
    body: "Half our team came from engineering. We treat candidates the way we'd want to be treated — which means honest rates, plain English, and nobody gets ghosted.",
  },
  {
    title: "Ownership, not theater.",
    body: "Small team, real autonomy. If you spot something broken, you get to fix it. If you spot something working, you get to write it down.",
  },
];

const HIRING_STEPS = [
  {
    label: "Intro call",
    detail:
      "Thirty minutes. We learn your story, you learn ours. No homework, no whiteboard.",
  },
  {
    label: "Deep-dive convo",
    detail:
      "Ninety minutes with two TSH folks. Real situations, your actual approach. Comp bands shared.",
  },
  {
    label: "Paid trial week",
    detail:
      "One real week of work, paid at offer rate. We both find out if this fits.",
  },
  {
    label: "Offer",
    detail:
      "Plain language. Numbers up front. We expect you to negotiate. We won't lowball.",
  },
];

export default function CareersIndexPage() {
  const roles = getAllRoles();

  return (
    <>
      <section className="relative bg-bone pt-20 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(27,27,27,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,27,27,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
        <Container size="wide" className="relative">
          <div className="max-w-3xl">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-terracotta" />
              Careers at TSH
            </p>
            <h1 className="heading-editorial mt-6 text-[clamp(2.75rem,7vw,5.75rem)] text-ink">
              Working{" "}
              <span className="heading-editorial-italic text-terracotta">
                at
              </span>{" "}
              TSH,
              <br />
              not through TSH.
            </h1>
            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-ink-muted max-w-2xl">
              This page is for joining the TSH internal team — recruiters,
              interview helpers, and operations. If you're an engineer looking
              to be{" "}
              <em className="font-display italic">placed</em> through TSH,
              you're looking for{" "}
              <Link
                href="/candidates"
                className="text-ink underline underline-offset-4 decoration-terracotta decoration-1 hover:decoration-2 transition-all"
              >
                our candidates page
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <section className="relative py-20 sm:py-28">
        <Container size="wide">
          <div className="max-w-2xl mb-14 sm:mb-20">
            <Eyebrow number="01">Why join TSH</Eyebrow>
            <h2 className="mt-5 heading-editorial text-3xl sm:text-4xl lg:text-5xl text-ink">
              A small house,{" "}
              <span className="heading-editorial-italic text-terracotta">
                deliberately built.
              </span>
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              TSH is a fully remote firm of about a dozen people. We've grown
              slowly on purpose. Here's what working here actually feels like.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-8 sm:p-10 relative overflow-hidden"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted/70">
                  № {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display italic mt-4 text-2xl sm:text-3xl text-ink leading-snug">
                  {w.title}
                </h3>
                <p className="mt-4 text-[0.95rem] text-ink-muted leading-relaxed">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="open-roles" className="relative py-20 sm:py-28 bg-ash/30">
        <Container size="wide">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12 sm:mb-16">
            <div className="max-w-xl">
              <Eyebrow number="02">Open roles</Eyebrow>
              <h2 className="mt-5 heading-editorial text-3xl sm:text-4xl lg:text-5xl text-ink">
                Currently <span className="heading-editorial-italic">hiring.</span>
              </h2>
            </div>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">
              {roles.length} open
            </p>
          </div>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {roles.map((role) => (
              <li key={role.slug}>
                <Link
                  href={`/careers/${role.slug}`}
                  className="group block h-full bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-8 sm:p-10 transition-shadow duration-500 hover:shadow-paper relative overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-4 mb-7">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Pill
                        variant={role.type === "Full-time" ? "moss" : "terracotta"}
                      >
                        {role.type}
                      </Pill>
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                        {role.location}
                      </span>
                    </div>
                    <div className="size-10 rounded-xl bg-terracotta/10 ring-1 ring-terracotta/20 inline-flex items-center justify-center">
                      <Briefcase className="size-4 text-terracotta-deep" />
                    </div>
                  </div>
                  <h3 className="heading-editorial-italic text-2xl sm:text-3xl text-ink leading-[1.05]">
                    {role.title}
                  </h3>
                  <p className="mt-5 text-[0.95rem] text-ink-muted leading-relaxed line-clamp-4">
                    {role.summary}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                      {role.department}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm text-terracotta-deep group-hover:text-terracotta transition-colors">
                      Read role
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="relative py-20 sm:py-28">
        <Container size="wide">
          <div className="max-w-2xl mb-14 sm:mb-18">
            <Eyebrow number="03">How we hire</Eyebrow>
            <h2 className="mt-5 heading-editorial text-3xl sm:text-4xl lg:text-5xl text-ink">
              Four conversations,{" "}
              <span className="heading-editorial-italic text-terracotta">
                no theater.
              </span>
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              We hire the way we wish more firms hired: slowly, honestly, and
              with our cards visible.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {HIRING_STEPS.map((step, i) => (
              <li
                key={step.label}
                className="relative bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-7"
              >
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-terracotta">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display italic mt-3 text-2xl text-ink leading-snug">
                  {step.label}
                </h3>
                <p className="mt-3 text-[0.92rem] text-ink-muted leading-relaxed">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
