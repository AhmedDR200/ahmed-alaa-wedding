/**
 * Tiny client wrapper around the /api/jsonbin proxy.
 * The proxy holds the master key server-side; nothing secret ships to the browser.
 */

type JsonBinResponse = {
  record?: unknown;
  [key: string]: unknown;
};

export async function readBin(binId: string): Promise<unknown> {
  const res = await fetch(`/api/jsonbin?binId=${encodeURIComponent(binId)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to read bin: ${res.status}`);
  }
  const body = (await res.json()) as JsonBinResponse;
  return body.record ?? null;
}

export async function writeBin(binId: string, payload: unknown): Promise<void> {
  const res = await fetch("/api/jsonbin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ binId, payload }),
  });
  if (!res.ok) {
    throw new Error(`Failed to write bin: ${res.status}`);
  }
}

/**
 * Read the bin, shallow-merge `patch` over the top-level object, then write it
 * back. Lets several features share one bin (e.g. streak `dates` + `presence`)
 * without one write clobbering another's keys.
 */
export async function patchBin(
  binId: string,
  patch: Record<string, unknown>,
): Promise<void> {
  let current: Record<string, unknown> = {};
  try {
    const existing = await readBin(binId);
    if (existing && typeof existing === "object" && !Array.isArray(existing)) {
      current = existing as Record<string, unknown>;
    }
  } catch {
    // bin empty or unreachable — fall through and write just the patch
  }
  await writeBin(binId, { ...current, ...patch });
}
