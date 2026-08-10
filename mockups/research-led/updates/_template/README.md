# Post templates

> Four templates: announcements and community notes are the short-form posts
> for /notices and the /story rows, conference and hackathon write-ups are
> the long-form stories rendered at /story/<slug>. The story templates spent
> 2026-08-09 in `wigtn-tech-report/components/feed/_template/` and came back
> with the story posts.

Every post under `updates/` is a folder: the text in `index.ts`, the images
beside it, nothing referenced by a string path that can rot.

Do not write one by hand. Run the `update-post` skill: it runs the interview,
picks the template, sources the facts, and verifies the build. This file and the
four `STRUCTURE.md` files are what that skill follows, and what you read if you
are editing an existing post.

**House voice lives in [`AGENTS.md`](../../../../AGENTS.md) at the repo root.**
The rule that catches people out: no em-dashes, anywhere, prose or comments. It
is not a find-and-replace. An em-dash almost always marks a sentence that wanted
to be two, a clause that wanted parentheses, or a list that wanted a colon.
Rewrite the sentence. Posts written before that rule still carry them and are
grandfathered until the file is next edited.

```
updates/
└── my-new-post/          ← folder name must equal the slug
    ├── index.ts
    ├── cover.jpg
    └── whatever-else.jpg
```

The template skeletons import a `./cover.*` placeholder (`.jpg`, or `.png` for
the announcement, whose cover is usually a screenshot).
Rename it. The cover follows the same rule as every other image: it is named
for what it shows (`winners-on-stage.jpg`, `grand-prize-certificate.jpg`), not
for the slot it fills.

Register the export in `../../data.ts`:

```ts
import { myNewPost } from "./updates/my-new-post";
// ...
export const ARTICLES: Article[] = [
  myNewPost,        // newest first
  ...
];
```

## Pick a template

First, check it belongs on this site at all. **If it has a method and a
limitations section, it is a tech report**, and it goes to the `wigtn-tech-report`
repo instead. See [`AGENTS.md`](../../../../AGENTS.md). Everything below assumes
the subject is something the team did.

The recap shape is not one shape. A community note and an announcement want
different sections, and forcing one into the other's outline is how a post ends
up with a "what people asked" heading over an empty paragraph.

| The post is about | `kind` | `channel` | `newsTopic` | Template |
| --- | --- | --- | --- | --- |
| An artifact shipped: weights, a plugin, a tool you can install | `report` | `newsroom` | `release` | [`announcement/`](announcement/STRUCTURE.md) |
| A paper accepted, a placing won, something announced with nothing to install | `event` | `newsroom` | `announcement` or `award` | [`announcement/`](announcement/STRUCTURE.md), cut to a note |
| A meetup, seminar, or study group we ran | `community` | `newsroom` | `community` | [`community/`](community/STRUCTURE.md) |
| A conference trip, told as a story with photographs | `event` | `story` | none | [`conference/`](conference/STRUCTURE.md) |
| A hackathon or contest, told as a story with photographs | `event` | `story` | none | [`hackathon/`](hackathon/STRUCTURE.md) |

**The first two rows are not the same post.** Both are "something happened
and we are saying so", and the difference is whether a reader can install
the thing. A release lands in the version ledger on /notices and needs a
`releaseType`. An acceptance or a placing has no version and does not go on
/notices at all: it reaches readers through its /story entry, paired with
the long-form story. Putting one on the `release` topic files it in the
ledger with an empty version cell and no type chip, which is the shape that
gave this table its second row.

Rows two and three take `layout: "note"` when the body is a few sentences:
it drops the standfirst, read time, byline, contact strip and related rail,
all of which outnumber the text on a fifty-word post. Set it on the post
rather than inferring it from length; see the field's own comment in
`data.ts`. There is no separate `STRUCTURE.md` for a note. Start from
`announcement/`, keep the sourcing rules, and cut the sections that have no
evidence, which on a short notice is most of them.

A long-form story usually pairs with a short news note (the acceptance, the
placing) that lands in the /story rows through `STORIES` in `data.ts`. The
note and the story are two posts: write the story with its template, write
the note from row two, and add the pairing row. **The pairing row is the
note's only way in.** /notices carries releases alone, so a row-two post
written without a `STORIES` entry exports a page nothing links. The /story
entry names both destinations, the story and the notice, so the note's
reference links (the proceedings entry, the demo video) stay reachable.

