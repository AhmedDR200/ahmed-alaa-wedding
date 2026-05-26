"use client";

import "@/styles/legacy/memes.css";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

import LegacyTopnav from "@/components/shared/LegacyTopnav";
import { useLanguage } from "@/lib/i18n";

const AUTH_KEY = "memes_auth_v1";
const PASS = "sukuna-wins";
const NUH_KEY = "memes_nuh_count_v1";

const WRONG = {
  en: [
    "Wrong. Read chapter 236 again, habibti.",
    "Cope. Try again.",
    "Nah, you'd lose.",
    "Six Eyes can't see this password either.",
    "Stand proud — but try again.",
  ],
  ar: [
    "غلط. اقري تشابتر ٢٣٦ تاني يا حبيبتي.",
    "كوب. حاولي تاني.",
    "لا، حتخسري.",
    "حتى العيون الست مش شايفة الباسوورد ده.",
    "افخري بنفسك — وحاولي تاني.",
  ],
};

const REPLIES = {
  en: [
    "Hmm. Reread chapter 236, habibti.",
    "I love you. Sukuna still won.",
    "Click harder, the manga still says Sukuna.",
    "Inumaki couldn't save him. Neither can clicking.",
    "Nanami clocked out at 18:23. Permanently.",
    "Cope, but make it fashion.",
    "Throughout heaven and earth, you alone are wrong.",
    "Stand proud — Gojo did not.",
    "\u201CYou got it from here, right?\u201D \u2014 Nanami, also losing.",
    "Six Eyes saw this loss coming. You didn't.",
    "Mahito speedran your favorite in two pages.",
    "Even Yuta agrees with me on this one.",
    "Last reply: I love you anyway. August 25 — same answer.",
  ],
  ar: [
    "اقري تشابتر ٢٣٦ تاني يا حبيبتي.",
    "بحبك. وساكونا لسه فاز.",
    "ادوسي أكتر، المانجا لسه بتقول ساكونا.",
    "إينوماكي ما قدرش ينقذه. ولا الدوسة هتنقذه.",
    "نانامي سجّل خروج الساعة ٦:٢٣ مساءً. ومخرجش تاني.",
    "كوب، بس بستايل.",
    "في السماء وفي الأرض، إنتي وحدك الغلط.",
    "افخري بنفسك — غوجو لم يفعل.",
    "«الباقي عليك، صح؟» — نانامي، وهو كمان بيخسر.",
    "العيون الست شافت الخسارة دي جاية. إنتي لأ.",
    "ماهيتو خلّص على المفضل عندك في صفحتين.",
    "حتى يوتا متفق معايا في الموضوع ده.",
    "آخر رد: بحبك على أي حال. ٢٥ أغسطس — نفس الإجابة.",
  ],
};

