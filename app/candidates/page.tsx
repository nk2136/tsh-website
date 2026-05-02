import type { Metadata } from "next";
import { CandidatesClient } from "./CandidatesClient";

export const metadata: Metadata = {
  title: "For Candidates — Placement, with the patience to do it right.",
  description:
    "QA, Java, and SDET engineers: honest representation, vendor-network depth, and long-arc support. Apply to TSH and we'll read it personally.",
};

export default function CandidatesPage() {
  return <CandidatesClient />;
}
