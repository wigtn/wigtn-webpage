import {
  ARTICLES,
  PRACTICES,
  RELEASE_ROWS,
  SPONSORS,
  STORIES,
  STORY_INDEX,
  NOTICES,
  getStory,
  hrefFor,
  storyHref,
  type Article,
} from "@/mockups/research-led/data";
import { CONTACT_EMAIL, DESCRIPTION, ORG_NAME, SITE_URL } from "./brand";
import { absoluteUrl } from "./metadata";

/**
 * Structured data (JSON-LD), one builder per kind of page.
 *
 * MARK UP WHAT THE PAGE SHOWS. Every entity here is built from the data the
 * page renders (PRACTICES, STORIES, RELEASE_ROWS, the article itself), so a
 * row that leaves the page leaves its markup in the same edit. The two tables
 * below add only what a card has no room for, the full paper titles and
 * author lists and the repositories, each with its source.
 *
 * Name and description come from ./brand so the structured data cannot say
 * one thing while the page says another. It used to: "WIGTN Crew" and
 * "AI-native open-source research crew" here, against "WIGTN" and the meta
 * description on every page.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_REF = { "@id": ORG_ID };

type Practice = (typeof PRACTICES)[number];
const rowsOf = (slug: Practice["slug"]) => PRACTICES.find((p) => p.slug === slug)?.rows ?? [];

/* "2026.07.16" or "2026.07" (the site's form) to ISO 8601. */
export function isoDate(value: string): string {
  return value.replace(/\./g, "-");
}

/* The layout's graph: the organization and the site, on every page.
 *
 * `founder` is the one person the site names, on /team, with the role it
 * gives. The roster came off /team on 2026-10-19, so there is no `member`
 * list; the papers below carry their authors, by their published names.
 * `knowsAbout` is the Our Service keywords, the areas the homepage claims. */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      "name": ORG_NAME,
      "url": `${SITE_URL}/`,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/wigtn_mark_purple.png`,
        "width": 1024,
        "height": 1024,
      },
      "email": CONTACT_EMAIL,
      "description": DESCRIPTION,
      "foundingDate": "2026-01",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "KR",
      },
      "founder": {
        "@type": "Person",
        "name": "Harrison Kim",
        "jobTitle": "Founder & CEO",
      },
      /* The /team Sponsor row. */
      "sponsor": SPONSORS.map((s) => ({ "@type": "Organization", "name": s.name })),
      "sameAs": [
        "https://github.com/wigtn",
        "https://huggingface.co/Wigtn",
        "https://www.linkedin.com/company/wigtn",
        "https://www.npmjs.com/org/wigtn",
      ],
      "knowsAbout": PRACTICES.flatMap((p) => p.keywords ?? []),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      "name": ORG_NAME,
      "url": `${SITE_URL}/`,
      "inLanguage": "en",
      "publisher": ORG_REF,
    },
  ],
};

/* ── Papers ─────────────────────────────────────────────────────────────────
 *
 * Keyed by the R&D panel's row slug. Titles are the full ones from the org
 * profile's Papers list (github.com/wigtn/.github, profile/README.md); the
 * panel prints a short line. Authors, in published order and spelling:
 *   WIGVO  ACL Anthology, 2026.acl-demo.33 (BibTeX, checked 2026-10-20)
 *   RCPS   citation in github.com/wigtn/WigtnOCR-RADP README ("camera-ready
 *          pending"), so no URL yet
 *   MDI    citation in github.com/wigtn/mdi-artifact README (non-archival),
 *          so no URL yet
 * When RCPS or MDI gets a public page (Anthology, OpenReview), add `url`. */
type Paper = {
  title: string;
  authors: string[];
  venue: string;
  date: string;
  url?: string;
  sameAs?: string[];
  pagination?: string;
  status?: "Accepted";
};

export const PAPERS: Record<string, Paper> = {
  "acl-2026": {
    title:
      "WIGVO: Real-Time Bidirectional Speech Translation over Legacy PSTN Calls via Dual-Session Echo Gating",
    authors: ["Hyeong-seob Kim", "Sang-Woo Son", "Hyun-woo Cho", "Hyeonsang Kim", "Jinmo Kim"],
    venue:
      "Proceedings of the 64th Annual Meeting of the Association for Computational Linguistics (Volume 3: System Demonstrations)",
    date: "2026-07",
    url: "https://aclanthology.org/2026.acl-demo.33/",
    sameAs: ["https://doi.org/10.18653/v1/2026.acl-demo.33"],
    pagination: "336-344",
  },
  "emnlp-2026": {
    title:
      "Retrieval-Conditional Parsing Score (RCPS): Choosing Document Parsers by Retrieval, Not by Appearance",
    authors: ["Sang-Woo Son", "Hyeong-seob Kim", "Hyeonsang Kim", "Hyun-woo Cho", "Jinmo Kim"],
    venue: "Proceedings of EMNLP 2026 (Industry Track)",
    date: "2026",
    status: "Accepted",
  },
  "neurips-2026": {
    title: "MDI: The Minimum Detectable Improvement of an LLM Judge",
    authors: ["Hyeong-seob Kim"],
    venue: "TAE (Trust-AI-Eval): Can We Trust AI Evaluation? Workshop at NeurIPS 2026",
    date: "2026",
    status: "Accepted",
  },
};

const personId = (name: string) =>
  `${SITE_URL}/#person-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`;

