export default function HeroSection() {
  return (
    <section className="section-wrap pt-20 sm:pt-28 text-center">
      <p className="uppercase tracking-[0.22em] text-xs text-muted mb-5">
        August 25, 2026
      </p>
      <div className="mx-auto mb-6 h-28 w-28 rounded-full border border-gold grid place-items-center text-gold font-serif text-3xl">
        A&amp;A
      </div>
      <h1 className="font-serif text-[clamp(2.3rem,8vw,5.5rem)] leading-none tracking-[0.08em]">
        Ahmed <span className="text-gold">&amp;</span> Alaa
      </h1>
      <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-muted leading-relaxed">
        A small corner of the internet for our memories, our milestones, and the
        promises we are keeping one day at a time.
      </p>
    </section>
  );
}
