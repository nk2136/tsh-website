"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Paperclip,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const ROLE_TYPES = [
  {
    value: "direct-placement",
    label: "Direct Placement",
    hint: "Permanent hire on your headcount.",
  },
  {
    value: "contract-to-hire",
    label: "Contract-to-Hire",
    hint: "6-month try-then-buy. Convert to FTE.",
  },
  {
    value: "contract",
    label: "Contract",
    hint: "Time-bound. We handle compliance and payroll.",
  },
] as const;

const TECH_OPTIONS = ["QA", "Java", "SDET", "Lead", "Other"] as const;

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_MIMES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ACCEPTED_EXT_RE = /\.(pdf|doc|docx)$/i;

const schema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Tell us the company's name."),
  contactName: z
    .string()
    .trim()
    .min(2, "Who should we reply to?"),
  email: z
    .string()
    .trim()
    .min(1, "We'll need an email to respond.")
    .email("That doesn't look like a valid email."),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  roleType: z.enum(["direct-placement", "contract-to-hire", "contract"], {
    message: "Pick the engagement model that fits.",
  }),
  tech: z
    .array(z.enum(TECH_OPTIONS))
    .min(1, "Pick at least one focus area."),
  headcount: z
    .number({ message: "Headcount must be a number." })
    .int("Whole numbers only.")
    .min(1, "At least one role.")
    .max(50, "For 50+ roles, let's chat directly."),
  targetStart: z
    .string()
    .optional()
    .or(z.literal("")),
  jdText: z
    .string()
    .max(5000, "Keep it under 5,000 characters.")
    .optional()
    .or(z.literal("")),
  jd: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        !(file instanceof File) ||
        file.size <= MAX_FILE_BYTES,
      "File must be 5MB or smaller."
    )
    .refine(
      (file) =>
        !file ||
        !(file instanceof File) ||
        ACCEPTED_MIMES.includes(file.type) ||
        ACCEPTED_EXT_RE.test(file.name),
      "PDF, DOC, or DOCX only."
    ),
  notes: z
    .string()
    .max(2000, "Keep it under 2,000 characters.")
    .optional()
    .or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const fieldBase =
  "w-full rounded-xl bg-bone-50 ring-1 ring-ink/[0.08] px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-muted/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta focus:bg-bone";

const labelBase =
  "block font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted mb-2";

const errorText =
  "mt-2 text-xs text-terracotta-deep font-medium";

function FieldLabel({
  htmlFor,
  required,
  children,
  hint,
}: {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline justify-between mb-2">
      <label htmlFor={htmlFor} className={cn(labelBase, "mb-0")}>
        {children}
        {required && <span className="ml-1 text-terracotta">*</span>}
      </label>
      {hint && (
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted/60">
          {hint}
        </span>
      )}
    </div>
  );
}

