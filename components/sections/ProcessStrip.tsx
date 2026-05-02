"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessStrip() {
  return (
    <section className="py-24 sm:py-32 lg:py-40 bg-bone">
      <Container size="wide">
        <div className="max-w-2xl mb-16 sm:mb-20">
          <Eyebrow number="02">A four-step path</Eyebrow>
          <h2 className="mt-5 heading-editorial text-4xl sm:text-5xl lg:text-6xl text-ink">
            Apply{" "}
            <span className="text-ink/30">·</span> Match{" "}
            <span className="text-ink/30">·</span>{" "}
            <span className="heading-editorial-italic text-terracotta">Submit</span>{" "}
            <span className="text-ink/30">·</span> Place
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            From the first call to your first six-month review — here's the
            shape of how we work, regardless of which side of the table you're on.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 relative">
          {/* Connecting line */}
          <div
            aria-hidden
            className="absolute top-7 left-7 right-7 h-px bg-gradient-to-r from-terracotta/30 via-ink/15 to-moss/30 hidden lg:block"
          />
          {PROCESS_STEPS.map((step, i) => (
            <motion.li
              key={step.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative"
            >
              <div className="flex items-baseline gap-4 mb-5">
                <span className="font-display italic text-5xl text-terracotta leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">
                  Step {i + 1} of 4
                </span>
              </div>
              <h3 className="font-display text-2xl text-ink mb-2">{step.label}</h3>
              <p className="text-[0.95rem] text-ink-muted leading-relaxed max-w-[28ch]">
                {step.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
