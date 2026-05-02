"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBand() {
  return (
    <section className="relative py-28 sm:py-36 bg-bone overflow-hidden">
      {/* Decorative diagonal rule */}
      <div
        aria-hidden
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-terracotta/40 to-transparent"
      />

      <Container size="default">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta mb-6">
            Ready when you are
          </p>
          <h2 className="heading-editorial text-5xl sm:text-6xl lg:text-7xl text-ink">
            Let's place you,{" "}
            <span className="heading-editorial-italic text-terracotta">
              deliberately.
            </span>
          </h2>
          <p className="mt-8 text-lg text-ink-muted leading-relaxed max-w-xl mx-auto">
            Whether you're an engineer thinking about your next move or a
            company hiring with intent — start a conversation. We answer
            personally, usually within a business day.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/candidates#apply" variant="primary" size="lg" withArrow>
              Apply as a candidate
            </Button>
            <Button href="/clients#request" variant="ink" size="lg" withArrow>
              Request talent
            </Button>
          </div>

          <p className="mt-10 text-sm text-ink-muted/70">
            Or just{" "}
            <a href="/contact" className="text-ink underline underline-offset-4 decoration-terracotta decoration-1 hover:decoration-2 transition-all">
              say hello
            </a>
            .
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
