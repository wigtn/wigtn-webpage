/**
 * Notice: Top 6 at OBA Weekendthon - award.
 *
 * ONE OF THREE. See trae-seoul-2026-grand-prize for why the three placings are
 * three posts and not the roundup they briefly were.
 *
 * Sections: none, same as its two siblings.
 *
 * NO COVER. The photographs are on the feed post.
 *
 * FACTS, all from the feed post (wigtn-tech-report,
 * components/feed/posts/oba-weekendthon-top6.ts): 2026.05.31, Kakao AI Campus
 * in Yongin, Top 6 at OBA Weekendthon; MyunZy; two days; a small open Korean
 * model held in place by a deterministic harness.
 *
 * "TOP 6" IS THE ORGANIZER'S OWN RESULT LABEL and is quoted as such. It is not
 * rewritten as "sixth", which it does not say, and it is not given a
 * denominator, because no source here carries the size of the field.
 *
 * SLUG is `oba-weekendthon-2026-top6`: `oba-weekendthon-top6` is taken by the
 * RETIRED redirect to the feed story.
 */
import type { Article, Block } from "../../data";
import { techFeedHref } from "../../links";

const p = (text: string): Block => ({ t: "p", text });

export const obaWeekendthon2026Top6: Article = {
  slug: "oba-weekendthon-2026-top6",
  kind: "event",
  channel: "newsroom",
  newsTopic: "award",
  tag: "AWARD",
  icon: "trophy",
  layout: "note",
  title: "Top 6 at OBA Weekendthon",
  summary:
    "MyunZy reads a real resume and a real job posting and runs the interview before the interview. Built in two days, finished in the Top 6.",
  date: "2026.05.31",
  place: "Yongin, KOR",
  /* No `author` or `readTime`: see the note in trae-seoul-2026-grand-prize. */
  links: [{ label: "Read the write-up", href: techFeedHref("oba-weekendthon-top6") }],
  body: [
    p(
      "MyunZy reads a real resume and a real job posting, then runs the interview before the interview. Two days at the Kakao AI Campus in Yongin on 2026.05.31, on a small open Korean model held in place by a deterministic harness rather than a large one left to improvise. The write-up is the account of that choice.",
    ),
  ],
};