const T = {
  en: {
    gateTitle: "The Meme Vault",
    gateSub: "Type the truth to enter",
    gatePh: "The truth, habibti",
    gateHint: "Tell me the truth about chapter 236 — two words, hyphenated.",
    heroEyebrow: "Vol. 01 · Curated by Ahmed",
    heroTitlePrefix: "The ",
    heroTitleMid: "Meme",
    heroTitleSuffix: " Vault",
    heroSub:
      "A small museum of W's against my fiancée — opened with love, signed in cursed energy.",
    ahmed: "Ahmed",
    alaa: "Alaa",
    scoreTag: "Canon — undefeated · Casualties: 2 and counting",
    exhibitA: "Exhibit A",
    bannerTop: "HE LOVES SUKUNA",
    bannerBottom: "SHE LOVES <em>GOJO</em> · SUKUNA WINS",
    memeTags: ["Sukuna", "Gojo", "Canon", "100% verified"] as const,
    memeCaption:
      "You picked the strongest. I picked the King of Curses. Unfortunately for you, habibti — the manga doesn't lie.",
    evidenceCh236: "Evidence · Chapter 236",
    evidenceCh236Detail:
      "Sukuna wins. Gojo says \"nah, I'd lose.\" Case closed.",
    bExhibit: "Exhibit B · Cause of Death",
    bChapter: "Chapter",
    bName: "Satoru Gojo",
    bRole: "Special Grade · The Honored One · Alaa's #1",
    bDate: "December 24, 2018",
    bLoc: "Shinjuku · Final Showdown",
    bCause: "Sukuna · Cleave · Chapter 236",
    bStatus: "Deceased · Confirmed by Gege Akutami",
    bQuote: "\"I had fun.\"",
    bAttr: "— Gojo, to Geto, in the afterlife",
    bPhotoTitle: "\u201CNah, I'd lose.\u201D",
    bPhotoMeta: "Shinjuku · Ch. 236",
    bTroll:
      "The Strongest Sorcerer. Six Eyes. Limitless. The Honored One. And he still picked the fight, said \"nah, I'd win,\" then promptly got bisected. Your taste is impeccable, habibti — your survival rate is not.",
    cExhibit: "Exhibit C · Time of Death",
    cRecordedAt: "Recorded at",
    cName: "Kento Nanami",
    cRole: "Grade 1 Sorcerer · Salaryman · Alaa's Favorite",
    cDate: "October 31, 2018",
    cLoc: "Shibuya · Subway level B5",
    cCause: "Mahito · Idle Transfiguration · Chapter 120",
    cStatus: "Deceased · Confirmed",
    cQuote: "\u201C\u2026You got it from here, right?\u201D",
    cAttr: "— Nanami's last words to Yuji",
    cPhotoTitle: "\u201C\u2026You got it from here, right?\u201D",
    cPhotoMeta: "Shibuya · Ch. 120",
    cTroll:
      "Another one of yours, habibti. The pattern is no longer subtle: every character you grow attached to gets unsubscribed from the manga. Suit was crisp though — we'll give you that.",
    memorialEyebrow: "In Loving Memory",
    memorialTitle: "Satoru Gojo",
    memorialDates: "The Honored One · 1989 — 2018 (Shibuya hurts, Shinjuku finished it)",
    memorialBody:
      "A small private funeral was held for Satoru Gojo, with Kento Nanami's name added to the program. In attendance: Alaa, her broken heart, and a single hijabi sorcerer with extremely blue eyes. Sukuna sends his regards. Mahito sends nothing. Ahmed sends his.",
    memorialQuote:
      "\"Stand proud, Alaa. You are strong... but the man you're marrying loves Sukuna — and the manga keeps killing yours.\"",
    nuhPrompt: "Got something to say about it?",
    nuhBtn: "Nuh uh — Gojo wins",
    nuhCount: (n: number) =>
      `You said "nuh uh" ${n} time${n === 1 ? "" : "s"}. Sukuna still won.`,
    psLabel: "P.S.",
    psBody:
      "Even when Gojo loses, you still <em>win</em> — because I love you. But also Sukuna won.",
    footMid: "The Meme Vault",
    footEnd: "Made with love (and trolling)",
    chapter236: "Evidence · Chapter 236",
    gateLangLabel: "عربي",
  },
  ar: {
    gateTitle: "خزانة الميمز",
    gateSub: "اكتبي الحقيقة عشان تدخلي",
    gatePh: "الحقيقة يا حبيبتي",
    gateHint: "قوليلي الحقيقة عن تشابتر ٢٣٦ — كلمتين بشرطة بينهم.",
    heroEyebrow: "المجلد ١ · من تنسيق أحمد",
    heroTitlePrefix: "",
    heroTitleMid: "خزانة الميمز",
    heroTitleSuffix: "",
    heroSub: "متحف صغير لانتصاراتي على خطيبتي — افتُتح بالحب، ووُقّع بالطاقة الملعونة.",
    ahmed: "أحمد",
    alaa: "آلاء",
    scoreTag: "حسب المانجا — بدون هزائم · القتلى: ٢ والعدّ مستمر",
    exhibitA: "الدليل أ",
    bannerTop: "هو بيحب ساكونا",
    bannerBottom: "هي بتحب <em>غوجو</em> · وساكونا فاز",
    memeTags: ["ساكونا", "غوجو", "مانجا رسمية", "موثّقة ١٠٠٪"] as const,
    memeCaption:
      "إنتي اخترتي الأقوى. أنا اخترت ملك اللعنات. ولسوء حظك يا حبيبتي — المانجا ما بتكدبش.",
    evidenceCh236: "الدليل · تشابتر ٢٣٦",
    evidenceCh236Detail: "ساكونا فاز. غوجو قال «لا، حخسر». القضية مقفولة.",
    bExhibit: "الدليل ب · سبب الوفاة",
    bChapter: "تشابتر",
    bName: "ساتورو غوجو",
    bRole: "درجة خاصة · الموقّر · رقم ١ عند آلاء",
    bDate: "٢٤ ديسمبر ٢٠١٨",
    bLoc: "شينجوكو · المواجهة الأخيرة",
    bCause: "ساكونا · القَطْع · تشابتر ٢٣٦",
    bStatus: "متوفّى · مؤكد من جيجي أكوتامي",
    bQuote: "«قضيت وقتاً ممتعاً.»",
    bAttr: "— غوجو، لجيتو، في الحياة الآخرة",
    bPhotoTitle: "«لا، حخسر.»",
    bPhotoMeta: "شينجوكو · تشابتر ٢٣٦",
    bTroll:
      "أقوى ساحر. العيون الست. اللامحدود. الموقّر. ومع كل ده دخل المعركة، قال «لا، حكسب»، وبعدها بشوية اتقسم نصين. ذوقك عالي يا حبيبتي — بس نسبة نجاة شخصياتك المفضلة في الأرض.",
    cExhibit: "الدليل ج · وقت الوفاة",
    cRecordedAt: "سُجِّل في",
    cName: "كينتو نانامي",
    cRole: "ساحر من الدرجة الأولى · موظف · المفضل عند آلاء",
    cDate: "٣١ أكتوبر ٢٠١٨",
    cLoc: "شيبويا · مترو الطابق ب٥",
    cCause: "ماهيتو · التحوّل الكسول · تشابتر ١٢٠",
    cStatus: "متوفّى · مؤكد",
    cQuote: "«…الباقي عليك، صح؟»",
    cAttr: "— آخر كلمات نانامي ليوجي",
    cPhotoTitle: "«…الباقي عليك، صح؟»",
    cPhotoMeta: "شيبويا · تشابتر ١٢٠",
    cTroll:
      "واحد كمان من تبعك يا حبيبتي. النمط مش خافي خلاص: أي شخصية بتتعلقي بيها بيتم إلغاء اشتراكها من المانجا. بس البدلة كانت أنيقة — ده حقّك.",
    memorialEyebrow: "ذكرى حبيبة",
    memorialTitle: "ساتورو غوجو",
    memorialDates: "الموقّر · ١٩٨٩ — ٢٠١٨ (شيبويا أوجعته، وشينجوكو أنهته)",
    memorialBody:
      "أُقيمت جنازة صغيرة لساتورو غوجو، وأُضيف اسم كينتو نانامي إلى البرنامج. الحضور: آلاء، وقلبها المكسور، وساحرة مُحجبة بعيون زرقاء جداً. ساكونا يبعث تحيّاته. ماهيتو لا يبعث شيئاً. وأحمد يبعث تحيّاته.",
    memorialQuote:
      "«افخري بنفسك يا آلاء. أنتِ قوية… لكن اللي حتتجوزيه بيحب ساكونا — والمانجا بتقتل اللي بتحبيهم.»",
    nuhPrompt: "عندك ردّ؟",
    nuhBtn: "لا لا — غوجو فاز",
    nuhCount: (n: number) => `ضغطتي «لا لا» ${n} مرة. ساكونا لسه فاز.`,
    psLabel: "ملاحظة",
    psBody: "حتى لما غوجو يخسر، إنتي بتظلي <em>الكسبانة</em> — لأني بحبك. بس ساكونا فاز.",
    footMid: "خزانة الميمز",
    footEnd: "صُنع بكل محبة (وشوية تنمر)",
    chapter236: "الدليل · تشابتر ٢٣٦",
    gateLangLabel: "English",
  },
} as const;

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function useUnlocked(): [boolean, () => void] {
  const stored = useSyncExternalStore(
    subscribeStorage,
    () => sessionStorage.getItem(AUTH_KEY) === "yes",
    () => false,
  );
  const [manual, setManual] = useState(false);
  const unlock = useCallback(() => {
    sessionStorage.setItem(AUTH_KEY, "yes");
    setManual(true);
  }, []);
  return [stored || manual, unlock];
}

