import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/flame", label: "Flame" },
  { href: "/our-song", label: "Song" },
  { href: "/memes", label: "Memes" },
  { href: "/us", label: "Us" },
  { href: "/secrets", label: "Secrets" },
  { href: "/for-alaa", label: "For Alaa" },
];

export default function Nav() {
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <Link
          className="font-serif text-xl tracking-[0.25em] text-gold hidden sm:block"
          href="/"
        >
          A &amp; A
        </Link>
        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="uppercase text-[10px] sm:text-xs tracking-[0.16em] text-muted hover:text-gold whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
