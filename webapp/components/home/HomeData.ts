export type Lang = "en" | "ar";

export const REASONS = [
  {
    title: {
      en: "The way you smile",
      ar: "طريقة ابتسامتكِ",
    },
    desc: {
      en: "That smile — the one that starts slow, like it's deciding whether the moment deserves it. It always does. And every single time, it takes me completely off guard.",
      ar: "تلك الابتسامة التي تبدأ ببطء، كأنها تقرر إن كانت اللحظة تستحق. وهي دائماً تستحق. وفي كل مرة، تفاجئني تماماً.",
    },
  },
  {
    title: {
      en: "How you make every room warmer",
      ar: "كيف تجعلين كل مكان أكثر دفئاً",
    },
    desc: {
      en: "You walk in and something shifts. The air gets lighter. People laugh more. I don't think you even know you do it — that's the most beautiful part.",
      ar: "تدخلين وشيء ما يتغير. الجو يخفّ. الناس يضحكون أكثر. لا أعتقد أنكِ تعلمين بذلك — وهذا أجمل ما فيه.",
    },
  },
  {
    title: { en: "Your heart", ar: "قلبكِ" },
    desc: {
      en: "The way you care — deeply, quietly, without asking for anything in return. I've never met anyone who loves the way you do. It changed me.",
      ar: "الطريقة التي تهتمين بها — بعمق وبهدوء، دون أن تطلبي شيئاً في المقابل. لم أقابل أحداً يحب كما تحبين. لقد غيّرتِني.",
    },
  },
  {
    title: {
      en: "The small things you remember",
      ar: "التفاصيل الصغيرة التي تتذكرينها",
    },
    desc: {
      en: "You remember everything I said once, in passing, that I've already forgotten. And somehow it shows up exactly when I need it. You pay attention in a way no one else does.",
      ar: "تتذكرين كل ما قلته مرة عابرة، وأنا نسيته منذ زمن. وبطريقة ما يظهر في اللحظة التي أحتاجه فيها. تنتبهين بطريقة لا يفعلها أحد غيركِ.",
    },
  },
  {
    title: { en: "How you see the world", ar: "كيف ترين العالم" },
    desc: {
      en: "Through your eyes, ordinary things become extraordinary. You taught me to slow down and actually look. I'm still learning. I want to keep learning — with you.",
      ar: "من خلال عينيكِ تصبح الأشياء العادية استثنائية. علّمتِني التباطؤ والنظر الحقيقي. ما زلت أتعلم. أريد أن أستمر — معكِ.",
    },
  },
  {
    title: {
      en: "The way you love me back",
      ar: "الطريقة التي تحبينني بها",
    },
    desc: {
      en: "I didn't know I could feel this seen. This chosen. You make me want to be better — not because you ask me to, but because I want to deserve you.",
      ar: "لم أكن أعلم أنني أستطيع أن أشعر بهذا القدر من الرؤية والاختيار. تجعلينني أريد أن أكون أفضل — ليس لأنكِ تطلبين ذلك، بل لأنني أريد أن أستحقكِ.",
    },
  },
  {
    title: {
      en: "Every quiet moment with you",
      ar: "كل لحظة هادئة معكِ",
    },
    desc: {
      en: "No words. No plans. Just us — and somehow it's always enough. More than enough. It's the kind of peace I spent years looking for.",
      ar: "بلا كلام. بلا خطط. فقط نحن — وبطريقة ما يكفي دائماً. أكثر من الكفاية. إنه نوع السلام الذي قضيت سنوات أبحث عنه.",
    },
  },
  {
    title: {
      en: "Because home is wherever you are",
      ar: "لأن البيت هو أينما كنتِ",
    },
    desc: {
      en: "I didn't understand that word until you. Now I do. And on August 25th, I get to make it official — forever.",
      ar: "لم أفهم تلك الكلمة حتى جئتِ. الآن أفهمها. وفي الخامس والعشرين من أغسطس، سأجعلها رسمية — للأبد.",
    },
  },
] as const;

