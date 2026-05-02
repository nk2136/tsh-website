"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { CtaBand } from "@/components/sections/CtaBand";

type Industry = {
  slug: string;
  name: string;
  blurb: string;
  photoAlt: string;
};

type Deep = {
  intro: string[];
  useCases: { title: string; detail: string }[];
  commonRoles: string[];
  whatWeKnow: { label: string; body: string }[];
};

type Props = {
  industry: Industry;
  deep: Deep;
  others: readonly Industry[];
};

export function IndustryDeepView({ industry, deep, others }: Props) {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-terracotta/[0.06] pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(27,27,27,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,27,27,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
        <Container size="default" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta-deep flex items-center gap-3">
              <Link
                href="/industries"
                className="link-editorial hover:text-terracotta"
              >
                Industries
              </Link>
              <span className="opacity-40">·</span>
              <span className="text-ink-muted">{industry.name}</span>
            </p>
            <h1 className="mt-7 heading-editorial text-[clamp(2.75rem,7vw,5.75rem)] text-ink max-w-4xl">
              {industry.name.split(" & ").map((part, i, arr) =>
                i === arr.length - 1 ? (
                  <span
                    key={i}
                    className="heading-editorial-italic text-terracotta"
                  >
                    {part}
                  </span>
                ) : (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="text-ink-muted/70"> & </span>
                    )}
                  </span>
                )
              )}
            </h1>
            <p className="mt-8 max-w-2xl text-lg sm:text-xl text-ink-muted leading-relaxed">
              {deep.intro[0]}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* INTRO PROSE */}
      <section className="py-20 sm:py-24 bg-bone">
        <Container size="reading">
          <div className="space-y-7">
            {deep.intro.slice(1).map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className={
                  idx === 0
                    ? "drop-cap text-[1.1rem] sm:text-[1.15rem] text-ink leading-[1.75]"
                    : "text-[1.05rem] text-ink-muted leading-[1.75]"
                }
              >
                {para}
              </motion.p>
            ))}
          </div>
        </Container>
      </section>

      {/* WHAT WE KNOW */}
      <section className="py-20 sm:py-28 bg-bone-50 border-y border-ink/[0.06]">
        <Container size="wide">
          <div className="max-w-2xl mb-14">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
              The vertical specifics
            </p>
            <h2 className="mt-4 heading-editorial text-4xl sm:text-5xl text-ink">
              What we know about{" "}
              <span className="heading-editorial-italic text-terracotta">
                {industry.name}.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {deep.whatWeKnow.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative bg-bone rounded-2xl p-7 sm:p-8 ring-1 ring-ink/[0.06] shadow-[0_1px_0_rgba(27,27,27,0.04)]"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-terracotta">
                  № {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display italic text-2xl text-ink leading-tight">
                  {item.label}
                </h3>
                <div className="mt-3 h-px w-10 bg-ink/15" />
                <p className="mt-5 text-[0.97rem] text-ink-muted leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* REPRESENTATIVE PLACEMENTS */}
      <section className="py-20 sm:py-28 bg-bone">
        <Container size="default">
          <div className="max-w-2xl mb-14">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
              Representative placements
            </p>
            <h2 className="mt-4 heading-editorial text-4xl sm:text-5xl text-ink">
              The kind of work{" "}
              <span className="heading-editorial-italic text-terracotta">
                we&apos;ve placed
              </span>{" "}
              into.
            </h2>
            <p className="mt-5 text-ink-muted leading-relaxed">
              Anonymized snapshots from real engagements. Names, dollar
              figures, and identifying details kept private — the texture is
              what matters.
            </p>
          </div>

          <ul className="divide-y divide-ink/[0.08]">
            {deep.useCases.map((uc, idx) => (
              <motion.li
                key={uc.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 sm:py-8 first:pt-0"
              >
                <div className="md:col-span-2">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-terracotta">
                    Case № {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-display italic text-2xl sm:text-[1.65rem] text-ink leading-tight">
                    {uc.title}
                  </h3>
                  <p className="mt-3 text-[1rem] text-ink-muted leading-relaxed max-w-2xl">
                    {uc.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </Container>
      </section>

      {/* COMMON ROLES */}
      <section className="py-20 sm:py-24 bg-bone-50 border-y border-ink/[0.06]">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-md">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
                Roles we staff
              </p>
              <h2 className="mt-3 heading-editorial text-3xl sm:text-4xl text-ink">
                Common titles in{" "}
                <span className="heading-editorial-italic text-terracotta">
                  {industry.name}.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-ink-muted leading-relaxed">
              Titles vary by employer; the work doesn&apos;t. If your role
              sits adjacent to one of these, we likely have a fit.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {deep.commonRoles.map((role) => (
              <Pill key={role} variant="default">
                {role}
              </Pill>
            ))}
          </div>
        </Container>
      </section>

      {/* CROSS-LINK STRIP */}
      <section className="py-20 sm:py-24 bg-bone">
        <Container size="wide">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
                The other four
              </p>
              <h2 className="mt-3 font-display italic text-3xl sm:text-4xl text-ink leading-tight">
                Other sectors we staff.
              </h2>
            </div>
            <Link
              href="/industries"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink link-editorial"
            >
              All industries
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/industries/${other.slug}`}
                className="group block rounded-2xl bg-bone-50 ring-1 ring-ink/[0.06] p-6 sm:p-7 hover:shadow-paper-lifted transition-shadow duration-500"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted/70">
                  Sector
                </p>
                <h3 className="mt-3 font-display italic text-2xl text-ink leading-tight">
                  {other.name}
                </h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed line-clamp-3">
                  {other.blurb}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] text-terracotta-deep group-hover:text-terracotta transition-colors">
                  Read
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
