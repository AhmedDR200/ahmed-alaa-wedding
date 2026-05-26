const timeline = [
  {
    title: "The Beginning",
    body: "The first hello that somehow sounded like home.",
  },
  {
    title: "The Promise",
    body: "A quiet decision to keep showing up for each other.",
  },
  {
    title: "The Wedding Date",
    body: "August 25, 2026. Written with certainty and joy.",
  },
];

export default function StorySection() {
  return (
    <section className="section-wrap">
      <h2 className="section-heading">
        Our <em>Story</em>
      </h2>
      <div className="grid gap-4 sm:gap-5">
        {timeline.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-gold/20 bg-white/60 px-5 py-6 sm:px-7"
          >
            <h3 className="font-serif text-2xl text-gold mb-2">{item.title}</h3>
            <p className="text-muted leading-relaxed">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
