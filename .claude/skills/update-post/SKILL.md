---
name: update-post
description: Write a new WIGTN post end to end. Runs a short interview, picks the matching template (announcement / community / conference / hackathon), sources every fact from the repo or a named source, prepares the photos, drafts the post into updates/<slug>/, wires it into data.ts, and verifies the build. Use whenever the user wants to add, write, or draft a post for the Notice, Story, or Blog surfaces: "글 하나 써줘", "업데이트 올려줘", "릴리스 노트 써줘", "블로그 글 써줘", "write an update post", "add a newsroom post", "draft a release note", "write a trip report".
---

# Writing an update post

A post is a folder: `mockups/research-led/updates/<slug>/index.ts` plus its own
images. `data.ts` imports it. Four templates exist because an announcement, a
community note, a conference story, and a hackathon story want different
sections; the first two are `channel: "newsroom"` posts, the last two are
`channel: "blog"` stories rendered at /blog/<slug>.

Read `mockups/research-led/updates/_template/README.md` first. It owns the rules
this skill does not repeat: blocks, gallery layout, image prep, the numbers
policy, the naming policy. `AGENTS.md` owns the house voice.

The whole point of this routine is that the post ships with **no invented
facts**. Every phase below exists to make inventing harder than sourcing.

---

## Phase -1: Does it belong on this site?

Before anything else, route the subject. **One kind of post belongs in the
`wigtn-tech-report` repo instead**: a post with a method and a limitations
section is a tech report, and it goes to `components/technical-reports/`. This
site covers what the team did; the report site covers what the work found. If
that is the answer, say so and stop.

Everything else lives here, split by channel:

- **A conference or hackathon write-up is a blog story**: `channel: "blog"`,
  conference or hackathon template, rendered at /blog/<slug>. A story usually
  pairs with a short news note on /story through `STORIES` in `data.ts`; the
  note is a separate announcement post.
- **A release note or short notice is a newsroom post**: `channel:
  "newsroom"`, announcement or community template.

## Phase 0: Scan before you ask

Ask nothing the repository can already answer. Before the first question:

```bash
ls mockups/research-led/updates/                    # what exists, and the slugs
grep -n "slug:" mockups/research-led/data.ts        # what is already published
git log --oneline -15
```

The technical half of a subject usually already exists as a tech report in the
`wigtn-tech-report` repo. Read it there rather than restating it: this site links
to it, and the announcement template exists so a post can be short because the
report is long. Skim the three or four most recent posts under `updates/` for
voice.

Then say in one or two lines what you already know, so the interview only covers
what is genuinely missing. An interview that asks about facts sitting in the repo
reads as an agent that did not look.

## Phase 1: Interview

See [QUESTIONS.md](QUESTIONS.md) for the full bank. The shape:

| Round | Purpose | Count |
| --- | --- | --- |
| 1 | Scope: which template, where the facts live, what photos exist, which feed | 4 |
| 2 | The carrying section, template specific | 3-4 |
| 3 | Editorial: attribution, exclusions, cover | 3 |

Ten or eleven questions total, in three `AskUserQuestion` calls (the tool takes
at most four per call).

Two rules that make the difference between a good interview and a survey:

**Ask about decisions, not dictation.** `AskUserQuestion` is multiple choice. Use
it for the choices that change the post's shape: which template, whether a
section has evidence, whether to name a company, what to leave out. Do **not**
use it to collect dates, numbers, URLs, or names. Those come from sources. If you
need a fact the sources do not have, ask for it in plain conversation, or list it
at the end as unsourced.

**Round 2 is the one that matters.** Every template names one section that
carries that kind of post, and it is always the section a writer skips. Round 2
exists to find out whether that section has anything real behind it:

| Template | The carrying section | What round 2 is really asking |
| --- | --- | --- |
| conference | What changes because of this | Which decisions did the trip force? |
| hackathon | What survived | What still runs, and what was thrown away? |
| announcement | What shipped | Which artifacts actually went public? |
| community | What the room argued about | What was the disagreement? |

If the user cannot answer round 2, **the section does not get written.** Cut it,
and record in the file header that it was cut for lack of evidence and what would
let someone add it later. `wigtnocr-open-source/index.ts` is the short-form
worked example; `acl-2026-san-diego/index.ts` is the long-form one.
That is a correct outcome, not a failure.

## Phase 2: Source every fact

Build a source list before drafting. For each: what it is, and what it is allowed
to support.

Sources, in order of preference:

1. The matching report in the `wigtn-tech-report` repo, if the subject has one.
2. A repository README, model card, or registry (`raw.githubusercontent.com`,
   `registry.npmjs.org`, a HuggingFace model card). Fetch it; do not recall it.
