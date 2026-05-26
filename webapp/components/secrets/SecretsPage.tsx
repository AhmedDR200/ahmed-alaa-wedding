"use client";

import "@/styles/legacy/secrets.css";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
} from "react";

import LegacyTopnav from "@/components/shared/LegacyTopnav";
import PageGate from "@/components/shared/PageGate";
import { useLanguage } from "@/lib/i18n";
import {
  appendSecret,
  deleteSecret,
  isSealedFor,
  loadSecrets,
  markOpened,
  newSecretId,
  notifyOther,
  otherOf,
  readCachedSecrets,
  resizeImage,
  uploadImage,
  type Author,
  type Secret,
} from "@/lib/secrets";

const WHO_KEY = "secrets_who";

const T = {
  en: {
    headerEyebrow: "Sealed envelopes between us",
    headerTitle: "Secrets",
    youAre: "You are",
    switchMe: "switch",
    composePlaceholder: "Write a secret only she/he should see…",
    seal: "Seal & send",
    needText: "Write something or attach a photo",
    notImage: "That is not an image",
    compressing: "Compressing photo…",
    uploading: "Uploading photo…",
    sealing: "Sealing…",
    sealed: "Sealed ♡",
    failedSend: "Failed to send — try again",
    feedLoading: "Loading sealed envelopes…",
    feedEmpty: "No secrets yet. Write the first one above.",
    deleteConfirm: "Delete this secret forever?",
    deleted: "Deleted",
    syncFailed: "Sync failed — saved locally",
    sealLine: "A sealed envelope — open it gently",
    openEnvelope: "Open envelope",
    sealedWaiting: (n: string) => `Sealed — waiting for ${n}`,
    idEyebrow: "Just so we know",
    idTitle: "Who's reading?",
    idSub: "We ask every visit — to be sure",
    name: (w: Author) => (w === "ahmed" ? "Ahmed" : "Alaa"),
    gateTitle: "Secrets",
    gateSub: "Sealed for the other to open",
    relTime: (ts: number) => {
      const diff = Date.now() - ts;
      const min = Math.round(diff / 60000);
      if (min < 1) return "just now";
      if (min < 60) return `${min}m ago`;
      const h = Math.round(min / 60);
      if (h < 24) return `${h}h ago`;
      const d = Math.round(h / 24);
      if (d < 7) return `${d}d ago`;
      return new Date(ts).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  },
  ar: {
    headerEyebrow: "مظاريف مختومة بيننا",
    headerTitle: "أسرار",
    youAre: "أنتَ/أنتِ",
    switchMe: "تبديل",
    composePlaceholder: "اكتب سرّاً لا يراه إلا هو/هي…",
    seal: "اختم وأرسل",
    needText: "اكتب شيئاً أو أرفق صورة",
    notImage: "هذا ليس صورة",
    compressing: "جاري ضغط الصورة…",
    uploading: "جاري رفع الصورة…",
    sealing: "جاري الختم…",
    sealed: "تم الختم ♡",
    failedSend: "فشل الإرسال — حاول مرة أخرى",
    feedLoading: "جارٍ تحميل المظاريف المختومة…",
    feedEmpty: "لا أسرار بعد. اكتب أوّل واحد بالأعلى.",
    deleteConfirm: "حذف هذا السرّ نهائياً؟",
    deleted: "تم الحذف",
    syncFailed: "تعذّر المزامنة — حُفظ محلياً",
    sealLine: "مظروفٌ مختوم — افتحه برفق",
    openEnvelope: "افتح",
    sealedWaiting: (n: string) => `مختوم — بانتظار ${n}`,
    idEyebrow: "فقط لِنَعرف",
    idTitle: "مَن يقرأ؟",
    idSub: "نسأل في كل زيارة — للتأكّد",
    name: (w: Author) => (w === "ahmed" ? "أحمد" : "آلاء"),
    gateTitle: "أسرار",
    gateSub: "مختومةٌ ليفتحها الآخر",
    relTime: (ts: number) => {
      const diff = Date.now() - ts;
      const min = Math.round(diff / 60000);
      if (min < 1) return "الآن";
      if (min < 60) return `منذ ${min} د`;
      const h = Math.round(min / 60);
      if (h < 24) return `منذ ${h} س`;
      const d = Math.round(h / 24);
      if (d < 7) return `منذ ${d} يوم`;
      return new Date(ts).toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },
  },
} as const;

const GATE_SEAL_DECOR = (
  <div className="gate-seal" aria-hidden="true">
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="waxGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E27358" />
          <stop offset="55%" stopColor="#C8553D" />
          <stop offset="100%" stopColor="#7A2A1C" />
        </radialGradient>
      </defs>
      <rect
        x="6"
        y="16"
        width="52"
        height="36"
        rx="3"
        fill="none"
        stroke="#B8975A"
        strokeWidth="1.5"
      />
      <path d="M6 19 L32 38 L58 19" fill="none" stroke="#B8975A" strokeWidth="1.5" />
      <circle cx="32" cy="38" r="9" fill="url(#waxGrad)" stroke="#3A1208" strokeWidth="0.8" />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontStyle="italic"
        fontSize="10"
        fill="#FFE9DC"
      >
        A
      </text>
    </svg>
  </div>
);

type ToastState = { msg: string; kind: "" | "ok" | "err" } | null;

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function useMe(): [Author | null, (who: Author) => void] {
  const me = useSyncExternalStore(
    subscribeStorage,
    () => (window.localStorage.getItem(WHO_KEY) as Author | null) || null,
    () => null,
  );
  const setMe = useCallback((who: Author) => {
    window.localStorage.setItem(WHO_KEY, who);
    window.dispatchEvent(new StorageEvent("storage", { key: WHO_KEY }));
  }, []);
  return [me, setMe];
}

function SecretsView() {
  const { lang } = useLanguage();
  const t = T[lang];

  const [me, setMe] = useMe();
  const [showIdPick, setShowIdPick] = useState(!me);
  const [data, setData] = useState<Secret[]>(() => readCachedSecrets());
  const [loading, setLoading] = useState(true);
  const [composeText, setComposeText] = useState("");
  const [authorOverride, setAuthorOverride] = useState<Author | null>(null);
  const composeAuthor: Author = authorOverride ?? me ?? "ahmed";
  const setComposeAuthor = setAuthorOverride;
  const [pendingPhoto, setPendingPhoto] = useState<{
    base64: string;
    dataUrl: string;
  } | null>(null);
  const [composeStatus, setComposeStatus] = useState<{
    msg: string;
    kind: "" | "ok" | "err";
  }>({ msg: "", kind: "" });
  const [sending, setSending] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const toastTimer = useRef<number | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const showToast = useCallback(
    (msg: string, kind: "" | "ok" | "err" = "") => {
      setToast({ msg, kind });
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 2800);
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await loadSecrets();
      if (cancelled) return;
      setData(remote);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxUrl(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleFile = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setComposeStatus({ msg: t.notImage, kind: "err" });
        return;
      }
      try {
        setComposeStatus({ msg: t.compressing, kind: "" });
        const { dataUrl } = await resizeImage(file, 1600, 0.85);
        const base64 = dataUrl.split(",")[1] ?? "";
        setPendingPhoto({ base64, dataUrl });
        setComposeStatus({ msg: "", kind: "" });
      } catch {
        setComposeStatus({ msg: t.failedSend, kind: "err" });
      }
    },
    [t],
  );

  const clearPhoto = useCallback(() => setPendingPhoto(null), []);

  const post = useCallback(async () => {
    if (sending) return;
    const text = composeText.trim();
    if (!text && !pendingPhoto) {
      setComposeStatus({ msg: t.needText, kind: "err" });
      return;
    }
    setSending(true);
    try {
      let photoUrl: string | null = null;
      if (pendingPhoto) {
        setComposeStatus({ msg: t.uploading, kind: "" });
        photoUrl = await uploadImage(pendingPhoto.base64);
      }
      setComposeStatus({ msg: t.sealing, kind: "" });
      const secret: Secret = {
        id: newSecretId(),
        author: composeAuthor,
        ts: Date.now(),
        text,
        photoUrl,
        openedBy: [],
      };
      const { secrets, synced } = await appendSecret(secret);
      setData(secrets);
      notifyOther(secret);
      setComposeText("");
      setPendingPhoto(null);
      setComposeStatus({ msg: t.sealed, kind: "ok" });
      window.setTimeout(() => setComposeStatus({ msg: "", kind: "" }), 1800);
      if (!synced) showToast(t.syncFailed, "err");
    } catch {
      setComposeStatus({ msg: t.failedSend, kind: "err" });
    } finally {
      setSending(false);
    }
  }, [composeAuthor, composeText, pendingPhoto, sending, showToast, t]);

  const openSeal = useCallback(
    async (id: string) => {
      if (!me) {
        setShowIdPick(true);
        return;
      }
      const { secrets } = await markOpened(id, me);
      setData(secrets);
    },
    [me],
  );

  const removeSecret = useCallback(
    async (id: string) => {
      const ok = window.confirm(t.deleteConfirm);
      if (!ok) return;
      const { secrets, synced } = await deleteSecret(id);
      setData(secrets);
      showToast(t.deleted);
      if (!synced) showToast(t.syncFailed, "err");
    },
    [showToast, t],
  );

  const items = useMemo(() => data, [data]);

  return (
    <>
      <LegacyTopnav />

      {showIdPick && (
        <div id="idpick" className="show" aria-hidden="false">
          <div className="idpick-card">
            <div className="idpick-eyebrow">{t.idEyebrow}</div>
            <div className="idpick-title">{t.idTitle}</div>
            <div className="idpick-sub">{t.idSub}</div>
            <div className="idpick-buttons">
              <button
                type="button"
                className="idpick-btn"
                onClick={() => {
                  setMe("ahmed");
                  setShowIdPick(false);
                }}
              >
                {t.name("ahmed")}
              </button>
              <button
                type="button"
                className="idpick-btn"
                onClick={() => {
                  setMe("alaa");
                  setShowIdPick(false);
                }}
              >
                {t.name("alaa")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page">
        <div className="header-block">
          <div className="header-eyebrow">{t.headerEyebrow}</div>
          <h1 className="header-title">{t.headerTitle}</h1>
          <div className="header-me">
            <span>{t.youAre}</span>{" "}
            <strong id="me-name">{me ? t.name(me) : "—"}</strong>{" "}
            <a
              id="switch-me"
              role="button"
              onClick={() => setShowIdPick(true)}
              style={{ cursor: "pointer" }}
            >
              {t.switchMe}
            </a>
          </div>
        </div>

        <section className="compose" aria-label="Write a new secret">
          <textarea
            id="compose-text"
            maxLength={2000}
            placeholder={t.composePlaceholder}
            value={composeText}
            onChange={(e) => setComposeText(e.target.value)}
          />

          {pendingPhoto && (
            <div className="compose-photo-preview has" id="photo-preview">
              <span
                className="preview-x"
                onClick={clearPhoto}
                aria-label="Remove photo"
                role="button"
              >
                ✕
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img id="photo-preview-img" alt="" src={pendingPhoto.dataUrl} />
            </div>
          )}

          <div className="compose-divider" />

          <div className="compose-row">
            <div className="compose-tools">
              <label
                className="icon-btn"
                htmlFor="photo-input"
                title="Attach photo"
                aria-label="Attach photo"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </label>
              <input
                ref={photoInputRef}
                type="file"
                id="photo-input"
                accept="image/*"
                onChange={handleFile}
              />

              <div className="author-toggle" role="group" aria-label="Author">
                <button
                  type="button"
                  className={composeAuthor === "ahmed" ? "active" : ""}
                  onClick={() => setComposeAuthor("ahmed")}
                >
                  — {t.name("ahmed")}
                </button>
                <button
                  type="button"
                  className={composeAuthor === "alaa" ? "active" : ""}
                  onClick={() => setComposeAuthor("alaa")}
                >
                  — {t.name("alaa")}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="send-btn"
              id="send-btn"
              onClick={post}
              disabled={sending}
            >
              <span>{t.seal}</span>
            </button>
          </div>

          <div
            className={`compose-status${composeStatus.kind ? ` ${composeStatus.kind}` : ""}`}
            id="compose-status"
          >
            {composeStatus.msg}
          </div>
        </section>

        <div className="feed" id="feed" aria-live="polite">
          {loading && !items.length ? (
            <div className="feed-loading">{t.feedLoading}</div>
          ) : !items.length ? (
            <div className="feed-empty">{t.feedEmpty}</div>
          ) : (
            items.map((secret) => {
              const sealed = isSealedFor(secret, me);
              const mine = !!(me && secret.author === me);
              return (
                <article
                  key={secret.id}
                  className={`secret${sealed ? " sealed" : ""}`}
                  data-id={secret.id}
                >
                  <button
                    type="button"
                    className="secret-x"
                    onClick={() => removeSecret(secret.id)}
                    aria-label="Delete"
                  >
                    ✕
                  </button>
                  <div className="secret-meta">
                    <span className="secret-author">
                      — {t.name(secret.author)}
                    </span>
                    <span className="secret-time">{t.relTime(secret.ts)}</span>
                  </div>
                  <div className="secret-text">
                    {secret.text.split("\n").map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {secret.photoUrl && (
                    <a
                      className="secret-photo"
                      onClick={() => setLightboxUrl(secret.photoUrl)}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={secret.photoUrl}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                  )}
                  <div className="secret-seal">
                    {sealed && mine && (
                      <div className="seal-pending">
                        {t.sealedWaiting(t.name(otherOf(secret.author)))}
                      </div>
                    )}
                    {sealed && !mine && (
                      <>
                        <div className="seal-line">{t.sealLine}</div>
                        <button
                          type="button"
                          className="seal-open"
                          onClick={() => openSeal(secret.id)}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginRight: 6 }}
                          >
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6" />
                          </svg>
                          {t.openEnvelope}
                        </button>
                      </>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="ornament">
          <div className="ornament-line" />
          <div className="ornament-diamond" />
          <div className="ornament-line" />
        </div>

        <div className="page-foot">
          <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
          <span>{lang === "ar" ? "فقط بيننا" : "Just between us"}</span>
        </div>
      </div>

      <div
        id="lightbox"
        className={lightboxUrl ? "show" : ""}
        onClick={() => setLightboxUrl(null)}
        aria-hidden={lightboxUrl ? "false" : "true"}
      >
        {lightboxUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img id="lightbox-img" alt="" src={lightboxUrl} />
        )}
      </div>

      <div
        className={`toast${toast ? ` show${toast.kind ? ` ${toast.kind}` : ""}` : ""}`}
        id="toast"
        aria-live="polite"
      >
        {toast?.msg ?? ""}
      </div>
    </>
  );
}

export default function SecretsPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <PageGate
      storageKey="secrets_auth_v1"
      password="between-us"
      title={t.gateTitle}
      subtitle={t.gateSub}
      decoration={GATE_SEAL_DECOR}
    >
      <SecretsView />
    </PageGate>
  );
}
