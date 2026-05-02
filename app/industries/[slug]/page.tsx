import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/lib/constants";
import { IndustryDeepView } from "./IndustryDeepView";

type IndustrySlug = (typeof INDUSTRIES)[number]["slug"];

type IndustryDeep = {
  intro: string[];
  useCases: { title: string; detail: string }[];
  commonRoles: string[];
  whatWeKnow: { label: string; body: string }[];
};

const DEEP: Record<IndustrySlug, IndustryDeep> = {
  "financial-services": {
    intro: [
      "Financial services is the sector where engineering culture meets the audit log. Every release is a regulated event; every contractor's laptop is a control. We've placed engineers across regional banks, broker-dealers, asset managers, and a handful of fintech entrants — and the muscle that matters in each is the same one: respect for blast radius.",
      "We staff teams that understand market hours aren't a slogan. A failed deploy at 9:31am on a Tuesday is not the same incident as one at 9:31pm on a Saturday. The QA engineers and Java developers we represent for this sector know the difference, and they know how to write tests that prove they know.",
      "The work spans risk platforms, trading systems, regulatory tooling, payments, and core banking modernization. It's rarely glamorous. It's almost always consequential.",
    ],
    useCases: [
      {
        title: "Senior QA Automation Engineer at a regional broker-dealer",
        detail:
          "Took a brittle Selenium 2 suite and migrated it to Playwright with proper data isolation, cutting flake rate from 14% to under 1% across the firm's order entry flows.",
      },
      {
        title: "Java Tech Lead at a community bank's modernization program",
        detail:
          "Led the migration of a 17-year-old core banking integration layer onto Spring Boot microservices. Zero unplanned downtime through a 14-month rollout.",
      },
      {
        title: "SDET at a mid-size asset manager",
        detail:
          "Built the firm's first contract-test framework for FIX gateways, replacing two days of manual regression with a 22-minute pipeline.",
      },
      {
        title: "Performance Engineer at a fintech payment processor",
        detail:
          "Designed a sustained-load harness that surfaced a JDBC pool exhaustion bug three weeks before peak season — a fix that quietly saved the holiday.",
      },
    ],
    commonRoles: [
      "QA Automation Engineer",
      "SDET",
      "Performance Engineer",
      "Java Backend Engineer",
      "Senior Java Engineer",
      "Java Tech Lead",
    ],
    whatWeKnow: [
      {
        label: "SOX & change-control awareness",
        body:
          "We brief candidates on segregation of duties, change-record discipline, and the practical cost of being on the wrong side of an audit. They know what an SOX boundary feels like before day one.",
      },
      {
        label: "Market-hours testing windows",
        body:
          "We staff engineers who plan QA cycles around trading calendars — not against them. Pre-market freezes, end-of-day reconciliations, settlement windows: built into the cadence, not bolted on.",
      },
      {
        label: "Vendor-risk and onboarding overhead",
        body:
          "We carry the documentation our clients' vendor-risk teams ask for: insurance, attestations, background checks, training records. Onboarding clears in days, not quarters.",
      },
    ],
  },

  healthcare: {
    intro: [
      "Healthcare engineering sits between three audiences who never get to talk to each other directly: the clinicians using the system, the patients depending on it, and the auditors reading the logs after. The engineers we place for this sector understand that all three are the user.",
      "We've staffed across EHR integration teams, claims-processing pipelines, patient-facing portals, and HIPAA-aware data warehouses. The work demands engineers who treat audit logging as a feature — not a chore — and who can read a HL7 v2 message without flinching.",
      "Healthcare moves slowly for legitimate reasons. The engineers who thrive in it are the ones who don't fight that, but find the high-leverage work inside the constraints.",
    ],
    useCases: [
      {
        title: "Senior QA Engineer at a regional health system",
        detail:
          "Designed an end-to-end test suite for an Epic-adjacent patient-portal redesign, including PHI-safe synthetic data generation across staging environments.",
      },
      {
        title: "Java Engineer at a claims-processing platform",
        detail:
          "Rewrote a legacy EDI 837/835 adapter onto a streaming pipeline; reduced reconciliation time on a 9-million-claim backlog from 11 hours to 38 minutes.",
      },
      {
        title: "QA Lead at a telehealth startup",
        detail:
          "Stood up the company's first compliance-grade QA process: traceability matrix, signed test evidence, and HIPAA-aware bug-tracking conventions.",
      },
      {
        title: "SDET at a payer-side analytics team",
        detail:
          "Built test fixtures around HEDIS measure logic, catching three subtle measure-year bugs before they hit production reporting.",
      },
    ],
    commonRoles: [
      "QA Engineer",
      "QA Lead",
      "Java Backend Engineer",
      "Integration Engineer",
      "SDET",
      "Performance Engineer",
    ],
    whatWeKnow: [
      {
        label: "PHI handling, in practice",
        body:
          "Our engineers know what a BAA is, why it matters, and how to design test environments that never touch a real patient record. Synthetic data that's realistic enough to find bugs.",
      },
      {
        label: "HL7, FHIR, and EDI fluency",
        body:
          "We screen for genuine fluency in healthcare data formats — not buzzword-bingo familiarity. The candidates we present have shipped against these specs, not just read about them.",
      },
      {
        label: "Slow-clock release rhythms",
        body:
          "Healthcare ships in months, not days, and rolls back rarely. We staff engineers who plan validation around that rhythm, with documentation that survives the long arc.",
      },
    ],
  },

  insurance: {
    intro: [
      "Insurance is a sector where the rules are the product. The policy admin system, the underwriting workbench, the claims pipeline — they're all expressions of regulatory and actuarial logic, encoded in software. The engineers we place for this work have to be comfortable holding both threads at once.",
      "We've staffed across P&C carriers, life insurers, and specialty MGA platforms. The QA work tends to be calculation-dense; the Java work tends to be integration-heavy. Both demand the kind of engineer who reads a specification carefully and asks the right follow-up questions.",
      "Insurance technology is also famously cyclical. Open enrollment, renewal cycles, regulatory filings — they create predictable seasons of intensity. We staff engineers who plan around those rhythms instead of being surprised by them.",
    ],
    useCases: [
      {
        title: "Senior QA Engineer at a P&C carrier's policy admin migration",
        detail:
          "Built a parallel-run test harness comparing legacy and modern policy quotes across 1.4 million scenarios — caught two rate-table edge cases two weeks before go-live.",
      },
      {
        title: "Java Backend Engineer at a specialty MGA",
        detail:
          "Implemented a rules-engine service for underwriting decisions; reduced manual exception review from 22% of submissions to 6%.",
      },
      {
        title: "SDET at a life insurer's claims platform",
        detail:
          "Stood up automated regression for state-by-state claim adjudication rules, replacing a quarterly manual cycle with a nightly run.",
      },
      {
        title: "Tech Lead at an insurtech open-enrollment surge",
        detail:
          "Embedded for the 90 days surrounding open enrollment; led capacity work and on-call rotations for a system seeing 8x normal load.",
      },
    ],
    commonRoles: [
      "QA Automation Engineer",
      "SDET",
      "Java Backend Engineer",
      "Senior Java Engineer",
      "Integration Engineer",
      "Tech Lead",
    ],
    whatWeKnow: [
      {
        label: "Reading rate tables without flinching",
        body:
          "Our engineers can sit with a 12-tab actuarial spreadsheet, a state-specific filing, and an underwriter's email — and produce a test case that holds up in audit.",
      },
      {
        label: "Open-enrollment and renewal-cycle staffing",
        body:
          "We plan engagements around the calendar that actually matters. Surge contractors land before the window opens, not in the middle of it.",
      },
      {
        label: "State-by-state regulatory variance",
        body:
          "We brief candidates on the reality that 50 jurisdictions means 50 sets of rules. They show up understanding why a small change can require 50 small validations.",
      },
    ],
  },

  "retail-ecommerce": {
    intro: [
      "Retail and e-commerce engineering looks deceptively simple from the outside. A product page, a cart, a checkout. Then you discover the order-management system underneath, the inventory ledger that has to balance to the penny, and the peak-season test plan that had better be ready by August.",
      "We've staffed across pure-play marketplaces, omnichannel retailers, and DTC brands scaling out of their first platform. The engineers who do well here are the ones who can hold both the customer experience and the back-of-house mechanics in their head at once.",
      "It's also a sector with extraordinary clock pressure. Black Friday, Cyber Monday, holiday week — the engineering decisions made in May determine the outcome in November.",
    ],
    useCases: [
      {
        title: "Performance Engineer at a marketplace platform",
        detail:
          "Built a peak-season load harness simulating Black Friday traffic patterns; surfaced a Redis eviction bug that would have caused cart loss at peak.",
      },
      {
        title: "Senior QA at an omnichannel retailer's OMS rollout",
        detail:
          "Drove acceptance testing for a buy-online-pick-up-in-store launch across 340 locations; coordinated UAT with operations and store-systems teams.",
      },
      {
        title: "Java Engineer on an inventory-ledger modernization",
        detail:
          "Rewrote a nightly reconciliation job onto an event-sourced ledger; cut overnight discrepancies from dozens to single digits and made them traceable.",
      },
      {
        title: "SDET at a DTC brand on a re-platform",
        detail:
          "Stood up contract tests between commerce and ERP during a migration off Shopify Plus; caught two fulfillment-mapping bugs before holiday freeze.",
      },
    ],
    commonRoles: [
      "Performance Engineer",
      "QA Automation Engineer",
      "SDET",
      "Java Backend Engineer",
      "Tech Lead",
      "Platform Engineer",
    ],
    whatWeKnow: [
      {
        label: "The difference between smoke and surge",
        body:
          "Our engineers know that a passing smoke test means very little when the real test arrives at 3am on the day after Thanksgiving. They write — and execute — the second kind.",
      },
      {
        label: "Peak-season code-freeze rhythms",
        body:
          "We staff with the calendar in view: contractors hired in summer, ramped by September, frozen by mid-November. We don't propose changes during the freeze.",
      },
      {
        label: "OMS, WMS, and inventory ledger reality",
        body:
          "Our engineers understand that the system of record for what's on a shelf is not always the same as the system of record for what's been sold — and they design tests that surface the gap.",
      },
    ],
  },

  "technology-saas": {
    intro: [
      "Technology and SaaS is the sector where TSH started, and it's the work most familiar to most of our engineers. Multi-tenant platforms, observability tooling, developer-facing APIs, internal platform teams — the kind of engagement where the documentation is the product and the test suite is the contract.",
      "We've staffed across early-stage Series A teams, platform groups inside post-IPO companies, and the quiet but excellent engineering organizations of vertical SaaS firms. The work spans backend Java, full-stack QA, and the increasingly important seam between them: the contract.",
      "It's the sector with the fastest release cadence and the highest expectations for engineering self-direction. We staff for both.",
    ],
    useCases: [
      {
        title: "Senior Java Engineer on an API platform team",
        detail:
          "Migrated a monolith's public API onto a versioned gateway with full backward compatibility; deprecation notices, sunset headers, the works.",
      },
      {
        title: "SDET at a multi-tenant analytics SaaS",
        detail:
          "Built tenant-isolation test scaffolding catching three cross-tenant data-bleed risks during a schema migration.",
      },
      {
        title: "QA Automation Lead at a developer-tools company",
        detail:
          "Stood up a self-service test framework that product engineers actually used — adoption hit 78% within the first quarter.",
      },
      {
        title: "Platform Engineer at a Series B vertical SaaS",
        detail:
          "Embedded for nine months on observability tooling: golden signals, runbook automation, and the kind of dashboards on-call engineers actually look at.",
      },
    ],
    commonRoles: [
      "SDET",
      "QA Automation Engineer",
      "Senior Java Engineer",
      "Platform Engineer",
      "Tech Lead",
      "Solution Architect",
    ],
    whatWeKnow: [
      {
        label: "Multi-tenancy as a first-class concern",
        body:
          "Our engineers test tenant isolation the way bankers test ledgers: cross-tenant access is a categorical bug, and the test suite reflects that.",
      },
      {
        label: "Observability that survives 3am",
        body:
          "We staff engineers who instrument the work as they build it, not after — runbooks written by the people who built the system, for the people who'll be paged about it.",
      },
      {
        label: "Self-direction at high velocity",
        body:
          "SaaS teams ship daily; the engineers we place are comfortable making sound judgment calls without a project manager in the room. They communicate up, ship down, and own the loop.",
      },
    ],
  },
};

const SLUG_SET = new Set(INDUSTRIES.map((i) => i.slug));

function isIndustrySlug(slug: string): slug is IndustrySlug {
  return SLUG_SET.has(slug as IndustrySlug);
}

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) {
    return { title: "Industry not found" };
  }
  const industry = INDUSTRIES.find((i) => i.slug === slug)!;
  return {
    title: `${industry.name} — Industries`,
    description: industry.blurb,
  };
}

export default async function IndustryDeepPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) {
    notFound();
  }
  const industry = INDUSTRIES.find((i) => i.slug === slug)!;
  const deep = DEEP[slug];
  const others = INDUSTRIES.filter((i) => i.slug !== slug);

  return (
    <IndustryDeepView industry={industry} deep={deep} others={others} />
  );
}
