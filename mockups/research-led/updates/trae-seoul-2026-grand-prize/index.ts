/**
 * Notice: Grand Prize at Build with TRAE Seoul - award.
 *
 * ONE OF THREE. The three 2026 placings were briefly a single roundup post,
 * `hackathon-awards-2026`, on the reasoning that three stubs each pointing at a
 * feed story would say less than one post saying the team entered three
 * contests and placed in all three. That was overruled: each contest is its own
 * event on its own date, and a list dated to the last of them puts two placings
 * under a date neither happened on. The roundup is deleted, not kept alongside.
 *
 * Sections: none. At this length a heading names a paragraph, which is what the
 * title already does. `announcement/STRUCTURE.md` is written for a release with
 * an artifact to install and does not apply; what carries an award notice is
 * the placing, the thing that placed, and where the account of it is.
 *
 * NO COVER. The photographs are on the story page, taken for it.
 *
 * FACTS, all from the story post (../trae-seoul-grand-prize, rendered at
 * /story/trae-seoul-grand-prize): 2026.03.28, Seoul, Grand
 * Prize at Build with TRAE Seoul, ByteDance's hackathon; WIGENT; three of us;
 * three and a half hours. MILESTONES in ../../data.ts agrees at month
 * precision. Nothing is claimed about the size of the field or the value of the
 * prize, because no source here carries either.
 *
 * SLUG is `trae-seoul-2026-grand-prize` and not `trae-seoul-grand-prize`. The
 * shorter one is taken: it was this site's URL for the story, it is in RETIRED
 * as a redirect, and the story itself lives at /story under it now. Reusing it
 * here would turn a working redirect into a page that quietly replaces the
 * thing it redirected to.
 */
import type { Article, Block } from "../../data";
import { storyHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const traeSeoul2026GrandPrize: Article = {
  slug: "trae-seoul-2026-grand-prize",
  kind: "event",
  channel: "newsroom",
  newsTopic: "award",
  tag: "AWARD",
  icon: "trophy",
  layout: "note",
  title: "Grand Prize at Build with TRAE Seoul by ByteDance",
  summary:
    "WIGENT, a room of AI agents that argue an idea to a conclusion, took the Grand Prize at ByteDance's TRAE hackathon.",
  date: "2026.03.28",
  place: "Seoul, KOR",
  /* No `author` or `readTime`. A note renders neither, and a field a page
   * cannot show is a second copy of a fact with nothing keeping it true. */
  links: [{ label: "Read the write-up", href: storyHref("trae-seoul-grand-prize") }],
  body: [
    p(
      "WIGENT drops an idea into a room of AI agents and lets them argue it to a conclusion. Three of us built it in three and a half hours at ByteDance's hackathon on 2026.03.28. What survived the build and what was thrown away is in the write-up.",
    ),
  ],
};
