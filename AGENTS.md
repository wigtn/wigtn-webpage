# wigtn-webpage

<!-- CLAUDE.md is a symlink to this file, so both conventions load the same
     rules and there is one copy to edit. On a checkout without symlink support
     CLAUDE.md materializes as a file containing the literal text "AGENTS.md";
     if you are on such a platform, replace it with a copy rather than editing
     the link. -->

The WIGTN company site. Next.js 15, static export (`output: "export"`), deployed
to GitHub Pages. The live pages are built from `mockups/research-led/`, which was
promoted from a mockup and kept its folder name.

```
app/                       routes; thin wrappers around mockups/research-led/*
mockups/research-led/
  data.ts                  articles, team, milestones, nav, selectors
  links.ts                 off-site URL constants (leaf module, see below)
  ArticleDetail.tsx        renders an Article's Block[]
  updates/<slug>/          one folder per update post: index.ts + its images
  updates/_template/       two post templates + the shared rules
  milestones/              cover art for rail entries whose posts live off-site
public/images/             team portraits, logos. Nothing else.
```

## Which site does this belong on

WIGTN publishes in two places, and the line between them is the subject, not the
length. A short story and a long story both belong here if the subject is right.

| | Subject | The question it answers |
| --- | --- | --- |
| **wigtn.com** (this repo) | the team | What did we **do**? |
| **[tech reports](https://wigtn.github.io/wigtn-tech-report/)** (`wigtn-tech-report`) | the work | What did we **find**? |

Two tests, in order.

**Is it a report?** If it has a method and a limitations section, yes.
Benchmarks, ablations, architecture decisions, what did not transfer: findings,
and they go on the report site under `components/technical-reports/`.

**Is it a story?** A conference trip, a hackathon, a weekend with a scene to
describe and photographs to carry it. Those moved to the report site's blog on
2026-08-09, under `components/blog/posts/`, because the reader who wants the ACL
trip report is the reader who wants the WIGVO report.

What is left here is what this site is for: **announcements and releases.**
Short, dated, about the team rather than about the work.

Worked examples:

- The ACL 2026 trip report is on the blog. Five people went somewhere and came
  back with decisions; there is no method in it, so it is not a report, but it
  is a story and stories are not here any more.
- WigtnOCR's distillation recipe and its KoGovDoc numbers are a report. They are
  not on this site at all.
- "WigtnOCR is open source" is here, because shipping it is something the team
  did. It says what was released and links the report for the numbers.
- When EMNLP 2026 is accepted, that announcement goes here. The paper's findings
  do not.

The blog is on the report site, not here. Updates held both for a while and the
split above is what replaced that. If a post feels like it needs a third home,
the answer is that it is a release note, a story, or a report, and the tests
above decide which.

/news has two groups, News and Releases, split on `newsTopic === "release"`.
News renders nothing at all while it is empty, which it is today.

Pages that moved to the report site are listed in `RETIRED` in `data.ts` and
still resolve, as redirects. Read the comment there before touching them.

## Writing an update post

**Use the `update-post` skill.** Do not hand-write an article into `data.ts`, and
do not copy an existing post folder and edit over it. The skill runs the
interview, picks the right template, sources the facts, and verifies the build.

The `/projects` route, the `constants/` content it rendered, and the retired
`components/sections/*` landing were all deleted once the split made them
redundant: about 6,300 lines of code no entry point reached, and 42 MB of images
nothing loaded. If you find a reference to any of them, it is stale.

Read `mockups/research-led/updates/_template/README.md` before touching any post.
It owns the rules for blocks, images, galleries, numbers, and naming. Two
templates live in its subfolders, announcement and community. The conference and
hackathon templates went to the report site with the posts they describe, and
are at `wigtn-tech-report/components/blog/_template/`.

## House voice

Plain, specific, and load-bearing. Every sentence should carry a fact, a
decision, or a consequence.

**No em-dashes.** Not in prose, not in captions, not in comments. This is not a
find-and-replace: an em-dash almost always marks a sentence that wanted to be
two, a clause that wanted parentheses, or a list that wanted a colon. Rewrite the
sentence, do not swap the character. (Posts written before this rule still carry
them; they are grandfathered until the file is next edited.)

Also out:

- Marketing adjectives. "Powerful", "seamless", "cutting-edge", "revolutionary".
- Announcement throat-clearing. "We're thrilled to", "We're excited to share".
- Tricolon padding. Three adjectives where one is true.
- Reflection in place of information. "It was inspiring" tells nobody anything.

In:

- The number, with the source it came from.
- The decision, with the evidence that forced it.
- The thing that failed, named.

## Hard rules

1. **Cite only figures that already exist** in a published paper, tech report,
   README, or release page, and say where each came from. Never round, restate,
   or infer a new one. A figure measured on one file is not a figure about
   another file.
2. **If a template section has no evidence, cut the section.** An honest
   six-section post beats an eight-section one with two paragraphs of filler.
3. **Images live in the post folder and are imported**, never referenced by a
   `public/` path. See the template README for the prep command, including the
   sRGB conversion that is not optional.
4. **Never import a value from `data.ts` into a post.** `data.ts` imports every
   post module, so a value import closes a runtime cycle and reads the constant
   inside its temporal dead zone. Off-site URLs come from `../../links`.
   `import type` is erased and is safe.
5. **Name people only in their published role**, and visitors by company, never
   by individual.

## Verifying

```bash
npx tsc --noEmit     # types; cannot see missing images (see below)
npm run build        # 24 static pages; this is what catches a missing image
```

`next-env.d.ts` declares `*.jpg` as a wildcard module, so a typecheck will
happily accept an import of a file that does not exist. The missing-image-is-a-
build-error guarantee comes from `next build`, not from `tsc`. Check both.

## Git

Conventional Commits. Branch per unit of work, PR into `main`. No AI-authorship
trailers in commits, PR bodies, or issue comments.
