import type { Metadata } from "next";
import { NewsPage } from "@/mockups/research-led/NewsPage";
import { KO_NEWS, NEWS } from "@/mockups/research-led/data";

export const metadata: Metadata = {
  title: "WIGTN 소식",
  description:
    "WIGTN의 수상, 오픈소스 릴리스, 공지를 모은 페이지입니다. 논문과 모델, 밋업 소식을 여기서 전합니다.",
  alternates: {
    canonical: KO_NEWS,
    languages: { en: NEWS, ko: KO_NEWS },
  },
  openGraph: {
    title: "WIGTN 소식",
    description: "WIGTN의 수상, 오픈소스 릴리스, 공지.",
    url: `https://wigtn.com${KO_NEWS}`,
    locale: "ko_KR",
  },
};

export default function Page() {
  return <NewsPage locale="ko" />;
}
