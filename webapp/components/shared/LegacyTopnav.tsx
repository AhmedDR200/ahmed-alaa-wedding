"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";

type NavItem = {
  href: string;
  en: string;
  ar: string;
  page: string;
  icon: ReactNode;
};

const ITEMS: NavItem[] = [
  {
    href: "/",
    page: "home",
    en: "Home",
    ar: "الرئيسية",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
      </svg>
    ),
  },
  {
    href: "/flame",
    page: "flame",
    en: "Flame",
    ar: "الشعلة",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 10.94c2.33-3.31.17-7.82-1-8.94 0 3.4-2.24 5.3-3.67 6.7C5.9 10.11 5 12 5 14.29 5 18 8.13 21 12 21s7-3 7-6.71c0-1.71-1.23-4.4-2.33-5.59-2.09 3.36-3.26 3.36-4.67 2.24Z" />
      </svg>
    ),
  },
  {
    href: "/our-song",
    page: "song",
    en: "Song",
    ar: "الأغنية",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13M9 9l12-2" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    href: "/memes",
    page: "memes",
    en: "Memes",
    ar: "ميمز",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    href: "/us",
    page: "us",
    en: "Us",
    ar: "نحن",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="2" width="16" height="16" rx="2" />
        <circle cx="12" cy="8" r="2" />
        <path d="m22 13-1.3-1.3a2.4 2.4 0 0 0-3.4 0L11 18" />
        <path d="M18 22H4a2 2 0 0 1-2-2V6" />
      </svg>
    ),
  },
  {
    href: "/secrets",
    page: "secrets",
    en: "Secrets",
    ar: "أسرار",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    href: "/for-alaa",
    page: "alaa",
    en: "For Alaa",
    ar: "لـ آلاء",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 10h-1a4 4 0 1 1 4-4v.534" />
        <path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31" />
        <path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2" />
        <path d="M9.77 12C4 15 2 22 2 22" />
        <circle cx="17" cy="8" r="2" />
      </svg>
    ),
  },
];

export default function LegacyTopnav() {
  const pathname = usePathname();
  const { lang, toggle } = useLanguage();

  return (
    <nav className="topnav">
      <Link className="topnav-mono" href="/">
        A &amp; A
      </Link>
      <div className="topnav-links">
        {ITEMS.map((item) => {
          const active =
            (item.href === "/" && pathname === "/") ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`topnav-link${active ? " active" : ""}`}
              data-page={item.page}
            >
              <span className="topnav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="t">{lang === "ar" ? item.ar : item.en}</span>
            </Link>
          );
        })}
      </div>
      <button type="button" className="topnav-lang" onClick={toggle}>
        {lang === "ar" ? "English" : "عربي"}
      </button>
    </nav>
  );
}
