"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  CalendarDays,
  Car,
  Dumbbell,
  Expand,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Shirt,
  Star,
  Tag,
  Users,
  Utensils,
  Wifi,
  Zap,
} from "lucide-react";
import Link from "next/link";
import CheckAvailabilityForm from "../components/CheckAvailabilityForm";

const amenities = [
  {
    title: "Pick Up & Drop",
    icon: Car,
    text: "Free pick up from the railway station, airport, or bus stand with professional drivers for seamless travel.",
  },
  {
    title: "High Speed Wifi",
    icon: Wifi,
    text: "Enjoy fast, stable, and secure connectivity in all guest rooms and public areas throughout your stay.",
  },
  {
    title: "EV Charger",
    icon: Zap,
    text: "Convenient on-site EV charging services for eco-conscious guests with reliable fast chargers.",
  },
  {
    title: "Laundry",
    icon: Shirt,
    text: "Professional laundry service keeps your clothes cleaned, pressed, and ready whenever you need them.",
  },
  {
    title: "Swimming Pool",
    icon: Dumbbell,
    text: "Relax, refresh, and unwind at our pristine pool designed for leisure, fitness, and sunny afternoons.",
  },
  {
    title: "Bar & Restaurant",
    icon: Utensils,
    text: "Enjoy exceptional dining, refreshing drinks, gourmet meals, cocktails, and fine wines.",
  },
];

const services = [
  {
    label: "Meal With Us",
    title: "The Restaurant",
    image: "/images/restaurant-about.jpg",
    text: "A memorable dining experience with a choice of delicious options for guests with a zest for the good life.",
    href: "/restaurant",
  },
  {
    label: "We Find Happiness",
    title: "Banquet Hall",
    image: "/images/banquets.jpg",
    text: "Elegant venues for weddings, social gatherings, parties, conferences, and seminars tailored to your needs.",
    reverse: true,
    href: "/banquets",
  },
  {
    label: "Stay in great shape",
    title: "Spa",
    image: "/images/spa.jpg",
    text: "Holistic rejuvenation through relaxing treatments customized to refresh your body and mind.",
    href: "/#amenities",
  },
];

function Pill({ children, light = false }) {
  return (
    <span
      className={`inline-flex rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] ${
        light
          ? "border-white/30 text-white"
          : "border-black/10 text-neutral-700"
      }`}
    >
      {children}
    </span>
  );
}

