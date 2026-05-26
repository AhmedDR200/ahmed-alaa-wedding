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
