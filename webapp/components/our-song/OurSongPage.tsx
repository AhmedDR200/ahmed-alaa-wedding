"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "@/styles/legacy/our-song.css";

import LegacyTopnav from "@/components/shared/LegacyTopnav";
import Starfield from "@/components/our-song/Starfield";
import SongCard from "@/components/our-song/SongCard";
import { useLanguage } from "@/lib/i18n";
import { readBin, writeBin } from "@/lib/jsonbin-client";
import { useTripleTap } from "@/lib/triple-tap";

const BIN_ID = "69f06a6eaaba88219747d5a9";
const PLAY_KEY = "song_plays_v1";
const SESSION_KEY = "song_session_v1";

const T = {
  en: {
    eyebrow: "The song that says it for us",
    title: "Our Song",
    sub: "Perfect · Ed Sheeran",
    quote:
      "\u201CI found a love, for me \u2014 darling just dive right in and follow my lead.\u201D",
    pressPlay: "Press play",
    note: "When this song is on, the world goes quiet",
    plays: "plays together",
    secret:
      "If you found this: this whole page \u2014 every line \u2014 is for you, Alaa. Perfect was only where the playlist starts.",
    secretClose: "Close",
    lyric: [
      "\u201CI found a love, for me\u201D",
      "darling, just dive right in and follow my lead",
      "Baby, I\u2019m dancing in the dark,",
      "with you between my arms \u2014",
      "barefoot on the grass,",
      "listening to our favourite song.",
    ],
    lyricAttr: "\u2014 Ed Sheeran, Perfect",
    onRepeatEyebrow: "on repeat",
    onRepeatTitle: "Songs that remind us of each other",
    footEnding: "Forever, on repeat",
    gateTitle: "Our Song",
    gateSub: "A space just for the two of us",
    gateHint: "A hint: the song name, in two words",
  },
  ar: {
    eyebrow: "\u0627\u0644\u0623\u063a\u0646\u064a\u0629 \u0627\u0644\u062a\u064a \u062a\u0642\u0648\u0644 \u0643\u0644 \u0634\u064a\u0621 \u0639\u0646\u0651\u0627",
    title: "\u0623\u063a\u0646\u064a\u062a\u0646\u0627",
    sub: "\u0628\u064a\u0631\u0641\u0643\u062a \u00b7 \u0625\u062f \u0634\u064a\u0631\u0627\u0646",
    quote:
      "\u00ab\u0648\u062c\u062f\u062a\u064f \u062d\u0628\u0651\u0627\u064b \u064a\u064f\u0634\u0628\u0647\u0646\u064a \u2014 \u064a\u0627 \u062d\u0628\u064a\u0628\u062a\u064a\u060c \u0627\u063a\u0645\u0631\u064a \u0642\u0644\u0628\u0643\u0650 \u0641\u064a\u0647 \u0648\u0627\u062a\u0628\u0639\u064a\u0646\u064a.\u00bb",
    pressPlay: "\u0627\u0636\u063a\u0637 \u0644\u0644\u062a\u0634\u063a\u064a\u0644",
    note: "\u062d\u064a\u0646 \u062a\u0628\u062f\u0623 \u0647\u0630\u0647 \u0627\u0644\u0623\u063a\u0646\u064a\u0629\u060c \u064a\u0635\u0645\u062a \u0627\u0644\u0639\u0627\u0644\u0645",
    plays: "\u0645\u0631\u0629 \u0633\u0645\u0639\u0646\u0627\u0647\u0627 \u0645\u0639\u0627\u064b",
    secret:
      "\u0625\u0646 \u0648\u0635\u0644\u062a\u0650 \u0625\u0644\u0649 \u0647\u0646\u0627: \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u0628\u0643\u0644 \u0645\u0627 \u0641\u064a\u0647\u0627 \u2014 \u0645\u0646 \u0623\u062c\u0644\u0643\u0650 \u064a\u0627 \u0622\u0644\u0627\u0621. \u00ab\u0628\u064a\u0631\u0641\u0643\u062a\u00bb \u0643\u0627\u0646\u062a \u0641\u0642\u0637 \u0628\u062f\u0627\u064a\u0629 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.",
    secretClose: "\u0625\u063a\u0644\u0627\u0642",
    lyric: [
      "\u00ab\u0648\u062c\u062f\u062a\u064f \u062d\u0628\u0651\u0627\u064b \u064a\u064f\u0634\u0628\u0647\u0646\u064a\u00bb",
      "\u064a\u0627 \u062d\u0628\u064a\u0628\u062a\u064a\u060c \u0627\u063a\u0645\u0631\u064a \u0642\u0644\u0628\u0643\u0650 \u0641\u064a\u0647 \u0648\u0627\u062a\u0628\u0639\u064a\u0646\u064a",
      "\u062d\u0628\u064a\u0628\u062a\u064a\u060c \u0623\u0631\u0642\u0635\u064f \u0641\u064a \u0627\u0644\u0639\u062a\u0645\u0629",
      "\u0648\u0623\u0646\u062a\u0650 \u0628\u064a\u0646 \u0630\u0631\u0627\u0639\u064e\u064a\u0651 \u2014",
      "\u062d\u0627\u0641\u064a\u064a\u0646 \u0639\u0644\u0649 \u0627\u0644\u0639\u0634\u0628\u060c",
      "\u0646\u064f\u0635\u063a\u064a \u0625\u0644\u0649 \u0623\u063a\u0646\u064a\u062a\u0646\u0627 \u0627\u0644\u0645\u0641\u0636\u0651\u0644\u0629.",
    ],
    lyricAttr: "\u2014 \u0625\u062f \u0634\u064a\u0631\u0627\u0646\u060c \u0628\u064a\u0631\u0641\u0643\u062a",
    onRepeatEyebrow: "\u0639\u0644\u0649 \u0627\u0644\u062a\u0643\u0631\u0627\u0631",
    onRepeatTitle: "\u0623\u063a\u0627\u0646\u064d \u062a\u064f\u0630\u0643\u0651\u0631\u0646\u0627 \u0628\u0628\u0639\u0636",
    footEnding: "\u0625\u0644\u0649 \u0627\u0644\u0623\u0628\u062f\u060c \u0639\u0644\u0649 \u0627\u0644\u062a\u0643\u0631\u0627\u0631",
    gateTitle: "\u0623\u063a\u0646\u064a\u062a\u0646\u0627",
    gateSub: "\u0645\u0633\u0627\u062d\u0629 \u062e\u0627\u0635\u0629 \u0644\u0646\u0627",
    gateHint: "\u062a\u0644\u0645\u064a\u062d: \u0627\u0633\u0645 \u0627\u0644\u0623\u063a\u0646\u064a\u0629\u060c \u0641\u064a \u0643\u0644\u0645\u062a\u064a\u0646",
  },
} as const;

