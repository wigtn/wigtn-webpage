/**
 * Notice: WIGVO at ACL 2026 System Demonstrations - announcement.
 *
 * The first entry in the Announcements list on /notices, which was empty
 * until this one. Everything already published on this site was a release;
 * the conference and hackathon stories are long-form and live under /story.
 * This is the other half a notice is: something the team did that is not a
 * thing you can install.
 *
 * THREE PARAGRAPHS AND NO HEADINGS, which is the third and shortest cut this
 * post has taken. It started at 330 words across four sections, went to 218,
 * and is now around 120. The headings went with the last cut: a heading over a
 * single paragraph names it rather than groups it, and at this length the post
 * is a notice, so it takes `layout: "note"` and matches the three award
 * notices in the same list. The template it started from,
 * updates/_template/announcement/STRUCTURE.md, is written for a release with
 * an artifact to install and stopped applying some way back.
 *
 * BOTH LATENCY FIGURES WENT, and that is the one cut worth defending. The
 * report measures 555 ms caller to callee over 814 turns and 2,684 ms the
 * other way over 744 turns. Keeping one of the two would be exactly the
 * selective quotation the house rules exist to stop, and keeping both costs a
 * sentence longer than everything around it. So neither is here, and the last
 * paragraph says the measurements are in the report, which is where a reader
 * who wants a number should be reading anyway. Do not put one back on its own.
 *
 * NO COVER, and the folder holds no image. Same rule the four release posts
 * settled on: the photographs of this trip carry the trip report, and the
 * trip report is a story page on this site. A second copy of the booth photo here would
 * be a second source for an image whose first source is one link away.
 *
 * WHERE EVERY FACT COMES FROM:
 *   - The WIGVO tech report on WIG-log (wigtn-tech-report,
 *     components/technical-reports/data.ts, slug "wigvo"): the venue string
 *     "ACL 2026 System Demonstrations, pp. 336-344", the peer-reviewed status,
 *     the ACL Anthology and demo-video URLs, the five-name author list, and
 *     the two latency figures.
 *   - MILESTONES in ../../data.ts: acceptance in 2026.02, and the July entry
 *     naming the booth (D3) and the IWSLT 2026 invited oral talk and poster.
 *   - The trip report (../acl-2026-san-diego, rendered at /story/
 *     acl-2026-san-diego) for its own date and title. Nothing else is taken
 *     from it: it is a story and this is a notice.
 *
 * NO BENCHMARK TABLE, no cost figure, no limitations section, and now no
 * latency figure either. Those are report material and the report is better at
 * them. If a number seems to be missing from this post, that is the design.
 * Should a figure ever come back, the rule it has to satisfy is in the
 * paragraph above: both directions or neither, at the precision the report
 * uses, with the turn count kept next to the number it was measured on.
 *
 * DATE: "2026.07", month precision, matching the `date` on the WIGVO report
 * and the MILESTONES entry for the venue. A day-precise publication date for
 * the ACL Anthology entry was not sourced, and inventing one to match the
 * format of the release posts would be inventing a fact. If someone finds it
 * in the proceedings, replace this and write down where it came from.
 *
 * ACCEPTANCE IS 2026.02 AND PRESENTATION IS 2026.07, and this post is one post
 * rather than two. Two notices five months apart, one saying a paper was
 * accepted and one saying it was presented, would put the same subject in the
 * list twice with nothing new in the second. The lede carries both dates.
 *
 * NAMING: the author list is quoted as the paper publishes it, which is the
 * published-role rule in AGENTS.md. No individual is described by anything
 * other than co-authorship of this paper.
 */
import type { Article, Block } from "../../data";
import { storyHref, techReportHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const wigvoAcl2026: Article = {
  slug: "wigvo-acl-2026",
  /* "event" rather than "report": the subject is a venue the team went to, not
   * a document this site is publishing. The four release posts are "report"
   * because each one announces an artifact. */
  kind: "event",
  channel: "newsroom",
  newsTopic: "announcement",
  tag: "ANNOUNCEMENT",
  layout: "note",
  title: "WIGVO at ACL 2026",
  summary:
    "Our phone-call translation system is peer reviewed and in the ACL Anthology, published in the ACL 2026 System Demonstrations proceedings and run as a live booth in San Diego.",
  date: "2026.07",
  place: "San Diego, USA",
  /* No `author` or `readTime`: a note renders neither. */
  /* No `version`. An accepted paper has no version, and the Announcements
   * list carries no version column, which is why it is a separate list from
   * the release ledger rather than more rows in it. */
  links: [
    { label: "ACL paper", href: "https://aclanthology.org/2026.acl-demo.33/" },
    { label: "Watch system demo", href: "https://www.youtube.com/watch?v=jK1CDOQExLw" },
    { label: "Try WIGVO", href: "https://wigvo.wigtn.com" },
    { label: "Tech report", href: techReportHref("wigvo") },
    { label: "Trip report", href: storyHref("acl-2026-san-diego") },
  ],
  body: [
    p(
      "WIGVO was accepted to ACL 2026 System Demonstrations in February and presented in San Diego in July. The paper is in the ACL Anthology at pp. 336 to 344, by Hyeong-seob Kim, Sang-Woo Son, Hyun-woo Cho, Hyeonsang Kim and Jinmo Kim. It is the first peer-reviewed publication this team has under its own name.",
    ),
    p(
      "It translates an ordinary phone call in both directions while the call is running, over PSTN, with nothing installed on the other person's phone. A live demo ran at booth D3 for the length of System Demonstrations, and an invited oral talk and a poster at IWSLT 2026 followed in the same week.",
    ),
    p(
      "The measurements, the echo-control designs that failed before the deployed one, and what the evaluation does not cover are in the tech report.",
    ),
  ],
};
