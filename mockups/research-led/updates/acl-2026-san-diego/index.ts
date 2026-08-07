/**
 * Update: ACL 2026 / IWSLT 2026, San Diego — trip report.
 *
 * Colocated post: copy this whole folder to start a new update. Images live
 * next to the text and are imported, so a photo is never referenced by a
 * string path that can rot, and each file ships with a content hash.
 *
 * Structure follows the standard conference-recap shape: arrival → what we
 * brought → what happened on the floor → what people asked → the side
 * sessions → what we are changing → thanks. The "what changes" section is
 * deliberately a list of decisions, not a reflection: a recap that ends on
 * "it was inspiring" tells the reader nothing they can use.
 *
 * Every number here comes from the WIGVO system paper (ACL 2026 System
 * Demonstrations, pp. 336-344) and its tech report. Do not add figures that
 * are not in that source.
 *
 * Naming people: Jan Niehues, Antonios Anastasopoulos and Marcello Federico
 * are named with their roles as listed in the IWSLT 2026 proceedings. Visitor
 * photos name the company only, never the individual, and the section carries
 * an explicit no-endorsement line — conference interest is not adoption.
 *
 * Portrait photos never run as a full-width `image` block: at the 1080px media
 * breakout a 3:4 shot is 1440px tall and buries what follows. They go in a
 * gallery instead, where `aspect: "3/4"` caps a lone portrait at 460px.
 */

import type { Article, Block } from "../../data";
import arriving from "./arriving.jpg";
import boothD3 from "./booth-d3.jpg";
import coffeeBreak from "./coffee-break.jpg";
import conferencePortrait from "./conference-portrait.jpg";
import demoBoothWide from "./demo-booth-wide.jpg";
import demoExplaining from "./demo-explaining.jpg";
import demoVisitors from "./demo-visitors.jpg";
import iwsltOrganizer from "./iwslt-organizer.jpg";
import iwsltPosterPrep from "./iwslt-poster-prep.jpg";
import iwsltPosterSession from "./iwslt-poster-session.jpg";
import iwsltTalk from "./iwslt-talk.jpg";
import iwsltTalk2 from "./iwslt-talk-2.jpg";
/* The recipient's phone number is masked in this screenshot. If it is ever
 * re-exported from the app, mask it again before committing. */
import liveCall from "./live-call.png";
import midwayDeck from "./midway-deck.jpg";
import midwayReception from "./midway-reception.jpg";
import posterVisitAmazon from "./poster-visit-amazon.jpg";
import posterVisitApple from "./poster-visit-apple.jpg";
import posterVisitNvidia from "./poster-visit-nvidia.jpg";
import sessionHallway from "./session-hallway.jpg";
/* Cropped from the full-length team shot to the hero's 2:1 band — top
 * trimmed to the banner, bottom to the knee, faces intact. */
import teamCover from "./team-cover.jpg";
import venueEntrance from "./venue-entrance.jpg";
import workshopTalk from "./workshop-talk.jpg";

const p = (text: string): Block => ({ t: "p", text });

/* Exported so the hero/cover can reuse the same file the body does. */
export const ACL_2026_COVER = teamCover.src;

