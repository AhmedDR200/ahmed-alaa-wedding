import type { Metadata } from "next";
import MemesPage from "@/components/memes/MemesPage";

export const metadata: Metadata = {
  title: "The Meme Vault — Ahmed & Alaa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <MemesPage />;
}
