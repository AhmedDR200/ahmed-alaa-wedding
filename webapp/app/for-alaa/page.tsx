import type { Metadata } from "next";
import ForAlaaPage from "@/components/for-alaa/ForAlaaPage";

export const metadata: Metadata = {
  title: "For Alaa — Ahmed & Alaa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ForAlaaPage />;
}
