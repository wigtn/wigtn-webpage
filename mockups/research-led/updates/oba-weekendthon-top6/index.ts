/**
 * Update: OBA Weekendthon S1, Kakao AI Campus — hackathon report.
 *
 * Colocated post: the text here, the image beside it, imported rather than
 * referenced by a string path that can rot. Follows the hackathon template
 * (`updates/_template/hackathon/STRUCTURE.md`): lede → the brief and the
 * constraints → what we built → the bet → what shipped → the result.
 *
 * Sources, and nothing outside them:
 *   - the event page, https://luma.com/y3nz68hw — dates, hours, venue, the
 *     fifty-person cap, teams of up to three, the Open API rule, the ten-plus
 *     API-sharing companies, the 50/50 judging split, the first-evening pitch;
 *   - the repo README, https://github.com/wigtn/myunzy-hackathone — the stack,
 *     the four personas, the mock-first architecture, the env-var promotion
 *     path, what is mocked and what is live, the pending adapters;
 *   - the repo's own commit log via the GitHub API — eight commits, all on
 *     31 May, and the two merged pull requests;
 *   - the photo in this folder, which is a picture of the event's sponsor
 *     board and is therefore also a source: the dates, the venue and the API
 *     sponsor row are all legible on it.
 *
 * Two editorial decisions a future editor would otherwise undo:
 *
 * 1. **The "what survived" section is deliberately absent.** The template
 *    names it as the section that carries a hackathon post, and it is, but
 *    nothing in any of the sources says which parts of this build the team
 *    still runs. Writing that list would have meant inventing it. Cut instead.
 *    If someone later confirms what carried forward, that is the section to
 *    add, and it goes after "Top 6".
 *
 * 2. **The commit count is presented as a count of what was pushed, not of
 *    what was built**, because the public repo was created at 13:51 on the
 *    second day. Eight commits is real; "built in two hours" would not be.
 *
 * One photo, and that is the whole budget — it is the only image that exists
 * for this event. Do not fill the gap with a stock shot or borrow a figure
 * from another project. A one-image post is fine; an invented one is not.
 *
 * That one photo does two jobs, and they want different framings. In the body
 * it runs in a gallery at `aspect: "3/4"`, full frame, because the caption
 * points at the API Sponsor row and the reader has to be able to read it. As
 * the cover it is cropped 2:1 by the hero and 4:3 by the news card, which
 * keeps the title art — the event name, the dates, the venue — and drops the
 * board. That is the right trade for a cover: it says what this was and when,
 * and the board is two paragraphs down at full size. Do not swap the cover for
 * a board crop to "fix" the hero; the body already carries the board.
 */

import type { Article, Block } from "../../data";
/* Moved here from `public/images/news/OBA.jpeg`, which nothing else read, so
 * the original is gone rather than duplicated. Prepped with the shared
 * README's command: EXIF orientation was already Undefined, so nothing
 * rotated, but the source was Display P3 and is converted to sRGB before the
 * strip — without that the neon pinks and cyans ship oversaturated. */
import titleScreen from "./title-screen.jpg";

const p = (text: string): Block => ({ t: "p", text });

/* Exported so the milestone rail and the highlights carousel can reuse the
 * same file the body does. */
export const OBA_WEEKENDTHON_COVER = titleScreen.src;

