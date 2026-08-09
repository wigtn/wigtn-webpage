/**
 * How WIGTN describes itself, in one place.
 *
 * The self-description had drifted into four variants: "independent AI research
 * team" in the site metadata and the footer, "WIGTN Crew" and "AI-native
 * open-source research crew" in the JSON-LD, and "a community of AI builders"
 * on /team until that page was rewritten. "Community" was the worst of them,
 * because it contradicted the homepage outright: a community has open
 * membership, and the homepage says five engineers.
 *
 * Page descriptions, the structured data, and the footer all read from here, so
 * the next edit changes every one of them or none.
 */

export const SITE_URL = "https://wigtn.com";

/* The organization's name. Not "WIGTN Crew": every page is titled "WIGTN", and
 * schema.org `name` is what an aggregator prints next to the logo. */
export const ORG_NAME = "WIGTN";

/** One sentence, for the places with room for exactly one.
 *
 * "Research team" until 2026-08-09, when the homepage took the business
 * model above the fold. The blend is deliberate: the client work is what the
 * team sells, the published record is why anyone should buy it, and a
 * tagline that names only one of the two misdescribes the site under it. */
export const TAGLINE = "An independent AI team that builds for clients and publishes in the open.";

/** The tagline plus what follows from it. Every page-level description. */
export const DESCRIPTION = `${TAGLINE} Web products and AI systems built end to end, with peer-reviewed work, open models, and reports that state their own limits.`;

export const CONTACT_EMAIL = "contact@wigtn.com";

/* A plain mailto, not a Gmail compose URL. This is the only conversion point on
 * the site, and the compose URL assumed a signed-in Google account in a desktop
 * browser: everyone else got a login wall where the message box should be. */
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;
