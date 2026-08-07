/**
 * Update: ACL 2026 / IWSLT 2026, San Diego.
 *
 * Colocated post: copy this whole folder to start a new update. Images live
 * next to the text and are imported, so a photo is never referenced by a
 * string path that can rot, and each file ships with a content hash.
 *
 * Structure follows the standard conference-recap shape: what we brought →
 * what happened on the floor → what people asked → the side sessions → what
 * we are changing because of it. The closing section is deliberately a list
 * of decisions, not a reflection: a recap that ends on "it was inspiring"
 * tells the reader nothing they can use.
 *
 * Every number here comes from the WIGVO system paper (ACL 2026 System
 * Demonstrations, pp. 336-344) and its tech report. Do not add figures that
 * are not in that source.
 */

import type { Article, Block } from "../../data";
import boothD3 from "./booth-d3.jpg";
import iwsltTalk from "./iwslt-talk.jpg";
/* The recipient's phone number is masked in this screenshot. If it is ever
 * re-exported from the app, mask it again before committing. */
import liveCall from "./live-call.png";
import teamBanner from "./team-banner.jpg";

const p = (text: string): Block => ({ t: "p", text });

/* Exported so the hero/cover can reuse the same file the body does. */
export const ACL_2026_COVER = boothD3.src;

export const acl2026SanDiego: Article = {
  slug: "acl-2026-san-diego",
  kind: "event",
  channel: "newsroom",
  newsTopic: "announcement",
  tag: "ACL 2026",
  icon: "pin",
  title: "WIGVO at ACL 2026 in San Diego: a live demo booth, plus an IWSLT invited talk",
  summary:
    "Three days of handing strangers a phone at booth D3, an invited oral talk and poster at IWSLT, and the deployment questions that changed what we build next.",
  date: "2026.07.16",
  place: "San Diego, USA",
  author: "WIGTN Research",
  readTime: "7 min",
  image: boothD3.src,
  externalUrl: "https://wigtn.github.io/blog/wigvo/",
  links: [
    { label: "ACL paper", href: "https://aclanthology.org/2026.acl-demo.33/" },
    { label: "Tech report", href: "https://wigtn.github.io/wigtn-tech-report/wigvo/" },
    { label: "GitHub", href: "https://github.com/wigtn/wigvo-v2" },
    { label: "Watch demo", href: "https://youtu.be/_ixVEnHJxjk" },
  ],
  body: [
    p(
      "San Diego, July 2026. The acceptance email arrived back in April; the part that mattered came three months later, when WIGVO went to the ACL 2026 System Demonstrations floor as booth D3. Not a poster in a hallway. A working phone line, running all day, for three days. Alongside it we were invited to IWSLT 2026, the spoken-language-translation workshop, for an oral talk and a poster.",
    ),
    p(
      "This is what we brought, what happened, and what we are changing because of it.",
    ),

    { t: "h", text: "What we brought" },
    p(
      "WIGVO translates a phone call in both directions, in real time, over the ordinary telephone network. The constraint that shapes everything: the person on the other end installs nothing. No app, no headset, no setup. They pick up a phone the way they always have.",
    ),
    p(
      "That constraint is the whole point. The places that need translation most, the hospital front desk, the city office, the bank call center, are still running on landlines. But a phone line is a hostile environment for speech: narrowband 8 kHz audio, codec distortion, variable delay, and no way to run echo cancellation on the recipient's device. Translated speech played into the line can come back, get recognized again, and trigger a loop that translates itself. In our ungated prototype, eight of ten test calls looped until we cut them off manually.",
    ),
    {
      t: "image",
      src: liveCall.src,
      alt: "The WIGVO console during a live call: the assistant panel on the left, the call in progress on the right, and an event log showing the echo gate, energy gate and voice-activity detector firing.",
      caption:
        "The fix is unglamorous and it works: mark the window where echo is possible and inject valid silence, rather than trying to detect the echo itself. The event log on the right shows the gates opening and closing during a real call.",
    },
    p(
      "The numbers we took to San Diego: 555ms median latency from caller to callee, zero echo-induced loops across 147 completed field calls, and USD 0.28 per minute on the evaluated provider stack. Those come from 155 real calls over a live phone network, not a simulation.",
    ),

    { t: "h", text: "Three days at booth D3" },
    p(
      "Most demos ask you to watch. Ours asked you to talk. Visitors dialed a number, someone answered an ordinary phone, and the two of them held a conversation across a language barrier. Then they usually tried to break it: talking over each other, switching languages mid-sentence, walking away from the handset.",
    ),
    /* The booth shot runs as the cover at the top of the page, so repeating it
     * here would show the same photo twice in one scroll. This is the section
     * that most wants pictures: drop the additional floor photos in here as a
     * gallery (3 or 4 will lay out as a row / 2x2 automatically). */
    p(
      "Running it live in a loud exhibition hall was its own test, and a harsher one than the field study. The echo gate held. The dual-session design kept each direction's interpreter from bleeding into the other. And the latency stayed low enough that people stopped treating it like a walkie-talkie and just talked.",
    ),

    { t: "h", text: "The questions we did not expect" },
    p(
      "We prepared for the academic questions and we got them: the evaluation protocol, why COMET against LLM references rather than human translations, how the voice-activity thresholds were tuned. Fair questions, and the paper answers them.",
    ),
    p(
      "What we did not expect was how many people arrived from the other direction. Engineers from large technology companies stopped by and asked about the PSTN path, the per-minute cost at scale, whether it drops into an existing call center, and which language pairs are production-ready today.",
    ),
    p(
      "None of those are paper questions. They are deployment questions, and being asked them by people who build this for a living was, frankly, the best part of the week.",
    ),
    {
      t: "quote",
      text: "That was when it clicked: this is not just a paper. It is a product people are already waiting for.",
    },

    { t: "h", text: "IWSLT 2026: the oral and the poster" },
    p(
      "The invited oral let us walk the architecture end to end, including the part papers usually leave out: the idea that failed. We first tried a Pearson-correlation detector comparing outgoing synthesized audio against incoming line audio. It was the cleaner idea and it did not survive the phone network, because codec quantization and variable delay destroyed the stable signal relationship it needed. It cut looping from eight calls in ten to three, then introduced false positives. We threw it away.",
    ),
    {
      t: "image",
      src: iwsltTalk.src,
      alt: "A WIGTN researcher presenting WIGVO at the IWSLT 2026 invited oral session in San Diego.",
      caption:
        "IWSLT 2026, invited oral. The room asked better questions about the failed detector than about the one that shipped.",
    },
    p(
      "The poster afterwards turned into a two-hour conversation with exactly the people who care most about real-time speech translation. Several had hit the same echo problem from different directions, which is the kind of exchange you cannot get from a paper alone.",
    ),

    { t: "h", text: "What changes because of this" },
    p(
      "We came back with a shorter list than we expected, but a sharper one.",
    ),
    {
      t: "list",
      items: [
        "Session B is the bottleneck, and we now know exactly how much. Speech recognition accounts for 97.1% of the mean latency on the phone-originating path, where the median is 2,684ms against 555ms in the other direction. Optimization work goes there, not into the translation model.",
        "The P95 on that path is not acceptable for every conversation yet. We would rather say so than average it away.",
        "Language coverage is now demand-driven. We are prioritizing the pairs people actually asked for at the booth over the ones that were convenient to evaluate.",
        "Call-center integration came up often enough to stop treating it as a someday item.",
        "The evaluation needs human judgments. COMET against offline LLM references got us through review; it will not answer the question a hospital would ask.",
      ],
    },
    p(
      "The other thing we are taking home is harder to put in a list. WIGVO stops being finished when the paper is published. It is finished when someone calls a hospital in a language they do not share, and it simply works.",
    ),
    { t: "quote", text: "San Diego, you were great. Now back to shipping." },

    /* Gallery: the layout adapts to the number of images (1 full-width, 2 side
     * by side, 3 across, 4 as a 2x2, 5+ in threes), so more photos can be
     * dropped in here or in a new gallery block inside any section above. */
    {
      t: "gallery",
      images: [
        {
          src: teamBanner.src,
          alt: "The WIGTN team of four in front of the ACL 2026 San Diego banner.",
          caption: "The crew at the ACL 2026 banner.",
          aspect: "3/4",
        },
      ],
      caption: "From the week.",
    },
  ],
};
