import rolesData from "@/content/careers/roles.json";

export type CareerRole = {
  slug: string;
  title: string;
  type: string;
  location: string;
  department: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  niceToHave: string[];
  compensationNote: string;
};

export function getAllRoles(): CareerRole[] {
  return rolesData as CareerRole[];
}

export function getRoleBySlug(slug: string): CareerRole | undefined {
  return (rolesData as CareerRole[]).find((r) => r.slug === slug);
}
