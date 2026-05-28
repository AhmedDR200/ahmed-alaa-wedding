"use client";

import { readBin, writeBin } from "@/lib/jsonbin-client";

export type Person = "ahmed" | "alaa";

/**
 * Shared "couple" bin — same one the home-page streak uses. Presence lives
 * under the `presence` key; the streak under `dates`. Writes go through
 * patchBin / a read-merge so the two never clobber each other.
 */
export const COUPLE_BIN_ID = "69efe653856a6821897d39fd";

/** Reuses the identity the Secrets page already asks for. */
const WHO_KEY = "secrets_who";

/** How recently a heartbeat must be to count as "here right now" (ms). */
export const ONLINE_WINDOW_MS = 90_000;

export type PresenceMap = Partial<Record<Person, number>>;

export function getMe(): Person | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(WHO_KEY);
  return value === "ahmed" || value === "alaa" ? value : null;
}

export function setMe(who: Person): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(WHO_KEY, who);
  // Mirror the Secrets page so other tabs/components react immediately.
  window.dispatchEvent(new StorageEvent("storage", { key: WHO_KEY }));
}

export function otherOf(who: Person): Person {
  return who === "ahmed" ? "alaa" : "ahmed";
}

/** Record that `who` is here now, preserving the partner's last-seen time. */
export async function pingPresence(who: Person): Promise<PresenceMap> {
  let bin: Record<string, unknown> = {};
  try {
    const existing = await readBin(COUPLE_BIN_ID);
    if (existing && typeof existing === "object" && !Array.isArray(existing)) {
      bin = existing as Record<string, unknown>;
    }
  } catch {
    // offline — best effort below
  }
  const presence: PresenceMap = {
    ...((bin.presence as PresenceMap | undefined) ?? {}),
  };
  presence[who] = Date.now();
  try {
    await writeBin(COUPLE_BIN_ID, { ...bin, presence });
  } catch {
    // offline — keep the optimistic local value
  }
  return presence;
}

export async function readPresence(): Promise<PresenceMap> {
  try {
    const bin = (await readBin(COUPLE_BIN_ID)) as {
      presence?: PresenceMap;
    } | null;
    return bin?.presence ?? {};
  } catch {
    return {};
  }
}
