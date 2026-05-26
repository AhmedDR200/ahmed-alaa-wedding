import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

type RouteStubPageProps = {
  title: string;
  note: string;
};

export default function RouteStubPage({ title, note }: RouteStubPageProps) {
  return (
    <div className="page-shell min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 section-wrap grid place-items-center">
        <div className="max-w-2xl text-center rounded-2xl border border-gold/25 bg-white/70 p-8">
          <h1 className="section-heading mb-3">
            {title} <em>Page</em>
          </h1>
          <p className="text-muted leading-relaxed">{note}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
