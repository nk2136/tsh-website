"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Props = { roleSlug: string; roleTitle: string };

export function RoleApplicationForm({ roleSlug, roleTitle }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      fd.set("source", "careers");
      fd.set("role", roleSlug);
      fd.set("roleTitle", roleTitle);
      const res = await fetch("/api/candidate-apply", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setState("ok");
        setTicket(data.ticketId ?? null);
      } else {
        setState("error");
        setError(
          data?.error === "invalid_email"
            ? "That email doesn't look right."
            : "We couldn't get that through. Please try again."
        );
      }
    } catch {
      setState("error");
      setError("Network hiccup. Try again.");
    }
  }

  if (state === "ok") {
    return (
      <div className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-8 sm:p-10">
        <div className="flex items-start gap-4">
          <div className="size-11 rounded-full bg-moss/15 ring-1 ring-moss/30 flex items-center justify-center shrink-0">
            <Check className="size-5 text-moss-deep" />
          </div>
          <div>
            <p className="font-display italic text-2xl sm:text-3xl text-ink leading-tight">
              We've got it.
            </p>
            <p className="mt-3 text-[0.95rem] text-ink-muted leading-relaxed">
              A real human will read your application within a business day. If
              we think there's a fit, we'll reach out to schedule the intro
              call. If we don't, we'll tell you that too.
            </p>
            {ticket ? (
              <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink-muted">
                Reference: {ticket}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-2xl p-8 sm:p-10 space-y-6"
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
        />
      </div>

      <div>
        <label
          htmlFor="why"
          className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted"
        >
          Why this role
        </label>
        <textarea
          id="why"
          name="why"
          rows={5}
          required
          placeholder="A few sentences. We read these closely."
          className="mt-3 w-full rounded-2xl bg-bone ring-1 ring-ink/15 focus:ring-2 focus:ring-terracotta outline-none px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-all resize-y"
        />
      </div>

      <div>
        <label
          htmlFor="resume"
          className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted"
        >
          Resume <span className="lowercase tracking-normal text-ink-muted/70">(optional)</span>
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,.txt,.md"
          className="mt-3 block w-full text-sm text-ink-muted file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:bg-ink file:text-bone hover:file:bg-ink/85 file:font-medium file:cursor-pointer file:text-[0.85rem]"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-ink-muted/80 max-w-md">
          By submitting, you're sharing your details with TSH for the purpose
          of evaluating this application. We won't pass them on without asking.
        </p>
        <button
          type="submit"
          disabled={state === "loading"}
          className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-terracotta text-bone font-medium hover:bg-terracotta-deep transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === "loading" ? "Sending…" : "Send application"}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      {state === "error" && error ? (
        <p className="text-sm text-terracotta-deep">{error}</p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  inputMode,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-3 w-full h-12 rounded-full bg-bone ring-1 ring-ink/15 focus:ring-2 focus:ring-terracotta outline-none px-4 text-ink placeholder:text-ink-muted/60 transition-all"
      />
    </div>
  );
}