export const TIMELINE = [
  {
    date: { en: "March 19 · 2023", ar: "١٩ مارس · ٢٠٢٣" },
    title: { en: "We First Met", ar: "أول لقاء" },
    desc: {
      en: "Every great love story has a beginning. Ours was no different — and we wouldn't change a single moment of it.",
      ar: "كل قصة حب عظيمة لها بداية. قصتنا لم تكن مختلفة — ولن نغير منها لحظة واحدة.",
    },
  },
  {
    date: { en: "December 9 · 2025", ar: "٩ ديسمبر · ٢٠٢٥" },
    title: { en: "He Asked, She Said Yes", ar: "سألها... فقالت نعم" },
    desc: {
      en: "The question that changed everything. Two words that meant the whole world. One year later, we make it forever.",
      ar: "السؤال الذي غيّر كل شيء. كلمتان تعنيان العالم بأسره. وبعد عام، نجعلها إلى الأبد.",
    },
  },
  {
    date: { en: "August 25 · 2026", ar: "٢٥ أغسطس · ٢٠٢٦" },
    title: { en: "The Wedding Day", ar: "يوم الزفاف" },
    desc: {
      en: "The day we say \"I do\" and begin our forever together. We can't wait to celebrate surrounded by the people we love most.",
      ar: "اليوم الذي نقول فيه 'نعم' ونبدأ معاً إلى الأبد. لا نستطيع الانتظار للاحتفال بمن نحبّهم.",
    },
  },
] as const;

export const LETTER_PARAS = [
  {
    en: "I've started this letter a hundred times. I never know where to begin — because where do you begin when someone is everything? When they are the reason you understand what people mean when they say \"I knew\"?",
    ar: "بدأت هذه الرسالة مئة مرة. لا أعرف أبداً من أين أبدأ — لأنه من أين تبدأ حين يكون شخص ما كل شيء؟ حين يكون هو السبب الذي تفهم به ما يقصده الناس حين يقولون «عرفت»؟",
  },
  {
    en: "I knew on March 19, 2023. I don't think I admitted it to myself right away, but I knew. There was something in the way you carried yourself — quietly certain, effortlessly kind — that made the rest of the world feel less complicated. You still do that. Every single day.",
    ar: "عرفت في التاسع عشر من مارس ٢٠٢٣. لا أعتقد أنني اعترفت بذلك لنفسي على الفور، لكنني عرفت. كان هناك شيء في طريقة تحمّلكِ لنفسكِ — هادئة واثقة، ولطيفة بلا تكلّف — جعل بقية العالم يبدو أقل تعقيداً. ما زلتِ تفعلين ذلك. كل يوم.",
  },
  {
    en: "I asked you on December 9th, 2025. And when you said yes, something in me exhaled that had been holding its breath for a very long time.",
    ar: "طلبت يدكِ في التاسع من ديسمبر ٢٠٢٥. وحين قلتِ نعم، تنفّس شيء في داخلي كان يحبس أنفاسه منذ وقت طويل جداً.",
  },
  {
    en: "And now — one year later, same date — I get to stand in front of everyone we love and say what I've known since the beginning: that I choose you. Today. Tomorrow. Every quiet morning and every loud, messy, beautiful day in between. I choose you.",
    ar: "والآن — بعد عام، في نفس التاريخ — أقف أمام كل من نحبهم وأقول ما عرفته منذ البداية: أنني اخترتكِ. اليوم. وغداً. وكل صباح هادئ وكل يوم صاخب وجميل بينهما. اخترتكِ.",
  },
  {
    en: "You are my home, Alaa. And I cannot wait to spend the rest of my life making sure you never forget that.",
    ar: "أنتِ بيتي يا آلاء. ولا أستطيع الانتظار لأقضي بقية حياتي في التأكد من أنكِ لن تنسي ذلك أبداً.",
  },
] as const;

