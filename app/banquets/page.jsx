"use client";

import { ArrowRight, Phone, MapPin, Mail, ExternalLink, MessageCircle, Users } from "lucide-react";
import Link from "next/link";

const banquetSpaces = [
  { name: "Royal Ballroom", capacity: "500 – 1000 Guests", image: "/images/banquets.jpg", badge: null },
  { name: "Emerald Hall", capacity: "150 – 400 Guests", image: "/images/banquets.jpg", badge: "Popular" },
  { name: "Crystal Hall", capacity: "20 – 120 Guests", image: "/images/banquets.jpg", badge: null }
];

const amenities = [
  { title: "Spacious Event Halls", desc: "Elegant banquet spaces designed to comfortably accommodate intimate gatherings as well as large-scale celebrations." },
  { title: "Customizable Seating Layouts", desc: "Versatile seating plans tailored to match the style and scale of your event." },
  { title: "Elegant Interior Decor", desc: "Beautifully designed interiors that create the perfect ambiance for weddings, parties, and corporate functions." },
  { title: "Advanced Audio-Visual Setup", desc: "High-quality AV equipment to ensure every speech, performance, and presentation is delivered flawlessly." },
  { title: "In-House Catering Services", desc: "Delight your guests with professionally curated menus and exceptional dining experiences." },
  { title: "Bridal - VIP Rooms", desc: "Private and comfortable rooms for bridal preparation, special guests, or event coordination." }
];

function Pill({ children }) {
  return <span className="inline-flex rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500">{children}</span>;
}

