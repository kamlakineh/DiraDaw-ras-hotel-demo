"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/room", label: "Rooms" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/banquets", label: "Banquets" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/#amenities", label: "Amenities" },
];

export default function Navbar({ activePage = "", transparent = false }) {
  return (
    <header className={`${transparent ? "fixed left-0 right-0 top-0 bg-black/25" : "sticky top-0 bg-white/95"} z-50 border-b border-white/10 backdrop-blur-md`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className={`font-serif text-2xl font-bold ${transparent ? "text-white" : "text-[#bd902f]"}`}>
          Dire Dawa Ras Hotel
        </Link>
        <div className={`hidden items-center gap-8 text-sm font-semibold lg:flex ${transparent ? "text-white/90" : "text-neutral-700"}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={activePage === link.label ? "text-[#bd902f]" : "hover:text-[#bd902f] transition-colors"}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          href="/#booking"
          className="hidden items-center gap-3 rounded-full bg-[#bd902f] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#a67724] lg:inline-flex"
        >
          <span>Book Now</span>
          <ArrowRight size={15} />
        </Link>
      </nav>
    </header>
  );
}
