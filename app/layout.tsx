import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techstaffinghub.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tech Staffing Hub — The deliberate path to your next placement.",
    template: "%s · Tech Staffing Hub",
  },
  description:
    "TSH places QA & Java engineers with intent. Curated talent for thoughtful companies. The deliberate path to your next placement.",
  keywords: [
    "IT staffing",
    "QA engineering placement",
    "Java consulting",
    "tech staffing",
    "contract-to-hire",
  ],
  authors: [{ name: "Tech Staffing Hub LLC" }],
  creator: "Tech Staffing Hub LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Tech Staffing Hub",
    title: "Tech Staffing Hub — The deliberate path to your next placement.",
    description:
      "QA & Java engineers placed with intent. Curated talent for thoughtful companies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Staffing Hub",
    description: "The deliberate path to your next placement.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-bone text-ink flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-bone focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
