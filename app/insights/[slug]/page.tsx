import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/lib/insights";
import { formatDate } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Essay not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function InsightPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const others = all.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <article className="relative bg-bone pt-12 sm:pt-20 pb-20 sm:pb-28">
        <Container size="reading">
          <Link
            href="/insights"
            className="group inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            All field notes
          </Link>

          <div className="mt-10 sm:mt-14">
            <Pill variant="terracotta">{post.category}</Pill>
            <h1 className="heading-editorial mt-7 text-[clamp(2.25rem,5vw,4rem)] text-ink">
              {post.title}
            </h1>
            <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
              {post.author} · {formatDate(post.publishedAt)} · {post.readMinutes}{" "}
              min read
            </p>
          </div>

          {post.coverNote ? (
            <p className="mt-12 font-display italic text-xl text-ink-muted leading-snug border-l border-terracotta/40 pl-5">
              {post.coverNote}
            </p>
          ) : null}

          <div
            className="post-body mt-12 text-[1.075rem] sm:text-[1.125rem] leading-[1.75] text-ink-muted
              [&>p]:mt-6 [&>p:first-of-type]:mt-0
              [&>h2]:font-display [&>h2]:italic [&>h2]:text-ink [&>h2]:text-[1.85rem] sm:[&>h2]:text-[2.15rem] [&>h2]:leading-[1.15] [&>h2]:tracking-[-0.01em] [&>h2]:mt-14 [&>h2]:mb-4
              [&>h3]:font-display [&>h3]:text-ink [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:leading-snug [&>h3]:mt-10 [&>h3]:mb-3
              [&>blockquote]:my-10 [&>blockquote]:border-l-2 [&>blockquote]:border-terracotta/60 [&>blockquote]:pl-6 sm:[&>blockquote]:pl-8 [&>blockquote]:font-display [&>blockquote]:italic [&>blockquote]:text-terracotta-deep [&>blockquote]:text-2xl sm:[&>blockquote]:text-[1.7rem] [&>blockquote]:leading-snug
              [&_em]:font-display [&_em]:italic
              [&_strong]:text-ink [&_strong]:font-medium
              [&>ul]:my-6 [&>ul]:pl-6 [&>ul>li]:list-disc [&>ul>li]:marker:text-terracotta/60 [&>ul>li]:mt-2
              [&>ol]:my-6 [&>ol]:pl-6 [&>ol>li]:list-decimal [&>ol>li]:mt-2
              [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:bg-ash/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
              [&_a]:text-terracotta-deep [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-terracotta/40 hover:[&_a]:decoration-terracotta"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <style>{`
            .post-body > p:first-of-type::first-letter {
              font-family: var(--font-display);
              font-weight: 400;
              font-style: italic;
              font-size: 4.5em;
              line-height: 0.85;
              float: left;
              padding: 0.05em 0.08em 0 0;
              color: var(--color-terracotta);
              font-variation-settings: "SOFT" 100, "WONK" 1;
            }
          `}</style>
        </Container>
      </article>

      {others.length > 0 ? (
        <section className="relative py-20 sm:py-24 bg-ash/30">
          <Container size="wide">
            <div className="flex items-end justify-between mb-10">
              <h2 className="heading-editorial text-3xl sm:text-4xl text-ink">
                Continue <span className="heading-editorial-italic">reading.</span>
              </h2>
              <Link
                href="/insights"
                className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted hover:text-ink link-editorial"
              >
                All essays
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/insights/${p.slug}`}
                    className="group block h-full bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-8 transition-shadow duration-500 hover:shadow-paper"
                  >
                    <Pill>{p.category}</Pill>
                    <h3 className="heading-editorial-italic mt-5 text-2xl text-ink leading-[1.1]">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[0.95rem] text-ink-muted leading-relaxed">
                      {p.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-muted">
                        {formatDate(p.publishedAt)} · {p.readMinutes} min
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

      <CtaBand />
    </>
  );
}