function paperSchema(slug: string) {
  const paper = PAPERS[slug];
  const row = rowsOf("ax").find((r) => r.slug === slug);
  if (!paper || !row) return undefined;
  return {
    "@type": "ScholarlyArticle",
    "headline": paper.title,
    "name": paper.title,
    "author": paper.authors.map((name) => ({
      "@type": "Person",
      "@id": personId(name),
      "name": name,
      "affiliation": ORG_REF,
    })),
    "datePublished": paper.date,
    "isPartOf": { "@type": "Book", "name": paper.venue },
    "sourceOrganization": ORG_REF,
    ...(paper.pagination && { "pagination": paper.pagination }),
    ...(paper.url && { "url": paper.url }),
    ...(paper.sameAs && { "sameAs": paper.sameAs }),
    ...(paper.status && { "creativeWorkStatus": paper.status }),
  };
}

/* ── Open-source releases ───────────────────────────────────────────────────
 *
 * Keyed by release post slug. Repository, primary language and licence as
 * the GitHub API reported them on 2026-10-20. The version is not here: it is
 * the newest entry in the post's versions array, the same one the /notices
 * ledger shows, so the markup and the page never disagree. */
export const SOFTWARE: Record<
  string,
  { repo: string; language: string; license: string; target?: string; sameAs?: string[] }
> = {
  "wigss-npm-release": {
    repo: "https://github.com/wigtn/wigss",
    language: "TypeScript",
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    sameAs: ["https://www.npmjs.com/package/wigss"],
  },
  "wigtn-coding-release": {
    repo: "https://github.com/wigtn/wigtn-plugins",
    language: "Python",
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    target: "Claude Code",
  },
  "wigtn-codex-release": {
    repo: "https://github.com/wigtn/wigtn-plugins-codex",
    language: "Python",
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    target: "Codex",
  },
};

/* The release post a Product panel row opens, and that post's article. */
function softwareSchema(article: Article) {
  const detail = SOFTWARE[article.slug];
  const row = rowsOf("product").find((r) => r.href === hrefFor(article));
  if (!detail || !row) return undefined;
  const version = article.versions?.[0]?.version ?? article.version;
  return {
    "@type": "SoftwareSourceCode",
    "@id": `${absoluteUrl(hrefFor(article))}#software`,
    "name": row.name,
    "alternateName": article.title,
    "description": row.line,
    "url": absoluteUrl(hrefFor(article)),
    "codeRepository": detail.repo,
    "programmingLanguage": detail.language,
    "license": detail.license,
    ...(version && { "version": version }),
    ...(row.image && { "image": absoluteUrl(row.image) }),
    ...(detail.target && {
      "targetProduct": { "@type": "SoftwareApplication", "name": detail.target },
    }),
    ...(detail.sameAs && { "sameAs": detail.sameAs }),
    "author": ORG_REF,
  };
}

/* The homepage: the three papers of the R&D panel and the three releases of
 * the Product panel. The Solutions projects carry no markup: a client
 * engagement has no schema.org type that says more than the card does. */
export function homeSchema() {
  const releases = rowsOf("product")
    .map((row) => ARTICLES.find((a) => hrefFor(a) === row.href))
    .filter((a): a is Article => Boolean(a));
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...rowsOf("ax").map((r) => paperSchema(r.slug)),
      ...releases.map(softwareSchema),
    ].filter(Boolean),
  };
}

function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": trail.map((t, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": t.name,
      "item": absoluteUrl(t.path),
    })),
  };
}

/* A post page: a story, a notice or a release.
 *
 * A story or a notice is an Article. A release is its SoftwareSourceCode
 * when it has a Product panel row, and nothing more otherwise (WigtnOCR is a
 * model card's note, not an article). The breadcrumb follows the nav: a
 * release sits under Products, everything else under Story, which is the
 * only page that links a notice. */
export function postSchema(article: Article) {
  const url = absoluteUrl(hrefFor(article));
  const isRelease = article.newsTopic === "release";
  const cover = getStory(article.slug)?.cover;
  const main = isRelease
    ? softwareSchema(article)
    : {
        "@type": "Article",
        "headline": article.title,
        "description": article.summary,
        "datePublished": isoDate(article.date),
        "url": url,
        "mainEntityOfPage": url,
        ...(cover && { "image": absoluteUrl(cover.src) }),
        "author": article.author
          ? { "@type": "Organization", "name": article.author, "parentOrganization": ORG_REF }
          : ORG_REF,
        "publisher": ORG_REF,
      };
  return {
    "@context": "https://schema.org",
    "@graph": [
      main,
      breadcrumb([
        { name: ORG_NAME, path: "/" },
        isRelease ? { name: "Products", path: NOTICES } : { name: "Story", path: STORY_INDEX },
        { name: article.title, path: hrefFor(article) },
      ]),
    ].filter(Boolean),
  };
}

/* /notices: the products on the ledger, once each, in the ledger's order
 * (newest version first). Rows are versions; the list is of products. */
export function productsListSchema() {
  const seen = new Set<string>();
  const products = RELEASE_ROWS.filter((r) => !seen.has(r.href) && seen.add(r.href));
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Products",
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": products.map((r, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": r.product,
      "url": absoluteUrl(r.href),
    })),
  };
}

/* /story: the entries in page order, each to its full story. */
export function storyListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Story",
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": STORIES.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": s.article.title,
      "url": absoluteUrl(storyHref(s.storySlug)),
    })),
  };
}
