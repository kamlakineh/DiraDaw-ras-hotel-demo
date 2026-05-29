"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Phone, MapPin, Mail, ExternalLink, MessageCircle, Plus, Play, Calendar } from "lucide-react";
import Link from "next/link";
import CheckAvailabilityForm from "../../components/CheckAvailabilityForm";

function Pill({ children }) {
  return <span className="inline-flex rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500">{children}</span>;
}

function GalleryItem({ src, title, description, category }) {
  return (
    <div className="break-inside-avoid mb-4">
      <div className="relative overflow-hidden rounded-[2.5rem] group cursor-pointer bg-white border border-neutral-100 shadow-sm">
        <img src={src} alt={title || "Gallery"} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-block px-3 py-1 bg-[#bd902f] text-white text-[10px] font-bold uppercase tracking-wider rounded-full w-max mb-2">
            {category}
          </span>
          <h3 className="font-serif text-lg font-bold text-white leading-tight">{title}</h3>
          {description && <p className="text-xs text-neutral-300 mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery");
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "room", name: "Rooms" },
    { id: "restaurant", name: "Restaurant" },
    { id: "event", name: "Events" },
    { id: "hotel", name: "Hotel" }
  ];

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter(img => img.category?.toLowerCase() === activeCategory);
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
            <Link href="/banquets" className="hover:text-[#bd902f] transition-colors">Banquets</Link>
            <Link href="/gallery" className="text-[#bd902f]">Gallery</Link>
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
          alt="Gallery Header"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-20 text-center text-white px-5 mt-16">
          <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">Gallery</h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl text-center">
          <Pill>Images</Pill>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Image <span className="text-[#bd902f]">Gallery</span>
          </h2>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#bd902f] text-white border-[#bd902f] shadow-md shadow-[#bd902f]/20"
                    : "bg-white text-neutral-600 border-neutral-200 hover:border-[#bd902f] hover:text-[#bd902f]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-12">
          {loading ? (
            <div className="text-center py-20 text-neutral-500 font-medium">Loading gallery...</div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20 text-neutral-500 font-medium">No images found in this category.</div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {filteredImages.map((item) => (
                <GalleryItem
                  key={item.id}
                  src={item.image}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Check Availability */}
      <section className="bg-white py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Pill>Plan Your Stay</Pill>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Embark on <span className="text-[#bd902f]">Your Bespoke</span> Experience
              </h2>
              <p className="mt-6 text-lg text-neutral-600">
                Discover your perfect retreat. Select your dates, choose your suite, and secure your exclusive experience at Dire Dawa Ras Hotel.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#f7f5f1] p-5 border border-black/5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><Phone size={20} /></span>
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Call us for Inquiry</p>
                  <p className="text-base font-bold text-neutral-800">+251 251 113 255</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-black/5">
              <h3 className="text-2xl font-bold mb-6">Check <span className="text-[#bd902f]">Availability</span></h3>
              <CheckAvailabilityForm />
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
              <Link href="/banquets" className="hover:text-white transition-colors">Banquets</Link>
              <Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
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