export function ClientRequestForm() {
  const reduceMotion = useReducedMotion();
  const [submitState, setSubmitState] = useState<
    | { status: "idle" }
    | { status: "submitting" }
    | { status: "error"; message: string }
    | { status: "success"; ticketId: string }
  >({ status: "idle" });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      roleType: undefined,
      tech: [],
      headcount: 1,
      targetStart: "",
      jdText: "",
      notes: "",
      website: "",
    },
  });

  const tech = watch("tech") ?? [];
  const roleType = watch("roleType");

  const onSubmit = handleSubmit(async (values) => {
    if (values.website && values.website.length > 0) {
      setSubmitState({ status: "success", ticketId: "tsh_quiet" });
      return;
    }

    setSubmitState({ status: "submitting" });
    try {
      const fd = new FormData();
      fd.append("companyName", values.companyName);
      fd.append("contactName", values.contactName);
      fd.append("email", values.email);
      if (values.phone) fd.append("phone", values.phone);
      fd.append("roleType", values.roleType);
      values.tech.forEach((t) => fd.append("tech[]", t));
      fd.append("headcount", String(values.headcount));
      if (values.targetStart) fd.append("targetStart", values.targetStart);
      if (values.jdText) fd.append("jdText", values.jdText);
      if (values.notes) fd.append("notes", values.notes);
      if (selectedFile) fd.append("jd", selectedFile);

      const res = await fetch("/api/client-request", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as
        | { ok: true; ticketId: string }
        | { ok: false; error?: string };

      if (!res.ok || !("ok" in data) || !data.ok) {
        setSubmitState({
          status: "error",
          message:
            "Something went sideways on our end. Try again in a moment, or email hello@techstaffinghub.com.",
        });
        return;
      }
      setSubmitState({ status: "success", ticketId: data.ticketId });
    } catch {
      setSubmitState({
        status: "error",
        message:
          "We couldn't reach the server. Check your connection and try once more.",
      });
    }
  });

  const toggleTech = (value: (typeof TECH_OPTIONS)[number]) => {
    const current = tech;
    if (current.includes(value)) {
      setValue(
        "tech",
        current.filter((t) => t !== value),
        { shouldValidate: true, shouldTouch: true }
      );
    } else {
      setValue("tech", [...current, value], {
        shouldValidate: true,
        shouldTouch: true,
      });
    }
  };

  if (submitState.status === "success") {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-bone-50 ring-1 ring-ink/[0.06] rounded-3xl p-10 sm:p-14 overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent"
        />
        <div className="size-12 rounded-2xl bg-moss/10 ring-1 ring-moss/20 inline-flex items-center justify-center text-moss-deep mb-8">
          <Check className="size-5" />
        </div>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-moss-deep mb-4">
          Received
        </p>
        <h3 className="heading-editorial text-3xl sm:text-4xl text-ink leading-[1.05]">
          Got it.{" "}
          <span className="heading-editorial-italic text-terracotta">
            We&rsquo;ll be in touch
          </span>{" "}
          within one business day.
        </h3>
        <p className="mt-6 text-[0.95rem] text-ink-muted leading-relaxed max-w-prose">
          A real person — usually our founder — will read your request, sketch a
          shortlist plan, and reply with next steps. No auto-responder, no
          drip campaign.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">
            Reference
          </p>
          <code className="font-mono text-sm text-ink bg-ash/40 px-3 py-1.5 rounded-md ring-1 ring-ink/[0.06]">
            {submitState.ticketId}
          </code>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink hover:text-terracotta-deep link-editorial"
          >
            Back home
            <ArrowUpRight className="size-3.5" />
          </Link>
          <a
            href="/insights"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink link-editorial"
          >
            Read our notes while you wait
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative bg-bone-50 ring-1 ring-ink/[0.06] rounded-3xl p-6 sm:p-10 lg:p-12"
    >
      <div
        aria-hidden
        className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-terracotta/40 to-transparent"
      />

      {/* Identity row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <FieldLabel htmlFor="companyName" required>
            Company
          </FieldLabel>
          <input
            id="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Acme Industries"
            aria-invalid={!!errors.companyName}
            className={cn(
              fieldBase,
              errors.companyName && "ring-terracotta-deep/60 focus:ring-terracotta-deep"
            )}
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className={errorText}>{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <FieldLabel htmlFor="contactName" required>
            Your name
          </FieldLabel>
          <input
            id="contactName"
            type="text"
            autoComplete="name"
            placeholder="Maya Patel"
            aria-invalid={!!errors.contactName}
            className={cn(
              fieldBase,
              errors.contactName && "ring-terracotta-deep/60 focus:ring-terracotta-deep"
            )}
            {...register("contactName")}
          />
          {errors.contactName && (
            <p className={errorText}>{errors.contactName.message}</p>
          )}
        </div>

        <div>
          <FieldLabel htmlFor="email" required>
            Work email
          </FieldLabel>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="maya@acme.com"
            aria-invalid={!!errors.email}
            className={cn(
              fieldBase,
              errors.email && "ring-terracotta-deep/60 focus:ring-terracotta-deep"
            )}
            {...register("email")}
          />
          {errors.email && <p className={errorText}>{errors.email.message}</p>}
        </div>

        <div>
          <FieldLabel htmlFor="phone" hint="Optional">
            Phone
          </FieldLabel>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 010-0000"
            className={fieldBase}
            {...register("phone")}
          />
          {errors.phone && (
            <p className={errorText}>{errors.phone.message as string}</p>
          )}
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Leave this field blank
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      {/* Engagement */}
      <fieldset className="mt-10">
        <legend className={cn(labelBase, "mb-4")}>
          Engagement model <span className="text-terracotta">*</span>
        </legend>
        <Controller
          control={control}
          name="roleType"
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROLE_TYPES.map((opt) => {
                const checked = field.value === opt.value;
                return (
                  <label
                    key={opt.value}
                    className={cn(
                      "group relative cursor-pointer rounded-2xl bg-bone ring-1 px-5 py-4 transition-all duration-200",
                      checked
                        ? "ring-2 ring-terracotta bg-terracotta/[0.04] shadow-paper"
                        : "ring-ink/[0.08] hover:ring-ink/20 hover:bg-bone-50"
                    )}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      value={opt.value}
                      checked={checked}
                      onChange={() => field.onChange(opt.value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                    <span className="flex items-center justify-between">
                      <span className="font-display text-lg text-ink leading-tight">
                        {opt.label}
                      </span>
                      <span
                        className={cn(
                          "size-4 rounded-full ring-1 inline-flex items-center justify-center transition-colors",
                          checked
                            ? "bg-terracotta ring-terracotta"
                            : "bg-transparent ring-ink/20 group-hover:ring-ink/40"
                        )}
                        aria-hidden
                      >
                        {checked && (
                          <span className="size-1.5 rounded-full bg-bone" />
                        )}
                      </span>
                    </span>
                    <span className="mt-2 block text-xs text-ink-muted leading-relaxed">
                      {opt.hint}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        />
        {errors.roleType && (
          <p className={errorText}>{errors.roleType.message}</p>
        )}
        {roleType && (
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-moss-deep">
            <span className="opacity-70">Selected · </span>
            {ROLE_TYPES.find((r) => r.value === roleType)?.label}
          </p>
        )}
      </fieldset>

      {/* Tech */}
      <fieldset className="mt-10">
        <legend className={cn(labelBase, "mb-4")}>
          Focus areas <span className="text-terracotta">*</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {TECH_OPTIONS.map((t) => {
            const active = tech.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTech(t)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] font-medium ring-1 transition-all duration-200",
                  active
                    ? "bg-ink text-bone ring-ink shadow-paper"
                    : "bg-bone text-ink-muted ring-ink/[0.12] hover:ring-ink/30 hover:text-ink"
                )}
              >
                {active && <Check className="size-3" aria-hidden />}
                {t}
              </button>
            );
          })}
        </div>
        {errors.tech && (
          <p className={errorText}>{errors.tech.message as string}</p>
        )}
      </fieldset>

      {/* Numbers + dates */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <FieldLabel htmlFor="headcount" required>
            Headcount
          </FieldLabel>
          <input
            id="headcount"
            type="number"
            min={1}
            max={50}
            step={1}
            inputMode="numeric"
            aria-invalid={!!errors.headcount}
            className={cn(
              fieldBase,
              errors.headcount && "ring-terracotta-deep/60 focus:ring-terracotta-deep"
            )}
            {...register("headcount", { valueAsNumber: true })}
          />
          {errors.headcount && (
            <p className={errorText}>{errors.headcount.message}</p>
          )}
        </div>

        <div>
          <FieldLabel htmlFor="targetStart" hint="Optional">
            Target start
          </FieldLabel>
          <input
            id="targetStart"
            type="date"
            className={fieldBase}
            {...register("targetStart")}
          />
        </div>
      </div>

      {/* JD text */}
      <div className="mt-10">
        <FieldLabel htmlFor="jdText" hint="Paste or upload — either works">
          Job description
        </FieldLabel>
        <textarea
          id="jdText"
          rows={6}
          placeholder="Paste the JD here, or sketch it in a few lines. We're equally happy reading bullet points or polished prose."
          className={cn(fieldBase, "resize-y leading-relaxed")}
          {...register("jdText")}
        />
        {errors.jdText && (
          <p className={errorText}>{errors.jdText.message as string}</p>
        )}

        {/* File upload */}
        <div className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setSelectedFile(f);
              setValue("jd", f ?? undefined, { shouldValidate: true });
            }}
          />
          {!selectedFile ? (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full bg-transparent ring-1 ring-ink/15 px-4 py-2 text-sm text-ink hover:ring-ink/30 hover:bg-ink/[0.04] transition-all"
            >
              <Paperclip className="size-3.5" aria-hidden />
              Attach a file
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted/70 ml-1">
                PDF · DOC · ≤5MB
              </span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-3 rounded-full bg-ash/40 ring-1 ring-ink/[0.08] pl-4 pr-2 py-1.5">
              <Paperclip className="size-3.5 text-ink-muted" aria-hidden />
              <span className="font-mono text-xs text-ink truncate max-w-[18rem]">
                {selectedFile.name}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-muted/60">
                {(selectedFile.size / 1024).toFixed(0)} KB
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setValue("jd", undefined, { shouldValidate: true });
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="size-6 rounded-full inline-flex items-center justify-center text-ink-muted hover:text-ink hover:bg-ink/[0.06] transition-colors"
                aria-label="Remove attachment"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}
          {errors.jd && (
            <p className={errorText}>{errors.jd.message as string}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="mt-10">
        <FieldLabel htmlFor="notes" hint="Optional">
          Anything else we should know
        </FieldLabel>
        <textarea
          id="notes"
          rows={4}
          placeholder="Team culture, must-have skills, dealbreakers, comp band, the things you wish recruiters asked about."
          className={cn(fieldBase, "resize-y leading-relaxed")}
          {...register("notes")}
        />
        {errors.notes && (
          <p className={errorText}>{errors.notes.message as string}</p>
        )}
      </div>

      {/* Submit */}
      <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 pt-8 border-t border-ink/[0.06]">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          withArrow={!isSubmitting && submitState.status !== "submitting"}
          disabled={isSubmitting || submitState.status === "submitting"}
          className={cn(
            (isSubmitting || submitState.status === "submitting") &&
              "cursor-wait"
          )}
        >
          {submitState.status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending
            </>
          ) : (
            "Send the request"
          )}
        </Button>
        <p className="text-sm text-ink-muted leading-relaxed max-w-sm">
          We reply personally within one business day. No drip emails, no
          gated whitepapers.
        </p>
      </div>

      {submitState.status === "error" && (
        <div
          role="alert"
          className="mt-6 rounded-xl bg-terracotta/[0.06] ring-1 ring-terracotta/30 px-4 py-3 text-sm text-terracotta-deep"
        >
          {submitState.message}
        </div>
      )}

      {!isValid && Object.keys(errors).length > 0 && (
        <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-muted/70">
          A few fields above need a quick look.
        </p>
      )}
    </form>
  );
}
