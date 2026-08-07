# Update post template

Copy this folder, rename it to the post's slug, and edit `index.ts`.

```
updates/
└── my-new-post/          ← folder name must equal the slug
    ├── index.ts
    ├── hero.jpg
    └── whatever-else.jpg
```

Then register it in `../../data.ts`:

```ts
import { myNewPost } from "./updates/my-new-post";
// ...
export const ARTICLES: Article[] = [
  myNewPost,        // newest first
  ...
];
```

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

## Blocks

| Block | Use |
| --- | --- |
| `p("...")` | Paragraph. |
| `{ t: "h", text }` | Section heading. |
| `{ t: "quote", text }` | Pull quote. One or two per post, not more. |
| `{ t: "list", items: [] }` | Bullets. Good for decisions and takeaways. |
| `{ t: "image", src, alt, caption }` | One image, full width. |
| `{ t: "gallery", images: [], caption }` | Two or more images. |

### Photo layout

A gallery lays itself out from the number of images, so just add them:

| Images | Layout |
| --- | --- |
| 1 | Full width |
| 2 | Side by side |
| 3 | Three across |
| 4 | 2 × 2 |
| 5+ | Threes |

Images are cropped to 4/3 by default. Pass `aspect` when that ruins the shot:

```ts
{ src: team.src, alt: "...", aspect: "3/4" }   // "4/3" | "3/4" | "1/1" | "16/9"
```

Use `3/4` for anything portrait (a person standing, a poster). A portrait photo
forced into a landscape box loses its subject.

Galleries can sit inside any section, so a section can carry one photo and the
next can carry four.

## Structure

The recap shape that reads well, and the order to write in:

1. **Lede** — what, where, when, in one paragraph.
2. **What we brought** — the work itself, with real numbers.
3. **What happened** — the scene. This is where photos earn their place.
4. **What people asked** — the interactions worth reporting.
5. **Side sessions** — talks, posters, workshops.
6. **What changes because of this** — decisions, as a list.
7. **Gallery + links.**

Section 6 is the one that gets skipped and the one readers want. Write
decisions, not reflections. "It was inspiring" tells nobody anything; "speech
recognition is 97.1% of the latency on that path, so optimization goes there"
does.

## Numbers

Cite only figures that already exist in a published paper or tech report, and
say where they came from. Do not round, restate, or infer new ones.
