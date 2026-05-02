"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";

const QUOTES = [
  {
    quote:
      "I had been bouncing between recruiters who treated me like a CSV row. TSH was the first team that asked what I actually wanted out of the next role — then helped me find it.",
    role: "Senior QA Automation Engineer",
    industry: "Healthcare",
    placedYear: "Placed 2024",
  },
  {
    quote:
      "We needed a Java engineer who understood event-driven systems and could ship inside a regulated environment. TSH sent two short lists, both excellent. We hired from the first.",
    role: "Director of Engineering",
    industry: "Financial Services",
    placedYear: "Hired 2025",
  },
  {
    quote:
      "Three years and two roles later, I still pick up when TSH calls. They earned that — by being honest about a role that wasn't right for me when it would have been easy to push it.",
    role: "Java Tech Lead",
    industry: "Retail / E-commerce",
    placedYear: "Placed 2022",
  },
];

export function Testimonial() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length);
    }, 8000);
    return () => clearInterval(id);
  }, [paused]);

  const q = QUOTES[index];

  return (
    <section
      className="relative py-28 sm:py-36 lg:py-44 bg-bone-50 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative oversized quotation mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-[5%] sm:left-[8%] select-none"
      >
        <span className="font-display italic text-[20rem] sm:text-[28rem] leading-none tracking-tight text-terracotta/10">
          &ldquo;
        </span>
      </div>

      <Container size="default" className="relative">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta mb-10 text-center">
          Voices from the placement table
        </p>

        <div className="relative min-h-[280px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <blockquote>
                <p className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-ink leading-[1.25] max-w-3xl mx-auto tracking-tight">
                  &ldquo;{q.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-10 inline-flex flex-col items-center gap-1.5">
                <span className="size-9 rounded-full bg-terracotta/15 ring-1 ring-terracotta/20 inline-flex items-center justify-center font-display italic text-terracotta-deep text-sm">
                  {q.role[0]}
                </span>
                <span className="font-medium text-ink text-sm mt-2">
                  {q.role}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">
                  {q.industry} · {q.placedYear}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div className="mt-14 flex items-center justify-center gap-2">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-10 bg-terracotta"
                  : "w-3 bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted/60 font-mono">
          Quotes anonymized to honor representation agreements. Real names available on request.
        </p>
      </Container>
    </section>
  );
}
