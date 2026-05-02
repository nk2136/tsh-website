"use client";

import { useState, useRef, useId } from "react";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CloudUpload,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TECH_OPTIONS = [
  "QA",
  "Java",
  "Selenium",
  "Playwright",
  "Cypress",
  "Spring",
  "Kafka",
  "AWS",
  "Kubernetes",
  "Other",
] as const;

const JOB_TYPES = [
  { value: "direct", label: "Direct Hire" },
  { value: "c2h", label: "Contract-to-Hire" },
  { value: "contract", label: "Contract" },
  { value: "open", label: "Open to anything" },
] as const;

const RELOCATION = [
  { value: "yes", label: "Yes — open to relocate" },
  { value: "no", label: "No — staying put" },
  { value: "remote-only", label: "Remote only" },
] as const;

const stepOneSchema = z.object({
  fullName: z.string().min(2, "Tell us your full name").max(120),
  email: z.email("That email doesn't look right"),
  phone: z
    .string()
    .min(7, "A reachable phone number, please")
    .max(40, "That's a lot of digits"),
  location: z.string().min(2, "City, state — or wherever you call base").max(120),
  linkedin: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || /^https?:\/\/.+/i.test(v),
      "Include the full https:// URL"
    ),
});

const stepTwoSchema = z.object({
  techStack: z
    .array(z.string())
    .min(1, "Pick at least one stack — even just QA"),
  yearsExp: z
    .union([z.string(), z.number()])
    .transform((v) => (typeof v === "string" ? parseInt(v || "0", 10) : v))
    .pipe(z.number().min(0, "Negative years would be impressive").max(60)),
  jobTypePref: z.enum(["direct", "c2h", "contract", "open"], {
    error: "Pick the engagement that fits",
  }),
  relocation: z.enum(["yes", "no", "remote-only"], {
    error: "Let us know your geography",
  }),
});

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const stepThreeSchema = z.object({
  resume: z
    .any()
    .refine((f) => f instanceof File, "Attach a resume — PDF or DOC/DOCX")
    .refine(
      (f: File) => f && f.size <= MAX_FILE_BYTES,
      "Keep it under 5MB"
    )
    .refine(
      (f: File) =>
        f &&
        (ACCEPTED_TYPES.includes(f.type) ||
          /\.(pdf|docx?|DOCX?|PDF)$/.test(f.name)),
      "PDF, DOC, or DOCX only"
    ),
  linkedinExtra: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || /^https?:\/\/.+/i.test(v),
      "Include the full https:// URL"
    ),
  notes: z.string().max(2000, "Keep it under 2,000 characters").optional(),
});

const fullSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
});

type FormValues = z.input<typeof fullSchema>;

const STEPS = [
  { num: "01", label: "Contact" },
  { num: "02", label: "Tech & experience" },
  { num: "03", label: "Resume & notes" },
] as const;

const stepFields: Array<Array<keyof FormValues>> = [
  ["fullName", "email", "phone", "location", "linkedin"],
  ["techStack", "yearsExp", "jobTypePref", "relocation"],
  ["resume", "linkedinExtra", "notes"],
];