3. An organizer's announcement or press release.
4. A photo in the post folder, when the photo legibly shows a fact. A picture of
   a sponsor board is a source for what is on that board. Read it at native
   resolution before citing it, and keep tiers and categories distinct.

Then, before any number goes in:

- **Attribute it to the file it was measured on.** A figure measured on one image
  is not a figure about a different image. This is a mistake that has already
  shipped here once.
- Quote it at the precision the source uses. No rounding.
- If two sources disagree, say which one the post follows and why, in the file
  header, so nobody "corrects" it back later.

## Phase 3: Photos

Inventory before drafting, because the photos decide which sections can exist.

```bash
magick identify -format '%f %wx%h icc=%[profile:icc]\n' <candidates>
```

Prep each one with the command in the template README. The two flags that are not
optional are `-auto-orient` and `-profile`; read that section, do not guess.
Screenshots are not photos and have their own rule there.

Then decide placement against real pixel dimensions, not intent:

- A portrait shot never runs as a full-width `image` block. It goes in a gallery
  with `aspect: "3/4"`, which caps it at 460px.
- Do not use the cover again inside the body. The same frame twice in one scroll
  reads as a mistake.
- A caption may not ask the reader to read something the layout will not show
  them at its rendered width. Check the width first.

## Phase 4: Draft

Copy the matching `_template/<kind>/index.ts.example` into the post folder as
`index.ts`, fix the data import from `../../../data` to `../../data`, and write.

Open the file with a header comment covering: what the post is, which template it
follows, where every number came from, and any editorial decision a future editor
would otherwise undo. The header is the most valuable part of the file six months
from now. Every decision the interview settled goes in it.

Order the writing the way the `STRUCTURE.md` orders the sections. Write the
carrying section first, while the evidence is still in front of you.

## Phase 5: Self-check

Before running anything, read the draft against this list. Every item here is a
defect that has already shipped in this repo at least once.

- [ ] No em-dashes anywhere, prose or comments. Sentences rewritten, not patched.
- [ ] Every number traces to a named source, and to the right file.
- [ ] No section is padded. Anything without evidence is cut, and the header says
      it was cut and why.
- [ ] Header claims match the body. If the header says a field was preserved, it
      was preserved.
- [ ] `slug` equals the folder name; `image` points at an imported binding.
- [ ] Every image in the folder is imported; every import exists.
- [ ] `aspect` matches each file's real ratio.
- [ ] Cover is not reused in the body.
- [ ] `*_COVER` exported only if something outside the post imports it.
- [ ] Off-site URLs come from `../../links`, never a value import from `../../data`.
- [ ] A shell command sequence is a `list`; a single command is a `quote`.
- [ ] `channel` is the one the template hardcodes ("newsroom" or "blog"), or
      the field is deleted for a back-catalogue post.

## Phase 6: Verify

```bash
npx tsc --noEmit
npm run build                                  # this is what catches a missing image
```

Then look at it. Serve `out/` and open the page:

```bash
python3 -m http.server 8899 --directory out &
agent-browser open "http://localhost:8899/<slug>.html" --wait-for-network-idle
agent-browser screenshot --full <path>.png
```

A full-page screenshot will show the card grid as blank, because the cards
animate on `whileInView` and never enter view during the capture. Scroll and
capture the viewport instead.

Check: galleries lay out as intended, portraits are not squashed, quote blocks
read as commands where they are commands, and the hero crop keeps whatever the
cover was chosen for.

## Phase 7: Wire it up and report

Register the import in `data.ts` and place the identifier where the post belongs
in `ARTICLES` (the array is grouped by channel and ordered newest first inside
each group). A blog story that pairs with a news note also gets a `STORIES`
row (note article, story cover, blog slug). If the post gets a milestone
entry, add it to `MILESTONES` and use the exported `*_COVER`.

Then report, in this order:

1. What was created, with the section outline that was landed.
2. **Any section cut for lack of evidence**, and what would let someone add it.
3. **Any fact wanted but not sourced.** Never fill one of these by inventing.
4. Anything found along the way that is out of scope but wrong, such as a claim
   elsewhere on the site that the new sourcing contradicts.

Items 2 and 3 are the point of the report. A routine that always reports a
complete post is a routine that is filling gaps quietly.

---

## Doing several at once

If more than two posts are being written, run one agent per post in parallel and
keep `data.ts` out of their hands. Six agents editing one file conflict; the
orchestrator wires them all up serially afterwards. Give each agent its slug, its
template, its sources, its images, and the hard rule that it may only touch its
own folder.
