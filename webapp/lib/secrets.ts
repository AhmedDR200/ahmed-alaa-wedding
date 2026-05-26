import { readBin, writeBin } from "@/lib/jsonbin-client";

const BIN_ID = "69efe637aaba88219745476c";
const CACHE_KEY = "secrets_cache_v1";

export type Author = "ahmed" | "alaa";

export type Secret = {
  id: string;
  author: Author;
  ts: number;
  text: string;
  photoUrl: string | null;
  openedBy: Author[];
};

type SecretsRecord = { secrets?: Secret[] } & Record<string, unknown>;

export function newSecretId(): string {
  return `sec_${Math.random().toString(36).slice(2, 11)}${Date.now().toString(36)}`;
}

export function isSealedFor(secret: Secret, me: Author | null): boolean {
  if (!me) return true;
  if (secret.author === me) return false;
  return !(secret.openedBy ?? []).includes(me);
}

export function otherOf(who: Author): Author {
  return who === "ahmed" ? "alaa" : "ahmed";
}

function readCache(): Secret[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as Secret[]) : [];
  } catch {
    return [];
  }
}

function writeCache(arr: Secret[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(arr));
  } catch {
    // ignore quota errors
  }
}

function ensureRecord(value: unknown): SecretsRecord {
  if (!value || typeof value !== "object") return { secrets: [] };
  const record = value as SecretsRecord;
  if (!Array.isArray(record.secrets)) record.secrets = [];
  return record;
}

function sortNewestFirst(list: Secret[]): Secret[] {
  return [...list].sort((a, b) => b.ts - a.ts);
}

async function fetchAll(): Promise<SecretsRecord | null> {
  try {
    return ensureRecord(await readBin(BIN_ID));
  } catch {
    return null;
  }
}

async function saveAll(record: SecretsRecord): Promise<boolean> {
  try {
    await writeBin(BIN_ID, record);
    return true;
  } catch {
    return false;
  }
}

export async function loadSecrets(): Promise<Secret[]> {
  const remote = await fetchAll();
  if (!remote) return readCache();
  const sorted = sortNewestFirst(remote.secrets ?? []);
  writeCache(sorted);
  return sorted;
}

type MutationResult = { secrets: Secret[]; synced: boolean };

async function mutate(
  mutator: (list: Secret[]) => Secret[],
): Promise<MutationResult> {
  const remote = (await fetchAll()) ?? { secrets: [] };
  const next = mutator([...(remote.secrets ?? [])]);
  const record = { ...remote, secrets: next };
  const ok = await saveAll(record);
  const sorted = sortNewestFirst(next);
  writeCache(sorted);
  return { secrets: sorted, synced: ok };
}

export function appendSecret(secret: Secret) {
  return mutate((list) => {
    list.push(secret);
    return list;
  });
}

export function deleteSecret(id: string) {
  return mutate((list) => list.filter((s) => s.id !== id));
}

export function markOpened(id: string, who: Author) {
  return mutate((list) =>
    list.map((s) => {
      if (s.id !== id) return s;
      const set = new Set<Author>(s.openedBy ?? []);
      set.add(who);
      return { ...s, openedBy: [...set] };
    }),
  );
}

export function readCachedSecrets(): Secret[] {
  return readCache();
}

export async function uploadImage(base64NoPrefix: string): Promise<string> {
  const res = await fetch("/api/imgbb", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64NoPrefix }),
  });
  if (!res.ok) throw new Error(`imgbb upload failed: ${res.status}`);
  const data = (await res.json()) as { url?: string };
  if (!data.url) throw new Error("imgbb upload returned no url");
  return data.url;
}

export async function notifyOther(secret: Secret): Promise<void> {
  try {
    await fetch("/api/email-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: otherOf(secret.author),
        from: secret.author,
        time: new Date(secret.ts).toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      }),
    });
  } catch {
    // notification failures must not break the post flow
  }
}

export function resizeImage(
  file: File,
  maxDim = 1600,
  quality = 0.85,
): Promise<{ dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("read failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("decode failed"));
      img.onload = () => {
        let { width: w, height: h } = img;
        if (w > maxDim || h > maxDim) {
          if (w >= h) {
            h = Math.round(h * (maxDim / w));
            w = maxDim;
          } else {
            w = Math.round(w * (maxDim / h));
            h = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("no 2d context"));
          return;
        }
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, w, h);
        resolve({ dataUrl: canvas.toDataURL("image/jpeg", quality) });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