function Button({ children, href = "#booking", light = false }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-bold shadow-lg transition hover:-translate-y-0.5 ${
        light
          ? "bg-white text-neutral-950 hover:bg-[#bd902f] hover:text-white"
          : "bg-[#bd902f] text-white hover:bg-[#9d7422]"
      }`}
    >
      <span>{children}</span>
      <span
        className={`grid h-7 w-7 place-items-center rounded-full transition ${
          light
            ? "bg-neutral-950 text-white group-hover:bg-white group-hover:text-[#bd902f]"
            : "bg-white text-[#bd902f]"
        }`}
      >
        <ArrowRight size={15} />
      </span>
    </Link>
  );
}

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setRooms(data.slice(0, 3));
          }
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoadingRooms(false);
      }
    };

    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const published = data.filter(b => b.status === "published" || !b.status);
            setPosts(published.slice(0, 3));
          }
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchRooms();
    fetchBlogs();
  }, []);

  return (
    <main className="bg-[#f7f5f1] font-sans text-neutral-900">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/25 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-serif text-2xl font-bold text-white">
            Dire Dawa Ras Hotel
          </Link>
          <div className="hidden items-center gap-8 text-sm font-semibold text-white/90 lg:flex">
            <Link href="/" className="hover:text-[#bd902f] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#bd902f] transition-colors">About</Link>
            <Link href="/room" className="hover:text-[#bd902f] transition-colors">Rooms</Link>
            <Link href="/restaurant" className="hover:text-[#bd902f] transition-colors">Restaurant</Link>
            <Link href="/banquets" className="hover:text-[#bd902f] transition-colors">Banquets</Link>
            <Link href="/gallery" className="hover:text-[#bd902f] transition-colors">Gallery</Link>
            <Link href="/blog" className="hover:text-[#bd902f] transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-[#bd902f] transition-colors">Contact</Link>
            <a href="#amenities" className="hover:text-[#bd902f] transition-colors">Amenities</a>
          </div>
          <Link href="/#booking" className="hidden items-center gap-3 rounded-full bg-[#bd902f] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#a67724] lg:inline-flex">
            <span>Book Now</span>
            <ArrowRight size={15} />
          </Link>
        </nav>
      </header>

      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src="/images/slide1.png"
          alt="Luxury hotel room"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-32 text-center">
          <Pill light>Est. 1964 EC</Pill>
          <h1 className="mx-auto mt-6 max-w-5xl font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
            Dire Dawa{" "}
            <span className="text-[#caa75d]">Ras Hotel</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Full-service accommodation for business and leisure travellers.
            Traditional Ethiopian hospitality with modern amenities in the heart
            of Kezira, Dire Dawa.
          </p>
          <div className="mt-8">
            <Button light>Explore Rooms</Button>
          </div>
        </div>
      </section>

      <section id="about" className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Pill>About The Hotel</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Discover{" "}
              <span className="text-[#bd902f]">Ethiopian hospitality</span>{" "}
              since 1964
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Dire Dawa Ras Hotel has been serving guests since 1964 EC.
              Located in Kezira, we combine convenient access to the city center
              with traditional hospitality and modern amenities. Whether you are
              travelling for business or leisure, we offer a warm and
              comfortable stay.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Button>Know More</Button>
              <div className="flex items-center gap-3">
                <Phone className="text-[#bd902f]" />
                <div>
                  <p className="text-xs font-bold uppercase text-neutral-400">
                    Call us for Inquiry
                  </p>
                  <p className="font-bold">+251 251 113 255</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/about.jpg"
              alt="Hotel interior"
              className="h-[540px] w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-black/55 p-6 text-white backdrop-blur">
              A new kind of hospitality experience, crafted for business and
              leisure travellers alike.
            </div>
          </div>
        </div>
      </section>

      <section id="rooms" className="relative overflow-hidden bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Pill>Rooms & Suites</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Revel in the <span className="text-[#bd902f]">Unmatched Comfort</span>
            </h2>
          </div>
          <div className="mt-12">
            {loadingRooms ? (
              <div className="text-center py-12 text-neutral-500">Loading rooms...</div>
            ) : rooms.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">No rooms available at the moment.</div>
            ) : (
              <div className="grid gap-7 md:grid-cols-3">
                {rooms.map((room) => (
                  <article
                    key={room.id}
                    className="overflow-hidden rounded-[2rem] bg-[#f7f5f1] shadow-sm transition hover:-translate-y-1 hover:shadow-xl flex flex-col h-full"
                  >
                    <div className="relative">
                      <img
                        src={room.image || "/images/room-1.jpg"}
                        alt={room.name}
                        className="h-72 w-full object-cover"
                      />
                      {room.discount && (
                        <span className="absolute left-5 top-5 flex items-center gap-1 rounded-full border border-white/60 bg-black/20 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                          <Tag size={13} />
                          {room.discount}
                        </span>
                      )}
                      {(room.badge || room.badge === "Popular") && (
                        <span className="absolute right-5 top-5 rounded-full bg-[#bd902f] px-3 py-1 text-xs font-bold text-white">
                          {room.badge || "Popular"}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{room.name}</h3>
                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500">
                          <span className="flex items-center gap-2">
                            <Users size={16} className="text-[#bd902f]" />
                            {room.guests || `${room.maxOccupancy} Persons`}
                          </span>
                          <span className="flex items-center gap-2">
                            <Expand size={16} className="text-[#bd902f]" />
                            {room.size || "300 sq.ft."}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5">
                        <p className="text-xl font-bold">
                          ${room.price}{" "}
                          <span className="text-xs font-semibold uppercase text-neutral-400">
                            / Night
                          </span>
                        </p>
                        <Link className="font-bold text-[#bd902f]" href={`/room/${room.id}`}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
        <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 font-serif text-7xl font-bold text-neutral-100 md:text-9xl">
          Ras Hotel
        </p>
      </section>

      <section id="restaurant" className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Pill>Services</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              We provide <span className="text-[#bd902f]">Top Class Facility</span>
            </h2>
          </div>
          <div className="mt-14 space-y-14">
            {services.map((service) => (
              <div
                key={service.title}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  service.reverse ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-[380px] w-full rounded-[2rem] object-cover shadow-xl"
                  />
                </div>
                <div>
                  <span className="rounded-full border border-black/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-neutral-600">
                    {service.label}
                  </span>
                  <h3 className="mt-4 font-serif text-4xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-8 text-neutral-600">{service.text}</p>
                  <div className="mt-6">
                    <Button href={service.href}>Read More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative grid min-h-[430px] place-items-center overflow-hidden px-5 text-center">
        <img
          src="/images/side2.png"
          alt="Hotel facilities"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/30 text-white backdrop-blur">
            <Play fill="currentColor" />
          </span>
          <h2 className="mt-6 font-serif text-4xl font-semibold text-white md:text-5xl">
            Enjoy Facilities of Unmatched Quality!
          </h2>
        </div>
      </section>

      <section id="amenities" className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Pill>Hotel Amenities</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Our Premium, <span className="text-[#bd902f]">Industry Leading</span>{" "}
              Facilities
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map(({ title, icon: Icon, text }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-black/5 bg-[#f7f5f1] p-7 shadow-sm"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl border border-black/10 bg-white text-[#bd902f]">
                  <Icon size={30} />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-neutral-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 text-white">
        <img
          src="/images/experience.jpg"
          alt="Hotel experience"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <img
            src="/images/about.jpg"
            alt="Hotel lounge"
            className="h-[460px] w-full rounded-[2rem] object-cover"
          />
          <div>
            <Pill light>Our Experience</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Over{" "}
              <span className="text-[#caa75d]">60 Years</span> of{" "}
              Hospitality
            </h2>
            <p className="mt-5 text-xl font-semibold">
              Established in{" "}
              <span className="text-[#caa75d]">1964 EC</span> in Dire Dawa,
              Ethiopia.
            </p>
            <p className="mt-4 leading-8 text-white/75">
              For over six decades, Dire Dawa Ras Hotel has been a trusted name
              in Ethiopian hospitality. We take pride in offering full-service
              accommodation that blends tradition with modern comfort for every
              guest who walks through our doors.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-5">
              {["95K+ Happy Clients", "800+ Functions", "32+ Rooms"].map(
                (item) => {
                  const [number, ...label] = item.split(" ");
                  return (
                    <div key={item}>
                      <p className="text-4xl font-bold">{number}</p>
                      <p className="text-sm text-white/70">{label.join(" ")}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Pill>Our Testimonials</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              What Our <span className="text-[#bd902f]">Clients Say</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              "The staff was incredibly kind, the amenities were perfect, and we felt right at home the entire time.",
              "Fast check-in, reliable Wi-Fi, and a peaceful atmosphere made my business trip productive and stress-free.",
            ].map((quote, index) => (
              <div key={quote} className="rounded-[2rem] bg-white p-8 shadow-sm">
                <div className="mb-4 flex gap-1 text-[#bd902f]">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg leading-8 text-neutral-600">“{quote}”</p>
                <h3 className="mt-6 font-bold">
                  {index === 0 ? "Sarah Mitchell" : "Olivia Bennett"}
                </h3>
                <p className="text-sm text-neutral-400">
                  {index === 0 ? "From Spain" : "From United Kingdom"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Pill>News & Events</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Explore Our <span className="text-[#bd902f]">Latest News</span>
            </h2>
          </div>
          <div className="mt-12">
            {loadingBlogs ? (
              <div className="text-center py-12 text-neutral-500">Loading latest news...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">No news articles found.</div>
            ) : (
              <div className="grid gap-7 md:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="overflow-hidden rounded-[2rem] bg-[#f7f5f1] shadow-sm flex flex-col h-full justify-between"
                  >
                    <div>
                      <div className="relative">
                        <img
                          src={post.image || "/images/post-1.jpg"}
                          alt={post.title}
                          className="h-64 w-full object-cover"
                        />
                        <span className="absolute left-5 top-5 rounded-full bg-[#bd902f] px-3 py-1 text-xs font-bold text-white">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-6">
                        <p className="flex items-center gap-2 text-sm text-neutral-500">
                          <CalendarDays size={15} />
                          {post.date}
                        </p>
                        <h3 className="mt-3 text-xl font-bold leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-0">
                      <Link href={`/blog#post-${post.id}`} className="mt-4 inline-block font-bold text-[#bd902f]">
                        Read more
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="booking" className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <Pill>Plan Your Stay</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
              Embark on <span className="text-[#bd902f]">Your Bespoke</span>{" "}
              Experience
            </h2>
            <p className="mt-5 leading-8 text-neutral-600">
              Select your dates, choose your suite, and secure your exclusive
              stay at our luxury hotel.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-8 shadow-xl">
            <h3 className="font-serif text-3xl font-semibold">
              Check <span className="text-[#bd902f]">Availability</span>
            </h3>
            <div className="mt-7">
              <CheckAvailabilityForm />
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="relative overflow-hidden px-5 pt-24 text-white">
        <img
          src="/images/side2.png"
          alt="Hotel footer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/90" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 pb-14 md:grid-cols-3">
          <div>
            <h2 className="font-serif text-3xl font-bold">Dire Dawa Ras Hotel</h2>
            <p className="mt-4 leading-7 text-white/70">
              Established in 1964 EC — offering full-service accommodation for
              business and leisure travellers in the heart of Kezira, Dire Dawa.
            </p>
          </div>
          <div className="grid gap-3 font-semibold text-white/80">
            <a href="#about">About Us</a>
            <a href="#rooms">Rooms</a>
            <a href="#restaurant">Restaurant</a>
            <a href="#amenities">Amenities</a>
            <a href="#booking">Contact Us</a>
          </div>
          <div className="space-y-4">
            <p className="flex gap-3">
              <MapPin className="shrink-0 text-[#caa75d]" />
              HVQ5+FGV Hotel, Dire Dawa 1487, Ethiopia
            </p>
            <p className="flex gap-3">
              <Phone className="text-[#caa75d]" />
              +251 251 113 255
            </p>
            <p className="flex gap-3">
              <Mail className="text-[#caa75d]" />
              ddrashotel1@gmail.com
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
              <a href="https://www.facebook.com/profile.php?id=61570400957998" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10">
                <ExternalLink size={14} /> Facebook
              </a>
              <a href="https://www.tiktok.com/@ras_dire" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10">
                <ExternalLink size={14} /> TikTok
              </a>
              <a href="https://www.youtube.com/@rashoteldiredawa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10">
                <ExternalLink size={14} /> YouTube
              </a>
              <a href="https://wa.me/251915320033" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 transition hover:bg-white/10">
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/10 py-6 text-center text-sm text-white/60">
          Copyright © 2026 Dire Dawa Ras Hotel. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}
