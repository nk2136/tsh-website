"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pill } from "@/components/ui/Pill";
import { CtaBand } from "@/components/sections/CtaBand";
import teamData from "@/content/team.json";

type TeamMember = {
  name: string;
  role: string;
  initials: string;
  tint: string;
  quote: string;
  bio: string;
};

const team: TeamMember[] = teamData.members;

const founder = team.find((m) => m.role.toLowerCase().includes("founder"));
const others = team.filter((m) => m !== founder);

const WHY_TSH = [
  {
    title: "Honest pricing.",
    body: "We tell candidates the rate we're submitting at, and we tell clients exactly what we charge. No hidden splits, no marked-up surprises at offer stage. Transparency is cheaper than cleanup.",
  },
  {
    title: "Engineers vetting engineers.",
    body: "Our interview helpers are real engineers — currently writing tests, currently shipping services. They prep candidates the way they'd want to be prepped: with technical respect, not a sales script.",
  },
  {
    title: "The long arc.",
    body: "Most agencies disappear once the offer letter is signed. We don't. We check in at thirty days, ninety days, six months. The placement is the start of the relationship, not the end of one.",
  },
];

const TIMELINE = [
  {
    year: "2020",
    note: "Binesh founds Tech Staffing Hub LLC out of a small remote office. The first thesis: staffing is a craft. The second: prove it.",
  },
  {
    year: "2021",
    note: "First placement — a senior QA automation engineer into a healthcare platform. They're still there.",
  },
  {
    year: "2022",
    note: "Vendor network expansion across MSP and VMS partners. We learn which rooms are worth being in, and which aren't.",
  },
  {
    year: "2023",
    note: "The fifty-placement milestone, quietly. We host a small dinner. No press release.",
  },
  {
    year: "2024",
    note: "We narrow rather than widen — formal specialization in QA Engineering and Java Development. Saying no becomes part of the work.",
  },
  {
    year: "2025",
    note: "Internal placement dashboard ships. Recruiters stop chasing spreadsheets and start chasing better matches.",
  },
  {
    year: "2026",
    note: "The hundredth placement — and the hundred-and-first, and the hundred-and-second. Same posture. Better tools.",
  },
];