export function CandidateApplyForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ ticketId: string } | null>(null);
  const reduceMotion = useReducedMotion();
  const formId = useId();

  const {
    register,
    handleSubmit,
    trigger,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(fullSchema) as Resolver<FormValues>,
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      techStack: [],
      yearsExp: "",
      jobTypePref: undefined,
      relocation: undefined,
      linkedinExtra: "",
      notes: "",
    },
  });

  const techStack = (watch("techStack") as string[] | undefined) ?? [];
  const resumeFile = watch("resume") as File | undefined;

  async function next() {
    const valid = await trigger(stepFields[step] as (keyof FormValues)[], {
      shouldFocus: true,
    });
    if (valid) {
      setSubmitError(null);
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }
  }

  function back() {
    setSubmitError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleTech(value: string) {
    const current = techStack;
    const nextValue = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setValue("techStack", nextValue, { shouldValidate: true, shouldDirty: true });
  }

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const fd = new FormData();
      fd.append("fullName", String(values.fullName ?? ""));
      fd.append("email", String(values.email ?? ""));
      fd.append("phone", String(values.phone ?? ""));
      fd.append("location", String(values.location ?? ""));
      if (values.linkedin) fd.append("linkedin", String(values.linkedin));
      fd.append("techStack", (values.techStack as string[]).join(","));
      fd.append("yearsExp", String(values.yearsExp ?? ""));
      fd.append("jobTypePref", String(values.jobTypePref ?? ""));
      fd.append("relocation", String(values.relocation ?? ""));
      if (values.linkedinExtra)
        fd.append("linkedinExtra", String(values.linkedinExtra));
      if (values.notes) fd.append("notes", String(values.notes));
      if (values.resume instanceof File) fd.append("resume", values.resume);

      const res = await fetch("/api/candidate-apply", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        ticketId?: string;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.ticketId) {
        throw new Error(data.error || "submit_failed");
      }
      setSuccess({ ticketId: data.ticketId });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "submit_failed";
      setSubmitError(
        msg === "invalid_email"
          ? "That email didn't pass our check — please double-check it."
          : "Something went sideways on our end. Try again, or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return <SuccessState ticketId={success.ticketId} />;
  }

  return (
    <div className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-paper">
      <Stepper step={step} />

      <form
        id={formId}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-10"
      >
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6"
            >
              {step === 0 && (
                <>
                  <Field
                    label="Full name"
                    error={errors.fullName?.message as string | undefined}
                    className="sm:col-span-2"
                  >
                    <input
                      {...register("fullName")}
                      type="text"
                      autoComplete="name"
                      placeholder="Priya Ramachandran"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="Email"
                    error={errors.email?.message as string | undefined}
                  >
                    <input
                      {...register("email")}
                      type="email"
                      autoComplete="email"
                      placeholder="you@domain.com"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="Phone"
                    error={errors.phone?.message as string | undefined}
                  >
                    <input
                      {...register("phone")}
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 010-0000"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="Location"
                    hint="City, state — or 'Remote, US'"
                    error={errors.location?.message as string | undefined}
                  >
                    <input
                      {...register("location")}
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Charlotte, NC"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="LinkedIn"
                    hint="Optional"
                    error={errors.linkedin?.message as string | undefined}
                  >
                    <input
                      {...register("linkedin")}
                      type="url"
                      inputMode="url"
                      placeholder="https://linkedin.com/in/…"
                      className={inputCls}
                    />
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <Field
                    label="Tech stack"
                    hint="Pick everything that's genuinely yours."
                    error={errors.techStack?.message as string | undefined}
                    className="sm:col-span-2"
                  >
                    <div className="mt-1 flex flex-wrap gap-2">
                      {TECH_OPTIONS.map((opt) => {
                        const active = techStack.includes(opt);
                        return (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => toggleTech(opt)}
                            aria-pressed={active}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] font-medium transition-all duration-300 ring-1",
                              active
                                ? "bg-terracotta text-bone ring-terracotta-deep shadow-[0_4px_14px_-8px_rgba(168,95,62,0.6)]"
                                : "bg-bone text-ink-muted ring-ink/10 hover:ring-ink/25 hover:text-ink"
                            )}
                          >
                            {active && <Check className="size-3" />}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field
                    label="Years of experience"
                    error={errors.yearsExp?.message as string | undefined}
                  >
                    <input
                      {...register("yearsExp")}
                      type="number"
                      min={0}
                      max={60}
                      step={1}
                      placeholder="8"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="Engagement preference"
                    error={errors.jobTypePref?.message as string | undefined}
                  >
                    <Controller
                      control={control}
                      name="jobTypePref"
                      render={({ field }) => (
                        <SegmentedRadio
                          name={field.name}
                          value={field.value as string | undefined}
                          onChange={field.onChange}
                          options={JOB_TYPES.map((j) => ({
                            value: j.value,
                            label: j.label,
                          }))}
                        />
                      )}
                    />
                  </Field>
                  <Field
                    label="Relocation"
                    error={errors.relocation?.message as string | undefined}
                    className="sm:col-span-2"
                  >
                    <Controller
                      control={control}
                      name="relocation"
                      render={({ field }) => (
                        <SegmentedRadio
                          name={field.name}
                          value={field.value as string | undefined}
                          onChange={field.onChange}
                          options={RELOCATION.map((r) => ({
                            value: r.value,
                            label: r.label,
                          }))}
                        />
                      )}
                    />
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field
                    label="Resume"
                    hint="PDF, DOC, or DOCX · 5MB max"
                    error={errors.resume?.message as string | undefined}
                    className="sm:col-span-2"
                  >
                    <Controller
                      control={control}
                      name="resume"
                      render={({ field }) => (
                        <ResumeDrop
                          value={field.value as File | undefined}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </Field>
                  <Field
                    label="LinkedIn (optional)"
                    hint="If you'd rather we read it there too."
                    error={errors.linkedinExtra?.message as string | undefined}
                    className="sm:col-span-2"
                  >
                    <input
                      {...register("linkedinExtra")}
                      type="url"
                      inputMode="url"
                      placeholder="https://linkedin.com/in/…"
                      className={inputCls}
                    />
                  </Field>
                  <Field
                    label="Anything else we should know?"
                    hint="Visa status, ideal start date, what you're avoiding — anything."
                    error={errors.notes?.message as string | undefined}
                    className="sm:col-span-2"
                  >
                    <textarea
                      {...register("notes")}
                      rows={5}
                      placeholder="Write to us like a person, not a recruiter."
                      className={cn(inputCls, "resize-y min-h-[120px] py-3")}
                    />
                  </Field>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {submitError && (
          <p
            role="alert"
            className="mt-6 rounded-2xl bg-terracotta/10 ring-1 ring-terracotta/30 px-4 py-3 text-sm text-terracotta-deep"
          >
            {submitError}
          </p>
        )}

        <div className="mt-10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-ink/[0.08]">
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="text-sm text-ink-muted hover:text-ink link-editorial"
              >
                Back
              </button>
            )}
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted/70">
              Step {step + 1} of {STEPS.length}
            </span>
          </div>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="group inline-flex items-center justify-center gap-2 rounded-full h-12 px-7 bg-ink text-bone text-[0.95rem] font-medium hover:bg-ink/85 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-terracotta"
            >
              Continue
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 bg-terracotta text-bone font-medium hover:bg-terracotta-deep transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_8px_20px_-12px_rgba(168,95,62,0.6)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-terracotta"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Submit application
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="flex items-center gap-3 sm:gap-5">
      {STEPS.map((s, i) => {
        const isActive = i === step;
        const isDone = i < step;
        return (
          <li key={s.num} className="flex items-center gap-3 sm:gap-5 min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={cn(
                  "size-9 rounded-full inline-flex items-center justify-center font-mono text-[0.7rem] tracking-[0.14em] transition-colors duration-500 ring-1 shrink-0",
                  isActive &&
                    "bg-terracotta text-bone ring-terracotta-deep",
                  isDone &&
                    "bg-ink text-bone ring-ink",
                  !isActive && !isDone && "bg-bone text-ink-muted ring-ink/15"
                )}
              >
                {isDone ? <Check className="size-4" /> : s.num}
              </span>
              <span
                className={cn(
                  "font-mono text-[0.7rem] uppercase tracking-[0.18em] truncate",
                  isActive ? "text-ink" : "text-ink-muted/70"
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "h-px flex-1 sm:w-12 transition-colors duration-500",
                  i < step ? "bg-ink" : "bg-ink/15"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-ink">
          {label}
        </span>
        {hint && !error && (
          <span className="text-[0.7rem] text-ink-muted/70">{hint}</span>
        )}
      </span>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-2 text-xs text-terracotta-deep font-medium">{error}</p>
      )}
    </label>
  );
}

const inputCls =
  "w-full h-12 px-4 rounded-xl bg-bone border border-ink/10 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all duration-200 text-[0.95rem]";

function SegmentedRadio({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string | undefined;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ring-1",
              active
                ? "bg-ink text-bone ring-ink"
                : "bg-bone text-ink-muted ring-ink/10 hover:ring-ink/25 hover:text-ink"
            )}
          >
            {o.label}
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={active}
              onChange={() => onChange(o.value)}
              className="sr-only"
              tabIndex={-1}
            />
          </button>
        );
      })}
    </div>
  );
}

