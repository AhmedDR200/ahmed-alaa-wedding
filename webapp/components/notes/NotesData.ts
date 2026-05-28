export type Lang = "en" | "ar";

/**
 * The day the "one note a day" drip begins (Africa/Cairo day key, YYYY-MM-DD).
 * Note #1 unlocks on this date, #2 the next day, and so on.
 * Change this to re-time the unlocks.
 */
export const NOTES_START_KEY = "2026-05-18";

export type Note = {
  title: { en: string; ar: string };
  body: { en: string; ar: string };
};

export const NOTES: Note[] = [
  {
    title: { en: "Good morning, you", ar: "صباحكِ" },
    body: {
      en: "Before anything else today — I love you. That's the whole note. Everything I do after this is just trying to prove it.",
      ar: "قبل أي شيء اليوم — أحبكِ. هذه هي الرسالة كلها. وكل ما أفعله بعدها مجرد محاولة لإثباته.",
    },
  },
  {
    title: { en: "The little things", ar: "التفاصيل الصغيرة" },
    body: {
      en: "It's never the grand gestures I remember most. It's how you hum when you're happy, and the way you reach for my hand without looking. That's the real love story.",
      ar: "ليست المواقف الكبيرة ما أتذكره أكثر. بل طريقتكِ في الدندنة حين تكونين سعيدة، وكيف تمدّين يدكِ لي دون أن تنظري. تلك هي قصة الحب الحقيقية.",
    },
  },
  {
    title: { en: "On the hard days", ar: "في الأيام الصعبة" },
    body: {
      en: "If today felt heavy, put it down for a moment. You don't have to carry everything alone anymore — that's what I'm here for. We carry it together now.",
      ar: "إن كان اليوم ثقيلاً، ضعيه جانباً للحظة. لم يعد عليكِ حمل كل شيء وحدكِ — لهذا أنا هنا. نحملها معاً الآن.",
    },
  },
  {
    title: { en: "Your laugh", ar: "ضحكتكِ" },
    body: {
      en: "I would do almost anything to hear it. It's my favourite sound in any language, in any room, on any day. Make it for me later, will you?",
      ar: "سأفعل أي شيء تقريباً كي أسمعها. إنها صوتي المفضّل بأي لغة، في أي مكان، في أي يوم. اضحكي لي لاحقاً، أتعدينني؟",
    },
  },
  {
    title: { en: "Counting down", ar: "العدّ التنازلي" },
    body: {
      en: "Every day on this site is one day closer to August 25th — but honestly, I already feel married to you in every way that matters. The date is just paperwork for what my heart decided long ago.",
      ar: "كل يوم في هذا الموقع هو يوم أقرب إلى الخامس والعشرين من أغسطس — لكنني بصراحة أشعر أنني متزوّجكِ فعلاً بكل ما يهم. التاريخ مجرد ورق لما قرره قلبي منذ زمن.",
    },
  },
  {
    title: { en: "Thank you", ar: "شكراً لكِ" },
    body: {
      en: "For your patience with me. For laughing at jokes that weren't that funny. For choosing me again every single day. I don't take a second of it for granted.",
      ar: "على صبركِ معي. وعلى ضحككِ على نكاتٍ لم تكن مضحكة جداً. وعلى اختياركِ لي من جديد كل يوم. لا أعتبر لحظة واحدة من ذلك أمراً مفروغاً منه.",
    },
  },
  {
    title: { en: "A promise", ar: "وعد" },
    body: {
      en: "I promise to keep noticing you. Not the way you notice something new, but the way you keep noticing the sunrise — like it's a gift, every time. Because you are.",
      ar: "أعدكِ أن أظلّ ألاحظكِ. ليس كما يُلاحَظ الجديد، بل كما يُلاحَظ شروق الشمس — كأنه هدية، في كل مرة. لأنكِ كذلك.",
    },
  },
  {
    title: { en: "When you read this", ar: "حين تقرئين هذا" },
    body: {
      en: "Wherever you are right now — sitting, tired, smiling, overwhelmed — know that someone is thinking of you with his whole chest. That someone is me. Always me.",
      ar: "أينما كنتِ الآن — جالسة، متعبة، مبتسمة، أو مثقلة — اعلمي أن أحدهم يفكّر فيكِ بكل قلبه. ذلك الأحد هو أنا. دائماً أنا.",
    },
  },
  {
    title: { en: "Home", ar: "البيت" },
    body: {
      en: "People ask where I want to live one day. I never have an answer, because the truth sounds strange out loud: anywhere, as long as you're in the next room.",
      ar: "يسألني الناس أين أريد أن أعيش يوماً ما. لا أملك جواباً، لأن الحقيقة تبدو غريبة حين تُقال: في أي مكان، ما دمتِ في الغرفة المجاورة.",
    },
  },
  {
    title: { en: "Slow down with me", ar: "تمهّلي معي" },
    body: {
      en: "Let's not rush through our life. Let's have the long coffees and the pointless drives and the late conversations about nothing. That's where I'm happiest — in the in-between, with you.",
      ar: "دعينا لا نمرّ بحياتنا مسرعَين. لنحظَ بفناجين القهوة الطويلة والجولات بلا هدف والأحاديث المتأخرة عن لا شيء. هناك أكون أسعد — في ما بين اللحظات، معكِ.",
    },
  },
  {
    title: { en: "I'm proud of you", ar: "أنا فخورٌ بكِ" },
    body: {
      en: "For everything you've survived that no one claps for. For getting up again. I see it, even when you think no one does. Especially then.",
      ar: "على كل ما تجاوزتِه ولم يصفّق له أحد. وعلى نهوضكِ من جديد. أنا أرى ذلك، حتى حين تظنّين أن لا أحد يرى. خاصةً حينها.",
    },
  },
  {
    title: { en: "Us, against nothing", ar: "نحن، ضدّ لا شيء" },
    body: {
      en: "People say \"us against the world.\" I don't even want it to be a fight. I just want us — quiet, certain, on the same team for the rest of it.",
      ar: "يقول الناس «نحن ضد العالم». أنا لا أريدها معركة أصلاً. أريدنا فقط — هادئَين، واثقَين، في فريق واحد لبقية العمر.",
    },
  },
  {
    title: { en: "A small confession", ar: "اعترافٌ صغير" },
    body: {
      en: "I reread our old messages sometimes. Not because I miss who we were — but because I can't believe how much more I love who we've become.",
      ar: "أعيد قراءة رسائلنا القديمة أحياناً. ليس لأنني أفتقد من كنّا — بل لأنني لا أصدّق كم أحبّ أكثر من صرنا عليه.",
    },
  },
  {
    title: { en: "Until tomorrow", ar: "إلى الغد" },
    body: {
      en: "That's all for today. Come back tomorrow and I'll be here again, the same way I'll be here every tomorrow for the rest of my life. I love you, Alaa.",
      ar: "هذا كل شيء لليوم. عودي غداً وسأكون هنا من جديد، تماماً كما سأكون في كل غدٍ لبقية حياتي. أحبكِ يا آلاء.",
    },
  },
];
