# Release note

For code, weights, or a package going public: an npm publish, a HuggingFace
upload, a plugin version. `kind: "report"`, `newsTopic: "release"`.

Reference implementation: [`../../wigtnocr-open-source/index.ts`](../../wigtnocr-open-source/index.ts),
which has real benchmarks to report. [`../../wigss-npm-release/index.ts`](../../wigss-npm-release/index.ts)
is the worked example of a release with no published benchmark saying so.

## Sections, in the order to write them

1. **Lede** — what is now public, where it lives, and what it does, in one
   paragraph. A release note's first sentence should let a reader decide
   whether to keep going.
2. **Get it** — the install line, verbatim, in the first screen of the post.
   `npm install wigss`. `huggingface.co/Wigtn/...`. A release note that makes
   the reader hunt for the command has failed at the one job release notes
   have.
3. **What is in the release** — the artifact list. Weights, training data, eval
   code, license, the version number and its date. Be specific about what is
   *not* included; an omission found later reads as a claim withdrawn.
4. **Why it exists** — the problem it was built against, kept short. The reader
   is here because they might use the thing, not because they want the origin
   story. Two paragraphs at most, and link the tech report for the rest.
5. **The numbers** — published benchmarks only, each with its source named. If
   the release has no benchmark, say so in one line and move on. Silence reads
   as a missing number; "no controlled benchmark has been published" reads as a
   team that knows the difference.
6. **What it does not do yet** — known limits, the platforms it has not been
   tested on, the version this will change in. This is the section that decides
   whether anyone trusts the next release note.
7. **Go deeper** — the tech report, the paper, the repository.

## The section that carries the post

Section 6.

A release note is read by someone deciding whether to spend an afternoon on
your thing. Every other section is an argument to say yes; section 6 is the
only one that tells them the cost of being wrong, and it is why the rest gets
believed. Skipping it is what makes a release note read like marketing.

Section 3 is the runner-up, and the one that most often quietly overclaims.
"Open source" means the weights *and* the training recipe *and* the eval code,
or it means whichever of those actually shipped — name them.

## What not to do

- **Do not repeat the tech report.** If the method is on the report blog, the
  release note links it. Two copies of one explanation drift apart in a month.
- **Do not put a version number in the title without a date.** `v0.1.14` alone
  is meaningless six months later.
- **Do not count configuration as achievement.** "13 agents, 6 skills" is a
  package surface, not a benchmark, and the post should say which one it is.

## Photo budget

A release note usually wants one or two images and no more: the package page or
model card as the cover, and at most one benchmark figure that a reader can
actually read at article width. A dense multi-panel chart is unreadable here —
link it instead.
