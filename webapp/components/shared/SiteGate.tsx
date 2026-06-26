"use client";

import type { ReactNode } from "react";
import PageGate, { GATE_PASSWORD } from "@/components/shared/PageGate";
import { useLanguage } from "@/lib/i18n";

const COPY = {
  en: {
    title: "Ahmed & Alaa",
    subtitle: "This little world is just for us",
  },
  ar: {
    title: "أحمد وآلاء",
    subtitle: "هذا العالم الصغير لنا وحدنا",
  },
} as const;

export default function SiteGate({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const copy = COPY[lang] ?? COPY.en;

  return (
    <PageGate
      storageKey="site_auth_v1"
      password={GATE_PASSWORD}
      title={copy.title}
      subtitle={copy.subtitle}
    >
      {children}
    </PageGate>
  );
}