Copy the matching `index.ts.example` into your post folder as `index.ts` and
read that template's `STRUCTURE.md` before writing. Each one names the section
that carries the post, which is the section everyone skips and readers
actually want.

The four share this file's rules, and each tightens or extends them where its
shape demands it. The announcement template admits a version number; the community
template forbids naming attendees at all. **Read both files**, not just this
one: where they disagree, the template is the stricter and it wins.

---

The rest of this file applies to every template.

## Why images live in the folder

Drop image files straight into the post folder and `import` them. Do **not**
put them in `public/`.

```ts
import booth from "./booth-d3.jpg";
// ...
{ t: "image", src: booth.src, alt: "...", caption: "..." }
```

Two reasons. A deleted or renamed image becomes a build error instead of a
silent 404, and each file ships with a content hash in its URL
(`/_next/static/media/booth-d3.6460e179.jpg`), so a changed photo can never be
served from a stale cache.

There is no exception any more. `/projects` used to read some of these files
from `public/`, so posts copied rather than moved them; that route is gone and
`public/images/` now holds only team portraits, the logos and one milestone
photo. A post folder owns its images outright.

Record where each image came from in the file's header comment anyway. It is how
the next editor knows whether an original still exists to re-prep from.

### Preparing a photo before it lands here

Originals off a phone are 3–6 MB each and a post with twelve of them is a
40 MB page. Run every photo through this before committing it:

```bash
magick input.jpg -auto-orient -resize '2000x2000>' \
  -profile '/System/Library/ColorSync/Profiles/sRGB Profile.icc' \
  -strip -quality 82 output.jpg
```

Both flags before `-strip` are load-bearing, for different reasons.

**`-auto-orient` is not optional.** Four of the ACL photos carried EXIF
`Orientation=6`. `-strip` removes the tag the browser was relying on, so a
photo that was never explicitly rotated ships sideways. That is how the old
cover spent a week on its side. (Ordering the two is not what saves you:
ImageMagick 7 keeps the orientation attribute in memory after `-strip`, so
`-strip -auto-orient` happens to produce the same pixels. Leaving `-auto-orient`
out entirely is the failure.)

**`-profile` is not optional either**, and this one fails silently. iPhones
capture in Display P3. `-strip` drops the profile without converting the
pixels, so the browser reads P3 values as sRGB and every saturated colour comes
out too hot. Measured across the five P3 photos in the migrated hackathon posts, the
worst pixel lands between 33% and 53% off (`magick compare -metric PAE`): the
TRAE stage shot 40%, the OBA sponsor board 53%. The *mean* shift is under 1%,
so it never looks broken. It concentrates in the saturated content, which on
a stage photo or a neon board is the subject. Unrecoverable once committed.
Convert to sRGB first, then strip.

`-colorspace sRGB` is **not** a substitute: ImageMagick already labels a P3 file
as sRGB internally, so that flag is a no-op on exactly the files that need it.

**Screenshots are not photos.** The command above is for camera output. A UI
screenshot or a chart is flat colour and crisp text: leave it PNG, do not
re-encode it to JPEG (q82 rings around text), and do not palette-quantize
anything with a gradient in it. If it is already under the 2000px cap with no
EXIF and no profile, copy it byte for byte and say so in the header, which is
what `wigss-npm-release` does.

Name files for what they show (`booth-d3.jpg`), never for their position
(`photo-3.jpg`). The order changes and the name stops being true.

## Where the raw material goes

A post folder ships `index.ts` and the images it imports. The material a post
was written **from** goes in `_source/` beside it, which `.gitignore` keeps out
of the repository:

```
updates/my-post/
├── index.ts
├── cover.jpg
└── _source/          ← recordings, transcripts, unprepped originals
    └── transcript.md
```

Two reasons it is ignored rather than committed. A recording of a room is
mostly other people talking: the Snowflake final-round transcript that filled
in that post's judging section is three hours of six teams' presentations and
six judges' remarks, and none of it is ours to publish. And an unprepped
original is a 3 MB file the build never reads, which is the thing the image
rule already exists to prevent.

Keeping it beside the post is still worth doing. The header of a post cites
its sources by name, and the next editor should be able to open the one the
post was checked against without going hunting. It just stays on the machine.

