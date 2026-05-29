"use client";

import { ArrowRight, Phone, Mail, MapPin, Send, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CheckAvailabilityForm from "../../components/CheckAvailabilityForm";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

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
            <Link href="/gallery" className="hover:text-[#bd902f] transition-colors">Gallery</Link>
            <Link href="/blog" className="hover:text-[#bd902f] transition-colors">Blog</Link>
            <Link href="/contact" className="text-[#bd902f]">Contact</Link>
            <Link href="/menu" className="hover:text-[#bd902f] transition-colors">Menu</Link>
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
          alt="Contact Header"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-20 text-center text-white px-5 mt-16">
          <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">Contact Us</h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-5 border border-black/5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><Phone size={20} /></span>
              <div className="w-px bg-black/10" />
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Call us for Inquiry</p>
                <p className="text-base font-bold text-neutral-800">+251 251 113 255</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-5 border border-black/5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><Mail size={20} /></span>
              <div className="w-px bg-black/10" />
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email Address</p>
                <p className="text-base font-bold text-neutral-800">ddrashotel1@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-5 border border-black/5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><MapPin size={20} /></span>
              <div className="w-px bg-black/10" />
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Address</p>
                <p className="text-base font-bold text-neutral-800">HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia</p>
              </div>
            </div>
          </div>

          {/* Get in Touch */}
          <div className="mt-12 grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative text-center">
              <img src="/images/contact-us.jpg" alt="Contact" className="mx-auto rounded-[2.5rem] w-full max-w-lg object-cover" />
              <div className="absolute -right-4 -top-4 hidden lg:block">
                <div className="relative h-32 w-32">
                  <svg viewBox="0 0 100 100" className="h-full w-full animate-spin" style={{ animationDuration: "20s" }}>
                    <defs>
                      <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text fill="#bd902f" fontSize="8" fontWeight="bold" letterSpacing="2">
                      <textPath href="#circle">LUXURY HOTEL EXPERIENCE</textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#bd902f] text-white">
                      <Phone size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Get in <span className="text-[#bd902f]">Touch</span>
              </h2>

              <form onSubmit={handleContactSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Full Name*</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    required
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Phone*</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    required
                    placeholder="Your Phone Number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Email*</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    required
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Message*</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-[2.5rem] border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none resize-none"
                    rows={5}
                    required
                    placeholder="Your Message"
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
                >
                  <span>Send Message</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#bd902f] transition-transform group-hover:translate-x-0.5">
                    <Send size={13} />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="border-y border-black/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5!2d41.8667!3d9.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzYnMDAuMCJOIDQxwrA1MycwMC4wIkU!5e0!3m2!1sen!2set!4v1234567890"
          className="w-full h-[450px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Check Availability */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500">Plan Your Stay</span>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Embark on <span className="text-[#bd902f]">Your Bespoke</span> Experience
              </h2>
              <p className="mt-6 text-lg text-neutral-600">
                Discover your perfect retreat. Select your dates, choose your suite, and secure your exclusive experience at Dire Dawa Ras Hotel.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#f7f5f1] p-5 border border-black/5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><Phone size={20} /></span>
                <div className="w-px bg-black/10" />
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
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
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
                <a href="https://www.facebook.com/profile.php?id=61570400957998" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10">Facebook</a>
                <a href="https://www.tiktok.com/@ras_dire" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10">TikTok</a>
                <a href="https://www.youtube.com/@rashoteldiredawa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10">YouTube</a>
                <a href="https://wa.me/251915320033" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10">WhatsApp</a>
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
