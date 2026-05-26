import type { Metadata } from "next";
import OurSongPage from "@/components/our-song/OurSongPage";

export const metadata: Metadata = {
  title: "Our Song — Ahmed & Alaa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OurSongPage />;
}
