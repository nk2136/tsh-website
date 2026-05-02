import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tech Staffing Hub. We answer personally — usually within one business day.",
};

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.06 2.06 0 1 1 5.35 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1.18-.02-2.14-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.17.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.17 3.16-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.66.8.55 4.57-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.819-5.965 6.819H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

const INFO_ROWS = [
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: "Read by a human, not a bot.",
  },
  {
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/[^0-9+]/g, "")}`,
    note: "Voicemails answered same day.",
  },
  {
    label: "Hours",
    value: "Mon–Fri, 9am – 6pm ET",
    note: "Off-hours notes still get read.",
  },
  {
    label: "Location",
    value: "Remote · United States",
    note: "Engagements across all 50 states.",
  },
  {
    label: "Response time",
    value: "Within one business day.",
    note: "Often the same day.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Top decorative rule */}
      <section className="bg-bone pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* LEFT — copy + form */}
            <div className="lg:col-span-7">
              <Eyebrow number="01">Get in touch</Eyebrow>
              <h1 className="mt-6 heading-editorial text-5xl sm:text-6xl lg:text-7xl text-ink">
                Let&apos;s talk.{" "}
                <span className="heading-editorial-italic text-terracotta">
                  We answer personally.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-lg text-ink-muted leading-relaxed">
                Whether you&apos;re an engineer thinking about your next move,
                a hiring manager with a quiet seat to fill, or a vendor partner
                wondering if we&apos;re the right fit — start the conversation
                here. Every message lands in a real inbox. We reply.
              </p>

              <div className="mt-12">
                <ContactForm />
              </div>
            </div>

            {/* RIGHT — info card */}
            <aside className="lg:col-span-5">
              <Card variant="paper" className="p-8 sm:p-10 lg:sticky lg:top-28">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
                  TSH · the short version
                </p>
                <h2 className="mt-4 font-display italic text-3xl text-ink leading-tight">
                  How to reach us, plainly.
                </h2>
                <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                  No forms-as-walls. No ticket queues. The fastest way to a
                  conversation is below.
                </p>

                <ul className="mt-8 divide-y divide-ink/[0.07]">
                  {INFO_ROWS.map((row) => (
                    <li key={row.label} className="py-4 first:pt-0 last:pb-0">
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted/80">
                        {row.label}
                      </p>
                      <div className="mt-1.5">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="link-editorial text-ink text-[1.02rem]"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="text-ink text-[1.02rem]">
                            {row.value}
                          </span>
                        )}
                      </div>
                      {row.note && (
                        <p className="mt-1 text-xs text-ink-muted/80 italic">
                          {row.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-8 border-t border-ink/[0.07]">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted/80 mb-4">
                    Find us elsewhere
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href={SITE.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="size-10 inline-flex items-center justify-center rounded-full ring-1 ring-ink/10 text-ink-muted hover:text-terracotta hover:ring-terracotta/40 transition"
                    >
                      <LinkedInIcon className="size-4" />
                    </a>
                    <a
                      href={SITE.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="size-10 inline-flex items-center justify-center rounded-full ring-1 ring-ink/10 text-ink-muted hover:text-terracotta hover:ring-terracotta/40 transition"
                    >
                      <GitHubIcon className="size-4" />
                    </a>
                    <a
                      href={SITE.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X / Twitter"
                      className="size-10 inline-flex items-center justify-center rounded-full ring-1 ring-ink/10 text-ink-muted hover:text-terracotta hover:ring-terracotta/40 transition"
                    >
                      <XIcon className="size-3.5" />
                    </a>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </section>

      {/* Decorative SVG "map" — abstract, on-brand */}
      <section className="bg-bone-50 border-y border-ink/[0.06] py-16 sm:py-20">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div className="max-w-md">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
                Where we work
              </p>
              <h2 className="mt-3 font-display italic text-3xl sm:text-4xl text-ink leading-tight">
                Remote, intentionally — across all 50 states.
              </h2>
            </div>
            <p className="max-w-md text-sm text-ink-muted leading-relaxed">
              TSH is a fully distributed team. Our engineers and clients sit in
              every U.S. timezone. We schedule across them, not against them.
            </p>
          </div>

          <div className="relative rounded-3xl bg-bone ring-1 ring-ink/[0.06] overflow-hidden aspect-[16/7] sm:aspect-[16/6]">
            {/* Stylized map block */}
            <svg
              viewBox="0 0 960 360"
              className="absolute inset-0 w-full h-full"
              role="img"
              aria-label="Decorative map of the United States with hub markers"
            >
              {/* Faint grid */}
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(27,27,27,0.05)"
                    strokeWidth="1"
                  />
                </pattern>
                <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(168,95,62,0.35)" />
                  <stop offset="100%" stopColor="rgba(168,95,62,0)" />
                </radialGradient>
              </defs>
              <rect width="960" height="360" fill="url(#grid)" />

              {/* Stylized U.S. silhouette — abstract, not geographically precise */}
              <path
                d="M120,150 C160,110 230,95 290,100 C340,105 380,90 430,95 C500,102 560,90 640,100 C720,110 780,120 820,150 C840,168 845,200 830,225 C810,252 770,265 720,260 C660,254 620,270 560,265 C500,260 440,275 380,265 C320,256 280,265 235,255 C190,245 145,225 125,195 C115,180 110,165 120,150 Z"
                fill="rgba(27,27,27,0.04)"
                stroke="rgba(27,27,27,0.12)"
                strokeWidth="1"
              />

              {/* Hub markers */}
              {[
                { cx: 220, cy: 180, label: "Pacific" },
                { cx: 380, cy: 200, label: "Mountain" },
                { cx: 520, cy: 195, label: "Central" },
                { cx: 690, cy: 180, label: "Eastern" },
                { cx: 770, cy: 200, label: "Atlantic" },
              ].map((h) => (
                <g key={h.label}>
                  <circle cx={h.cx} cy={h.cy} r="34" fill="url(#hubGlow)" />
                  <circle
                    cx={h.cx}
                    cy={h.cy}
                    r="4"
                    fill="rgb(168,95,62)"
                  />
                  <circle
                    cx={h.cx}
                    cy={h.cy}
                    r="9"
                    fill="none"
                    stroke="rgba(168,95,62,0.4)"
                    strokeWidth="1"
                  />
                  <text
                    x={h.cx}
                    y={h.cy + 28}
                    textAnchor="middle"
                    className="fill-current"
                    fill="rgba(27,27,27,0.55)"
                    fontFamily="var(--font-jetbrains-mono)"
                    fontSize="10"
                    letterSpacing="1.4"
                  >
                    {h.label.toUpperCase()}
                  </text>
                </g>
              ))}

              {/* Connecting threads */}
              <path
                d="M220,180 Q380,140 520,195 T770,200"
                fill="none"
                stroke="rgba(168,95,62,0.25)"
                strokeWidth="1"
                strokeDasharray="3 5"
              />
            </svg>

            {/* Caption */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-[220px]">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-muted/80">
                Fig. 02
              </p>
              <p className="mt-1 font-display italic text-sm text-ink-muted leading-snug">
                Five timezones. One steady cadence.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
