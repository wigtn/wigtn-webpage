import type { Metadata } from "next";
import { WigvuDetail } from "./WigvuDetail";

export const metadata: Metadata = {
  title: "WIGVU - Learn Korean Through Content | WIGTN",
  description:
    "Learn Korean through the content you love. AI-powered Korean learning from K-Drama, K-POP, and real Korean content.",
};

export default function WigvuPage() {
  return <WigvuDetail />;
}
