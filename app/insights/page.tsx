import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllPosts } from "@/lib/insights";
import { formatDate } from "@/lib/utils";
import { NewsletterInline } from "./_components/NewsletterInline";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field notes from the placement desk — essays on QA craft, staffing economics, and what it actually takes to build a long-arc engineering team.",
};

export default async function InsightsIndexPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative bg-bone pt-20 sm:pt-28 pb-16 sm:pb-20">
        <Container size="wide">
          <div className="max-w-3xl">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-terracotta flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-terracotta" />
              Field notes
            </p>
            <h1 className="heading-editorial mt-6 text-[clamp(2.75rem,7vw,5.5rem)] text-ink">
              Essays from the{" "}
              <span className="heading-editorial-italic text-terracotta">
                placement desk.
              </span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-ink-muted max-w-xl">
              We write a few times a quarter. Mostly about the unglamorous
              middle — the part of staffing the industry rarely admits exists.
              Read them in any order.
            </p>
          </div>
        </Container>
      </section>

      {featured ? (
        <section className="relative pb-12 sm:pb-16">
          <Container size="wide">
            <Link
              href={`/insights/${featured.slug}`}
              className="group block bg-bone-50 ring-1 ring-ink/[0.06] rounded-3xl p-8 sm:p-12 lg:p-16 transition-shadow duration-500 hover:shadow-paper-lifted relative overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-terracotta/60 via-terracotta/20 to-transparent"
              />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-7">
                    <Pill variant="terracotta">Featured</Pill>
                    <Pill>{featured.category}</Pill>
                  </div>
                  <h2 className="heading-editorial-italic text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.02]">
                    {featured.title}
                  </h2>
                  <p className="mt-7 text-lg text-ink-muted leading-relaxed max-w-xl">
                    {featured.excerpt}
                  </p>
                  <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
                    <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
                      {featured.author} · {formatDate(featured.publishedAt)} ·{" "}
                      {featured.readMinutes} min read
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-terracotta-deep group-hover:text-terracotta transition-colors">
                      Read essay
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col justify-end">
                  {featured.coverNote ? (
                    <p className="font-display italic text-lg sm:text-xl text-ink-muted leading-snug max-w-xs ml-auto text-right">
                      {featured.coverNote}
                    </p>
                  ) : null}
                  <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted/70 ml-auto">
                    Fig. 01 — current
                  </p>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="relative py-16 sm:py-20">
          <Container size="wide">
            <div className="flex items-end justify-between mb-10 sm:mb-14">
              <h2 className="heading-editorial text-3xl sm:text-4xl text-ink">
                More <span className="heading-editorial-italic">field notes.</span>
              </h2>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted hidden sm:block">
                {rest.length} essay{rest.length === 1 ? "" : "s"}
              </p>
            </div>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {rest.map((post, idx) => (
                <li key={post.slug}>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="group block h-full bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-8 sm:p-10 transition-shadow duration-500 hover:shadow-paper relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <Pill>{post.category}</Pill>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted/70">
                        № {String(idx + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="heading-editorial-italic text-2xl sm:text-3xl text-ink leading-[1.05]">
                      {post.title}
                    </h3>
                    <p className="mt-5 text-[0.95rem] text-ink-muted leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-8 flex items-center justify-between">
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-muted">
                        {post.author} · {formatDate(post.publishedAt)} ·{" "}
                        {post.readMinutes} min
                      </p>
                      <ArrowUpRight className="size-4 text-ink-muted transition-all duration-300 group-hover:text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="relative py-20 sm:py-28 bg-ash/30">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-terracotta">
                A quiet newsletter
              </p>
              <h2 className="mt-5 heading-editorial text-3xl sm:text-4xl lg:text-5xl text-ink">
                A few essays a quarter.{" "}
                <span className="heading-editorial-italic text-terracotta">
                  Nothing else.
                </span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-ink-muted leading-relaxed max-w-md">
                No drip campaigns. No re-engagement sequences. We send when we
                have something to say, and we say it once.
              </p>
            </div>
            <div>
              <NewsletterInline />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
