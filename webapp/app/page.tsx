import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Ahmed & Alaa — August 25, 2026",
  description: "A small corner of the internet — for us only.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HomePage />;
}
