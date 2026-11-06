/**
 * Update: EMNLP 2026, Budapest, presented virtually from Seoul. Story.
 *
 * Conference template (../_template/conference/STRUCTURE.md), adapted for a
 * talk given over a video call. Paired with the notice ../rcps-emnlp-2026
 * through STORIES in ../../data.ts.
 *
 * TOLD AS A STORY, NOT A SUMMARY OF THE PAPER. The first draft spent two
 * sections and eight figures on the method, which made it read like the tech
 * report with a cover photo. The editor asked for the shape of
 * ../acl-2026-san-diego instead: what the team did, in order. The paper now
 * gets one section and one pair of numbers, the pair that started it, and
 * every other figure is left to the report the post links. Do not grow that
 * section back into a results summary.
 *
 * SECTIONS CUT, and why. Each one can come back when its evidence does.
 *   - Arriving. Nobody travelled, so there is no venue to describe. Its slot is
 *     taken by "Getting ready", the preparation that replaced the trip.
 *   - The tech report in the prose. It is linked from the links row and
 *     nowhere else: the editor asked that the story not narrate an internal
 *     publication as though it were a conference milestone.
 *   - What people asked. The session held one Q&A after all the talks, and
 *     nobody asked anything (the presenter's account, 2026-11-06). The body
 *     describes the format in a short paragraph instead of a section. If questions arrive
 *     later on Underline, they can be added with the date they were asked.
 *   - Side sessions. Describing the other talks in Virtual Presentation
 *     Session 1 would mean naming their presenters, who hold no published role
 *     this site can cite. Cut rather than anonymised into filler.
 *   - What changes because of this. The carrying section of the template, and
 *     cut because no decision was taken on the strength of this session. Add
 *     it only as a list of decisions, each with the evidence that forced it.
 *
 * WHERE EVERY FACT COMES FROM:
 *   - Paper title, author order, venue, pages 1531-1544 and the Anthology URL:
 *     PAPERS["emnlp-2026"] in lib/schema.ts, checked against the Anthology
 *     BibTeX on 2026-10-24.
 *   - The two figures in "The paper" (Boundary Clarity 0.713 vs 0.610, Hit@1
 *     0.123 vs 0.549): the paper's abstract as submitted to
 *     Underline (~/Desktop/EMNLP2026_Underline_submit/FORM_ANSWERS.md), which
 *     the RCPS report on WIGTN Tech (wigtn-tech-report,
 *     components/technical-reports/data.ts, slug "rcps") repeats. Quoted at
 *     the abstract's precision. Prod being WigtnOCR v1 is from the same report,
 *     whose links name Wigtn/Qwen3-VL-2B-WigtnOCR as "WigtnOCR v1 production
 *     parser", and from slide 3 ("Prod: our Qwen3-VL-2B production parser").
 *   - City, dates (24-29 October) and the session: 2026.emnlp.org and its
 *     program page, fetched 2026-11-06. The program lists "Virtual
 *     Presentation Session 1 via Underline", Sunday 25 October, 12:30-14:00.
 *     The Seoul times are that slot plus eight hours: Central European
 *     summer time ended at 03:00 that same morning.
 *   - A dated timeline list sat above "Thanks to" until 2026-11-06 and came
 *     out at the editor's request: "From a draft to a virtual talk" already
 *     tells the same months as prose, and the list repeated it.
 *   - Registration details, the slot request and the poster's freeze date
 *     were in an earlier draft and came out on 2026-11-06 at the editor's
 *     request as too much detail for a story. The records are
 *     EMAIL_REPLY_final.txt and rcps-poster/FINAL.md if anyone needs them.
 *   - The recorded talk is described as 12 minutes, the slot it was made for
 *     (FORM_ANSWERS.md gives the file as 11:55; the editor asked for the
 *     round slot length on 2026-11-06, so do not swap the exact runtime back
 *     in). The YouTube copy
 *     is the same recording; its title was read from YouTube oEmbed.
 *   - THE TIMELINE, every date read from a record, none from memory:
 *       18 May, project scaffolded "for EMNLP 2026 submission"; 23 May, first
 *       draft; 15 June, the submission merge; 23-25 July, the OpenReview
 *       rebuttal: git log of github.com/wigtn/WigtnOCR-RADP.
 *       Accepted in August: docs/CAMERA_READY_PLAN.md in that repo is headed
 *       "Accepted (2026-08-21 갱신)", so the decision was in by 21 August; the
 *       exact notification day is not recorded, so the post says "August".
 *       "Started as a training paper": the repository was scaffolded as the
 *       RADP (parser training) project; commits on 2 and 12 June reframe the
 *       DPO study as "a modest secondary lever" and make RCPS "the central
 *       contribution". Anonymity period: the RETIRED note on wigtnocr-radp
 *       in ../../data.ts.
 *       Camera-ready deadline 30 August AoE: the same file, from the
 *       acceptance email. Report live 26 August: wigtn-tech-report git log.
 *       Poster work from 3 September (creation dates of the planning files in
 *       ~/Desktop/rcps-poster), final 16 September (FINAL.md, "확정
 *       2026-09-16"). Recording files written 19 September, Underline upload
 *       set ready on the night of 21 September (file times in
 *       EMNLP2026_Underline_submit).
 and the uploads: FORM_ANSWERS.md.
 *     The slot preference (Session 1 first, Session 4 on 26 October as the
 *     backup): EMAIL_REPLY_final.txt.
 *   - Camera placement: ~/Desktop/rcps-poster/video/RECORDING.md, which
 *     measured each corner against all twelve slides. Its percentages are an
 *     internal note, not a published figure, so the prose states the decision
 *     and leaves the numbers out.
 *   - "Virtual, compared with being there": the presenter's account,
 *     2026-11-06 (less lively and more formal than in person, networking
 *     largely missing, more efficient). The contrast with San Diego is taken
 *     from ../acl-2026-san-diego (three days at booth D3). Nothing in it is a
 *     measurement; if it is ever cut for length, cut it whole rather than
 *     keep one side of the trade.
 *   - The team's first virtual presentation, and the live talk running ten
 *     minutes: the presenter, 2026-11-06. Sang-Woo Son is named as presenter
 *     because the talk's title slide and the session's own label publish him
 *     in that role.
 *   - "Thanks to": the chairs' written approval of the corresponding-author
 *     footnote is in WigtnOCR-RADP docs/CAMERA_READY_PLAN.md; the virtual
 *     presentation exchange is EMAIL_REPLY_final.txt. The camera-ready
 *     revision plan in that repo was built "from the final rebuttal
 *     commitments", which is the basis for the reviewers' line. Corresponding
 *     author as the poster and the camera-ready publish it. The session host
 *     is thanked by role only: no name is published for the session chair.
 *   - Industry Track chairs by name and role: 2026.emnlp.org/organization,
 *     fetched 2026-11-06, along with the Virtual Infrastructure Chairs.
 *
 * IMAGES, all screenshots or rendered slides, none of them camera output, so
 * none went through the photo command:
 *   - emnlp-2026-logo.png: the official EMNLP 2026 wordmark,
 *     https://2026.emnlp.org/assets/images/logos/emnlp_2026_logo_v1.png
 *     (8703x1516 RGBA, fetched 2026-11-06), resized to 1500 px wide and
 *     centred on a 2400x1200 white field, so the 2:1 hero and the 16:10
 *     /story crop both keep the whole mark. The editor asked for the venue,
 *     not the paper, on the cover. Two earlier covers (the talk's title slide,
 *     then the RCPS key visual from WIGTN Tech) were replaced for that reason.
 *   - recorded-talk-frame.jpg: the frame at 5.0 s of the recorded talk
 *     (EMNLP 2026_Ind-384_video.mp4, 714.9 s), pulled with AVFoundation and
 *     saved as JPEG q85. It is a video frame, so JPEG; the burned-in caption
 *     is part of the recording.
 *   - rcps-poster.png: the A0 poster (rcps-poster/RCPS_EMNLP2026_Poster.png,
 *     2384x3370), padded with white to 3:4 so the gallery's aspect crop does
 *     not take the EMNLP logo off the header or the QR off the footer, then
 *     resized to 1500x2000.
 *   - The chat keeping time ("About 2 minutes left, please"): a second
 *     screenshot from the same session at 21:28 KST, of another presenter's
 *     slot. It is not used as an image because it shows another team's paper
 *     and the participants' names; only the fact that the session timed its
 *     talks in the chat is taken from it.
 *   - Zoom as the call software: the presenter, 2026-11-06, and the
 *     screenshot's own UI (the meeting-chat panel and tile layout).
 *   - live-session.png: the presenter's screenshot at 21:31 KST on 25
 *     October (original in _source/, ignored by git). The four other
 *     participants' tiles are blurred, names and initials both; only the
 *     presenter's own tile is legible. A 2:1 crop would have shrunk the slide
 *     text, so it runs whole as an image block.
 */

