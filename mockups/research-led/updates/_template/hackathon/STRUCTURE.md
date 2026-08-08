# Hackathon / competition report

For an event we entered under a clock: a hackathon, a challenge, a weekendthon.
`kind: "event"`, `newsTopic: "award"`.

Reference implementation: [`../../trae-seoul-grand-prize/index.ts`](../../trae-seoul-grand-prize/index.ts),
which carries all eight sections. [`../../oba-weekendthon-top6/index.ts`](../../oba-weekendthon-top6/index.ts)
is the worked example of cutting a section for lack of evidence.

## Sections, in the order to write them

1. **Lede** — the event, the organizer, the dates, the result, in one
   paragraph. Say the placing plainly; a hackathon post that buries the result
   to build suspense is a hackathon post nobody finishes.
2. **The brief and the constraints** — what the organizers asked for and what
   they refused to let you do. Team size, the clock, a mandatory API, a fixed
   dataset, a judging split. **This is the section that makes a hackathon post
   worth reading**, because everything downstream is a consequence of it.
3. **What we built** — the thing itself, in the terms a user would experience
   it, before any architecture. What do you type, and what comes back.
4. **The bet** — the one technical decision that could have sunk the build, the
   alternative you rejected, and why. A team that reached for the biggest model
   and a team that deliberately did not are telling different stories, and the
   second one is the interesting one.
5. **What actually shipped, and in how long** — verifiable numbers only: hours,
   commits, features complete, what was cut at hour three. If you do not have
   the commit log, do not invent the count.
6. **The result** — the placing, the track, the judging criteria, and who
   announced it. Link the organizer's announcement or press release if one
   exists.
7. **What survived** — the list. Which parts of the hackathon build are still
   running, which were thrown away the following week, and what the team took
   into the next project.
8. **Built by** — teammates by name, then the organizers.

## The section that carries the post

Section 7, and section 2 is what makes it possible.

Everyone writes "we learned so much." Nobody writes "the deterministic
tool-calling harness survived and the mock-first data layer became how we start
every project; the scoring heuristics were thrown away in a week." The second
one is the only version worth publishing, and it is a list, not a paragraph.

Section 4 is the other place a hackathon post can be honest in a way a
polished project page cannot: name the approach that failed. Under a clock, the
discarded branch is usually the more instructive one.

## What not to do

- **Do not narrate the timeline hour by hour.** "At 2pm we hit a bug" is a
  diary. The reader wants the decision, not the chronology.
- **Do not oversell a demo.** A hackathon build is a hackathon build. Say what
  was mocked, what needed a key, and what only worked on the demo path.
- **Do not turn the trophy into the thesis.** The placing is section 6, one
  paragraph. If the post's only claim is that we won, it is a tweet.

## Photo budget

Most hackathons leave you with two or three photos: the stage, the team, maybe
a screen. That is enough. Where a project figure exists — an architecture
diagram, the actual UI — it usually says more than a third crowd shot.
