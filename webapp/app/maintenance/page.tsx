import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Maintenance",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-ivory text-charcoal px-6 text-center">
      <h1 className="font-serif text-3xl sm:text-4xl mb-4">We&apos;ll be right back</h1>
      <p className="text-muted max-w-md leading-relaxed">
        This site is temporarily offline for maintenance.
      </p>
    </main>
  );
}