function InitialsAvatar({
  initials,
  tint,
  size = "md",
}: {
  initials: string;
  tint: string;
  size?: "md" | "lg";
}) {
  const isMoss = tint === "moss";
  const sizing = size === "lg" ? "size-24 sm:size-28 text-3xl" : "size-14 text-base";
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center rounded-full font-display italic tracking-tight ring-1 ${
        isMoss
          ? "bg-moss/10 text-moss-deep ring-moss/25"
          : "bg-terracotta/10 text-terracotta-deep ring-terracotta/25"
      } ${sizing}`}
    >
      {initials}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-bone">
      {/* Hero — quiet, no 3D */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-20 sm:pb-28">
        <Container size="reading" className="relative">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta inline-flex items-center gap-3 justify-center">
              <span className="size-1.5 rounded-full bg-terracotta" />
              About TSH
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="heading-editorial mt-8 text-center text-[clamp(2.5rem,5.5vw,4.75rem)] text-ink"
          >
            We started TSH in 2020 with a quiet thesis:{" "}
            <span className="heading-editorial-italic text-terracotta">
              staffing is a craft.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 space-y-6 text-[1.05rem] sm:text-[1.1rem] leading-[1.75] text-ink-muted"
          >
            <p className="drop-cap">
              Tech Staffing Hub is a small, deliberate firm. We place QA
              engineers and Java developers — and only QA engineers and Java
              developers — into companies that take hiring seriously. We are
              fully remote, founded in the United States, and built around a
              team of recruiters and engineer-interviewers who do the work
              themselves rather than handing it off.
            </p>
            <p>
              We came up inside the staffing industry and watched what
              speed-at-any-cost does to people. Candidates become rows in a
              CSV. Clients become quotas. Resumes get sprayed. Offers get
              chased. Six years ago we decided to build the slower version of
              that — the one where a placement is a relationship, not a
              receipt.
            </p>
            <p>
              We're not for everyone, and that's the point. If you want a
              hundred submissions in a week, we are the wrong firm. If you
              want one engineer who fits the team and stays through year two,
              we'd like to talk.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Why TSH — three columns */}
      <section className="relative py-24 sm:py-32 bg-bone-50 border-y border-ink/[0.05]">
        <Container size="wide">
          <div className="max-w-2xl mb-14 sm:mb-20">
            <Eyebrow number="01">Why TSH</Eyebrow>
            <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl text-ink">
              Three commitments,{" "}
              <span className="heading-editorial-italic text-terracotta">
                kept quietly.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {WHY_TSH.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative"
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
                  №&nbsp;0{i + 1}
                </span>
                <h3 className="mt-4 font-display italic text-2xl sm:text-3xl text-ink leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-5 text-[0.98rem] text-ink-muted leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="relative py-24 sm:py-32">
        <Container size="wide">
          <div className="max-w-2xl mb-14">
            <Eyebrow number="02">Leadership</Eyebrow>
            <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl text-ink">
              The person at the{" "}
              <span className="heading-editorial-italic text-terracotta">
                front of the table.
              </span>
            </h2>
          </div>

          {founder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8 }}
              className="relative bg-bone-50 ring-1 ring-ink/[0.06] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-paper"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                <div className="lg:col-span-3 flex flex-col items-start gap-5">
                  <InitialsAvatar
                    initials={founder.initials}
                    tint={founder.tint}
                    size="lg"
                  />
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
                    {founder.role}
                  </span>
                </div>

                <div className="lg:col-span-9">
                  <h3 className="font-display italic text-4xl sm:text-5xl text-ink leading-[1.05] tracking-tight">
                    {founder.name}
                  </h3>
                  <p className="mt-6 text-[1.02rem] text-ink-muted leading-[1.8]">
                    {founder.bio}
                  </p>

                  <div className="mt-10 pl-6 border-l-2 border-moss/40">
                    <p className="font-display italic text-xl sm:text-2xl text-moss-deep leading-snug tracking-tight">
                      &ldquo;{founder.quote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </Container>
      </section>

      {/* The team */}
      <section className="relative py-24 sm:py-32 bg-bone-50 border-y border-ink/[0.05]">
        <Container size="wide">
          <div className="max-w-2xl mb-14 sm:mb-20">
            <Eyebrow number="03">The team</Eyebrow>
            <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl text-ink">
              Eight people.{" "}
              <span className="heading-editorial-italic text-terracotta">
                One desk, mostly virtual.
              </span>
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              Recruiters who actually answer their phones. Engineers who
              actually run the mock interviews. Same group, all the way
              through.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {others.map((m, i) => (
              <motion.article
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="relative bg-bone ring-1 ring-ink/[0.06] rounded-2xl p-7 sm:p-8 hover:shadow-paper transition-shadow duration-500"
              >
                <div className="flex items-start gap-4">
                  <InitialsAvatar initials={m.initials} tint={m.tint} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display italic text-2xl text-ink leading-tight tracking-tight">
                      {m.name}
                    </h3>
                    <div className="mt-2">
                      <Pill variant={m.tint === "moss" ? "moss" : "terracotta"}>
                        {m.role}
                      </Pill>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-[0.95rem] text-ink-muted leading-relaxed">
                  {m.bio}
                </p>

                {m.quote && (
                  <p className="mt-5 pt-5 border-t border-ink/[0.06] font-display italic text-[0.98rem] text-ink/80 leading-snug">
                    &ldquo;{m.quote}&rdquo;
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="relative py-24 sm:py-32">
        <Container size="default">
          <div className="max-w-2xl mb-16">
            <Eyebrow number="04">Founding to today</Eyebrow>
            <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl text-ink">
              The arc, in{" "}
              <span className="heading-editorial-italic text-terracotta">
                quiet steps.
              </span>
            </h2>
          </div>

          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-terracotta/40 via-ink/10 to-transparent"
            />
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative pl-10 sm:pl-14 pb-12 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-2 size-[15px] sm:size-[19px] rounded-full bg-bone ring-1 ring-terracotta/40 flex items-center justify-center"
                >
                  <span className="size-[5px] sm:size-[7px] rounded-full bg-terracotta" />
                </span>
                <p className="font-display italic text-2xl sm:text-3xl text-terracotta-deep leading-none tracking-tight">
                  {t.year}
                </p>
                <p className="mt-3 text-[1rem] sm:text-[1.05rem] text-ink-muted leading-relaxed max-w-2xl">
                  {t.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
