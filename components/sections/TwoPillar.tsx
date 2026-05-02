"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Briefcase, UserSquare } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const PILLARS = [
  {
    audience: "candidates",
    icon: UserSquare,
    title: "For engineers who want to be placed, not processed.",
    bullets: [
      "Honest representation. We share rate, role, and the real story behind every submission.",
      "Vendor-network depth across MSP and VMS partners — the right room, fast.",
      "Interview prep with engineers, not generic recruiters.",
      "Long-arc support: we stay engaged through your first six months and beyond.",
    ],
    cta: { href: "/candidates", label: "What candidates get from TSH" },
    accent: "terracotta" as const,
  },
  {
    audience: "clients",
    icon: Briefcase,
    title: "For teams who treat hiring as a craft.",
    bullets: [
      "Curated short lists. No spray-and-pray submissions, ever.",
      "Engineers vetted by engineers — pre-screened for the actual work.",
      "Engagement models that match your hiring posture: contract, C2H, or direct.",
      "Compliance, payroll, and offboarding handled. You get to focus on the work.",
    ],
    cta: { href: "/clients", label: "How we work with clients" },
    accent: "moss" as const,
  },
];

export function TwoPillar() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 relative">
      <Container size="wide">
        <div className="max-w-2xl mb-14 sm:mb-20">
          <Eyebrow number="01">Two audiences. One discipline.</Eyebrow>
          <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
            We work for{" "}
            <span className="heading-editorial-italic text-terracotta">both sides</span>{" "}
            of the table — equally.
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            Most staffing firms answer to one master. We've built TSH so that
            doing right by candidates and doing right by clients aren't in
            tension. They're the same job, told twice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            const accent =
              p.accent === "terracotta"
                ? {
                    border: "before:from-terracotta",
                    icon: "bg-terracotta/10 text-terracotta-deep ring-terracotta/20",
                    cta: "text-terracotta-deep group-hover:text-terracotta",
                  }
                : {
                    border: "before:from-moss",
                    icon: "bg-moss/10 text-moss-deep ring-moss/20",
                    cta: "text-moss-deep group-hover:text-moss",
                  };
            return (
              <motion.div
                key={p.audience}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={p.cta.href}
                  className={`group relative block bg-bone-50 ring-1 ring-ink/[0.06] rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden transition-shadow duration-500 hover:shadow-paper-lifted ${accent.border} before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:to-transparent`}
                >
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <div
                      className={`size-12 rounded-2xl ring-1 inline-flex items-center justify-center ${accent.icon}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted/70">
                      {p.audience}
                    </span>
                  </div>

                  <h3 className="font-display italic text-3xl sm:text-4xl text-ink leading-[1.05] tracking-tight mb-7">
                    {p.title}
                  </h3>

                  <ul className="space-y-3.5 mb-10">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 inline-block size-1 rounded-full bg-ink/30 shrink-0" />
                        <span className="text-[0.95rem] text-ink-muted leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <span
                    className={`inline-flex items-center gap-1.5 font-medium text-sm transition-all duration-500 ${accent.cta}`}
                  >
                    {p.cta.label}
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
