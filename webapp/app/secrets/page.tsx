import type { Metadata } from "next";
import SecretsPage from "@/components/secrets/SecretsPage";

export const metadata: Metadata = {
  title: "Secrets — Ahmed & Alaa",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SecretsPage />;
}
