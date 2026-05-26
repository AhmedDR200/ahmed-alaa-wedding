"use client";

import { usePathname } from "next/navigation";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";

const LEGACY_PATHS = new Set([
  "/",
  "/flame",
  "/our-song",
  "/memes",
  "/us",
  "/secrets",
  "/for-alaa",
  "/invite",
]);

export default function AppChrome() {
  const pathname = usePathname();
  const isLegacy = LEGACY_PATHS.has(pathname);

  if (isLegacy) {
    return null;
  }

  return (
    <>
      <Loader />
      <Cursor />
    </>
  );
}
