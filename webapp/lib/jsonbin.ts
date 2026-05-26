const JSONBIN_BASE_URL = "https://api.jsonbin.io/v3";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

export async function readBin(binId: string) {
  const masterKey = requiredEnv("JSONBIN_KEY");
  const response = await fetch(`${JSONBIN_BASE_URL}/b/${binId}/latest`, {
    headers: {
      "X-Master-Key": masterKey,
      "X-Bin-Meta": "false",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`JSONBin read failed (${response.status})`);
  }

  return response.json();
}

export async function writeBin(binId: string, payload: unknown) {
  const masterKey = requiredEnv("JSONBIN_KEY");
  const response = await fetch(`${JSONBIN_BASE_URL}/b/${binId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": masterKey,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`JSONBin write failed (${response.status})`);
  }

  return response.json();
}
