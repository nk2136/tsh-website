// Renderer choice: rather than wire @next/mdx into a content/ folder
// (which is fussy in Next 16) or pull in next-mdx-remote-client and friends,
// we read .mdx files at build time, parse frontmatter with gray-matter, and
// run the body through a small in-house markdown renderer. The MDX bodies
// here only use a stable subset (headings, paragraphs, blockquotes, lists,
// links, em/strong) so a real MDX runtime would be overkill.
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime } from "@/lib/utils";

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

export type InsightFrontmatter = {
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  coverNote?: string;
};

export type InsightPost = InsightFrontmatter & {
  slug: string;
  rawBody: string;
  html: string;
  readMinutes: number;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inline(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label, href) => {
    const safeHref = String(href).replace(/"/g, "&quot;");
    return `<a href="${safeHref}" class="link-editorial text-terracotta-deep underline-offset-4">${label}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}

function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let paragraph: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];
  let inQuote = false;
  let quoteLines: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(" ").trim())}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listType && listItems.length) {
      const tag = listType;
      const items = listItems
        .map((item) => `<li>${inline(item.trim())}</li>`)
        .join("");
      out.push(`<${tag}>${items}</${tag}>`);
      listType = null;
      listItems = [];
    }
  };
  const flushQuote = () => {
    if (inQuote && quoteLines.length) {
      out.push(`<blockquote>${inline(quoteLines.join(" ").trim())}</blockquote>`);
      inQuote = false;
      quoteLines = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw ?? "";

    if (line.trim() === "") {
      flushAll();
      i++;
      continue;
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      const text = heading[2].trim();
      out.push(`<h${level}>${inline(text)}</h${level}>`);
      i++;
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      flushParagraph();
      flushList();
      inQuote = true;
      quoteLines.push(quote[1]);
      i++;
      continue;
    } else if (inQuote) {
      flushQuote();
    }

    const ul = /^[-*]\s+(.*)$/.exec(line);
    if (ul) {
      flushParagraph();
      flushQuote();
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(ul[1]);
      i++;
      continue;
    }
    const ol = /^\d+\.\s+(.*)$/.exec(line);
    if (ol) {
      flushParagraph();
      flushQuote();
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(ol[1]);
      i++;
      continue;
    }

    if (listType) flushList();

    paragraph.push(line.trim());
    i++;
  }

  flushAll();
  return out.join("\n");
}

async function readPostFile(slug: string): Promise<InsightPost | null> {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  try {
    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(file);
    const fm = data as Partial<InsightFrontmatter>;
    if (!fm.title || !fm.excerpt || !fm.author || !fm.publishedAt || !fm.category) {
      return null;
    }
    return {
      slug,
      title: fm.title,
      excerpt: fm.excerpt,
      author: fm.author,
      publishedAt: fm.publishedAt,
      category: fm.category,
      coverNote: fm.coverNote,
      rawBody: content,
      html: renderMarkdown(content),
      readMinutes: readingTime(content),
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<InsightPost[]> {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(INSIGHTS_DIR);
  } catch {
    return [];
  }
  const slugs = entries
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  const posts = await Promise.all(slugs.map((slug) => readPostFile(slug)));
  return posts
    .filter((p): p is InsightPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export async function getPostBySlug(slug: string): Promise<InsightPost | null> {
  return readPostFile(slug);
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(INSIGHTS_DIR);
    return entries
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}
