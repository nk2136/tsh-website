import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { NewsletterCapture } from "@/components/footer/NewsletterCapture";
import { FOOTER_GROUPS, SITE } from "@/lib/constants";

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

export function Footer() {
  return (
    <footer className="relative bg-ink text-bone-50 overflow-hidden">
      {/* Decorative oversized wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-6 sm:-bottom-20 sm:-right-12 select-none"
      >
        <span className="font-display italic text-[18rem] sm:text-[24rem] lg:text-[32rem] leading-none tracking-[-0.05em] text-bone/[0.04]">
          tsh<span className="text-terracotta/30">.</span>
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column — brand + newsletter */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm font-display italic text-2xl leading-tight text-bone/85">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-sm text-bone/55 max-w-xs leading-relaxed">
              {SITE.description}
            </p>

            <div className="mt-10">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-terracotta-soft mb-3">
                Field notes — once a month, never spam
              </p>
              <NewsletterCapture />
            </div>
          </div>

          {/* Right columns — link groups */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone/40 mb-4">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[0.92rem] text-bone/80 hover:text-terracotta-soft transition-colors link-editorial"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-bone/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <p className="text-xs text-bone/50">
              © {new Date().getFullYear()} Tech Staffing Hub LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-bone/40">
              <span className="size-1 rounded-full bg-moss-soft animate-pulse" />
              <span className="font-mono">Crafted in the United States</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="size-9 inline-flex items-center justify-center rounded-full ring-1 ring-bone/15 text-bone/70 hover:text-terracotta-soft hover:ring-terracotta-soft/40 transition"
            >
              <LinkedInIcon className="size-4" />
            </a>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="size-9 inline-flex items-center justify-center rounded-full ring-1 ring-bone/15 text-bone/70 hover:text-terracotta-soft hover:ring-terracotta-soft/40 transition"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href={SITE.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="size-9 inline-flex items-center justify-center rounded-full ring-1 ring-bone/15 text-bone/70 hover:text-terracotta-soft hover:ring-terracotta-soft/40 transition"
            >
              <XIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
