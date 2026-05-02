"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterInline() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "insights" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setState("ok");
        setEmail("");
      } else {
        setState("error");
        setMessage(
          data?.error === "invalid_email"
            ? "That email doesn't look right."
            : "Something went sideways. Try again in a moment."
        );
      }
    } catch {
      setState("error");
      setMessage("Network hiccup. Try again.");
    }
  }

  if (state === "ok") {
    return (
      <div className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-8 flex items-start gap-4">
        <div className="size-10 rounded-full bg-moss/15 ring-1 ring-moss/30 flex items-center justify-center shrink-0">
          <Check className="size-5 text-moss-deep" />
        </div>
        <div>
          <p className="font-display italic text-2xl text-ink leading-tight">
            You're on the list.
          </p>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            We'll write when there's something worth writing. Probably not
            sooner.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-6 sm:p-8"
    >
      <label
        htmlFor="newsletter-email"
        className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted"
      >
        Email
      </label>
      <div className="mt-3 flex flex-col sm:flex-row gap-3">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          placeholder="you@somewhere.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") {
              setState("idle");
              setMessage(null);
            }
          }}
          className="flex-1 h-12 px-4 rounded-full bg-bone ring-1 ring-ink/15 focus:ring-2 focus:ring-terracotta outline-none text-ink placeholder:text-ink-muted/60 transition-all"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink text-bone font-medium text-[0.95rem] hover:bg-ink/85 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === "loading" ? "Sending…" : "Subscribe"}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
      <p className="mt-4 text-xs text-ink-muted/80">
        We won't share your address. Unsubscribe is one click and we won't try
        to win you back.
      </p>
      {state === "error" && message ? (
        <p className="mt-3 text-sm text-terracotta-deep">{message}</p>
      ) : null}
    </form>
  );
}
