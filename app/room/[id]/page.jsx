"use client";

import { ArrowRight, Phone, MapPin, Mail, Wifi, Utensils, Tv, Baby, Martini, DoorOpen, Vault, Waves, Expand, Users, Bed, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { rooms } from "../../../data/rooms";
import CheckAvailabilityForm from "../../../components/CheckAvailabilityForm";

export default function RoomDetailPage({ params }) {
  const room = rooms.find(r => r.id === parseInt(params.id));
  const [currentImage, setCurrentImage] = useState(0);

  if (!room) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f5f1]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Room Not Found</h1>
          <Link href="/room" className="text-[#bd902f] hover:underline">Back to Rooms</Link>
        </div>
      </main>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % room.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);
  };

  const otherRooms = rooms.filter(r => r.id !== room.id);

  return (
    <main className="bg-[#f7f5f1] font-sans text-neutral-900 selection:bg-[#bd902f]/30">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-serif text-2xl font-bold text-[#bd902f]">Dire Dawa Ras Hotel</Link>
          <div className="hidden items-center gap-8 text-sm font-semibold text-neutral-700 lg:flex">
            <Link href="/" className="hover:text-[#bd902f] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#bd902f] transition-colors">About</Link>
            <Link href="/room" className="text-[#bd902f]">Rooms</Link>
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

      {/* Page Header */}
      <section className="relative flex h-[350px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/60" />
        <img
          src={room.image}
          alt={room.name}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-20 text-center text-white px-5 mt-16">
          <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">{room.name}</h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/room" className="hover:text-white transition-colors">Rooms</Link>
            <span>/</span>
            <span className="text-white">{room.name}</span>
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-4">
            <div className="lg:col-span-3">
              {/* Image Gallery */}
              <div className="relative rounded-[2.5rem] overflow-hidden mb-6">
                <img
                  src={room.gallery[currentImage]}
                  alt={`${room.name} - Image ${currentImage + 1}`}
                  className="h-[500px] w-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-black shadow-lg transition hover:bg-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-black shadow-lg transition hover:bg-white"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {room.gallery.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`h-2 w-2 rounded-full transition ${idx === currentImage ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Room Info */}
              <span className="inline-flex rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500">Meal with us</span>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                {room.name.split(" ")[0]} <span className="text-[#bd902f]">{room.name.split(" ").slice(1).join(" ")}</span>
              </h2>
              <p className="mt-3 text-lg text-neutral-600 italic">"Spacious comfort with refined luxury for a truly relaxing stay."</p>

              <div className="mt-6 flex flex-wrap gap-6 text-neutral-600">
                <div className="flex items-center gap-2">
                  <Expand className="text-[#bd902f]" size={20} />
                  <span>{room.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-[#bd902f]" size={20} />
                  <span>{room.guests}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="text-[#bd902f]" size={20} />
                  <span>{room.bed}</span>
                </div>
              </div>

              <p className="mt-6 leading-relaxed text-neutral-600">{room.longDescription}</p>
              <p className="mt-4 leading-relaxed text-neutral-600">Ideal for both short visits and extended stays, the {room.name} provides a peaceful environment where every detail is tailored to help you unwind and feel at home.</p>

              {/* Amenities */}
              <h3 className="mt-8 text-2xl font-bold">Room Amenities</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-neutral-600">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]">
                      {amenity === "Free WiFi" && <Wifi size={16} />}
                      {amenity === "BreakFast" && <Utensils size={16} />}
                      {amenity === "Television" && <Tv size={16} />}
                      {amenity === "Free Baby Bed" && <Baby size={16} />}
                      {amenity === "Mini-bar" && <Martini size={16} />}
                      {amenity === "Mini Refrigerator" && <DoorOpen size={16} />}
                      {amenity === "Safe Box" && <Vault size={16} />}
                      {amenity === "Swimming Pool" && <Waves size={16} />}
                      {amenity.includes("TV") && !amenity.includes("Free") && <Tv size={16} />}
                    </span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Rules */}
              <h3 className="mt-8 text-2xl font-bold">Hotels Rules</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Check-in:</p>
                  <p className="font-bold text-neutral-800">11:00 AM</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Check-out:</p>
                  <p className="font-bold text-neutral-800">10:00 AM</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Pets:</p>
                  <p className="font-bold text-neutral-800">Not Allowed</p>
                </div>
              </div>

              {/* Instructions */}
              <h3 className="mt-8 text-2xl font-bold">Check In Instructions</h3>
              <p className="mt-4 leading-relaxed text-neutral-600">
                We look forward to welcoming you. Check-in is available from 11:00 AM at our reception desk. Kindly present a valid photo ID upon arrival. Our staff will be pleased to assist with luggage, room access, and any special requests to ensure a smooth and comfortable arrival experience.
              </p>

              <hr className="my-8 border-black/10" />

              {/* Price and Book */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-4xl font-bold">${room.price}</span>
                  <span className="ml-2 text-sm font-bold text-neutral-400 uppercase">/ Per Night</span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
                >
                  <span>Book Now</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Other Rooms */}
              <div className="rounded-[2.5rem] bg-white p-6 shadow-sm">
                <h4 className="text-xl font-bold">Other Rooms</h4>
                <ul className="mt-4 space-y-3">
                  {otherRooms.map((otherRoom) => (
                    <li key={otherRoom.id}>
                      <Link href={`/room/${otherRoom.id}`} className="block text-neutral-600 hover:text-[#bd902f] transition-colors">
                        {otherRoom.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Help Card */}
              <div className="relative overflow-hidden rounded-[2.5rem]">
                <img src="/images/about.jpg" alt="Help" className="h-[300px] w-full object-cover" />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <HelpCircle className="text-[#bd902f]" size={48} />
                  <h3 className="mt-3 text-2xl font-bold">Need Help?</h3>
                  <p className="mt-2 text-xl font-bold text-[#bd902f]">+251 251 113 255</p>
                  <p className="mt-1 text-neutral-300">ddrashotel1@gmail.com</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:bg-neutral-200"
                  >
                    <span>Contact Us</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Check Availability */}
      <section className="bg-white py-16 px-5">
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

            <div className="rounded-[2.5rem] bg-[#f7f5f1] p-8 shadow-sm border border-black/5">
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