function ResumeDrop({
  value,
  onChange,
}: {
  value: File | undefined;
  onChange: (f: File | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    const f = files?.[0];
    if (f) onChange(f);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "rounded-2xl border-2 border-dashed transition-colors duration-200 px-6 py-8 text-center",
        isDragging
          ? "border-terracotta bg-terracotta/5"
          : "border-ink/15 bg-bone hover:border-ink/30"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
      />
      {value ? (
        <div className="flex items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3 min-w-0">
            <span className="size-10 rounded-xl bg-terracotta/10 ring-1 ring-terracotta/20 inline-flex items-center justify-center text-terracotta-deep shrink-0">
              <FileText className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-ink font-medium truncate">
                {value.name}
              </p>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink-muted/70 mt-0.5">
                {(value.size / 1024).toFixed(0)} KB · ready
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(undefined)}
            aria-label="Remove file"
            className="size-9 rounded-full inline-flex items-center justify-center text-ink-muted hover:text-ink hover:bg-ink/[0.06] transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <span className="size-12 rounded-2xl bg-terracotta/10 ring-1 ring-terracotta/20 inline-flex items-center justify-center text-terracotta-deep">
            <CloudUpload className="size-5" />
          </span>
          <p className="font-display italic text-lg text-ink leading-tight">
            Drop your resume here.
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-terracotta hover:text-terracotta-deep link-editorial"
          >
            Or browse files
          </button>
          <p className="text-xs text-ink-muted/70 max-w-[36ch]">
            We read every one personally. No ATS keyword filter on our end.
          </p>
        </div>
      )}
    </div>
  );
}

