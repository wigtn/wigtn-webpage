# The blog section: closed, and what reopens it

Decision record, written 2026-08-09, the day the blog came out of the nav,
the routes and the sitemap in the section restructure (PR #78). The code
survives unrouted: `mockups/research-led/BlogPage.tsx`, the `"blog"` channel
in `data.ts`, `BLOG_FEED`, and `BLOG_INDEX`/`blogHref` in `links.ts`.

If you are an agent asked to "write a blog post" or to reopen the blog, this
file is the gate. Check the event against it before writing anything.

## The decision

The blog publishes only business-track news: events that show the team
operating as a business, stated officially, after they have happened.

While the site's long-form content was conference and hackathon stories, a
blog was a second name for the Story section, so it closed rather than
mirror it. Story keeps what the team did in public; the blog is reserved for
what the team signs, joins, or is selected for. It reopens with its first
qualifying post, not ahead of one.

## What qualifies

An event qualifies when it is official, external, and about the business:

- A signed engagement or subcontract with a client or institution. A
  University of Michigan subcontract is the standing example of the shape.
- Selection into a program with a named decision behind it: AWS Activate, a
  startup program, an accelerator batch.
- A partnership agreement with a company, stated the way the partner would
  state it.
- An official meeting that produces something announceable. The AWS Korea
  meeting on 2026-08-19 is the standing candidate: if it produces an
  agreement or a program entry, that outcome is the post. The meeting alone
  is not.

The bar, in one line: **would the counterparty confirm it?** A post here
names another organization, so the event has to be one that organization has
already made public or put in writing.

## What does not qualify

- Hackathons, conference trips, event write-ups: Story (`channel: "story"`).
- Releases and short announcements: Notice (/notices, `channel: "newsroom"`).
- Findings with a method and limitations: WIG-log, in the sibling repo.
- Anything prospective. A meeting on the calendar, a deal in negotiation, an
  application submitted: none of these is a post. The post is the outcome,
  dated to it, with a source, which is the same sourcing rule every post on
  this site follows (AGENTS.md, Hard rules).

## Reopening, mechanically

Four steps, also recorded in the BlogPage.tsx header:

1. Write the post with `channel: "blog"` through the `update-post` skill.
   `BLOG_FEED` picks it up on its own.
2. Restore `app/blog/page.tsx` and `app/blog/[slug]/page.tsx` from git
   history (they were removed in the commit that closed the section).
3. Put Blog back in `NAV` in `data.ts`, between Story and Tech.
4. Add /blog and the post to the sitemap; `hrefFor` already routes the
   `"blog"` channel.

One naming caution from the section's history: Story rows once carried a
"Read on Blog" label while pointing at what is now Story's own pages. When
the blog reopens, nothing on Story should point into it; the two sections
answer different questions and a cross-link would start the blur again.
