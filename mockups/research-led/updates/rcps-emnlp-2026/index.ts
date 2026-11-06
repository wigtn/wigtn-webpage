/**
 * Notice: RCPS at EMNLP 2026 Industry Track. Announcement.
 *
 * The short half of the EMNLP pair, written from row two of the routing table
 * in ../_template/README.md: a paper accepted and presented, nothing to
 * install, so `newsTopic: "announcement"`, `layout: "note"`, and no version.
 * It is not on /notices, which is the release ledger. Its only way in is its
 * STORIES row in ../../data.ts, beside the story ../emnlp-2026-virtual.
 * Modelled on ../wigvo-acl-2026, the ACL notice.
 *
 * NO FIGURES. The Boundary Clarity and Hit@1 numbers that carry the story
 * stay in the story and the tech report. One number here would be a
 * selective quotation; all of them would make this the story.
 *
 * NO COVER, for the reason the ACL notice gives: the images belong to the
 * story, and a second copy here would be a second source for them.
 *
 * WHERE EVERY FACT COMES FROM:
 *   - Title, author order, pages and the Anthology URL: PAPERS["emnlp-2026"]
 *     in lib/schema.ts.
 *   - Accepted in August: the MILESTONES entry in ../../data.ts (2026.08) and
 *     the RCPS report's date on WIGTN Tech, 2026.08.26, which its RETIRED
 *     note in data.ts records as the day the paper was accepted and the
 *     report went live.
 *   - The session and its date: the EMNLP 2026 program page, fetched
 *     2026-11-06.
 *   - WigtnOCR as the production parser the paper calls Prod: the RCPS tech
 *     report's links, and slide 3 of the talk.
 *   - The probe and the reference implementation being public: the paper's
 *     abstract, and the report's links to the repository.
 *
 * DATE: "2026.10.25", the presentation day. Acceptance and presentation are
 * one notice, as on the ACL pair; the body carries both months.
 */
import type { Article, Block } from "../../data";
import { storyHref, techReportHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const rcpsEmnlp2026: Article = {
  slug: "rcps-emnlp-2026",
  kind: "event",
  channel: "newsroom",
  newsTopic: "announcement",
  tag: "ANNOUNCEMENT",
  layout: "note",
  title: "RCPS at EMNLP 2026",
  summary:
    "Our paper on choosing document parsers by retrieval, not by appearance, is in the EMNLP 2026 Industry Track proceedings, presented virtually from Seoul.",
  date: "2026.10.25",
  place: "Budapest, Hungary (virtual)",
  /* No `author` or `readTime`: a note renders neither. No `version`: an
   * accepted paper has none. */
  links: [
    { label: "EMNLP paper", href: "https://aclanthology.org/2026.emnlp-industry.90/" },
    { label: "Presentation", href: "https://www.youtube.com/watch?v=20ezaBGOCRk" },
    { label: "Tech report", href: techReportHref("rcps") },
    { label: "The story", href: storyHref("emnlp-2026-virtual") },
  ],
  body: [
    p(
      "RCPS was accepted to the EMNLP 2026 Industry Track in August and presented on 25 October in Virtual Presentation Session 1. The paper is in the ACL Anthology at pp. 1531 to 1544, by Sang-Woo Son, Hyeong-seob Kim, Hyeonsang Kim, Hyun-woo Cho and Jinmo Kim.",
    ),
    p(
      "It ranks document parsers by how well retrieval works on their output rather than by how clean the output looks. It started with WigtnOCR, the parser we run in production, which a better-looking parser beat on an intrinsic score and then lost to on retrieval.",
    ),
    p(
      "The 663-question probe and a reference implementation are public. The measurements, and what the evaluation does not cover, are in the tech report.",
    ),
  ],
};