export const obaWeekendthonTop6: Article = {
  slug: "oba-weekendthon-top6",
  kind: "event",
  channel: "newsroom",
  newsTopic: "award",
  tag: "TOP 6",
  icon: "trophy",
  title: "Top 6 at OBA Weekendthon: MyunZy, an AI interviewer built in a weekend",
  summary:
    "MyunZy reads your real resume and a real job posting, then runs the interview before the interview. Two days at the Kakao AI Campus, built on a small open Korean model held in place by a deterministic harness rather than a large one left to improvise.",
  date: "2026.05.31",
  place: "Yongin, KOR",
  author: "Open Builders Alliance",
  readTime: "5 min",
  image: titleScreen.src,
  links: [
    { label: "GitHub", href: "https://github.com/wigtn/myunzy-hackathone" },
    { label: "Event", href: "https://luma.com/y3nz68hw" },
  ],
  body: [
    p(
      "OBA Weekendthon S1 ran from half past ten on Saturday 30 May to eight on Sunday evening at the Kakao AI Campus in Yongin. One night, two days, fifty builders, hosted by Hashed, Market Fit Lab and vooy under the Open Builders Alliance. Three of us went, and came out in the Top 6 with MyunZy (면지), an AI interviewer.",
    ),

    { t: "h", text: "The brief, and the one rule" },
    p(
      "The room was capped at fifty people, entering alone or in teams of up to three. Participation and lodging were free. The weekend was cut into four build sessions with three networking blocks wedged between them, and on the first evening every team stood up and pitched for about a minute, which is not long enough to explain an architecture and is exactly long enough to find out whether you have a product.",
    ),
    p(
      "One rule shaped every project: whatever you build has to run on the Open APIs the event provides. More than ten companies put something on the table, Nexon, LG U+ and MyRealTrip among them, and the sponsor board in the hall was in effect the spec sheet. You did not pick a stack and then go looking for an API. You read the board and worked backwards from it.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: titleScreen.src,
          alt: "The OBA Weekendthon title screen projected in the hall at the Kakao AI Campus, reading \"May 30–31, 2026\", above rows of organizer, sponsor, API-sponsor and VC logos.",
          caption:
            "The screen in the hall. The row labelled API Sponsor is the part that mattered: it was the list you were allowed to build on.",
          aspect: "3/4",
        },
      ],
    },
    p(
      "Judging was split down the middle, half from the official panel and half from peer review by the other teams. The second half is a different game. A panel judges a product. The other teams have spent the same two days against the same board of APIs, and they know exactly which parts of your demo are real.",
    ),

    { t: "h", text: "What MyunZy does" },
    p(
      "You hand it two things: your actual resume and an actual job posting. It reads both and assembles four interviewers — technical, culture fit, executive, and HR — each already knowing where your story is thin. Then you answer out loud.",
    ),
    p(
      "It follows up on whatever you fumble. Each round it keeps a weakness profile and diffs it before and after, so the questions in the third round come out of what you failed to say in the first. A branch replay takes you back to a single answer to try it a different way, which is the feature everyone used twice.",
    ),
    p(
      "The rest is the plumbing you only notice when it is missing. Qwen3 ASR returns word-level timestamps, which is what lets the rewind land on the exact sentence rather than somewhere near it, and what the STAR-based feedback points at. Qwen3-TTS gives the four interviewers voices, with the browser's own speech synthesis standing in when it is not available. A playbook detector reads the posting and decides whether it is interviewing a backend engineer, a frontend engineer, a PM, or none of the above.",
    ),

    { t: "h", text: "The bet: a small Korean model, held in place by the harness" },
    p(
      "The instinct in a hackathon is to reach for the largest model on the sponsor board and let it improvise. OpenAI's name was at the top of that board. We went the other way and ran EXAONE-4.5, the open Korean model LG U+ brought to the API list, on vLLM behind an OpenAI-compatible endpoint with Hermes-style tool calls.",
    ),
    p(
      "A small model improvises badly, so we arranged not to ask it to. Everything that could be made deterministic was moved out of the model: schema validation on every tool call, automatic re-prompting when one comes back malformed, DeepAgents' wrap_tool_call middleware wrapped around the lot, and the verdict and the scoring computed in pure functions with no randomness in them at all. The model's job is to stay in character and ask the next question. The harness does the rest.",
    ),
    p(
      "The failure we were buying insurance against is the one everybody has watched happen: an interviewer persona that is sharp for four turns and then quietly softens into a helpful assistant. Holding character to the last question turned out to be a harness problem rather than a parameter-count problem, and that is the finding we would defend.",
    ),

    { t: "h", text: "What shipped in two days" },
    {
      t: "list",
      items: [
        "The whole product runs with zero API keys. All eight external integrations ship mocked, alongside a mock LLM, so the repo can be cloned and an interview held end to end without an account anywhere.",
        "Promotion to the live services is an environment variable rather than a code change: LLM_PROVIDER=exaone swaps the mock model for EXAONE-4.5, HARNESS=deepagents swaps the stub for a real DeepAgents bootstrap.",
        "Complete by the end: the web UI on Next.js 16, the Python agent service on FastAPI, the EXAONE integration, the real harness, and voice in and out.",
        "Not complete: the external adapters. MISO for resume OCR, Rocketpunch for job postings and GenRank for company ratings, all behind API Fuse as the gateway — written, wired, and still pointed at their mocks, because the keys had not landed. It shipped that way rather than pretending otherwise.",
        "Prompt-injection defense on user input, on the grounds that a resume and a job posting are both text somebody else wrote.",
      ],
    },
    p(
      "The commit log is not a good measure of this weekend. The public repo was created at 13:51 on the Sunday and holds eight commits over the two hours after that, closing with three small fixes to the microphone, the PDF path, and a leftover sample. The two merged pull requests in it — model-driven skill selection by progressive disclosure, and streaming a turn so the text arrives before the speech does — were the last real features in. Everything earlier lived elsewhere. Take the eight as a count of what was pushed, not of what was built.",
    ),

    { t: "h", text: "Top 6" },
    p(
      "Top 6 out of a room capped at fifty, on a score that was half official panel and half the other teams. The peer half is the one we would put on the wall.",
    ),
    { t: "quote", text: "Top 6 at OBA Weekendthon, built by three engineers in two days." },

    { t: "h", text: "The room was the prize" },
    p(
      "The best part of a weekendthon is not your own build. It is watching the other teams start from the same blank page, the same board of APIs and the same two days, then walk out with things none of us would have thought of. We went for the trophy and left with a list of ideas to steal.",
    ),
    p(
      "Built by Hyeonsang Kim, Jinmo Kim, and Sang-Woo Son. Hosted by Hashed, Market Fit Lab and vooy, under the Open Builders Alliance, at the Kakao AI Campus in Yongin.",
    ),
  ],
};