What goes in the header instead is where the fact came from and how it was
read: which recording, which slide, translated or not, and where a
speech-to-text was reconstructed rather than quoted. See
`../snowflake-korea-2026/index.ts`, which does all four.

## Blocks

| Block | Use |
| --- | --- |
| `p("...")` | Paragraph. |
| `{ t: "h", text }` | Section heading. |
| `{ t: "quote", text }` | Pull quote. One or two per post, not more. |
| `{ t: "list", items: [] }` | Bullets. Good for decisions and takeaways. |
| `{ t: "image", src, alt, caption }` | One landscape image, full width. |
| `{ t: "gallery", images: [], caption }` | One or more images, sized by count. |

### Photo layout

A gallery lays itself out from the number of images, so just add them:

| Images | Layout |
| --- | --- |
| 1 | Full width if landscape; a lone portrait caps at 460px and a square at 620px |
| 2 | Side by side |
| 3 | Three across |
| 4 | 2 × 2 |
| 5+ | Threes |

A one-image gallery is a real and useful thing: it is the only way to show a
single portrait without it running 1440px tall.

Images are cropped to 4/3 by default. Pass `aspect` when that ruins the shot:

```ts
{ src: team.src, alt: "...", aspect: "3/4" }   // "4/3" | "3/4" | "1/1" | "16/9"
```

Use `3/4` for anything portrait (a person standing, a poster) and `16/9` for a
slide or a screen capture. A portrait photo forced into a landscape box loses
its subject.

Portrait shots never run as a full-width `image` block: at the reading
column's width a 3:4 shot is taller than a viewport and buries whatever
follows. Put them in a
gallery, where `aspect: "3/4"` caps a lone portrait at 460px.

Galleries can sit inside any section, so a section can carry one photo and the
next can carry four.

## Two fields the templates set for you, and one you may need to unset

`channel` is what routes a post: `"newsroom"` puts it in the newsroom feed
(`NEWSROOM_FEED`, and its release rows surface on /notices), `"story"` puts
it at `/story/<slug>`. (`"blog"` exists for the closed blog section and no
template uses it.) Each template hardcodes the channel its shape is for.
**Writing a back-catalogue report? Delete the field.** Leaving one in
silently publishes the post to a feed.

`icon` takes `"pin"` or `"trophy"` and is optional. `trophy` for a placing,
`pin` for a place we went. Anything else, omit it.

## Exporting the cover

Export a `*_COVER` constant **only when something outside the post reuses the
image**, meaning a `MILESTONES` entry on the homepage rail or a card. Otherwise keep the
import module-local. An exported constant nobody imports reads as a wire that
was forgotten rather than one that was never needed, and a post with no cover
at all (`wigtn-coding-release`) has to say so in its header for the same reason.

## Linking off-site

Build tech-report URLs with `techReportHref` from `../../links`:

```ts
import { techReportHref } from "../../links";
// ...
{ label: "Tech report", href: techReportHref("wigvo") }
```

**Never import a value from `../../data`.** `data.ts` imports every post module,
so a value import closes a runtime cycle and the constant is still in its
temporal dead zone when your post evaluates. `import type { Article, Block }`
is fine, because types are erased. `links.ts` exists precisely so the tech-report
host lives in one place and posts can still reach it.

## Numbers

Cite only figures that already exist in a published paper, tech report, README,
or release page, and say where they came from. Do not round, restate, or infer
new ones. A number you cannot point at is a number that does not go in.

If a section of your template has no evidence behind it, cut the section. An
honest six-section post beats an eight-section one with two paragraphs of
filler.

## Naming people and companies

`author` is a WIGTN team and only ever one of two strings, `"WIGTN Research"`
for the papers and the models or `"WIGTN Engineering"` for the tools, the
plugins and the hackathon builds. It is not the event's organizer: three story
posts carried Snowflake, ByteDance and Open Builders Alliance there, which put
another company's name under a post they did not write. An organizer goes in
the title or the prose, as TRAE Seoul's "by ByteDance" does. The type in
`data.ts` rejects anything else.

Name people only in their published role (program chair, organizer, author),
and spell the role the way the proceedings do. Name visitors and attendees by
company, never by individual. Where a photo shows someone from another company,
the section carries an explicit line that interest is not adoption or
endorsement by their employer.

Teammates are named in a credits line, and that is the place for it.
