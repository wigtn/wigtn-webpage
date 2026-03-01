import type { Metadata } from "next";
import { WigvoDetail } from "./WigvoDetail";

export const metadata: Metadata = {
  title: "WIGVO - Real-time Phone Translation | WIGTN",
  description:
    "Break language barriers in Korea. Call anyone, in any language. Real-time voice translation for phone calls powered by dual AI sessions.",
};

export default function WigvoPage() {
  return <WigvoDetail />;
}
