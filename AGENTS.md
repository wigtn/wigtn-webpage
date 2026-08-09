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
  links.ts                 URL constants a post may import (leaf module, see below)
  ArticleDetail.tsx        renders an Article's Block[]
  updates/<slug>/          one folder per post, notice or story: index.ts + images
  updates/_template/       four post templates + the shared rules
public/images/             team portraits, logos. Nothing else.
```

`updates/` keeps its folder name through every rename above it, the same way
`research-led/` kept its. Notice posts and story posts both live there; the
`channel` field on the post, not the folder, is what routes them.

The site has four nav destinations: **About** (/team), **Notice** (/notices),
**Story** (/story), and **Tech**, which is an external link to WIG-log's
report index. The landing page is three sections: Hero, What we do (the
business model: Web Agency and AX Agency), Contact. About is "Who we are.":
the members and the partners, nothing else. A **Blog** section exists in the
source (BlogPage.tsx, the "blog" channel) but is closed and unrouted: it is
reserved for business-track news (a signed subcontract, a program selection,
a partnership), and it opens with its first qualifying post, not before.
**The gate and the reopening steps are in [`docs/blog-section.md`](docs/blog-section.md)**;
read it before writing anything for the blog or reviving the routes.

## Where does a piece of writing belong

WIGTN publishes in two repos, and the line between them is the subject, not the
length.

| | Subject | The question it answers |
| --- | --- | --- |
| **wigtn.com** (this repo) | the team | What did we **do**? |
| **[WIG-log](https://tech.wigtn.com/)** (`wigtn-tech-report`) | the work | What did we **find**? |

Two tests, in order.

**Is it a report?** If it has a method and a limitations section, yes.
Benchmarks, ablations, architecture decisions, what did not transfer: findings,
and they go on WIG-log under `components/technical-reports/`. The nav's Tech
item is the pointer.

**Is it a story?** A conference trip, a hackathon, a weekend with a scene to
describe and photographs to carry it. Stories are `channel: "story"` posts
here, rendered at `/story/<slug>` under the /story rows that summarize them.
(They spent 2026-08-09 on the WIG-log feed and came back the same day; the
feed's copies still exist but nothing here links them.)

Everything else is a **notice**: announcements and releases, `channel:
"newsroom"`. Short, dated, about the team rather than about the work.

Worked examples:

- The ACL 2026 trip report is a story page at /story/acl-2026-san-diego.
  Five people went somewhere and came back with decisions; there is no method
  in it, so it is not a report.
- WigtnOCR's distillation recipe and its KoGovDoc numbers are a report. They
  are not on this site at all.
- "WigtnOCR is open source" is a notice, because shipping it is something the
  team did. It says what was released and links the report for the numbers.
- When EMNLP 2026 is accepted, that announcement is a notice. The paper's
  findings are not.

The two on-site surfaces split the content by shape:

- **/notices** is the release record: `RELEASE_ROWS` in `data.ts` flattens the
  release posts' `versions` arrays into one date-ordered ledger, filterable
  by each post's `releaseType` (model / plugin / tool), ten rows per page,
  each row linking the product's release note.
- **/story** promotes the newest story as a feature (cover, title, summary),
  then lists the rest as rows. Each entry pairs a short news note with its
  long-form story through `STORIES` in `data.ts`: the note supplies the
  words, the story post supplies the thumbnail and the /story/<slug>
  destination.

The page at /notices was /news, labelled "Updates", until 2026-08-09, and held
News and Releases tabs until the Story/Blog split. Retired URLs, including
/news, /work, and the story posts' old root slugs, are listed in `RETIRED` in
`data.ts` and still resolve as redirects. Read the comment there before
touching them.

## Writing an update post

**Use the `update-post` skill.** Do not hand-write an article into `data.ts`, and
do not copy an existing post folder and edit over it. The skill runs the
interview, picks the right template, sources the facts, and verifies the build.

The `/projects` route, the `constants/` content it rendered, and the retired
`components/sections/*` landing were all deleted once the split made them
redundant: about 6,300 lines of code no entry point reached, and 42 MB of images
nothing loaded. If you find a reference to any of them, it is stale.

Read `mockups/research-led/updates/_template/README.md` before touching any post.
It owns the rules for blocks, images, galleries, numbers, and naming. Four
templates live in its subfolders: announcement and community for the short
newsroom posts, conference and hackathon for the long-form stories.

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
npm run build        # 34 static pages; this is what catches a missing image
```

`next-env.d.ts` declares `*.jpg` as a wildcard module, so a typecheck will
happily accept an import of a file that does not exist. The missing-image-is-a-
build-error guarantee comes from `next build`, not from `tsc`. Check both.

## Git

Conventional Commits. Branch per unit of work, PR into `main`. No AI-authorship
trailers in commits, PR bodies, or issue comments.
