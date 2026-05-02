import { SITE } from "@/lib/constants";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: "Tech Staffing Hub LLC",
    url: SITE.url,
    logo: `${SITE.url}/logo/mark.svg`,
    sameAs: [SITE.social.linkedin, SITE.social.github, SITE.social.twitter],
    description: SITE.description,
    foundingDate: "2020",
    knowsAbout: [
      "QA Engineering",
      "Java Development",
      "IT Staffing",
      "Contract-to-Hire Placement",
      "Direct Placement",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: SITE.email,
        contactType: "Customer Service",
        availableLanguage: ["English"],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/insights?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type ArticleJsonLdProps = {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  url: string;
};

export function ArticleJsonLd({
  title,
  description,
  author,
  publishedAt,
  url,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Person", name: author },
    datePublished: publishedAt,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo/mark.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type JobPostingJsonLdProps = {
  title: string;
  description: string;
  employmentType: string;
  location: string;
  datePosted?: string;
};

export function JobPostingJsonLd({
  title,
  description,
  employmentType,
  location,
  datePosted,
}: JobPostingJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE.url,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "United States" },
    datePosted: datePosted ?? new Date().toISOString().slice(0, 10),
    description_text: location,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
