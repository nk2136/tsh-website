import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-32 sm:py-44 min-h-[70vh] flex items-center">
      <Container size="default" className="text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
          Error 404 — Off the deliberate path
        </p>
        <h1 className="mt-6 heading-editorial text-6xl sm:text-7xl lg:text-8xl text-ink">
          This page{" "}
          <span className="heading-editorial-italic text-terracotta">
            wandered.
          </span>
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-lg text-ink-muted leading-relaxed">
          Either the page never existed or it's been quietly retired. Both happen.
          Here are a few solid places to land instead.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" withArrow>
            Back to home
          </Button>
          <Button href="/contact" variant="ghost" size="md">
            Tell us what you were looking for
          </Button>
        </div>
        <div className="mt-14 flex items-center justify-center gap-x-8 gap-y-3 flex-wrap text-sm">
          <Link href="/candidates" className="text-ink-muted hover:text-ink link-editorial">
            For candidates
          </Link>
          <Link href="/clients" className="text-ink-muted hover:text-ink link-editorial">
            For clients
          </Link>
          <Link href="/services" className="text-ink-muted hover:text-ink link-editorial">
            Services
          </Link>
          <Link href="/insights" className="text-ink-muted hover:text-ink link-editorial">
            Insights
          </Link>
        </div>
      </Container>
    </section>
  );
}