function SuccessState({ ticketId }: { ticketId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-bone-50 ring-1 ring-ink/[0.06] rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-paper"
    >
      <span className="inline-flex size-14 rounded-full bg-moss/10 ring-1 ring-moss/20 items-center justify-center text-moss-deep">
        <Check className="size-6" />
      </span>
      <h3 className="mt-6 heading-editorial text-4xl sm:text-5xl text-ink">
        Thanks. We'll read it{" "}
        <span className="heading-editorial-italic text-terracotta">
          personally.
        </span>
      </h3>
      <p className="mt-6 text-ink-muted leading-relaxed max-w-md mx-auto">
        Expect a note from a real person — usually within one business day. If
        the fit's there, we'll set up a 30-minute call. If it isn't yet, we'll
        say so honestly and stay in touch.
      </p>
      <p className="mt-10 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted">
        Reference
      </p>
      <p className="mt-1 font-mono text-sm text-ink select-all">{ticketId}</p>
      <div className="mt-10 inline-flex items-center gap-4">
        <Link
          href="/"
          className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink hover:text-terracotta link-editorial"
        >
          Back to home
        </Link>
        <span className="size-1 rounded-full bg-ink/20" />
        <Link
          href="/insights"
          className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted hover:text-ink link-editorial"
        >
          Read what we publish
        </Link>
      </div>
    </motion.div>
  );
}
