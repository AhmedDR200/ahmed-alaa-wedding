"use client";

import { useEffect, useRef } from "react";
import "@/styles/legacy/memes.css";
import { runMemesScripts } from "@/lib/legacy/memes";

const BODY_HTML = `


<!-- ══ PASSWORD GATE ══ -->
<div id="gate">
  <div class="gate-inner">
    <div class="gate-mono">A &amp; A</div>
    <div class="gate-title t" data-en="The Meme Vault" data-ar="خزانة الميمز">The Meme Vault</div>
    <div class="gate-sub t" data-en="Type the truth to enter" data-ar="اكتبي الحقيقة عشان تدخلي">Type the truth to enter</div>
    <div class="gate-diamond" aria-hidden="true"></div>
    <div class="gate-field" id="gate-field">
      <input type="password" id="gate-input" placeholder="The truth, habibti" data-en-ph="The truth, habibti" data-ar-ph="الحقيقة يا حبيبتي" autocomplete="off" />
      <button type="button" onclick="checkPass()" aria-label="Enter">→</button>
    </div>
    <div class="gate-error" id="gate-error"></div>
    <div class="gate-hint t"
      data-en="Tell me the truth about chapter 236 — two words, hyphenated."
      data-ar="قوليلي الحقيقة عن تشابتر ٢٣٦ — كلمتين بشرطة بينهم.">Tell me the truth about chapter 236 — two words, hyphenated.</div>
    <button type="button" class="gate-lang" id="gate-lang-btn" onclick="toggleGateLang()">عربي</button>
  </div>
</div>


<!-- ══ TOP NAV ══ -->
<nav class="topnav">
  <a class="topnav-mono" href="/">A &amp; A</a>
  <div class="topnav-links">
    <a href="/"     class="topnav-link"        data-page="home"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"/></svg></span><span class="t" data-en="Home" data-ar="الرئيسية">Home</span></a>
    <a href="/flame"     class="topnav-link"        data-page="flame"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10.94c2.33-3.31.17-7.82-1-8.94 0 3.4-2.24 5.3-3.67 6.7C5.9 10.11 5 12 5 14.29 5 18 8.13 21 12 21s7-3 7-6.71c0-1.71-1.23-4.4-2.33-5.59-2.09 3.36-3.26 3.36-4.67 2.24Z"/></svg></span><span class="t" data-en="Flame" data-ar="الشعلة">Flame</span></a>
    <a href="/our-song"  class="topnav-link"        data-page="song"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13M9 9l12-2"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></span><span class="t" data-en="Song" data-ar="الأغنية">Song</span></a>
    <a href="/memes"     class="topnav-link active" data-page="memes"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></span><span class="t" data-en="Memes" data-ar="ميمز">Memes</span></a>
    <a href="/us"        class="topnav-link"        data-page="us"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="16" height="16" rx="2"/><circle cx="12" cy="8" r="2"/><path d="m22 13-1.3-1.3a2.4 2.4 0 0 0-3.4 0L11 18"/><path d="M18 22H4a2 2 0 0 1-2-2V6"/></svg></span><span class="t" data-en="Us" data-ar="نحن">Us</span></a>
    <a href="/secrets"   class="topnav-link"        data-page="secrets"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span><span class="t" data-en="Secrets" data-ar="أسرار">Secrets</span></a>
    <a href="/for-alaa"  class="topnav-link"        data-page="alaa"><span class="topnav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10h-1a4 4 0 1 1 4-4v.534"/><path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"/><path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"/><path d="M9.77 12C4 15 2 22 2 22"/><circle cx="17" cy="8" r="2"/></svg></span><span class="t" data-en="For Alaa" data-ar="لـ آلاء">For Alaa</span></a>
  </div>
  <button class="topnav-lang" id="lang-btn" onclick="toggleLang()">عربي</button>
</nav>

<!-- ══ HERO ══ -->
<section class="hero">
  <div class="hero-split" aria-hidden="true"></div>
  <div class="hero-split-divider" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow t" data-en="Vol. 01 · Curated by Ahmed" data-ar="المجلد ١ · من تنسيق أحمد">Vol. 01 · Curated by Ahmed</div>
    <h1 class="hero-title">
      <span class="t" data-en="The " data-ar="">The </span><em class="t" data-en="Meme" data-ar="خزانة الميمز">Meme</em><span class="t" data-en=" Vault" data-ar=""> Vault</span>
    </h1>
    <p class="hero-sub t"
      data-en="A small museum of Ws against my fiancée — opened with love, signed in cursed energy."
      data-ar="متحف صغير لانتصاراتي على خطيبتي — افتُتح بالحب، ووُقّع بالطاقة الملعونة.">
      A small museum of W's against my fiancée — opened with love, signed in cursed energy.
    </p>

    <div class="scoreboard" aria-label="Scoreboard">
      <div class="scoreboard-side ahmed">
        <div class="scoreboard-name t" data-en="Ahmed" data-ar="أحمد">Ahmed</div>
        <div class="scoreboard-num">2</div>
        <div class="scoreboard-name" style="color:var(--sukuna-red);">Sukuna</div>
      </div>
      <div class="scoreboard-mid"></div>
      <div class="scoreboard-side alaa">
        <div class="scoreboard-name t" data-en="Alaa" data-ar="آلاء">Alaa</div>
        <div class="scoreboard-num">0</div>
        <div class="scoreboard-name" style="color:var(--gojo-blue);">Gojo · Nanami</div>
      </div>
    </div>
    <div class="scoreboard-tag t"
      data-en="Canon — undefeated · Casualties: 2 and counting"
      data-ar="حسب المانجا — بدون هزائم · القتلى: ٢ والعدّ مستمر">Canon — undefeated · Casualties: 2 and counting</div>
  </div>
</section>

<!-- ══ MEME #1: SUKUNA vs GOJO ══ -->
<section class="meme-section">
  <div class="meme-card reveal">
    <div class="meme-image-wrap">
      <div class="meme-stamp t" data-en="Exhibit A" data-ar="الدليل أ">Exhibit A</div>
      <div class="meme-banner-top t"
        data-en="HE LOVES SUKUNA"
        data-ar="هو بيحب ساكونا">HE LOVES SUKUNA</div>
      <img src="/img/memes/sukuna-vs-gojo.png" alt="Ahmed as Sukuna vs Alaa as Gojo" />
      <div class="meme-banner-bottom t"
        data-en='SHE LOVES <em>GOJO</em> · SUKUNA WINS'
        data-ar='هي بتحب <em>غوجو</em> · وساكونا فاز'>
        SHE LOVES <em>GOJO</em> · SUKUNA WINS
      </div>
    </div>
    <div class="meme-body">
      <div class="meme-tags">
        <span class="meme-tag red t" data-en="Sukuna" data-ar="ساكونا">Sukuna</span>
        <span class="meme-tag blue t" data-en="Gojo" data-ar="غوجو">Gojo</span>
        <span class="meme-tag t" data-en="Canon" data-ar="مانجا رسمية">Canon</span>
        <span class="meme-tag t" data-en="100% verified" data-ar="موثّقة ١٠٠٪">100% verified</span>
      </div>
      <p class="meme-caption t"
        data-en='You picked the strongest. I picked the King of Curses. Unfortunately for you, habibti — the manga doesn’t lie.'
        data-ar='إنتي اخترتي الأقوى. أنا اخترت ملك اللعنات. ولسوء حظك يا حبيبتي — المانجا ما بتكدبش.'>
        You picked the strongest. I picked the King of Curses. Unfortunately for you, habibti — the manga doesn't lie.
      </p>
      <div class="meme-evidence t"
        data-en="Evidence · Chapter 236"
        data-ar="الدليل · تشابتر ٢٣٦">Evidence · Chapter 236</div>
      <span class="meme-evidence-detail t"
        data-en='Sukuna wins. Gojo says "nah, I’d lose." Case closed.'
        data-ar='ساكونا فاز. غوجو قال «لا، حخسر». القضية مقفولة.'>
        Sukuna wins. Gojo says "nah, I'd lose." Case closed.
      </span>
    </div>
  </div>
</section>

<!-- ══ EXHIBIT B: GOJO CAUSE OF DEATH ══ -->
<section class="exhibit-card-section reveal">
  <div class="evidence-card" style="--accent:#5DA9FF;">
    <div class="evidence-photo contain">
      <img src="/img/memes/gojo-death.webp" alt="Satoru Gojo's death — Chapter 236" loading="lazy" />
      <div class="evidence-photo-caption">
        <div class="evidence-photo-title t"
          data-en="“Nah, I’d lose.”"
          data-ar="«لا، حخسر.»">"Nah, I'd lose."</div>
        <div class="evidence-photo-meta t" data-en="Shinjuku · Ch. 236" data-ar="شينجوكو · تشابتر ٢٣٦">Shinjuku · Ch. 236</div>
      </div>
    </div>
    <div class="evidence-card-inner">
    <div class="evidence-header">
      <div class="evidence-stamp t" data-en="Exhibit B · Cause of Death" data-ar="الدليل ب · سبب الوفاة">Exhibit B · Cause of Death</div>
      <div class="evidence-tod">
        <span class="t" data-en="Chapter" data-ar="تشابتر">Chapter</span>
        &nbsp;<strong>236</strong>
      </div>
    </div>

    <div class="evidence-name t" data-en="Satoru Gojo" data-ar="ساتورو غوجو">Satoru Gojo</div>
    <div class="evidence-role t"
      data-en="Special Grade · The Honored One · Alaa’s #1"
      data-ar="درجة خاصة · الموقّر · رقم ١ عند آلاء">Special Grade · The Honored One · Alaa's #1</div>

    <div class="evidence-rows">
      <div class="evidence-row-label t" data-en="Date" data-ar="التاريخ">Date</div>
      <div class="evidence-row-val t" data-en="December 24, 2018" data-ar="٢٤ ديسمبر ٢٠١٨">December 24, 2018</div>

      <div class="evidence-row-label t" data-en="Location" data-ar="المكان">Location</div>
      <div class="evidence-row-val t" data-en="Shinjuku · Final Showdown" data-ar="شينجوكو · المواجهة الأخيرة">Shinjuku · Final Showdown</div>

      <div class="evidence-row-label t" data-en="Cause" data-ar="السبب">Cause</div>
      <div class="evidence-row-val cause t"
        data-en="Sukuna · Cleave · Chapter 236"
        data-ar="ساكونا · القَطْع · تشابتر ٢٣٦">Sukuna · Cleave · Chapter 236</div>

      <div class="evidence-row-label t" data-en="Status" data-ar="الحالة">Status</div>
      <div class="evidence-row-val cause t"
        data-en="Deceased · Confirmed by Gege Akutami"
        data-ar="متوفّى · مؤكد من جيجي أكوتامي">Deceased · Confirmed by Gege Akutami</div>
    </div>

    <blockquote class="evidence-quote-block">
      <div class="evidence-quote t"
        data-en='"I had fun."'
        data-ar='«قضيت وقتاً ممتعاً.»'>"I had fun."</div>
      <div class="evidence-quote-attr t"
        data-en="— Gojo, to Geto, in the afterlife"
        data-ar="— غوجو، لجيتو، في الحياة الآخرة">— Gojo, to Geto, in the afterlife</div>
    </blockquote>

    <p class="evidence-troll t"
      data-en="The Strongest Sorcerer. Six Eyes. Limitless. The Honored One. And he still picked the fight, said “nah, I’d win,” then promptly got bisected. Your taste is impeccable, habibti — your survival rate is not."
      data-ar="أقوى ساحر. العيون الست. اللامحدود. الموقّر. ومع كل ده دخل المعركة، قال «لا، حكسب»، وبعدها بشوية اتقسم نصين. ذوقك عالي يا حبيبتي — بس نسبة نجاة شخصياتك المفضلة في الأرض.">
      The Strongest Sorcerer. Six Eyes. Limitless. The Honored One. And he still picked the fight, said "nah, I'd win," then promptly got bisected. Your taste is impeccable, habibti — your survival rate is not.
    </p>
    </div>
  </div>
</section>

<!-- ══ EXHIBIT C: NANAMI TIME OF DEATH ══ -->
<section class="exhibit-card-section reveal">
  <div class="evidence-card" style="--accent:#D9B14A;">
    <div class="evidence-photo">
      <img src="/img/memes/nanami-death.webp" alt="Kento Nanami's final moments — Shibuya Incident" loading="lazy" />
      <div class="evidence-photo-caption">
        <div class="evidence-photo-title t"
          data-en="“…You got it from here, right?”"
          data-ar="«…الباقي عليك، صح؟»">"…You got it from here, right?"</div>
        <div class="evidence-photo-meta t" data-en="Shibuya · Ch. 120" data-ar="شيبويا · تشابتر ١٢٠">Shibuya · Ch. 120</div>
      </div>
    </div>
    <div class="evidence-card-inner">
    <div class="evidence-header">
      <div class="evidence-stamp t" data-en="Exhibit C · Time of Death" data-ar="الدليل ج · وقت الوفاة">Exhibit C · Time of Death</div>
      <div class="evidence-tod">
        <span class="t" data-en="Recorded at" data-ar="سُجِّل في">Recorded at</span>
        &nbsp;<strong>18:23</strong>
      </div>
    </div>

    <div class="evidence-name t" data-en="Kento Nanami" data-ar="كينتو نانامي">Kento Nanami</div>
    <div class="evidence-role t"
      data-en="Grade 1 Sorcerer · Salaryman · Alaa’s Favorite"
      data-ar="ساحر من الدرجة الأولى · موظف · المفضل عند آلاء">Grade 1 Sorcerer · Salaryman · Alaa's Favorite</div>

    <div class="evidence-rows">
      <div class="evidence-row-label t" data-en="Date" data-ar="التاريخ">Date</div>
      <div class="evidence-row-val t" data-en="October 31, 2018" data-ar="٣١ أكتوبر ٢٠١٨">October 31, 2018</div>

      <div class="evidence-row-label t" data-en="Location" data-ar="المكان">Location</div>
      <div class="evidence-row-val t" data-en="Shibuya · Subway level B5" data-ar="شيبويا · مترو الطابق ب٥">Shibuya · Subway level B5</div>

      <div class="evidence-row-label t" data-en="Cause" data-ar="السبب">Cause</div>
      <div class="evidence-row-val cause t"
        data-en="Mahito · Idle Transfiguration · Chapter 120"
        data-ar="ماهيتو · التحوّل الكسول · تشابتر ١٢٠">Mahito · Idle Transfiguration · Chapter 120</div>

      <div class="evidence-row-label t" data-en="Status" data-ar="الحالة">Status</div>
      <div class="evidence-row-val cause t" data-en="Deceased · Confirmed" data-ar="متوفّى · مؤكد">Deceased · Confirmed</div>
    </div>

    <blockquote class="evidence-quote-block">
      <div class="evidence-quote t"
        data-en='"…You got it from here, right?"'
        data-ar='«…الباقي عليك، صح؟»'>"…You got it from here, right?"</div>
      <div class="evidence-quote-attr t"
        data-en="— Nanami’s last words to Yuji"
        data-ar="— آخر كلمات نانامي ليوجي">— Nanami's last words to Yuji</div>
    </blockquote>

    <p class="evidence-troll t"
      data-en="Another one of yours, habibti. The pattern is no longer subtle: every character you grow attached to gets unsubscribed from the manga. Suit was crisp though — we’ll give you that."
      data-ar="واحد كمان من تبعك يا حبيبتي. النمط مش خافي خلاص: أي شخصية بتتعلقي بيها بيتم إلغاء اشتراكها من المانجا. بس البدلة كانت أنيقة — ده حقّك.">
      Another one of yours, habibti. The pattern is no longer subtle: every character you grow attached to gets unsubscribed from the manga. Suit was crisp though — we'll give you that.
    </p>
    </div>
  </div>
</section>

<!-- ══ MEMORIAL ══ -->
<section class="memorial reveal">
  <div class="memorial-frame">
    <div class="memorial-eyebrow t"
      data-en="In Loving Memory"
      data-ar="ذكرى حبيبة">In Loving Memory</div>
    <h2 class="memorial-title t"
      data-en="Satoru Gojo"
      data-ar="ساتورو غوجو">Satoru Gojo</h2>
    <div class="memorial-dates t"
      data-en="The Honored One · 1989 — 2018 (Shibuya hurts, Shinjuku finished it)"
      data-ar="الموقّر · ١٩٨٩ — ٢٠١٨ (شيبويا أوجعته، وشينجوكو أنهته)">
      The Honored One · 1989 — 2018 (Shibuya hurts, Shinjuku finished it)
    </div>
    <p class="memorial-body t"
      data-en="A small private funeral was held for Satoru Gojo, with Kento Nanami’s name added to the program. In attendance: Alaa, her broken heart, and a single hijabi sorcerer with extremely blue eyes. Sukuna sends his regards. Mahito sends nothing. Ahmed sends his."
      data-ar="أُقيمت جنازة صغيرة لساتورو غوجو، وأُضيف اسم كينتو نانامي إلى البرنامج. الحضور: آلاء، وقلبها المكسور، وساحرة مُحجبة بعيون زرقاء جداً. ساكونا يبعث تحيّاته. ماهيتو لا يبعث شيئاً. وأحمد يبعث تحيّاته.">
      A small private funeral was held for Satoru Gojo, with Kento Nanami's name added to the program. In attendance: Alaa, her broken heart, and a single hijabi sorcerer with extremely blue eyes. Sukuna sends his regards. Mahito sends nothing. Ahmed sends his.
    </p>
    <p class="memorial-quote t"
      data-en='"Stand proud, Alaa. You are strong... but the man you’re marrying loves Sukuna — and the manga keeps killing yours."'
      data-ar='«افخري بنفسك يا آلاء. أنتِ قوية… لكن اللي حتتجوزيه بيحب ساكونا — والمانجا بتقتل اللي بتحبيهم.»'>
      "Stand proud, Alaa. You are strong... but the man you're marrying loves Sukuna — and the manga keeps killing yours."
    </p>
  </div>
</section>

<!-- ══ NUH UH ══ -->
<section class="reaction-section reveal">
  <p class="reaction-prompt t"
    data-en="Got something to say about it?"
    data-ar="عندك ردّ؟">Got something to say about it?</p>
  <button type="button" class="reaction-btn t" id="nuh-uh-btn"
    data-en="Nuh uh — Gojo wins"
    data-ar="لا لا — غوجو فاز"
    onclick="nuhUh()">Nuh uh — Gojo wins</button>
  <div class="reaction-counter t" id="nuh-uh-counter" data-en="" data-ar=""></div>
  <div class="reaction-reply" id="nuh-uh-reply"></div>
</section>

<!-- ══ LOVE NOTE ══ -->
<section class="lovenote reveal">
  <div class="lovenote-divider">
    <div class="lovenote-line"></div>
    <div class="lovenote-diamond"></div>
    <div class="lovenote-line"></div>
  </div>
  <div class="lovenote-eyebrow t" data-en="P.S." data-ar="ملاحظة">P.S.</div>
  <p class="lovenote-text t"
    data-en="Even when Gojo loses, you still <em>win</em> — because I love you. But also Sukuna won."
    data-ar="حتى لما غوجو يخسر، إنتي بتظلي <em>الكسبانة</em> — لأني بحبك. بس ساكونا فاز.">
    Even when Gojo loses, you still <em>win</em> — because I love you. But also Sukuna won.
  </p>
</section>

<!-- ══ FOOTER ══ -->
<footer>
  <strong>Ahmed &amp; Alaa</strong> &nbsp;·&nbsp;
  <span class="t" data-en="The Meme Vault" data-ar="خزانة الميمز">The Meme Vault</span>
  &nbsp;·&nbsp;
  <span class="t" data-en="Made with love (and trolling)" data-ar="صُنع بكل محبة (وشوية تنمر)">Made with love (and trolling)</span>
</footer>


`;

export default function LegacyMemesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current || !rootRef.current) return;
    ranRef.current = true;
    runMemesScripts(rootRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className="legacy-page legacy-memes"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
      suppressHydrationWarning
    />
  );
}
