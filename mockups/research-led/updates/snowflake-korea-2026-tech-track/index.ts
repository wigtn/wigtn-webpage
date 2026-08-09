/**
 * Notice: 2nd in the Tech Track at Snowflake Korea 2026 - award.
 *
 * ONE OF THREE. See trae-seoul-2026-grand-prize for why the three placings are
 * three posts and not the roundup they briefly were.
 *
 * Sections: none, same as its two siblings.
 *
 * NO COVER. The photographs are on the blog post.
 *
 * FACTS, all from the story post (../snowflake-korea-2026, on this site's
 * blog since the stories came back): 2026.04.29, Seoul, 2nd in the
 * Tech Track at the Snowflake AI & Data Hackathon Korea 2026; WIGTN Flake; five
 * agents over Snowflake Cortex evidence; eleven capabilities presented, seven
 * after a later code-path audit.
 *
 * THE CORRECTION IS IN THE POST AND STAYS THERE. Eleven became seven, and that
 * post's own title and dek carry it. A placing notice that quoted only the
 * number presented on the day would be the one page on either site where the
 * uncorrected figure stands alone. It is two clauses; it is not a limitations
 * section, and it does not turn this into a report.
 *
 * Nothing is claimed about the size of the field or the value of the prize.
 *
 * SLUG is `snowflake-korea-2026-tech-track`: `snowflake-korea-2026` is taken by
 * the RETIRED redirect to the blog story.
 */
import type { Article, Block } from "../../data";
import { blogHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const snowflakeKorea2026TechTrack: Article = {
  slug: "snowflake-korea-2026-tech-track",
  kind: "event",
  channel: "newsroom",
  newsTopic: "award",
  tag: "AWARD",
  icon: "trophy",
  layout: "note",
  title: "Second in the Tech Track at Snowflake Korea 2026",
  summary:
    "WIGTN Flake ranks Seoul districts by having five agents argue over Snowflake Cortex evidence, and placed second in the Tech Track.",
  date: "2026.04.29",
  place: "Seoul, KOR",
  /* No `author` or `readTime`: see the note in trae-seoul-2026-grand-prize. */
  links: [{ label: "Read the write-up", href: blogHref("snowflake-korea-2026") }],
  body: [
    p(
      "WIGTN Flake ranks Seoul districts against a stated goal by having five agents argue over Snowflake Cortex evidence. Built at the Snowflake AI & Data Hackathon Korea 2026 on 2026.04.29.",
    ),
    p(
      "We presented eleven capabilities on the day. A code-path audit afterwards cut that to seven, and the write-up says which four went and why.",
    ),
  ],
};
