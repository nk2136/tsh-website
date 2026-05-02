import { Container } from "@/components/ui/Container";

const PLACEHOLDER_LOGOS = [
  { name: "Northwind", glyph: "N◦" },
  { name: "Meridian", glyph: "MERIDIAN" },
  { name: "Pacific Trust", glyph: "PT" },
  { name: "Lumen Health", glyph: "lumen+" },
  { name: "Foundry", glyph: "FOUNDRY" },
  { name: "Atlas Retail", glyph: "atlas" },
];

export function LogosStrip() {
  return (
    <section
      aria-labelledby="logos-heading"
      className="py-14 sm:py-20 border-y border-ink/[0.06] bg-bone-50"
    >
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
          <div className="lg:w-72 shrink-0">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terracotta">
              Trusted clients
            </p>
            <h2
              id="logos-heading"
              className="mt-3 font-display italic text-2xl leading-tight text-ink"
            >
              Engineers we've placed at companies you'd recognize.
            </h2>
          </div>

          <div
            className="flex-1 grid grid-cols-3 sm:grid-cols-6 gap-y-8 gap-x-6 items-center"
            aria-label="Selected client list"
          >
            {PLACEHOLDER_LOGOS.map((l) => (
              <div
                key={l.name}
                className="flex items-center justify-center text-ink/30 hover:text-ink/55 transition-colors duration-500"
                title={l.name}
              >
                <span className="font-display italic text-xl tracking-tight">
                  {l.glyph}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-ink-muted/70">
          Logos shown for category illustration. Real client names are kept private under our representation agreements.
        </p>
      </Container>
    </section>
  );
}
