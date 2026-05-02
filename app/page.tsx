import { Hero } from "@/components/sections/Hero";
import { LogosStrip } from "@/components/sections/LogosStrip";
import { TwoPillar } from "@/components/sections/TwoPillar";
import { NumbersBand } from "@/components/sections/NumbersBand";
import { ProcessStrip } from "@/components/sections/ProcessStrip";
import { Testimonial } from "@/components/sections/Testimonial";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogosStrip />
      <TwoPillar />
      <NumbersBand />
      <ProcessStrip />
      <Testimonial />
      <CtaBand />
    </>
  );
}
