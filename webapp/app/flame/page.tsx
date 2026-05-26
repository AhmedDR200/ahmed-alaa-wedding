import type { Metadata } from "next";
import FlamePage from "@/components/flame/FlamePage";

export const metadata: Metadata = {
  title: "Our Daily Flame — Ahmed & Alaa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FlamePage />;
}
