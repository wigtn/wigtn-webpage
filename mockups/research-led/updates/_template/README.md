# Update post template

Every post under `updates/` is a folder: the text in `index.ts`, the images
beside it, nothing referenced by a string path that can rot.

```
updates/
└── my-new-post/          ← folder name must equal the slug
    ├── index.ts
    ├── cover.jpg
    └── whatever-else.jpg
```

The cover is `cover.jpg` by convention, matching the `*_COVER` constant the post
exports. Everything else is named for what it shows.

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

The recap shape is not one shape. A conference report and a release note want
different sections, and forcing one into the other's outline is how a post ends
up with a "what people asked" heading over an empty paragraph.

| The post is about | `kind` | `newsTopic` | Template |
| --- | --- | --- | --- |
| A conference, workshop, or a talk we gave | `event` | `announcement` | [`conference/`](conference/STRUCTURE.md) |
| A hackathon or competition we entered | `event` | `award` | [`hackathon/`](hackathon/STRUCTURE.md) |
| Code, weights, or a package going public | `report` | `release` | [`release/`](release/STRUCTURE.md) |
| A meetup, seminar, or study group we ran | `community` | `community` | [`community/`](community/STRUCTURE.md) |

Copy the matching `index.ts.example` into your post folder as `index.ts` and
read that template's `STRUCTURE.md` before writing. Each one names the section
that carries the post — and the section everyone skips that readers actually
want.

The four share this file's rules, and each tightens or extends them where its
shape demands it — the hackathon template admits a commit count, the community
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

One exception, and it is temporary: a few images are still shared with
`/projects` and the retired `components/sections/*` landing, which read them
from `public/`. Those are **copied** into the post folder rather than moved, so
both consumers keep working. When `/projects` retires, the `public/` copy goes
and this paragraph goes with it. Where nothing else reads the file, move it and
delete the original — two copies of one photo drift.

Record which of the two you did, per image, in the file's header comment. That
note is how the next editor knows whether an original still exists.

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
photo that was never explicitly rotated ships sideways — which is how the old
cover spent a week on its side. (Ordering the two is not what saves you:
ImageMagick 7 keeps the orientation attribute in memory after `-strip`, so
`-strip -auto-orient` happens to produce the same pixels. Leaving `-auto-orient`
out entirely is the failure.)

**`-profile` is not optional either**, and this one fails silently. iPhones
capture in Display P3. `-strip` drops the profile without converting the
pixels, so the browser reads P3 values as sRGB and every saturated colour comes
out too hot — measured at 29% peak error on one of the hackathon photos, and
unrecoverable once committed. Convert to sRGB first, then strip.

`-colorspace sRGB` is **not** a substitute: ImageMagick already labels a P3 file
as sRGB internally, so that flag is a no-op on exactly the files that need it.

Name files for what they show (`booth-d3.jpg`), never for their position
(`photo-3.jpg`) — the order changes and the name stops being true.

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

Portrait shots never run as a full-width `image` block: at the 1080px media
breakout a 3:4 shot is 1440px tall and buries whatever follows. Put them in a
gallery, where `aspect: "3/4"` caps a lone portrait at 460px.

Galleries can sit inside any section, so a section can carry one photo and the
next can carry four.

## Exporting the cover

Export a `*_COVER` constant **only when something outside the post reuses the
image** — a `MILESTONES` entry on the homepage rail, a card. Otherwise keep the
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
is fine — types are erased. `links.ts` exists precisely so that the tech-report
host lives in one place and posts can still reach it.

## Numbers

Cite only figures that already exist in a published paper, tech report, README,
or release page, and say where they came from. Do not round, restate, or infer
new ones. A number you cannot point at is a number that does not go in.

If a section of your template has no evidence behind it, cut the section. An
honest six-section post beats an eight-section one with two paragraphs of
filler.

## Naming people and companies

Name people only in their published role (program chair, organizer, author),
and spell the role the way the proceedings do. Name visitors and attendees by
company, never by individual. Where a photo shows someone from another company,
the section carries an explicit line that interest is not adoption or
endorsement by their employer.

Teammates are named in a credits line, and that is the place for it.
