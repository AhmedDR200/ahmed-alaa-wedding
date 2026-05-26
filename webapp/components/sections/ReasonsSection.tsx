const reasons = [
  "You make ordinary days feel sacred.",
  "You are calm when life gets loud.",
  "You carry kindness in every detail.",
  "You make me want to become better.",
  "With you, even silence feels complete.",
  "You are my safest place.",
];

export default function ReasonsSection() {
  return (
    <section className="section-wrap">
      <h2 className="section-heading">
        Reasons I <em>Love You</em>
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reasons.map((reason, index) => (
          <div
            key={reason}
            className="rounded-xl bg-charcoal text-cream px-5 py-6 border border-gold/25"
          >
            <p className="font-serif text-gold mb-2 text-xl">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="leading-relaxed">{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
