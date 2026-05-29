"use client";

import { ArrowRight, CalendarDays, MapPin, Mail, Phone, ExternalLink, MessageCircle, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

function BlogImagePlaceholder({ alt }) {
  return (
    <div className="flex h-full min-h-[300px] w-full items-center justify-center bg-gradient-to-br from-[#bd902f]/20 to-[#bd902f]/5">
      <span className="font-serif text-2xl font-bold text-[#bd902f]/70">{alt}</span>
    </div>
  );
}

const _legacyPosts = [
  {
    id: 1,
    title: "Recap of Recent Events Hosted at Our Hotel",
    category: "Event",
    date: "27 Nov 2025",
    image: "/images/post-1.jpg",
    excerpt: "Join us as we look back at the memorable events and celebrations that took place at Dire Dawa Ras Hotel. From corporate conferences to wedding receptions, discover how we make every occasion special.",
    content: "Join us as we look back at the memorable events and celebrations that took place at Dire Dawa Ras Hotel. From corporate conferences to wedding receptions, discover how we make every occasion special. Our dedicated events team works tirelessly to ensure every detail is perfect, from catering to decoration. This past quarter, we hosted over 50 successful events, including international business meetings, cultural festivals, and intimate family gatherings. Our state-of-the-art banquet halls and personalized service continue to make us the preferred venue for discerning hosts."
  },
  {
    id: 2,
    title: "Meet Our Chef: Culinary Inspiration Stories",
    category: "Restaurant",
    date: "14 Oct 2025",
    image: "/images/post-2.jpg",
    excerpt: "Discover the culinary journey of our executive chef and the inspiration behind our signature dishes. Learn about local ingredients and international techniques that create unforgettable dining experiences.",
    content: "Discover the culinary journey of our executive chef and the inspiration behind our signature dishes. With over 20 years of experience in luxury hotels across Africa and Europe, Chef Marcus brings a unique fusion of Ethiopian and Mediterranean cuisine to our restaurant. His passion for using locally sourced ingredients combined with classical French techniques has earned our restaurant recognition as one of the finest dining establishments in the region. In this exclusive interview, he shares his creative process and the stories behind our most beloved dishes."
  },
  {
    id: 3,
    title: "Business Travel Tips for a Productive Stay",
    category: "Travel",
    date: "15 Jul 2025",
    image: "/images/post-3.jpg",
    excerpt: "Maximize your productivity during business trips with our expert tips. Learn about our business-friendly amenities, high-speed connectivity, and services designed for the modern corporate traveler.",
    content: "Maximize your productivity during business trips with our expert tips. Our hotel is specifically designed to cater to the needs of business travelers, featuring ergonomic workspaces in every room, 24-hour business center, and high-speed fiber optic internet throughout the property. We also offer secretarial services, meeting rooms with the latest AV equipment, and a dedicated concierge team to assist with travel arrangements. Discover how to balance work and relaxation during your stay, with recommendations for our wellness facilities and nearby attractions perfect for unwinding after a productive day."
  }
];

function Pill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-black/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-neutral-700">
      {children}
    </span>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f5f1] font-sans text-neutral-900">
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
            <Link href="/gallery" className="hover:text-[#bd902f] transition-colors">Gallery</Link>
            <Link href="/blog" className="text-[#bd902f]">Blog</Link>
            <Link href="/contact" className="hover:text-[#bd902f] transition-colors">Contact</Link>
          </div>
        </nav>
      </header>

      {/* Page Header */}
      <section className="relative overflow-hidden px-5 py-24 text-center">
        <img src="/images/about.jpg" alt="Blog Header" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Pill>Blog</Pill>
          <h1 className="mt-5 font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
            Latest <span className="text-[#bd902f]">News & Updates</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300">
            Stay updated with the latest news, events, and stories from Dire Dawa Ras Hotel
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10">
            {loading && <p className="text-center text-neutral-500">Loading blog posts...</p>}
            {!loading && posts.length === 0 && <p className="text-center text-neutral-500">No blog posts available.</p>}
            {posts.map((post) => (
              <article
                key={post.id}
                className="grid gap-8 overflow-hidden rounded-[2.5rem] bg-[#f7f5f1] shadow-sm lg:grid-cols-2"
              >
                <div className="relative overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  ) : (
                    <BlogImagePlaceholder alt={post.title} />
                  )}
                  <span className="absolute left-6 top-6 rounded-full bg-[#bd902f] px-4 py-2 text-xs font-bold text-white">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="flex items-center gap-2 text-sm text-neutral-500">
                    <CalendarDays size={16} />
                    {post.date}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl font-bold leading-tight">
                    {post.title}
                  </h2>
                  <p className="mt-4 leading-7 text-neutral-600">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 leading-7 text-neutral-600">
                    {post.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden px-5 pt-24 text-white">
        <img src="/images/about.jpg" alt="Footer Background" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 pb-16 border-b border-white/10 sm:grid-cols-2 lg:grid-cols-3">
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
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
            <div>
              <h4 className="mb-4 font-bold">Contact Info</h4>
              <div className="space-y-3 text-neutral-400">
                <p className="flex items-center gap-3">
                  <MapPin size={18} className="text-[#bd902f]" />
                  HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={18} className="text-[#bd902f]" />
                  +251 251 113 255
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={18} className="text-[#bd902f]" />
                  info@diredawarashhotel.com
                </p>
              </div>
              <div className="mt-6 flex gap-4">
                <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#bd902f]">
                  <Facebook size={18} />
                </a>
                <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#bd902f]">
                  <MessageCircle size={18} />
                </a>
                <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#bd902f]">
                  <Youtube size={18} />
                </a>
                <a href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-[#bd902f]">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="py-6 text-center text-sm text-neutral-500">
            © 2025 Dire Dawa Ras Hotel. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
