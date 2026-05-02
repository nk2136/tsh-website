"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const TOPICS = [
  { value: "candidate", label: "Candidate inquiry" },
  { value: "client", label: "Client inquiry" },
  { value: "vendor", label: "Vendor partnership" },
  { value: "press", label: "Press" },
  { value: "other", label: "Other" },
] as const;

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Please share your name.")
    .max(80, "That's a long name — try a shorter version."),
  email: z.string().email("Please use a valid email address."),
  company: z.string().max(120).optional().or(z.literal("")),
  topic: z.enum(["candidate", "client", "vendor", "press", "other"], {
    message: "Pick the closest fit.",
  }),
  message: z
    .string()
    .min(20, "A few more sentences, please — at least 20 characters.")
    .max(2000, "That's a lot. Trim to 2,000 characters or fewer."),
  // Honeypot — must be empty
  website: z.string().max(0).optional(),
});

type ContactInput = z.infer<typeof ContactSchema>;

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; ticketId: string }
  | { kind: "error"; message: string };

const labelClass =
  "font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted";
const inputBase =
  "mt-2 w-full rounded-xl bg-bone-50 ring-1 ring-ink/10 px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-terracotta/60 focus:bg-bone transition";
const errorClass = "mt-1.5 text-xs text-terracotta-deep font-mono";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      topic: "candidate",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    if (data.website && data.website.length > 0) {
      // Silently swallow honeypot hits
      setState({ kind: "success", ticketId: "tsh_local" });
      return;
    }
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as
        | { ok: true; ticketId: string }
        | { ok: false; error?: string };
      if (!res.ok || !("ok" in json) || !json.ok) {
        const msg =
          (json as { error?: string })?.error ?? "Something went sideways.";
        setState({ kind: "error", message: String(msg) });
        return;
      }
      setState({ kind: "success", ticketId: json.ticketId });
      reset();
    } catch {
      setState({
        kind: "error",
        message: "Network hiccup. Try again in a moment.",
      });
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state.kind === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-bone-50 ring-1 ring-moss/30 p-8 sm:p-10"
          >
            <div className="size-12 rounded-2xl bg-moss/15 ring-1 ring-moss/30 inline-flex items-center justify-center text-moss-deep">
              <Check className="size-5" />
            </div>
            <h3 className="mt-6 heading-editorial text-3xl sm:text-4xl text-ink">
              Got it.{" "}
              <span className="heading-editorial-italic text-moss-deep">
                We&apos;ll be back
              </span>{" "}
              within one business day.
            </h3>
            <p className="mt-5 text-ink-muted leading-relaxed">
              A real human at TSH will read your note and respond — usually the
              same day. If your inquiry is time-sensitive, you can also reach us
              at{" "}
              <a
                href="mailto:hello@techstaffinghub.com"
                className="text-ink link-editorial"
              >
                hello@techstaffinghub.com
              </a>
              .
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className={labelClass}>Reference</span>
              <span className="font-mono text-[0.85rem] text-ink bg-bone-200 ring-1 ring-ink/10 rounded-md px-2.5 py-1">
                {state.ticketId}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setState({ kind: "idle" })}
              className="mt-8 text-sm text-ink-muted hover:text-ink link-editorial"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-7"
          >
            {/* Honeypot — visually hidden, off-screen, not reachable */}
            <div
              aria-hidden
              className="absolute left-[-9999px] top-[-9999px] h-px w-px overflow-hidden"
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Reyes"
                  className={cn(
                    inputBase,
                    errors.name && "ring-terracotta/50 focus:ring-terracotta/60"
                  )}
                  {...register("name")}
                />
                {errors.name && (
                  <p className={errorClass}>{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={cn(
                    inputBase,
                    errors.email &&
                      "ring-terracotta/50 focus:ring-terracotta/60"
                  )}
                  {...register("email")}
                />
                {errors.email && (
                  <p className={errorClass}>{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="company" className={labelClass}>
                Company <span className="text-ink-muted/60">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                placeholder="Where you work, or where you'd like to"
                className={inputBase}
                {...register("company")}
              />
            </div>

            <div>
              <span className={labelClass}>I'm reaching out about</span>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOPICS.map((t) => (
                  <label
                    key={t.value}
                    className="group cursor-pointer relative flex items-center gap-3 rounded-xl bg-bone-50 ring-1 ring-ink/10 px-4 py-3 transition hover:ring-ink/20 has-[:checked]:ring-terracotta has-[:checked]:bg-terracotta/[0.05]"
                  >
                    <input
                      type="radio"
                      value={t.value}
                      className="peer sr-only"
                      {...register("topic")}
                    />
                    <span className="size-4 rounded-full ring-1 ring-ink/25 inline-flex items-center justify-center peer-checked:ring-terracotta peer-checked:bg-terracotta transition">
                      <span className="size-1.5 rounded-full bg-bone opacity-0 peer-checked:opacity-100 transition" />
                    </span>
                    <span className="text-[0.92rem] text-ink leading-none">
                      {t.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.topic && (
                <p className={errorClass}>{errors.topic.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell us a little about what you're working on, or what you're looking for. The more context, the better the reply."
                className={cn(
                  inputBase,
                  "resize-y min-h-[160px] leading-relaxed",
                  errors.message &&
                    "ring-terracotta/50 focus:ring-terracotta/60"
                )}
                {...register("message")}
              />
              {errors.message && (
                <p className={errorClass}>{errors.message.message}</p>
              )}
            </div>

            {state.kind === "error" && (
              <div className="rounded-xl bg-terracotta/[0.06] ring-1 ring-terracotta/30 px-4 py-3 text-sm text-terracotta-deep">
                {state.message} You can also email us at{" "}
                <a
                  href="mailto:hello@techstaffinghub.com"
                  className="underline decoration-terracotta/60"
                >
                  hello@techstaffinghub.com
                </a>
                .
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                withArrow
                type="submit"
                disabled={isSubmitting || state.kind === "submitting"}
              >
                {isSubmitting || state.kind === "submitting"
                  ? "Sending…"
                  : "Send message"}
              </Button>
              <p className="text-xs text-ink-muted/80 max-w-xs leading-relaxed">
                A real person at TSH reads every message. We answer within one
                business day — often the same day.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
