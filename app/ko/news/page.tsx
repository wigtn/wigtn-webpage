import type { Metadata } from "next";
import { NewsPage } from "@/mockups/research-led/NewsPage";

export const metadata: Metadata = {
  title: "소식 | WIGTN",
  description:
    "WIGTN의 연구, 오픈소스, 학회 참가 소식. 한국어로 옮긴 글만 이곳에 모입니다.",
  alternates: {
    canonical: "/ko/news/",
    languages: { en: "/news/", ko: "/ko/news/" },
  },
  openGraph: {
    title: "소식 | WIGTN",
    description: "WIGTN의 연구, 오픈소스, 학회 참가 소식.",
    url: "https://wigtn.com/ko/news/",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <NewsPage locale="ko" />;
}
