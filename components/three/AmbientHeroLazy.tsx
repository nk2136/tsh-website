"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AmbientHero = dynamic(
  () => import("./AmbientHero").then((m) => m.AmbientHero),
  { ssr: false, loading: () => <StaticFallback /> }
);

function StaticFallback() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-[2rem]">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-terracotta/20 via-bone-200 to-moss/15"
      />
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-terracotta/40 to-terracotta-deep/60 blur-3xl" />
      <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-bone via-terracotta-soft/40 to-transparent" />
    </div>
  );
}

export function AmbientHeroLazy() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  if (reduced) return <StaticFallback />;
  return <AmbientHero />;
}
