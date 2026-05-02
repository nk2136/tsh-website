"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function NewsletterCapture() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      setState("success");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="inline-flex items-center gap-2 text-sm text-moss-soft"
        >
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-moss-soft/20 text-moss-soft">
            <Check className="size-3" />
          </span>
          On the list. We'll be in touch.
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={onSubmit}
          className="relative max-w-sm"
        >
          <div
            className={cn(
              "flex items-center gap-2 rounded-full ring-1 transition pl-5 pr-1.5 py-1.5",
              state === "error"
                ? "ring-terracotta/50"
                : "ring-bone/15 focus-within:ring-bone/40"
            )}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              placeholder="you@company.com"
              className="flex-1 bg-transparent text-bone placeholder:text-bone/35 text-sm focus:outline-none"
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-full bg-terracotta text-bone text-xs font-medium tracking-wide hover:bg-terracotta-deep transition disabled:opacity-60"
            >
              {state === "loading" ? "Sending…" : "Subscribe"}
              {state !== "loading" && <ArrowRight className="size-3.5" />}
            </button>
          </div>
          {state === "error" && (
            <p className="mt-2 text-xs text-terracotta-soft">
              Please enter a valid email.
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
