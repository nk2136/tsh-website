"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-500",
          scrolled
            ? "backdrop-blur-md bg-bone/75 border-b border-ink/[0.06]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex h-16 sm:h-18 items-center justify-between">
            <Logo />

            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-1"
            >
              {NAV_LINKS.map((l) => {
                const active = pathname.startsWith(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "relative px-3.5 py-2 text-[0.92rem] rounded-full transition-colors",
                      active
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink"
                    )}
                  >
                    <span className="relative z-10">{l.label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-ink/[0.05] ring-1 ring-ink/[0.06]"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Button href="/contact" variant="ghost" size="sm">
                Talk to us
              </Button>
              <Button href="/candidates#apply" variant="primary" size="sm" withArrow>
                Apply
              </Button>
            </div>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center size-10 rounded-full ring-1 ring-ink/10 text-ink"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 lg:hidden bg-bone"
          >
            <div className="pt-24 px-6 sm:px-8 h-full flex flex-col">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4 }}
                  >
                    <Link
                      href={l.href}
                      className="block py-4 border-b border-ink/[0.08] font-display italic text-3xl tracking-tight text-ink"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pb-10 flex flex-col gap-3">
                <Button href="/candidates#apply" variant="primary" size="lg" withArrow>
                  Apply as a candidate
                </Button>
                <Button href="/clients#request" variant="outline" size="lg" withArrow>
                  Request talent
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content starts below the fixed nav */}
      <div className="h-16 sm:h-18" aria-hidden />
    </>
  );
}
