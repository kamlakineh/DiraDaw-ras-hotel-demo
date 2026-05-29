"use client";

import { ArrowRight, Phone, Star, MapPin, Mail, ExternalLink, MessageCircle, Car, Wifi, Monitor, Shirt, Utensils } from "lucide-react";
import Link from "next/link";

const amenities = [
  { title: "Pick Up & Drop", icon: Car, desc: "Free pick up from the railway station, airport, or bus stand with well-maintained vehicles." },
  { title: "High Speed Wifi", icon: Wifi, desc: "Enjoy seamless high-speed Wi-Fi, available in all guest rooms and public areas." },
  { title: "EV Charger", icon: Monitor, desc: "Convenient on-site EV charging services compatible with all major electric models." },
  { title: "Laundry", icon: Shirt, desc: "Professional, prompt laundry and dry cleaning services to keep your clothes fresh." },
  { title: "Swimming Pool", icon: Monitor, desc: "Dive into relaxation at our pristine swimming pool, designed for leisure and fitness." },
  { title: "Bar & Restaurant", icon: Utensils, desc: "Gourmet meals, expertly mixed cocktails, and fine wines made with fresh ingredients." }
];

function Pill({ children }) {
  return <span className="inline-flex rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500">{children}</span>;
}

export default function AboutPage() {
  return (
    <main className="bg-[#f7f5f1] font-sans text-neutral-900 selection:bg-[#bd902f]/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-serif text-2xl font-bold text-[#bd902f]">Dire Dawa Ras Hotel</Link>
          <div className="hidden items-center gap-8 text-sm font-semibold text-neutral-700 lg:flex">
            <Link href="/" className="hover:text-[#bd902f] transition-colors">Home</Link>
            <Link href="/about" className="text-[#bd902f]">About</Link>
            <Link href="/room" className="hover:text-[#bd902f] transition-colors">Rooms</Link>
            <Link href="/restaurant" className="hover:text-[#bd902f] transition-colors">Restaurant</Link>
            <Link href="/banquets" className="hover:text-[#bd902f] transition-colors">Banquets</Link>
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
        <div className="absolute inset-0 z-10 bg-black/60" />
        <img
          src="/images/slide1.png"
          alt="About Header"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-20 text-center text-white px-5 mt-16">
          <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">About Us</h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </div>
        </div>
      </section>

      {/* Main Description */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Pill>About Dire Dawa Ras</Pill>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Discover <span className="text-[#bd902f]">unique holidays</span> enhanced by personalized experience
              </h2>
              <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                Uncover a luxurious and historical haven at Dire Dawa Ras Hotel, Ethiopia. Nestled in the heart of Kezira, our hotel offers modern elegance, warm hospitality, and rich memories.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-500">
                Experience comfort in stylish rooms, savor local and international culinary delights at our restaurant, and host memorable events in our versatile banquet spaces. Unwind at our gorgeous premises or explore the historical Kezira neighborhood easily. With impeccable service, Dire Dawa Ras Hotel ensures a delightful stay.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link
                  href="/room"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
                >
                  <span>Rooms & Suites</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#bd902f] transition-transform group-hover:translate-x-0.5">
                    <ArrowRight size={13} />
                  </span>
                </Link>

                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><Phone size={20} /></span>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Call for Inquiry</p>
                    <p className="text-base font-bold text-neutral-800">+251 251 113 255</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative text-center">
              <img src="/images/about.jpg" alt="Hotel Interior" className="rounded-[2.5rem] object-cover w-full h-[450px] shadow-sm" />
              <div className="absolute bottom-6 left-6 right-6 text-left rounded-3xl bg-black/60 p-6 backdrop-blur-sm text-white">
                A new kind of hospitality experience, crafted for business and leisure travellers alike.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Amenities */}
      <section className="bg-white py-16 px-5">
        <div className="mx-auto max-w-7xl text-center">
          <Pill>Hotel Amenities</Pill>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Our Premium, <span className="text-[#bd902f]">Industry Leading</span> Facilities
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={amenity.title}
                  className="rounded-[2.5rem] border border-black/5 bg-[#f7f5f1] p-8 text-left transition hover:shadow-sm"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-black/10 bg-white text-[#bd902f]">
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{amenity.title}</h3>
                  <p className="mt-3 leading-relaxed text-neutral-500">{amenity.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Pill>Services</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              We provide <span className="text-[#bd902f]">Top Class Facilities</span> for You
            </h2>
          </div>

          <div className="mt-16 space-y-16">
            {/* Restaurant */}
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <img src="/images/restaurant-about.jpg" alt="Restaurant" className="rounded-[2.5rem] object-cover h-[350px] w-full" />
              <div>
                <Pill>Meal With Us</Pill>
                <h3 className="mt-5 font-serif text-3xl font-bold">The Restaurant</h3>
                <p className="mt-4 leading-relaxed text-neutral-500">
                  Dire Dawa Ras Hotel introduces guests to a memorable experience in dining out, fast becoming a preferred choice. We offer local delicacies and premium European dishes prepared by professional chefs.
                </p>
                <Link
                  href="/restaurant"
                  className="group mt-6 inline-flex items-center gap-3 rounded-full bg-[#bd902f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a67724]"
                >
                  <span>Read More</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Banquet Hall */}
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="lg:order-2">
                <img src="/images/about.jpg" alt="Banquet Hall" className="rounded-[2.5rem] object-cover h-[350px] w-full" />
              </div>
              <div className="lg:order-1">
                <Pill>We Find Happiness</Pill>
                <h3 className="mt-5 font-serif text-3xl font-bold">Banquet Hall</h3>
                <p className="mt-4 leading-relaxed text-neutral-500">
                  Our hotel offers high-standard banquet hall venues, with extensive facilities for wedding functions, social gatherings, parties, conferences, and seminars to suit all needs.
                </p>
                <Link
                  href="/#contact"
                  className="group mt-6 inline-flex items-center gap-3 rounded-full bg-[#bd902f] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a67724]"
                >
                  <span>Read More</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative overflow-hidden px-5 py-16 text-white">
        <img src="/images/experience.jpg" alt="Experience BG" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <img src="/images/about.jpg" alt="Experience Showcase" className="rounded-[2.5rem] object-cover h-[400px] w-full" />
            <div>
              <Pill>Our Experience</Pill>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Our Years of Experience Will <span className="text-[#bd902f]">Serve the Best</span>
              </h2>
              <p className="mt-6 text-lg text-neutral-300">
                We have <span className="text-[#bd902f] font-bold">60+ years</span> of experience & we have great memories.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-400">
                With a heritage dating back to 1964 EC, Dire Dawa Ras Hotel is committed to delivering exceptional service. Backed by generations of hospitality expertise, we ensure a comfortable and memorable stay in Kezira, Dire Dawa.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-3xl font-bold text-[#bd902f]">95K+</h3>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mt-1">Happy Clients</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#bd902f]">800+</h3>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mt-1">Functions Arranged</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#bd902f]">32+</h3>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mt-1">Hotel Rooms</p>
                </div>
              </div>
            </div>
          </div>
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
