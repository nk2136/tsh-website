"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AmbientHeroLazy } from "@/components/three/AmbientHeroLazy";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-20 lg:pt-28 pb-20 sm:pb-28 lg:pb-36">
      {/* Subtle grid */}
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
          {/* Copy column */}
          <div className="lg:col-span-7 relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta flex items-center gap-3"
            >
              <span className="size-1.5 rounded-full bg-terracotta animate-float-slow" />
              Tech Staffing Hub · est. 2020
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="heading-editorial mt-6 text-[clamp(3rem,7.5vw,6.5rem)] text-ink"
            >
              The{" "}
              <span className="heading-editorial-italic text-terracotta">
                deliberate
              </span>{" "}
              path<br />
              to your next placement.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed text-ink-muted"
            >
              We place QA & Java engineers with intent — at companies who treat
              hiring as a craft, not a transaction. No volume churn. No
              cookie-cutter pipelines. Just the right match, made carefully.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            >
              <Button href="/candidates#apply" variant="primary" size="lg" withArrow>
                I'm a candidate
              </Button>
              <Button href="/clients#request" variant="outline" size="lg" withArrow>
                I need talent
              </Button>
              <a
                href="/about"
                className="ml-2 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink link-editorial"
              >
                Or read our story
                <ArrowUpRight className="size-3.5" />
              </a>
            </motion.div>

            {/* Mini stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-14 grid grid-cols-3 gap-6 sm:gap-10 max-w-md"
            >
              {[
                { num: "127", label: "Engineers placed" },
                { num: "94%", label: "Year-2 retention" },
                { num: "6yr", label: "In the trade" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display italic text-3xl sm:text-4xl text-ink leading-none">
                    {s.num}
                  </p>
                  <p className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted font-mono">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D column */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-square w-full max-w-[560px] mx-auto relative"
            >
              <AmbientHeroLazy />

              {/* Decorative ring around 3D */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full ring-1 ring-ink/[0.06] -m-6"
              />

              {/* Caption */}
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 max-w-[180px]">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted">
                  Fig. 01
                </p>
                <p className="mt-1 font-display italic text-sm text-ink-muted leading-snug">
                  A folded knot. One continuous path, intentionally turned.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
