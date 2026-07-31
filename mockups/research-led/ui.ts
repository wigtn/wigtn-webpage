/**
 * UI copy for the bilingual surface.
 *
 * Article prose lives in data.ts; this file holds the chrome around it, the
 * labels, buttons and empty states that are not part of any one article.
 * Everything is an { en, ko } pair resolved through `tx` from data.ts, so a
 * component only ever needs the active locale.
 *
 * Scope note: only Updates (/news and the newsroom article detail) is
 * translated today. The home, work and team pages render with locale "en",
 * which is why every consumer defaults to English rather than throwing.
 */

import type { I18nText, NewsTopic } from "./data";

export const UI = {
  masthead: { en: "WIGTN Updates", ko: "WIGTN 소식" },

  /* Filter nav. `all` doubles as the "everything" bucket. */
  filter: {
    all: { en: "All", ko: "전체" },
    award: { en: "Awards", ko: "수상" },
    release: { en: "Releases", ko: "릴리스" },
    announcement: { en: "Announcements", ko: "공지" },
    community: { en: "Community", ko: "커뮤니티" },
  } satisfies Record<"all" | NewsTopic, I18nText>,

  /* Card kicker. Singular, because it labels one story. */
  topic: {
    award: { en: "Award", ko: "수상" },
    release: { en: "Release", ko: "릴리스" },
    announcement: { en: "Announcement", ko: "공지" },
    community: { en: "Community", ko: "커뮤니티" },
  } satisfies Record<NewsTopic, I18nText>,

  moreStories: { en: "More stories", ko: "더 보기" },
  emptyCategory: {
    en: "No stories in this category yet.",
    ko: "아직 이 분류에 올라온 소식이 없습니다.",
  },

  /* Community "coming soon" panel. */
  soonKicker: { en: "Community · Coming soon", ko: "커뮤니티 · 준비 중" },
  soonTitle: { en: "Meetups & open seminars", ko: "밋업과 오픈 세미나" },
  soonBody: {
    en: "Our first open meetups are being scheduled: builders swapping real production lessons, in the open. Recaps and recordings will land here.",
    ko: "첫 오픈 밋업을 준비하고 있습니다. 현업에서 얻은 교훈을 그대로 나누는 자리이고, 후기와 녹화본은 이곳에 올라옵니다.",
  },
  getNotified: { en: "Get notified", ko: "소식 받기" },

  /* Article detail. */
  placeholderBadge: { en: "Placeholder", ko: "준비 중" },
  readTimeSuffix: { en: " read", ko: " 분량" },
  moreFrom: { en: "More from", ko: "같은 분류의 다른 글" },
  ctaLine: {
    en: "Working on something like this? Let's talk.",
    ko: "비슷한 걸 만들고 계신가요? 이야기 나눠요.",
  },
  ctaButton: { en: "Talk to us", ko: "문의하기" },
  notFound: { en: "Article not found", ko: "글을 찾을 수 없습니다" },
  backHome: { en: "Back to home", ko: "홈으로" },

  /* Article `kind`, used by the "More from ..." rail. */
  kind: {
    report: { en: "Research", ko: "리서치" },
    event: { en: "Events", ko: "행사" },
    community: { en: "Community", ko: "커뮤니티" },
    insight: { en: "Tech Insights", ko: "기술 노트" },
  },

  /* Chrome. */
  nav: {
    about: { en: "About", ko: "소개" },
    updates: { en: "Updates", ko: "소식" },
    techReports: { en: "Tech Reports", ko: "테크 리포트" },
    projects: { en: "Projects", ko: "프로젝트" },
  },
  footerTagline: {
    en: "An open community of AI builders. Everything we learn, we share.",
    ko: "AI를 만드는 사람들의 열린 커뮤니티. 배운 것은 모두 나눕니다.",
  },
  footerExplore: { en: "Explore", ko: "둘러보기" },
  footerConnect: { en: "Connect", ko: "연락처" },
  langSwitchLabel: { en: "한국어로 보기", ko: "View in English" },
} as const;
