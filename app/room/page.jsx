"use client";

import { ArrowRight, Phone, Bed, Users, Expand, Wifi, Tv, Monitor, Car, Shirt, Utensils, MapPin, Mail, ExternalLink, MessageCircle, Tag } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import CheckAvailabilityForm from "../../components/CheckAvailabilityForm";

function RoomImagePlaceholder({ alt }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#bd902f]/20 to-[#bd902f]/5">
      <span className="font-serif text-3xl font-bold text-[#bd902f]/70">{alt}</span>
    </div>
  );
}

const _legacyRooms = [
  {
    id: 1,
    name: "Superior Rooms",
    description: "Our Superior Room offers a comfortable and welcoming space, ideal for business or leisure travelers.",
    price: 129,
    discount: "5% OFF",
    bed: "Double Bed",
    guests: "1-2 Persons",
    size: "215–325 sq.ft.",
    image: "/images/room-2.jpg",
    amenities: ["Free WiFi", "32 Inch TV", "Swimming Pool"],
    imageFirst: true
  },
  {
    id: 2,
    name: "Deluxe Rooms",
    description: "The Deluxe Room provides extra space and added comfort for a relaxing stay. Guests can enjoy our amenities.",
    price: 149,
    discount: "10% OFF",
    badge: "Popular",
    bed: "Queen Bed",
    guests: "1-2 Persons",
    size: "300–450 sq.ft.",
    image: "/images/room-3.jpg",
    amenities: ["Free WiFi", "32 Inch TV", "Swimming Pool"],
    imageFirst: false
  },
  {
    id: 3,
    name: "Premium Rooms",
    description: "The Premium Room offers extra space, comfort, and premium amenities for a relaxing stay.",
    price: 199,
    discount: "10% OFF",
    bed: "King Size Bed",
    guests: "3-4 Persons",
    size: "430–645 sq.ft.",
    image: "/images/room-4.jpg",
    amenities: ["Free WiFi", "50 Inch TV", "Swimming Pool"],
    imageFirst: true
  },
  {
    id: 4,
    name: "Executive Rooms",
    description: "Designed for business and upscale travelers, the Executive Room combines elegance and functionality.",
    price: 249,
    discount: "15% OFF",
    bed: "Twin Bed",
    guests: "3-4 Persons",
    size: "645–1,015 sq.ft.",
    image: "/images/room-5.jpg",
    amenities: ["Free WiFi", "55 Inch TV", "Swimming Pool"],
    imageFirst: false
  },
  {
    id: 5,
    name: "Honeymoon Suite",
    description: "Spacious suite with separate living and sleeping areas and premium furnishings.",
    price: 399,
    discount: "20% OFF",
    badge: "Most Loved",
    bed: "Queen Bed",
    guests: "1 Couple",
    size: "1,015–3,100 sq.ft.",
    image: "/images/room-1.jpg",
    amenities: ["Free WiFi", "60 Inch TV", "Swimming Pool"],
    imageFirst: true
  }, {
    id: 6,
    name: "Normal Rooms",
    description: "Our Normal Room offers a comfortable and affordable space, perfect for budget-conscious travelers seeking quality accommodation.",
    price: 100,
    discount: null,
    bed: "Single Bed",
    guests: "1 Person",
    size: "150–200 sq.ft.",
    image: "/images/room-1.jpg",
    amenities: ["Free WiFi", "24 Inch TV", "Swimming Pool"],
    imageFirst: false
  }
];

const amenities = [
  { title: "Pick Up & Drop", icon: Car, desc: "Free pick up from the railway station and air port or bus stand. Well-maintained vehicles and professional drivers ensure seamless travel for guests." },
  { title: "High Speed Wifi", icon: Wifi, desc: "Enjoy seamless connectivity high-speed Wi-Fi, available in all guest rooms and public areas. our network ensures fast, stable, and secure internet access at all times." },
  { title: "EV Charger", icon: Monitor, desc: "We provide convenient on-site EV charging services for our eco-conscious guests. Our fast and reliable chargers are compatible with all major electric vehicle models." },
  { title: "Laundry", icon: Shirt, desc: "Enjoy the convenience of our professional laundry service. our efficient and reliable service ensures your clothes are cleaned and pressed promptly." },
  { title: "Swimming Pool", icon: Monitor, desc: "Dive into relaxation at our pristine swimming pool, designed for leisure, fitness, and fun. Whether you want to unwind under the sun, take a refreshing dip, or enjoy a few lap." },
  { title: "Bar & Restaurant", icon: Utensils, desc: "Enjoy exceptional dining and refreshing drinks at our hotel bar and restaurant. Gourmet meals, expertly mixed cocktails, and fine wines made with fresh, locally sourced ingredients." }
];