export default function BanquetsPage() {
  return (
    <main className="bg-[#f7f5f1] font-sans text-neutral-900 selection:bg-[#bd902f]/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-serif text-2xl font-bold text-[#bd902f]">Dire Dawa Ras Hotel</Link>
          <div className="hidden items-center gap-8 text-sm font-semibold text-neutral-700 lg:flex">
            <Link href="/" className="hover:text-[#bd902f] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#bd902f] transition-colors">About</Link>
            <Link href="/room" className="hover:text-[#bd902f] transition-colors">Rooms</Link>
            <Link href="/restaurant" className="hover:text-[#bd902f] transition-colors">Restaurant</Link>
            <Link href="/banquets" className="text-[#bd902f]">Banquets</Link>
            <Link href="/gallery" className="hover:text-[#bd902f] transition-colors">Gallery</Link>
            <Link href="/blog" className="hover:text-[#bd902f] transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-[#bd902f] transition-colors">Contact</Link>
            <Link href="/#amenities" className="hover:text-[#bd902f] transition-colors">Amenities</Link>
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

      {/* Hero Header */}
      <section className="relative flex h-[350px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/70" />
        <img
          src="/images/banquets/banquets.jpg"
          alt="Banquets Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-20 text-center text-white px-5 mt-16">
          <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">Banquets</h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Banquets</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Pill>Elegant spaces</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Celebrate <span className="text-[#bd902f]">Life's</span> <span className="text-[#bd902f]">Grandest</span> Moments
            </h2>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 items-center">
            <div className="text-center">
              <img src="/images/banquets/banquets.jpg" alt="Banquet Hall" className="rounded-[2.5rem] object-cover w-full h-[400px] shadow-sm mx-auto" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">The Perfect Venue for <span className="text-[#bd902f]">every occasion</span></h3>
              <p className="text-lg text-neutral-600 mb-4">Elegant spaces for weddings, corporate events & unforgettable moments.</p>
              <ul className="space-y-2 text-neutral-500 mb-6">
                <li className="flex items-center gap-2"><span className="text-[#bd902f]"><ArrowRight size={16} /></span>Multiple banquet halls available</li>
                <li className="flex items-center gap-2"><span className="text-[#bd902f]"><ArrowRight size={16} /></span>Customizable seating layouts</li>
                <li className="flex items-center gap-2"><span className="text-[#bd902f]"><ArrowRight size={16} /></span>Premium décor options</li>
                <li className="flex items-center gap-2"><span className="text-[#bd902f]"><ArrowRight size={16} /></span>Ideal for 50–1000 guests</li>
              </ul>
              <div className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm border border-black/5 inline-flex">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><Phone size={20} /></span>
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Call for Inquiry</p>
                  <p className="text-base font-bold text-neutral-800">+251 251 113 255</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banquet Spaces */}
      <section className="bg-white py-16 px-5">
        <div className="mx-auto max-w-7xl text-center">
          <Pill>Flexible Venues</Pill>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Banquet <span className="text-[#bd902f]">Spaces</span>
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {banquetSpaces.map((space, idx) => (
              <div key={idx} className="relative rounded-[2.5rem] overflow-hidden shadow-sm group">
                <img src={space.image} alt={space.name} className="h-[350px] w-full object-cover transition-transform group-hover:scale-105" />
                {space.badge && (
                  <div className="absolute top-4 left-4 rounded-full bg-[#bd902f] px-4 py-1.5 text-xs font-bold text-white">
                    {space.badge}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="flex items-center gap-2 text-sm font-bold text-white uppercase mb-2">
                    <Users size={16} /> {space.capacity}
                  </p>
                  <h3 className="text-2xl font-bold text-white">{space.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
            >
              <span>Inquiry Now</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#bd902f] transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl text-center">
          <Pill>Our Amenities</Pill>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Premium <span className="text-[#bd902f]">Amenities</span> for <span className="text-[#bd902f]">Seamless</span> Celebrations
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="flex gap-4 border-b border-neutral-200 pb-8">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-black/10 bg-white text-[#bd902f] text-xl font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{amenity.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{amenity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#bd902f] py-20 px-5 text-center text-white">
        <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          Let's Plan <span className="text-black">Your Perfect</span> Event Today
        </h2>
        <div className="mt-8">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-sm font-bold text-white transition hover:bg-neutral-900"
          >
            <span>Contact Us</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-black">
              <ArrowRight size={13} />
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden px-5 pt-24 text-white">
        <img src="/images/about.jpg" alt="Footer Background" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 pb-16 border-b border-white/10">
            <div>
              <h3 className="font-serif text-3xl font-bold tracking-wide">Dire Dawa Ras Hotel</h3>
              <p className="mt-4 leading-relaxed text-neutral-400">
                Established in 1964 EC - Uncover a historical and luxurious haven at Hotel Dire Dawa Ras. Nestled in the heart of Kezira, our hotel offers modern elegance, warm hospitality, and more than 60 years of expertise.
              </p>
            </div>
            <div className="flex flex-col gap-3 font-semibold text-neutral-300">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/room" className="hover:text-white transition-colors">Rooms</Link>
              <Link href="/restaurant" className="hover:text-white transition-colors">Restaurant</Link>
              <Link href="/banquets" className="hover:text-white transition-colors">Banquets</Link>
              <Link href="/#amenities" className="hover:text-white transition-colors">Amenities</Link>
              <Link href="/#contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
            <div className="space-y-4 text-neutral-300">
              <div className="flex gap-3">
                <MapPin className="shrink-0 text-[#bd902f]" size={20} />
                <span>HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia</span>
              </div>
              <div className="flex gap-3">
                <Phone className="shrink-0 text-[#bd902f]" size={20} />
                <span>+251 251 113 255</span>
              </div>
              <div className="flex gap-3">
                <Mail className="shrink-0 text-[#bd902f]" size={20} />
                <span>ddrashotel1@gmail.com</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-semibold">
                <a href="https://www.facebook.com/profile.php?id=61570400957998" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10"><ExternalLink size={12} /> Facebook</a>
                <a href="https://www.tiktok.com/@ras_dire" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10"><ExternalLink size={12} /> TikTok</a>
                <a href="https://www.youtube.com/@rashoteldiredawa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10"><ExternalLink size={12} /> YouTube</a>
                <a href="https://wa.me/251915320033" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10"><MessageCircle size={12} /> WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="py-6 text-center text-sm text-neutral-500">
            Copyright &copy; 2026 Dire Dawa Ras Hotel. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
