import type { Metadata } from "next";
import UsPage from "@/components/us/UsPage";

export const metadata: Metadata = {
  title: "Us — Ahmed & Alaa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <UsPage />;
}