const MORE_SONGS = [
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    embedUrl:
      "https://open.spotify.com/embed/track/34gCuhDGsG4bRPIf9bb02f?utm_source=generator&theme=0",
  },
  {
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    embedUrl:
      "https://open.spotify.com/embed/track/5XeFesFbtLpXzIVDNQP22n?utm_source=generator&theme=0",
  },
  {
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    embedUrl:
      "https://open.spotify.com/embed/track/2plbrEY59IikOBgBGLjaoe?utm_source=generator&theme=0",
  },
  {
    title: "All of Me",
    artist: "John Legend",
    embedUrl:
      "https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a?utm_source=generator&theme=0",
  },
  {
    title: "Lover",
    artist: "Taylor Swift",
    embedUrl:
      "https://open.spotify.com/embed/track/1dGr1c8CrMLDpV6mPbImSI?utm_source=generator&theme=0",
  },
];

function OurSongView() {
  const { lang } = useLanguage();
  const t = T[lang];

  const [plays, setPlays] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return parseInt(window.localStorage.getItem(PLAY_KEY) ?? "0", 10);
  });
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [bumping, setBumping] = useState(false);
  const [secretVisible, setSecretVisible] = useState(false);
  const secretBoxRef = useRef<HTMLDivElement>(null);

  const lyricRefs = useRef<HTMLDivElement[]>([]);
  function setLyricRef(node: HTMLDivElement | null, index: number) {
    if (node) lyricRefs.current[index] = node;
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const isNewSession = !sessionStorage.getItem(SESSION_KEY);
      try {
        const remote = await readBin(BIN_ID);
        if (cancelled) return;
        const remotePlays =
          (remote as { plays?: number } | null)?.plays ?? plays;
        const next = isNewSession ? remotePlays + 1 : remotePlays;
        setPlays(next);
        window.localStorage.setItem(PLAY_KEY, String(next));
        if (isNewSession) {
          sessionStorage.setItem(SESSION_KEY, "1");
          setBumping(false);
          requestAnimationFrame(() => setBumping(true));
          await writeBin(BIN_ID, { plays: next });
        }
      } catch {
        // offline — keep local
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".lyric-line, .lyric-attr, .song-card").forEach(
      (el, i) => {
        (el as HTMLElement).style.transitionDelay = `${i * 120}ms`;
        observer.observe(el);
      },
    );
    return () => observer.disconnect();
  }, []);

  const revealSecret = useCallback(() => {
    setSecretVisible(true);
    requestAnimationFrame(() => {
      secretBoxRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, []);

  const tap = useTripleTap(revealSecret);

  return (
    <>
      <Starfield />
      <LegacyTopnav />
      <div className="page our-song-page">
        <div className="header-block">
          <div
            className="header-eyebrow secret-tap-hint"
            onClick={tap}
            role="presentation"
          >
            {t.eyebrow}
          </div>
          <h1
            className="header-title secret-tap-hint"
            onClick={tap}
            role="presentation"
          >
            {t.title}
          </h1>
          <div className="header-sub">{t.sub}</div>
          <p className="header-quote">{t.quote}</p>
        </div>

        <div className="ornament" aria-hidden="true">
          <div className="ornament-line" />
          <div
            className="ornament-diamond secret-tap-hint"
            onClick={tap}
            role="presentation"
          />
          <div className="ornament-line" />
        </div>

        <div className="hero-player">
          <div className="hero-card">
            <div className="hero-card-inner">
              <div className="player-platform">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 17.3c-.2.4-.7.5-1.1.3-3-1.8-6.7-2.2-11.1-1.2-.4.1-.8-.2-.9-.6-.1-.4.2-.8.6-.9 4.7-1.1 8.8-.6 12.1 1.4.4.2.5.7.4 1zm1.5-3.3c-.3.4-.8.6-1.2.3-3.4-2.1-8.5-2.7-12.5-1.5-.5.2-1-.1-1.2-.6-.2-.5.1-1 .6-1.2 4.6-1.4 10.2-.8 14.1 1.6.5.3.6.9.2 1.4zm.1-3.4C15.3 8.3 8.7 8.1 5.1 9.2c-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 4.2-1.3 11.4-1 15.7 1.4.5.3.7 1 .4 1.5-.3.6-1 .8-1.4.5z" />
                </svg>
                <span>{t.pressPlay}</span>
              </div>
              <div className="player-frame">
                {playerLoaded ? (
                  <iframe
                    src="https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v?utm_source=generator&theme=0&autoplay=1"
                    title="Listen on Spotify"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <button
                    type="button"
                    className="player-facade"
                    aria-label={`${t.pressPlay} — Perfect, Ed Sheeran`}
                    onClick={() => setPlayerLoaded(true)}
                  >
                    <span className="player-facade-art" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="player-facade-meta">
                      <span className="player-facade-title">Perfect</span>
                      <span className="player-facade-artist">Ed Sheeran</span>
                    </span>
                  </button>
                )}
              </div>
              <div
                className="player-note secret-tap-hint"
                onClick={tap}
                role="presentation"
              >
                {t.note}
              </div>
            </div>
          </div>
        </div>

        <div className="play-counter">
          <span
            className={`play-counter-num${bumping ? " bump" : ""}`}
            onAnimationEnd={() => setBumping(false)}
          >
            {plays}
          </span>
          <span className="play-counter-label">{t.plays}</span>
        </div>

        {secretVisible && (
          <div
            id="for-alaa-secret"
            ref={secretBoxRef}
            className="for-alaa-secret"
          >
            <div className="for-alaa-secret-inner">
              <p className="for-alaa-secret-text">{t.secret}</p>
              <button
                type="button"
                className="for-alaa-secret-close"
                onClick={() => setSecretVisible(false)}
              >
                {t.secretClose}
              </button>
            </div>
          </div>
        )}

        <div className="lyric-reveal">
          {t.lyric.map((line, i) => (
            <div
              key={i}
              ref={(node) => setLyricRef(node, i)}
              className="lyric-line"
            >
              {line}
            </div>
          ))}
          <div className="lyric-attr">{t.lyricAttr}</div>
        </div>

        <div className="more-songs">
          <div className="more-songs-eyebrow">{t.onRepeatEyebrow}</div>
          <div className="more-songs-title">{t.onRepeatTitle}</div>
          <div className="songs-list">
            {MORE_SONGS.map((s) => (
              <SongCard key={s.embedUrl} {...s} />
            ))}
          </div>
        </div>

        <div className="page-foot">
          <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
          <span>{t.footEnding}</span>
        </div>
      </div>
    </>
  );
}

export default function OurSongPage() {
  return <OurSongView />;
}
