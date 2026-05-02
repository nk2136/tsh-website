export const SITE = {
  name: "Tech Staffing Hub",
  shortName: "TSH",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://techstaffinghub.com",
  email: "hello@techstaffinghub.com",
  phone: "+1 (555) 010-0000",
  address: {
    line1: "Tech Staffing Hub LLC",
    line2: "Remote · United States",
  },
  tagline: "The deliberate path to your next placement.",
  description:
    "QA & Java engineers placed with intent. Curated talent for thoughtful companies.",
  social: {
    linkedin: "https://www.linkedin.com/company/tech-staffing-hub",
    github: "https://github.com/techstaffinghub",
    twitter: "https://twitter.com/techstaffinghub",
  },
} as const;

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/candidates", label: "For Candidates" },
  { href: "/clients", label: "For Clients" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
] as const;

export const FOOTER_GROUPS = [
  {
    label: "Company",
    links: [
      { href: "/about", label: "About TSH" },
      { href: "/services", label: "Services" },
      { href: "/industries", label: "Industries" },
      { href: "/insights", label: "Insights" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    label: "For Candidates",
    links: [
      { href: "/candidates", label: "Why TSH" },
      { href: "/candidates#process", label: "Placement process" },
      { href: "/candidates#apply", label: "Apply now" },
      { href: "/candidates#faq", label: "FAQ" },
    ],
  },
  {
    label: "For Clients",
    links: [
      { href: "/clients", label: "Engagement models" },
      { href: "/clients#process", label: "Hiring process" },
      { href: "/clients#request", label: "Request talent" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    label: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export const STATS = {
  placements: 127,
  specializations: 4,
  industries: 5,
  yearsInBusiness: 6,
} as const;

export const INDUSTRIES = [
  {
    slug: "financial-services",
    name: "Financial Services",
    blurb:
      "Risk platforms, trading systems, regulatory tooling, and core banking modernization. We staff teams that understand SOX, PCI, and the cost of a missed cutover.",
    photoAlt: "A Bloomberg-style trading desk at golden hour",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    blurb:
      "EHR integrations, HIPAA-aware QA, claims pipelines, and patient-facing portals. Engineers who treat audit logs as first-class citizens.",
    photoAlt: "A clinician reviewing a tablet in a sunlit corridor",
  },
  {
    slug: "insurance",
    name: "Insurance",
    blurb:
      "Policy admin, underwriting workbenches, and claims automation. We bring engineers who can read a rate table and stay calm during open enrollment.",
    photoAlt: "Stack of policy documents on a wooden desk",
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    blurb:
      "Order management, inventory, peak-season scale tests. Engineers who understand the difference between a smoke test and a Black Friday test.",
    photoAlt: "Warehouse aisle with bins and a soft-light skylight",
  },
  {
    slug: "technology-saas",
    name: "Technology & SaaS",
    blurb:
      "Platform engineering, multi-tenant QA, observability tooling. The kind of work where the docs are the product and the test suite is the contract.",
    photoAlt: "Developer's desk with two monitors and a warm pendant lamp",
  },
] as const;

export const SERVICES = [
  {
    slug: "qa-engineering",
    name: "QA Engineering",
    summary:
      "Manual, automation, performance, and SDET-level engineers across web, mobile, and API surfaces. Selenium, Playwright, Cypress, REST Assured, JMeter, K6.",
    deliverables: [
      "Automation framework design and rollout",
      "Test strategy for new product launches",
      "Performance and load test engagements",
      "QA leadership and embedded-team augmentation",
    ],
    roles: [
      "QA Automation Engineer",
      "SDET",
      "Performance Engineer",
      "QA Lead",
      "Test Architect",
    ],
  },
  {
    slug: "java-development",
    name: "Java Development",
    summary:
      "Mid-to-senior Java engineers across Spring, microservices, distributed data, and platform work. Spring Boot, Kafka, JPA, AWS, Kubernetes.",
    deliverables: [
      "Backend service development and modernization",
      "Microservice migrations and contract design",
      "Performance tuning and JVM diagnostics",
      "Tech-lead embeds for platform initiatives",
    ],
    roles: [
      "Java Backend Engineer",
      "Senior Java Engineer",
      "Tech Lead",
      "Platform Engineer",
      "Solution Architect",
    ],
  },
] as const;

export const ENGAGEMENT_MODELS = [
  {
    label: "Direct Placement",
    summary:
      "Permanent hire onto your team. We source, vet, and present a short list. You hire. We move on.",
    detail: "Best for: replacing a long-term role on your team.",
  },
  {
    label: "Contract-to-Hire",
    summary:
      "Engagement starts as a contract. After 6 months, convert to FTE on your headcount. Lower hiring risk on both sides.",
    detail: "Best for: roles where mutual fit matters more than speed.",
  },
  {
    label: "Contract",
    summary:
      "Time-bound staffing for a specific project or coverage need. We handle compliance, payroll, and offboarding.",
    detail: "Best for: 3-12 month projects, surge capacity, parental backfills.",
  },
] as const;

export const PROCESS_STEPS = [
  { label: "Apply", detail: "We meet, we listen, we vet." },
  { label: "Match", detail: "We align you with a fitting client and role." },
  { label: "Submit", detail: "We submit your profile, prep, and represent." },
  { label: "Place", detail: "You start. We stay engaged for the long arc." },
] as const;