import type { Article, Block } from "../../data";
/* From ../../links, not ../../data: data.ts imports this file, so a value
 * import back would close a runtime cycle. The type import above is erased. */
import { techReportHref } from "../../links";
import liveSession from "./live-session.png";
import rcpsPoster from "./rcps-poster.png";
import emnlpLogo from "./emnlp-2026-logo.png";
import recordedTalkFrame from "./recorded-talk-frame.jpg";

const p = (text: string): Block => ({ t: "p", text });

const TALK_URL = "https://www.youtube.com/watch?v=20ezaBGOCRk";

/* Exported because STORIES in ../../data.ts shows this cover on the /story
 * row and the story page's social card uses it. Those are the only
 * consumers. */
export const EMNLP_2026_COVER = emnlpLogo;

export const emnlp2026Virtual: Article = {
  slug: "emnlp-2026-virtual",
  kind: "event",
  channel: "story",
  tag: "EMNLP 2026",
  icon: "pin",
  title: "RCPS at EMNLP 2026: choosing document parsers by retrieval",
  summary:
    "Five months from a first draft to a Sunday night in Seoul: how a paper that started with our own OCR model reached EMNLP 2026, and the team's first virtual presentation.",
  date: "2026.10.25",
  place: "Budapest, Hungary (virtual)",
  author: "WIGTN Research",
  readTime: "5 min",
  image: emnlpLogo.src,
  /* No `video` flag: the hero's centred play button would sit on the
   * EMNLP wordmark. The recording is linked from the links row and from
   * "Getting ready". */
  links: [
    { label: "EMNLP paper", href: "https://aclanthology.org/2026.emnlp-industry.90/" },
    { label: "Presentation", href: TALK_URL },
    { label: "Tech report", href: techReportHref("rcps") },
    { label: "GitHub", href: "https://github.com/wigtn/WigtnOCR-RADP" },
  ],
  body: [
    p(
      "Sunday 25 October, early afternoon in Budapest. EMNLP 2026 was on its second day, and on Underline, Virtual Presentation Session 1 was under way, one speaker after another sharing a screen into the call. At the same moment it was half past nine at night in Seoul, and Sang-Woo Son, first author of WIGTN's paper in the Industry Track, was waiting for the turn to present RCPS.",
    ),
    p(
      "It was the first time the team had presented virtually, and it turned out to be a different job from standing at a booth. Everything has to be finished weeks early, and on the night the audience is a row of small tiles in the corner of a laptop screen.",
    ),

    { t: "h", text: "From a draft to a virtual talk" },
    p(
      "The repository for the paper was set up on 18 May, and a first draft existed five days later. Much of the next three weeks went into deciding what the paper was about. It started as a training paper and ended as an evaluation paper: the training study shrank to a secondary section and RCPS became the centre. It went in to the Industry Track on 15 June.",
    ),
    p(
      "The reviews came back in July, and the rebuttal went up on OpenReview between 23 and 25 July. The acceptance arrived in August. Camera-ready was due on 30 August, and the week before it went into rerunning numbers, redrawing figures and checking every reference.",
    ),

    { t: "h", text: "Getting ready" },
    p(
      "A virtual presentation is finished before the conference starts. Underline wanted the poster, the slides and a recorded talk by 29 September, and the three took about a month.",
    ),
    p(
      "At an in-person poster session the A0 poster would have been printed and carried to the venue; for a virtual one it only had to be uploaded. The talk went in as a 12-minute recording over twelve slides, with the slides full screen and the camera in a small window. Before pressing record we checked every slide for where that window would cover the least, and it went in the top right.",
    ),
    {
      t: "image",
      src: recordedTalkFrame.src,
      alt: "The first seconds of the recorded talk: the title slide full screen, the presenter's camera in a small window at the top right, and the caption: Today I'll show you how we pick a document parser.",
      caption: "Five seconds into the 12-minute recording, camera window in the top right. The Presentation link at the top of this page plays the whole talk.",
    },
    {
      t: "gallery",
      images: [
        {
          src: rcpsPoster.src,
          alt: "The RCPS poster: a header with the title, authors and EMNLP 2026 Budapest logo; an introduction in three beats; an architecture panel for selection and coverage diagnosis; an evaluation panel with the parser ranking, the deployment audit and the coverage chart; and a footer reading Select, Diagnose, Act.",
          caption: "The A0 poster. No print shop and no poster tube this time: it went to Underline as a PDF.",
          aspect: "3/4",
        },
      ],
    },

    { t: "h", text: "The paper" },
    p(
      "RCPS started with our own OCR model. WigtnOCR is the parser we run in production, and when we compared it against other parsers, the usual intrinsic score said we had picked the wrong one. MinerU with table recognition turned on looked cleaner, 0.713 Boundary Clarity against our 0.610. Then we checked what actually matters in a search system, whether the first chunk retrieved is the right one, and the order flipped: 0.123 for MinerU against 0.549 for ours.",
    ),
    p(
      "So the paper proposes choosing a parser by retrieval instead of by how its output looks. The method, the full results and what the evaluation does not cover are in the paper.",
    ),

    { t: "h", text: "Sunday night in Seoul" },
    p(
      "The session ran on Zoom: one presenter after another, each sharing their own screen. The session host timed every talk and posted a notice in the chat when about two minutes were left. Our turn came at around half past nine Seoul time. Ten minutes, walking the workflow slide from the evaluation frame on the left to the deployment decision on the right.",
    ),
    {
      t: "image",
      src: liveSession.src,
      alt: "A screenshot of the live session: the RCPS workflow slide shared full screen, with the participant panel on the right. The presenter's tile reads Presenter, Sang-Woo Son; the other participants' tiles are blurred.",
      caption: "The virtual presentation, held over Zoom. Other participants are blurred.",
    },
    p(
      "Questions were held until every speaker had finished, for one Q&A at the end of the session. Perhaps because of that format, nobody was quick to unmute and ask, and the Q&A passed without a question for our talk.",
    ),

    { t: "h", text: "Virtual, compared with being there" },
    p(
      "Three months earlier, at ACL in San Diego, the team ran a booth for three days. Set against that, a virtual session is quieter and more formal. Talks run back to back on a timer, there is no crowd building in front of a screen, and the energy of a room does not come through a laptop.",
    ),
    p(
      "Networking is the bigger loss. At a booth, the useful conversations start with a stranger who stops to ask what the demo is doing, and in San Diego those conversations were where the next questions came from. A video call has no hallway, and nobody wanders past a tile.",
    ),
    p(
      "It is efficient, though. No travel, no days away from the work, and the talk exists as a finished recording that anyone can watch later, which a booth never leaves behind. For a paper whose result fits in ten minutes, that trade is reasonable. For a demo that people need to try with their own hands, it would not be.",
    ),

    { t: "h", text: "Thanks to" },
    p(
      "To the EMNLP 2026 Industry Track Chairs, Pepa Atanasova, Gholamreza Haffari and Minghan Wang, who answered every question we sent them between acceptance and the talk, from the author footnote on the camera-ready to the move to a virtual presentation.",
    ),
    p(
      "To the Virtual Infrastructure Chairs, Fernando Batista and Ali Hürriyetoğlu, whose virtual track is the reason a team in Seoul could present at a conference in Budapest at all, and to the session host who kept every talk on time.",
    ),
    p(
      "To the anonymous reviewers. Their questions in July became much of the camera-ready revision, and the paper is better for every one of them.",
    ),
    p(
      "And to the five people who wrote it: Sang-Woo Son, Hyeong-seob Kim (corresponding author), Hyeonsang Kim, Hyun-woo Cho and Jinmo Kim.",
    ),
  ],
};
