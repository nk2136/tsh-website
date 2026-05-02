import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { CtaBand } from "@/components/sections/CtaBand";
import { getAllRoles, getRoleBySlug } from "@/lib/careers";
import { RoleApplicationForm } from "./_components/RoleApplicationForm";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllRoles().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) return { title: "Role not found" };
  return {
    title: `${role.title} (${role.location})`,
    description: role.summary,
  };
}

export default async function RolePage({ params }: PageProps) {
  const { slug } = await params;
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const others = getAllRoles().filter((r) => r.slug !== slug);

  return (
    <>
      <article className="relative bg-bone pt-12 sm:pt-20 pb-20 sm:pb-24">
        <Container size="reading">
          <Link
            href="/careers"
            className="group inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            All open roles
          </Link>

          <div className="mt-10 sm:mt-14">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-terracotta">
              {role.department}
            </p>
            <h1 className="heading-editorial mt-5 text-[clamp(2.25rem,5vw,4rem)] text-ink">
              {role.title}
            </h1>
            <div className="mt-7 flex items-center gap-3 flex-wrap">
              <Pill variant={role.type === "Full-time" ? "moss" : "terracotta"}>
                {role.type}
              </Pill>
              <Pill>{role.location}</Pill>
            </div>
          </div>

          <section className="mt-12">
            <h2 className="font-display italic text-2xl sm:text-3xl text-ink mb-5">
              About the role
            </h2>
            <p className="text-[1.05rem] sm:text-[1.1rem] leading-[1.75] text-ink-muted">
              {role.summary}
            </p>
          </section>

          <RoleSection title="Responsibilities" items={role.responsibilities} />
          <RoleSection title="Qualifications" items={role.qualifications} />
          <RoleSection title="Nice to have" items={role.niceToHave} />

          <section className="mt-14 border-t border-ink/[0.08] pt-10">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-terracotta">
              Compensation
            </p>
            <p className="mt-4 font-display italic text-xl sm:text-2xl text-ink leading-snug">
              {role.compensationNote}
            </p>
          </section>

          <section id="apply" className="mt-16 sm:mt-20">
            <div className="mb-8">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-terracotta">
                Apply
              </p>
              <h2 className="heading-editorial mt-4 text-3xl sm:text-4xl text-ink">
                Send us a{" "}
                <span className="heading-editorial-italic">few sentences.</span>
              </h2>
              <p className="mt-4 text-[1rem] text-ink-muted leading-relaxed max-w-lg">
                We read every application. We reply to every application —
                yes or no — within a business day or two.
              </p>
            </div>
            <RoleApplicationForm roleSlug={role.slug} roleTitle={role.title} />
          </section>
        </Container>
      </article>

      {others.length > 0 ? (
        <section className="relative py-20 sm:py-24 bg-ash/30">
          <Container size="wide">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <h2 className="heading-editorial text-3xl sm:text-4xl text-ink">
                Other open <span className="heading-editorial-italic">roles.</span>
              </h2>
              <Link
                href="/careers"
                className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted hover:text-ink link-editorial"
              >
                All careers
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/careers/${r.slug}`}
                    className="group block h-full bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-7 transition-shadow duration-500 hover:shadow-paper"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <Pill
                        variant={r.type === "Full-time" ? "moss" : "terracotta"}
                      >
                        {r.type}
                      </Pill>
                    </div>
                    <h3 className="heading-editorial-italic text-xl text-ink leading-snug">
                      {r.title}
                    </h3>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-muted">
                        {r.location}
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

function RoleSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items?.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display italic text-2xl sm:text-3xl text-ink mb-5">
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2.5 inline-block size-1 rounded-full bg-terracotta shrink-0" />
            <span className="text-[1rem] sm:text-[1.05rem] leading-[1.7] text-ink-muted">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
