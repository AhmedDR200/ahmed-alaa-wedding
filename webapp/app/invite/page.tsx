import type { Metadata } from "next";
import { Suspense } from "react";
import InvitePage from "@/components/invite/InvitePage";

export const metadata: Metadata = {
  title: "You're Invited — Ahmed & Alaa",
  description: "Ahmed & Alaa · August 25, 2026 · Marly Hall, Damietta.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <InvitePage />
    </Suspense>
  );
}