export const T = {
  en: {
    heroDate: "Tuesday · August 25 · 2026",
    scroll: "Scroll",
    cdEyebrow: "Until We Say I Do",
    days: "Days",
    hours: "Hours",
    mins: "Minutes",
    secs: "Seconds",
    weekendsLeft: "Weekends Left",
    sleepsToGo: "Sleeps to Go",
    fridaysToPlan: "Fridays to Plan",
    todayIsTheDay: "Today Is The Day",
    ahmedAndAlaa: "Ahmed & Alaa",
    journeyHeadingPrefix: "Your",
    journeyHeadingEm: "Journey",
    journeySub:
      "Each day we open this page, a tile lights up — Dec 9, 2025 → Aug 25, 2026",
    dayStreak: "Day Streak",
    bestStreak: "Best Streak",
    daysHere: "Days here",
    less: "Less",
    more: "More",
    quote:
      "\"In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.\"",
    quoteAttr: "— Maya Angelou",
    storyHeadingPrefix: "Our",
    storyHeadingEm: "Story",
    storySub: "The moments that led us here",
    reasonsHeadingPrefix: "Reasons I",
    reasonsHeadingEm: "Love You",
    reasonsSub: "For Alaa, from Ahmed — with every piece of me",
    letterHeadingPrefix: "A",
    letterHeadingEm: "Letter",
    letterHeadingSuffix: "to You",
    letterSub: "Written from my heart, kept forever",
    letterDate: "August 25, 2026",
    letterSalutation: "My dearest Alaa,",
    letterClosing: "Yours, always and completely —",
    todaysThought: "Today's thought",
    madeWith: "Made with love",
    gateTitle: "Ahmed & Alaa",
    gateSub: "For us only",
    gateHint:
      "Same phrase as the \u201CFor Alaa\u201D page (your name + what you are to me).",
    milestone: (d: number) =>
      `✦ Only ${d} day${d === 1 ? "" : "s"} to go — the countdown is almost over!`,
    psLabel: (date: string) => `P.S. — I'm thinking of you today · ${date}`,
  },
  ar: {
    heroDate: "الثلاثاء · ٢٥ أغسطس · ٢٠٢٦",
    scroll: "للأسفل",
    cdEyebrow: "حتى يحين موعد الزفاف",
    days: "أيام",
    hours: "ساعات",
    mins: "دقائق",
    secs: "ثواني",
    weekendsLeft: "عطلة نهاية أسبوع",
    sleepsToGo: "ليلة متبقية",
    fridaysToPlan: "جمعة للتخطيط",
    todayIsTheDay: "اليوم هو اليوم",
    ahmedAndAlaa: "أحمد وآلاء",
    journeyHeadingPrefix: "رحلتكم",
    journeyHeadingEm: "إلى اليوم",
    journeySub:
      "كل يوم نفتح هذه الصفحة، تضيء لوحة — ٩ ديسمبر ٢٠٢٥ ← ٢٥ أغسطس ٢٠٢٦",
    dayStreak: "أيام متتالية",
    bestStreak: "أطول سلسلة",
    daysHere: "أيام معاً هنا",
    less: "أقل",
    more: "أكثر",
    quote:
      "\"في كل أرجاء العالم، لا يوجد قلب مثل قلبك. وفي كل أرجاء العالم، لا يوجد حبٌّ لك مثل حبي.\"",
    quoteAttr: "— مايا أنجيلو",
    storyHeadingPrefix: "قصّتنا",
    storyHeadingEm: "المشتركة",
    storySub: "اللحظات التي قادتنا إلى هنا",
    reasonsHeadingPrefix: "أسباب",
    reasonsHeadingEm: "حبي لكِ",
    reasonsSub: "لآلاء، من أحمد — بكل ما فيّ",
    letterHeadingPrefix: "رسالة",
    letterHeadingEm: "إليكِ",
    letterHeadingSuffix: "",
    letterSub: "كُتبت من قلبي، تُحفظ إلى الأبد",
    letterDate: "٢٥ أغسطس ٢٠٢٦",
    letterSalutation: "حبيبتي آلاء،",
    letterClosing: "لكِ، دائماً وكلياً —",
    todaysThought: "كلمة اليوم",
    madeWith: "صُنع بكل محبة",
    gateTitle: "أحمد وآلاء",
    gateSub: "لنا وحدنا",
    gateHint: "نفس عبارة صفحة «لـ آلاء» (اسمكِ وما تكونينه لي).",
    milestone: (d: number) => `✦ ${d} يوم فقط — العد التنازلي يقترب من نهايته!`,
    psLabel: (date: string) => `ملاحظة — أفكر فيكِ اليوم · ${date}`,
  },
} as const;
