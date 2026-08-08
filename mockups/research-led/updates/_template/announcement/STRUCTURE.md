# Announcement

For a thing that happened and is worth telling people about: code or weights
going public, a paper accepted, a package published, a partnership.
`kind: "report"`, `newsTopic: "release"`.

This template used to be called `release` and used to carry the full release
note, limitations section and all. That version is now a tech report. The split
in [`AGENTS.md`](../../../../../AGENTS.md) puts findings on the report site and
leaves the *event* here: we shipped this, here is where to get it, here is where
to read what we learned.

Reference implementation: [`../../wigtnocr-open-source/index.ts`](../../wigtnocr-open-source/index.ts).

## Sections, in the order to write them

1. **Lede**: what is public now and where it lives, in one paragraph. Name the
   date and the version.
2. **What it does** *or* **What changed since vX**. Pick by whether the reader
   has met this thing before on this site:
   - First appearance: **What it does**. What the thing is for, and what using
     it looks like. This is the section that answers "should I care".
   - A version on top of one already written up: **What changed since vX**,
     where vX is the version the previous post stopped at. Say what moved, in
     what release, with counts that can be recounted from the repository. Do
     not restate the whole product.
3. **Get it**: the install line or the model id, verbatim, in the first screen.
   A single command goes in a `quote`; a sequence goes in a `list`, because a
   quote renders as one paragraph and the browser collapses any padding used to
   fake a line break.
4. **What shipped**: the artifact list. Weights or an adapter, training data,
   eval code, the licence, the version and its date. Be exact about which:
   "weights" and "a LoRA adapter" are different claims.
5. **Read the report**: one or two lines and the link. The method, the numbers
   and the limits live there.

Five sections. If you are writing a sixth, check whether it is a finding.

Set `version` on the article. It renders opposite the tag on the detail page and
under the date in the Releases list, which is why the title is the product name
and carries no number of its own.

## The section that carries the post

Section 3, and it is the one that quietly overclaims.

"Open source" means the weights *and* the training recipe *and* the eval code,
or it means whichever of those actually shipped. Name them. This site has
already published "weights are now public" about a release that was a LoRA
adapter, and that is exactly the sentence this section exists to prevent.

## What not to do

- **Do not restate the report.** Two copies of one explanation drift apart in a
  month, and the whole point of the split is that there is one copy. Link it.
- **Do not put a benchmark table here.** If a number is worth quoting, quote one
  in the lede and link the rest. A results table is a report.
- **Do not write a limitations section.** It belongs in the report, and it is
  the report's strongest section. Removing it from there to put it here weakens
  both.
- **Do not put a version number in the title without a date.** `v0.1.14` alone
  is meaningless six months later.
- **Do not count configuration as achievement.** "13 agents, 6 skills" is a
  package surface. If it appears at all, it is labelled as one.

## Photo budget

Zero. A release page is read to find out what the thing does and how to run it,
and a screenshot of a registry listing or a model card answers neither; the page
it pictures is one button away at the top. All four release posts shipped their
covers and all four had them removed. A benchmark figure is a report figure.

If a release ever has a picture that carries a fact the prose cannot, that is a
reason to add one back, and the reason goes in the file header.