function MemesGate({
  onUnlock,
}: {
  onUnlock: () => void;
}) {
  const { lang, toggle } = useLanguage();
  const t = T[lang];
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.trim().toLowerCase() === PASS) {
      onUnlock();
      return;
    }
    const choices = WRONG[lang];
    setErr(choices[Math.floor(Math.random() * choices.length)]);
    setValue("");
    setShake(false);
    requestAnimationFrame(() => setShake(true));
    window.setTimeout(() => setErr(""), 3200);
  }

  return (
    <div id="gate">
      <div className="gate-inner">
        <div className="gate-mono">A &amp; A</div>
        <div className="gate-title">{t.gateTitle}</div>
        <div className="gate-sub">{t.gateSub}</div>
        <div className="gate-diamond" aria-hidden="true" />
        <form onSubmit={submit}>
          <div
            className={`gate-field${shake ? " shake" : ""}`}
            id="gate-field"
            onAnimationEnd={() => setShake(false)}
          >
            <input
              type="password"
              id="gate-input"
              placeholder={t.gatePh}
              autoComplete="off"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" aria-label="Enter">
              →
            </button>
          </div>
          <div className="gate-error" id="gate-error">
            {err}
          </div>
          <div className="gate-hint">{t.gateHint}</div>
        </form>
        <button
          type="button"
          className="gate-lang"
          id="gate-lang-btn"
          onClick={toggle}
        >
          {t.gateLangLabel}
        </button>
      </div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function readNuhCount(): number {
  const raw = parseInt(localStorage.getItem(NUH_KEY) ?? "0", 10);
  return Number.isNaN(raw) ? 0 : raw;
}

function MemesContent() {
  const { lang } = useLanguage();
  const t = T[lang];
  useReveal();
  const storedNuh = useSyncExternalStore(
    subscribeStorage,
    readNuhCount,
    () => 0,
  );
  const [delta, setDelta] = useState(0);
  const nuh = storedNuh + delta;
  const [reply, setReply] = useState<string>("");
  const [replyShow, setReplyShow] = useState(false);
  const [btnShake, setBtnShake] = useState(false);

  function clickNuh() {
    const next = nuh + 1;
    setDelta((d) => d + 1);
    localStorage.setItem(NUH_KEY, String(next));
    const idx = Math.min(next - 1, REPLIES.en.length - 1);
    setReply(REPLIES[lang][idx]);
    setReplyShow(false);
    setBtnShake(false);
    requestAnimationFrame(() => {
      setReplyShow(true);
      setBtnShake(true);
    });
  }

  return (
    <>
      <LegacyTopnav />

      <section className="hero">
        <div className="hero-split" aria-hidden="true" />
        <div className="hero-split-divider" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-eyebrow">{t.heroEyebrow}</div>
          <h1 className="hero-title">
            {t.heroTitlePrefix && <span>{t.heroTitlePrefix}</span>}
            <em>{t.heroTitleMid}</em>
            {t.heroTitleSuffix && <span>{t.heroTitleSuffix}</span>}
          </h1>
          <p className="hero-sub">{t.heroSub}</p>

          <div className="scoreboard" aria-label="Scoreboard">
            <div className="scoreboard-side ahmed">
              <div className="scoreboard-name">{t.ahmed}</div>
              <div className="scoreboard-num">2</div>
              <div
                className="scoreboard-name"
                style={{ color: "var(--sukuna-red)" }}
              >
                Sukuna
              </div>
            </div>
            <div className="scoreboard-mid" />
            <div className="scoreboard-side alaa">
              <div className="scoreboard-name">{t.alaa}</div>
              <div className="scoreboard-num">0</div>
              <div
                className="scoreboard-name"
                style={{ color: "var(--gojo-blue)" }}
              >
                Gojo · Nanami
              </div>
            </div>
          </div>
          <div className="scoreboard-tag">{t.scoreTag}</div>
        </div>
      </section>

      <section className="meme-section">
        <div className="meme-card reveal">
          <div className="meme-image-wrap">
            <div className="meme-stamp">{t.exhibitA}</div>
            <div className="meme-banner-top">{t.bannerTop}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/memes/sukuna-vs-gojo.png"
              alt="Ahmed as Sukuna vs Alaa as Gojo"
            />
            <div
              className="meme-banner-bottom"
              dangerouslySetInnerHTML={{ __html: t.bannerBottom }}
            />
          </div>
          <div className="meme-body">
            <div className="meme-tags">
              <span className="meme-tag red">{t.memeTags[0]}</span>
              <span className="meme-tag blue">{t.memeTags[1]}</span>
              <span className="meme-tag">{t.memeTags[2]}</span>
              <span className="meme-tag">{t.memeTags[3]}</span>
            </div>
            <p className="meme-caption">{t.memeCaption}</p>
            <div className="meme-evidence">{t.evidenceCh236}</div>
            <span className="meme-evidence-detail">
              {t.evidenceCh236Detail}
            </span>
          </div>
        </div>
      </section>

      <section className="exhibit-card-section reveal">
        <div className="evidence-card" style={{ ["--accent" as never]: "#5DA9FF" }}>
          <div className="evidence-photo contain">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/memes/gojo-death.webp"
              alt="Satoru Gojo's death — Chapter 236"
              loading="lazy"
            />
            <div className="evidence-photo-caption">
              <div className="evidence-photo-title">{t.bPhotoTitle}</div>
              <div className="evidence-photo-meta">{t.bPhotoMeta}</div>
            </div>
          </div>
          <div className="evidence-card-inner">
            <div className="evidence-header">
              <div className="evidence-stamp">{t.bExhibit}</div>
              <div className="evidence-tod">
                <span>{t.bChapter}</span>&nbsp;<strong>236</strong>
              </div>
            </div>

            <div className="evidence-name">{t.bName}</div>
            <div className="evidence-role">{t.bRole}</div>

            <div className="evidence-rows">
              <div className="evidence-row-label">{lang === "ar" ? "التاريخ" : "Date"}</div>
              <div className="evidence-row-val">{t.bDate}</div>
              <div className="evidence-row-label">{lang === "ar" ? "المكان" : "Location"}</div>
              <div className="evidence-row-val">{t.bLoc}</div>
              <div className="evidence-row-label">{lang === "ar" ? "السبب" : "Cause"}</div>
              <div className="evidence-row-val cause">{t.bCause}</div>
              <div className="evidence-row-label">{lang === "ar" ? "الحالة" : "Status"}</div>
              <div className="evidence-row-val cause">{t.bStatus}</div>
            </div>

            <blockquote className="evidence-quote-block">
              <div className="evidence-quote">{t.bQuote}</div>
              <div className="evidence-quote-attr">{t.bAttr}</div>
            </blockquote>

            <p className="evidence-troll">{t.bTroll}</p>
          </div>
        </div>
      </section>

      <section className="exhibit-card-section reveal">
        <div className="evidence-card" style={{ ["--accent" as never]: "#D9B14A" }}>
          <div className="evidence-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/memes/nanami-death.webp"
              alt="Kento Nanami's final moments — Shibuya Incident"
              loading="lazy"
            />
            <div className="evidence-photo-caption">
              <div className="evidence-photo-title">{t.cPhotoTitle}</div>
              <div className="evidence-photo-meta">{t.cPhotoMeta}</div>
            </div>
          </div>
          <div className="evidence-card-inner">
            <div className="evidence-header">
              <div className="evidence-stamp">{t.cExhibit}</div>
              <div className="evidence-tod">
                <span>{t.cRecordedAt}</span>&nbsp;<strong>18:23</strong>
              </div>
            </div>

            <div className="evidence-name">{t.cName}</div>
            <div className="evidence-role">{t.cRole}</div>

            <div className="evidence-rows">
              <div className="evidence-row-label">{lang === "ar" ? "التاريخ" : "Date"}</div>
              <div className="evidence-row-val">{t.cDate}</div>
              <div className="evidence-row-label">{lang === "ar" ? "المكان" : "Location"}</div>
              <div className="evidence-row-val">{t.cLoc}</div>
              <div className="evidence-row-label">{lang === "ar" ? "السبب" : "Cause"}</div>
              <div className="evidence-row-val cause">{t.cCause}</div>
              <div className="evidence-row-label">{lang === "ar" ? "الحالة" : "Status"}</div>
              <div className="evidence-row-val cause">{t.cStatus}</div>
            </div>

            <blockquote className="evidence-quote-block">
              <div className="evidence-quote">{t.cQuote}</div>
              <div className="evidence-quote-attr">{t.cAttr}</div>
            </blockquote>

            <p className="evidence-troll">{t.cTroll}</p>
          </div>
        </div>
      </section>

      <section className="memorial reveal">
        <div className="memorial-frame">
          <div className="memorial-eyebrow">{t.memorialEyebrow}</div>
          <h2 className="memorial-title">{t.memorialTitle}</h2>
          <div className="memorial-dates">{t.memorialDates}</div>
          <p className="memorial-body">{t.memorialBody}</p>
          <p className="memorial-quote">{t.memorialQuote}</p>
        </div>
      </section>

      <section className="reaction-section reveal">
        <p className="reaction-prompt">{t.nuhPrompt}</p>
        <button
          type="button"
          className={`reaction-btn${btnShake ? " shake" : ""}`}
          id="nuh-uh-btn"
          onClick={clickNuh}
          onAnimationEnd={() => setBtnShake(false)}
        >
          {t.nuhBtn}
        </button>
        <div className="reaction-counter" id="nuh-uh-counter">
          {nuh > 0 ? t.nuhCount(nuh) : ""}
        </div>
        <div
          className={`reaction-reply${replyShow ? " show" : ""}`}
          id="nuh-uh-reply"
        >
          {reply}
        </div>
      </section>

      <section className="lovenote reveal">
        <div className="lovenote-divider">
          <div className="lovenote-line" />
          <div className="lovenote-diamond" />
          <div className="lovenote-line" />
        </div>
        <div className="lovenote-eyebrow">{t.psLabel}</div>
        <p
          className="lovenote-text"
          dangerouslySetInnerHTML={{ __html: t.psBody }}
        />
      </section>

      <footer>
        <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
        <span>{t.footMid}</span>
        &nbsp;·&nbsp;
        <span>{t.footEnd}</span>
      </footer>
    </>
  );
}

export default function MemesPage() {
  const [unlocked, unlock] = useUnlocked();
  return unlocked ? <MemesContent /> : <MemesGate onUnlock={unlock} />;
}