export const acl2026SanDiego: Article = {
  slug: "acl-2026-san-diego",
  kind: "event",
  channel: "newsroom",
  newsTopic: "announcement",
  tag: "ACL 2026",
  icon: "pin",
  /* Titled as a trip report, not a product headline: the subject is the team
   * and the two venues, and "trip report" tells the reader what kind of piece
   * this is before they commit to it. */
  title: "Team WIGTN at ACL 2026 San Diego and IWSLT 2026: a trip report",
  summary:
    "Six days in San Diego: a live demo booth at ACL System Demonstrations, an invited talk and poster at IWSLT, a reception on an aircraft carrier, and the deployment questions that changed what we build next.",
  date: "2026.07.16",
  place: "San Diego, USA",
  author: "WIGTN Research",
  readTime: "11 min",
  image: teamCover.src,
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

    { t: "h", text: "Arriving" },
    p(
      "The 64th Annual Meeting of the Association for Computational Linguistics, July 2–7. You get a sense of the scale before you are through the door: the whole frontage of the convention centre carries the banner, and the registration queue behind it does not stop moving for two days.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: venueEntrance.src,
          alt: "The ACL 2026 San Diego banner across the glass frontage of the convention centre, with attendees queueing at registration inside.",
          caption: "July 2. Through the front door and into the queue.",
          aspect: "3/4",
        },
        {
          src: arriving.src,
          alt: "A screen inside the venue reading \"ACL 2026 San Diego, July 2-7 — Welcome to San Diego\", beside the registration desk.",
          caption: "The first thing the building says to you.",
          aspect: "3/4",
        },
      ],
    },

    { t: "h", text: "The workshop days" },
    p(
      "The first two days are workshops and tutorials, and they are the part of ACL that does not make it into anyone's paper. You sit in a room with sixty people watching a method you have never seen, in a subfield you do not work in, and you leave with three ideas you were not looking for. It is also where you learn what everyone else is worried about this year.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: workshopTalk.src,
          alt: "A workshop talk in progress, with a pipeline diagram on the projection screen and the audience watching from the back of the room.",
          caption: "Workshop day. Someone else's pipeline, and a room taking notes.",
        },
        {
          src: conferencePortrait.src,
          alt: "Two attendees photographed by the official ACL 2026 conference photographer in the venue foyer.",
          caption: "Caught by the conference photographer between sessions.",
        },
      ],
    },

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
      "The numbers we took to San Diego: 555 ms median latency from caller to callee, zero echo-induced loops across 147 completed field calls, and USD 0.28 per minute on the evaluated provider stack. Those come from 155 real calls over a live phone network, not a simulation.",
    ),

    { t: "h", text: "Three days at booth D3" },
    p(
      "The System Demonstrations track is not a poster session with a poster. You get monitors, and you are expected to run the thing. Ours showed one live call from both ends at once — the caller's side, the transcript, and the recipient's phone — while we stood next to it and explained what the gates were doing as they did it.",
    ),
    p(
      "Most demos ask you to watch. Ours asked you to talk. Visitors dialed a number, someone answered an ordinary phone, and the two of them held a conversation across a language barrier. Then they usually tried to break it: talking over each other, switching languages mid-sentence, walking away from the handset.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: demoVisitors.src,
          alt: "Visitors gathered in front of the WIGTN demo screens at ACL 2026, watching a live translated call.",
          caption: "The screens did the explaining; we filled in the parts they could not show.",
        },
        {
          src: demoExplaining.src,
          alt: "A WIGTN engineer explaining the WIGVO system to visitors at the demo booth.",
          caption: "Most questions started with \"wait, there is no app on the other end?\"",
        },
        {
          src: demoBoothWide.src,
          alt: "Wide view of the WIGTN booth showing the poster, the monitors and the demo table.",
          caption: "Booth D3, set up and running.",
        },
        {
          src: boothD3.src,
          alt: "The WIGTN booth at ACL 2026: the WIGVO poster on the right, three screens showing a live call in progress, and visitors talking with the team.",
          caption: "The three screens show one call from both ends at once.",
        },
      ],
    },
    p(
      "Running it live in a loud exhibition hall was its own test, and a harsher one than the field study. The echo gate held. The dual-session design kept each direction's interpreter from bleeding into the other. And the latency stayed low enough that people stopped treating it like a walkie-talkie and just talked.",
    ),

    { t: "h", text: "Between sessions" },
    p(
      "The coffee breaks are not a break. Twice a day the hall fills, everyone queues for the same buffet, and you end up talking to whoever is next to you in line — which at ACL means the person holding the plate beside you might be the author of a paper you cited last month. More of this trip's useful conversations started in that queue than in any scheduled session.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: sessionHallway.src,
          alt: "Attendees filing through the hallway under the ACL 2026 San Diego banner between sessions.",
          caption: "The corridor between rooms, every hour, on the hour.",
          aspect: "3/4",
        },
        {
          src: coffeeBreak.src,
          alt: "Attendees queueing at the ACL 2026 coffee-break buffet, with sponsor booths visible behind.",
          caption: "The queue where half the week's conversations actually started.",
          aspect: "3/4",
        },
      ],
    },

    { t: "h", text: "The questions we did not expect" },
    p(
      "We prepared for the academic questions and we got them: the evaluation protocol, why COMET against LLM references rather than human translations, how the voice-activity thresholds were tuned. Fair questions, and the paper answers them.",
    ),
    p(
      "What we did not expect was how many people arrived from the other direction. Engineers from NVIDIA, Apple and Amazon came by and asked about the PSTN path, the per-minute cost at scale, whether it drops into an existing call center, and which language pairs are production-ready today. The NVIDIA speech group came back more than once, across both IWSLT and ACL, which by the third visit had turned into a proper conversation rather than a demo.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: posterVisitNvidia.src,
          alt: "An engineer from NVIDIA in conversation with the WIGTN team at the poster boards.",
          caption: "NVIDIA, on the third visit of the week.",
          aspect: "3/4",
        },
        {
          src: posterVisitApple.src,
          alt: "An engineer from Apple looking at the WIGVO poster with a WIGTN team member.",
          caption: "Apple, at the poster boards.",
          aspect: "3/4",
        },
        {
          src: posterVisitAmazon.src,
          alt: "Marcello Federico of Amazon, IWSLT 2026 conference chair, with three WIGTN team members at the poster boards.",
          caption: "Marcello Federico (Amazon), IWSLT 2026 conference chair.",
          aspect: "3/4",
        },
      ],
      caption:
        "To be clear about what these photos are and are not: people stopping at a poster is interest in a research question, not adoption, evaluation or endorsement by their employers.",
    },
    p(
      "None of those are paper questions. They are deployment questions, and being asked them by people who build this for a living was, frankly, the best part of the week.",
    ),
    {
      t: "quote",
      text: "That was when it clicked: this is not just a paper. It is a product people are already waiting for.",
    },

    { t: "h", text: "IWSLT 2026: the oral and the poster" },
    p(
      "IWSLT ran as a two-day workshop inside ACL — the 23rd International Conference on Spoken Language Translation, organised by ACL/ISCA SIGSLT. We were there twice over: an invited oral talk and a poster.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: iwsltPosterPrep.src,
          alt: "Two WIGTN team members mounting the WIGVO poster on board G44 before the IWSLT poster session.",
          caption: "Board G44, half an hour before the session.",
          aspect: "3/4",
        },
      ],
    },
    p(
      "The invited oral let us walk the architecture end to end, including the part papers usually leave out: the idea that failed. We first tried a Pearson-correlation detector comparing outgoing synthesized audio against incoming line audio. It was the cleaner idea and it did not survive the phone network, because codec quantization and variable delay destroyed the stable signal relationship it needed. It cut looping from eight calls in ten to three, then introduced false positives. We threw it away.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: iwsltTalk.src,
          alt: "A WIGTN researcher presenting WIGVO at the IWSLT 2026 invited oral session in San Diego.",
          caption: "IWSLT 2026, invited oral.",
          aspect: "16/9",
        },
        {
          src: iwsltTalk2.src,
          alt: "The dual-session gated relay architecture on screen during the IWSLT 2026 talk, showing the two pipelines and the three-stage echo filter between them.",
          caption: "The slide the questions were really about: two sessions, one gate between them.",
          aspect: "16/9",
        },
      ],
      caption:
        "The room asked better questions about the detector we threw away than about the one that shipped.",
    },
    p(
      "The poster afterwards turned into a two-hour conversation with exactly the people who care most about real-time speech translation. Several had hit the same echo problem from different directions, which is the kind of exchange you cannot get from a paper alone.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: iwsltPosterSession.src,
          alt: "The WIGVO poster on board G44 during the IWSLT 2026 poster session, with the team presenting.",
          caption: "Two hours at G44, and we barely moved.",
          aspect: "3/4",
        },
        {
          src: iwsltOrganizer.src,
          alt: "A WIGTN researcher with Jan Niehues of KIT in front of the ACL-IWSLT 2026 workshop signage.",
          caption:
            "With Jan Niehues (KIT), IWSLT 2026 organizing committee, after the session.",
          aspect: "3/4",
        },
      ],
    },

    { t: "h", text: "A reception on an aircraft carrier" },
    p(
      "The social event was held on the USS Midway, the retired carrier moored on the San Diego waterfront, which the conference took over for the evening. You queue up the gangway, come out on a flight deck the length of three football pitches, and find the bar set up between the parked aircraft.",
    ),
    p(
      "It is a strange and very effective way to run a networking event. Nobody can hide at a table, the sun goes down over the harbour behind the island, and you spend three hours talking to people you would never have been introduced to in a session room.",
    ),
    {
      t: "gallery",
      images: [
        {
          src: midwayDeck.src,
          alt: "The entrance to the USS Midway Museum in San Diego, with the carrier's island and flags above the ticket booths.",
          caption: "Up the gangway.",
        },
        {
          src: midwayReception.src,
          alt: "The conference reception on the USS Midway flight deck at sunset, with attendees gathered around the bar beside a parked aircraft.",
          caption: "The flight deck at sunset, with the bar parked next to an A-6.",
        },
      ],
    },

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

    { t: "h", text: "Thanks to" },
    p(
      "Antonios Anastasopoulos (George Mason University), IWSLT 2026 program chair, who extended the invitation that became the oral talk. There is an IWSLT half to this story only because of it.",
    ),
    p(
      "Jan Niehues (KIT) and Marcello Federico (Amazon), on the IWSLT 2026 organizing committee and in the chair respectively, for the time and the questions.",
    ),
    p(
      "The engineers who came back a second and third time rather than nodding politely and moving on — you know who you are, and you made the week.",
    ),
    p(
      "And everyone who picked up the phone at booth D3 and tried to break it. The list above is mostly your doing.",
    ),
    /* No closing team photo: the same shot now runs as the cover, and showing
     * it twice in one scroll reads as a mistake. */
    { t: "quote", text: "San Diego, you were great. Now back to shipping." },
  ],
};
