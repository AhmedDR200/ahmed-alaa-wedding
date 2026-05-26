"use client";

const whispers = [
  "You are my answered prayer.",
  "Every day with you is a gift.",
  "Your smile still fixes everything.",
  "I still choose you. Always.",
  "Our story is my favorite place.",
  "Love you more than yesterday.",
];

export default function DailyWhisperSection() {
  const whisper = whispers[0];

  return (
    <section className="section-wrap pt-0">
      <div className="rounded-2xl border border-gold/25 bg-white/75 p-7 text-center">
        <p className="uppercase tracking-[0.15em] text-xs text-muted mb-3">
          Daily Whisper
        </p>
        <p className="font-serif text-2xl sm:text-3xl text-gold">{whisper}</p>
      </div>
    </section>
  );
}
