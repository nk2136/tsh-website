"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";

function CountUp({
  to,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

const NUMBERS = [
  { value: 127, suffix: "", label: "Engineers placed", note: "Since founding" },
  { value: 4, suffix: "", label: "Tech specializations", note: "QA, Java, SDET, Lead" },
  { value: 5, suffix: "", label: "Industries served", note: "Finance to retail" },
  { value: 94, suffix: "%", label: "Year-2 retention", note: "Of placements still in seat" },
];

export function NumbersBand() {
  return (
    <section className="relative bg-ink text-bone-50 py-24 sm:py-32 overflow-hidden">
      {/* Decorative paper-grain ring */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, #C97A55 0%, transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(250,247,242,0.04) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta-soft">
              By the numbers
            </p>
            <h2 className="mt-4 heading-editorial text-4xl sm:text-5xl text-bone">
              Six years.{" "}
              <span className="heading-editorial-italic text-terracotta-soft">
                Quiet results.
              </span>
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 text-lg text-bone/65 leading-relaxed">
            We've never been the loudest staffing firm in the room. We'd rather
            place fewer engineers and place them well. The numbers below reflect
            that posture.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-bone/10 border-y border-bone/10">
          {NUMBERS.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="py-10 sm:py-14 px-6 sm:px-8 first:pl-0 lg:first:pl-0"
            >
              <p className="font-display italic text-6xl sm:text-7xl lg:text-8xl text-bone leading-none tracking-tight">
                <CountUp to={n.value} suffix={n.suffix} />
              </p>
              <p className="mt-5 text-sm font-medium text-bone tracking-wide">
                {n.label}
              </p>
              <p className="mt-1 text-xs text-bone/40 font-mono">{n.note}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