export default function RoomPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rooms")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        // Add imageFirst flag alternating for layout
        setRooms(list.map((room, idx) => ({ ...room, imageFirst: idx % 2 === 0 })));
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
            <Link href="/room" className="text-[#bd902f]">Rooms</Link>
            <Link href="/restaurant" className="hover:text-[#bd902f] transition-colors">Restaurant</Link>
            <Link href="/banquets" className="hover:text-[#bd902f] transition-colors">Banquets</Link>
            <Link href="/gallery" className="hover:text-[#bd902f] transition-colors">Gallery</Link>
            <Link href="/blog" className="hover:text-[#bd902f] transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-[#bd902f] transition-colors">Contact</Link>
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

      {/* Page Header */}
      <section className="relative flex h-[350px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/60" />
        <img
          src="/images/slide1.png"
          alt="Rooms Header"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-20 text-center text-white px-5 mt-16">
          <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">Rooms</h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Rooms</span>
          </div>
        </div>
      </section>

      {/* Rooms & Suites */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8">
            {loading && <p className="text-center text-neutral-500">Loading rooms...</p>}
            {!loading && rooms.length === 0 && <p className="text-center text-neutral-500">No rooms available.</p>}
            {rooms.map((room) => (
              <div key={room.id} className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white shadow-sm">
                <div className="grid lg:grid-cols-2">
                  {room.imageFirst ? (
                    <>
                      <div className="relative min-h-[300px] sm:min-h-[400px]">
                        {room.image ? (
                          <img src={room.image} alt={room.name} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          <RoomImagePlaceholder alt={room.name} />
                        )}
                        {room.badge && (
                          <span className="absolute left-6 top-6 rounded-full bg-[#bd902f] px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                            {room.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                        <RoomContent room={room} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16 lg:order-1">
                        <RoomContent room={room} />
                      </div>
                      <div className="relative min-h-[300px] sm:min-h-[400px] lg:order-2">
                        {room.image ? (
                          <img src={room.image} alt={room.name} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          <RoomImagePlaceholder alt={room.name} />
                        )}
                        {room.badge && (
                          <span className="absolute left-6 top-6 rounded-full bg-[#bd902f] px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                            {room.badge}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-white py-16 px-5">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500">
            Hotel Amenities
          </span>
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

          <div className="mt-12 text-center">
            <Link
              href="/#amenities"
              className="inline-flex items-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
            >
              <span>View all Amenities</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Check Availability */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-flex rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-500">
                Plan Your Stay
              </span>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Embark on <span className="text-[#bd902f]">Your Bespoke</span> Experience
              </h2>
              <p className="mt-6 leading-relaxed text-neutral-500">
                Discover your perfect retreat. Select your dates, choose your suite, and secure your exclusive experience at Dire Dawa Ras Hotel.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><Phone size={20} /></span>
                <div>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Call us for Inquiry</p>
                  <p className="text-lg font-bold text-neutral-800">+251 251 113 255</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-black/5 bg-white p-8 sm:p-12 shadow-sm" id="booking">
              <h3 className="font-serif text-3xl font-bold tracking-tight">Check <span className="text-[#bd902f]">Availability</span></h3>
              <div className="mt-8">
                <CheckAvailabilityForm />
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

function RoomContent({ room }) {
  return (
    <>
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1 text-xs font-semibold text-neutral-500">
        <span className="text-[#bd902f]"><Tag size={12} /></span>
        {room.discount}
      </div>
      <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">{room.name}</h2>
      <p className="mt-4 leading-relaxed text-neutral-500">{room.description}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm font-medium text-neutral-600">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#bd902f]/10 text-[#bd902f]"><Bed size={16} /></span>
          {room.bed}
        </div>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#bd902f]/10 text-[#bd902f]"><Users size={16} /></span>
          {room.guests}
        </div>
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#bd902f]/10 text-[#bd902f]"><Expand size={16} /></span>
          {room.size}
        </div>
        {(room.amenities || []).map((amenity, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#bd902f]/10 text-[#bd902f]"><Wifi size={16} /></span>
            {amenity}
          </div>
        ))}
      </div>

      <hr className="my-8 border-neutral-100" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-neutral-400">STARTING FROM</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-neutral-900">${room.price}</span>
            <span className="text-xs font-bold text-neutral-400">/ PER NIGHT</span>
          </div>
        </div>

        <Link
          href={`/room/${room.id}`}
          className="group inline-flex items-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
        >
          <span>View Details</span>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#bd902f] transition-transform group-hover:translate-x-0.5">
            <ArrowRight size={13} />
          </span>
        </Link>
      </div>
    </>
  );
}
