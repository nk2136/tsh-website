import type { Metadata } from "next";
import { IndustriesIndexView } from "./IndustriesIndexView";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Five sectors where Tech Staffing Hub places QA and Java engineers — financial services, healthcare, insurance, retail & e-commerce, and technology.",
};

export default function IndustriesPage() {
  return <IndustriesIndexView />;
}
