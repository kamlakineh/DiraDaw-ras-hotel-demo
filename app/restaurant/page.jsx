"use client";

import { ArrowRight, MapPin, Mail, Phone, ExternalLink, MessageCircle, Play, Star, Medal, ConciergeBell, Repeat, Leaf, Handshake, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

function ImagePlaceholder({ alt, className }) {
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br from-[#bd902f]/20 to-[#bd902f]/5 ${className || ""}`}>
      <span className="font-serif text-2xl font-bold text-[#bd902f]/70">{alt || "Image"}</span>
    </div>
  );
}

const values = [
  { title: "Quality Food", icon: Medal, text: "We use fresh ingredients and careful preparation to deliver food you can trust and enjoy." },
  { title: "Great Service", icon: ConciergeBell, text: "We treat every guest with respect, warmth, and attention." },
  { title: "Consistency", icon: Repeat, text: "We aim to provide the same quality and experience every time you visit." },
  { title: "Clean Environment", icon: Leaf, text: "Hygiene and food safety are always our top priorities." },
  { title: "Honesty & Integrity", icon: Handshake, text: "We operate with transparency, fairness, and respect for our guests and team." },
  { title: "Community Respect", icon: UserRound, text: "We value our people and strive to contribute positively to our community." },
];

function Pill({ children }) {
  return <span className="inline-flex rounded-full border border-black/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-neutral-700">{children}</span>;
}

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    guests: "",
    date: "",
    time: "",
  });
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    fetch("/api/restaurants")
      .then((r) => r.json())
      .then((data) => {
        setRestaurants(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus("submitting");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: bookingData.name,
          phone: bookingData.phone,
          email: "",
          restaurantId: selectedRestaurant?.id,
          date: bookingData.date,
          time: bookingData.time,
          guests: parseInt(bookingData.guests, 10) || 1,
          status: "pending",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setBookingStatus("success");
      setTimeout(() => {
        setSelectedRestaurant(null);
        setBookingData({ name: "", phone: "", guests: "", date: "", time: "" });
        setBookingStatus("");
      }, 1200);
    } catch (err) {
      setBookingStatus("error");
    }
  };

  return (
    <main className="bg-[#f7f5f1] font-sans text-neutral-900 selection:bg-[#bd902f]/30">
      <Navbar activePage="Restaurant" />

      {/* Hero Header */}
      <section className="relative flex h-[350px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/60" />
        <img
          src="/images/restaurant-about.jpg"
          alt="Restaurant Hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative z-20 text-center text-white px-5 mt-16">
          <h1 className="font-serif text-5xl font-bold tracking-tight md:text-6xl">Restaurant</h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Restaurant</span>
          </div>
        </div>
      </section>

      {/* About Restaurant */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Pill>Meal with us</Pill>
              <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                A Hotel <span className="text-[#bd902f]">Restaurant</span> Serves Meals to Both <span className="text-[#bd902f]">Guests</span> and <span className="text-[#bd902f]">Visitors</span>
              </h2>
              <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                Dire Dawa Ras Hotel introduces guests to a memorable experience in dining out, fast becoming a preferred choice in Dire Dawa.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-500">
                We offer a choice of dining options available to our guests with a zest for the good life. Unwind at our wellness center or explore nearby attractions easily.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-8">
                <div className="space-y-3 font-semibold text-neutral-700">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-sm font-bold text-neutral-400">Breakfast:</span>
                    <span>7:00am – 10:30am</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-sm font-bold text-neutral-400">Lunch:</span>
                    <span>11:00am – 3:00pm</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-sm font-bold text-neutral-400">Dinner:</span>
                    <span>7:00pm – 11:00pm</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-sm border border-black/5">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 text-[#bd902f]"><Phone size={20} /></span>
                  <div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Call for Reservation</p>
                    <p className="text-base font-bold text-neutral-800">+251 251 113 255</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src="/images/restaurant-about.jpg" alt="Restaurant Interior" className="rounded-[2.5rem] object-cover w-full h-full min-h-[250px] shadow-sm" />
              <img src="/images/about.jpg" alt="Dining Table" className="rounded-[2.5rem] object-cover w-full h-full min-h-[250px] shadow-sm mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="bg-white py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Pill>Restaurants And Bars</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Specialty <span className="text-[#bd902f]">Restaurant Dining</span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-7 text-neutral-600">
              Choose from dining experiences ranging from Arabian flavours, African classics, lounge bars, coffee spots, poolside drinks, and all-day international dining.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading && (
              <p className="col-span-full text-center text-neutral-500">Loading restaurants...</p>
            )}
            {!loading && restaurants.length === 0 && (
              <p className="col-span-full text-center text-neutral-500">No restaurants available.</p>
            )}
            {restaurants.map((restaurant) => (
              <article key={restaurant.id || restaurant.name} className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-[#f7f5f1] shadow-sm">
                {restaurant.image ? (
                  <img src={restaurant.image} alt={restaurant.name} className="h-64 w-full object-cover" />
                ) : (
                  <ImagePlaceholder alt={restaurant.name} className="h-64 w-full" />
                )}
                <div className="p-7">
                  <h3 className="font-serif text-2xl font-bold">{restaurant.name}</h3>
                  <p className="mt-3 leading-7 text-neutral-600">{restaurant.description}</p>
                  <div className="mt-5 rounded-2xl bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Opening Time</p>
                    <div className="mt-2 space-y-1 text-sm font-semibold text-neutral-700">
                      {restaurant.opening.map((time) => (
                        <p key={time}>{time}</p>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
                  >
                    <span>Book Table</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden text-center text-white px-5">
        <div className="absolute inset-0 z-10 bg-black/60" />
        <img
          src="/images/side2.png"
          alt="Dining Video Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-20 max-w-3xl">
          <h2 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">Experience Luxurious Dining</h2>
          <p className="mt-3 text-lg text-neutral-300">Crafted with precision. Served with distinction.</p>
          <a
            href="https://www.youtube.com/@rashoteldiredawa"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#bd902f] shadow-lg transition hover:scale-110"
          >
            <Play fill="currentColor" size={20} className="ml-1" />
          </a>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-16 px-5">
        <div className="mx-auto max-w-7xl text-center">
          <Pill>Our Values</Pill>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            The Heart of <span className="text-[#bd902f]">Our Restaurant</span>
          </h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-[2.5rem] border border-black/5 bg-[#f7f5f1] p-8 text-left transition hover:shadow-sm"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border border-black/10 bg-white text-[#bd902f]">
                    <Icon size={28} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{val.title}</h3>
                  <p className="mt-3 leading-relaxed text-neutral-500">{val.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Pill>Our Testimonials</Pill>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              What Our <span className="text-[#bd902f]">Guests Say About</span> Dining Experience
            </h2>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {[
              { text: "Easy to use, reasonably priced. The dining experience was exceptional with attentive service and delicious food.", author: "Dennis Jacques", origin: "From Australia" },
              { text: "We hosted our anniversary celebration here, and it was simply perfect. The event team handled every detail flawlessly.", author: "Patrick Cary", origin: "From USA" },
              { text: "We traveled as a family and could not have asked for a better place to stay. The staff was incredibly kind.", author: "Sarah Mitchell", origin: "From Spain" },
              { text: "As a frequent business traveler, I appreciate efficiency and comfort – and this hotel delivers both flawlessly.", author: "Olivia Bennett", origin: "From United Kingdom" }
            ].map((t, idx) => (
              <div key={idx} className="rounded-[2.5rem] border border-black/5 bg-white p-8 sm:p-12 shadow-sm">
                <div className="flex gap-1 text-[#bd902f]">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="mt-6 text-lg leading-relaxed text-neutral-600 italic">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[#bd902f]/10 font-bold text-[#bd902f]">
                    {t.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800">{t.author}</h4>
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{t.origin}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-[#bd902f] py-20 px-5 text-center text-white">
        <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          The Most Memorable <span className="text-black">Rest Time</span> Starts Here
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

      {selectedRestaurant && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-5">
          <div className="relative w-full max-w-xl rounded-[2rem] bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedRestaurant(null)}
              className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            >
              <X size={18} />
            </button>
            <p className="text-xs font-bold uppercase tracking-widest text-[#bd902f]">Book Table</p>
            <h3 className="mt-2 pr-12 font-serif text-3xl font-bold">{selectedRestaurant.name}</h3>
            <form onSubmit={handleBookingSubmit} className="mt-6 grid gap-4">
              <div>
                <label className="text-sm font-bold text-neutral-700">Full Name</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 px-5 py-3 outline-none focus:border-[#bd902f]"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-bold text-neutral-700">Phone Number</label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="mt-2 w-full rounded-full border border-black/10 px-5 py-3 outline-none focus:border-[#bd902f]"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-sm font-bold text-neutral-700">Guests</label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                    className="mt-2 w-full rounded-full border border-black/10 px-5 py-3 outline-none focus:border-[#bd902f]"
                    required
                  >
                    <option value="">Guests</option>
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5 Guests</option>
                    <option>6 Guests</option>
                    <option>7 Guests</option>
                    <option>8 Guests</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-neutral-700">Date</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="mt-2 w-full rounded-full border border-black/10 px-5 py-3 outline-none focus:border-[#bd902f]"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-neutral-700">Time</label>
                  <input
                    type="time"
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="mt-2 w-full rounded-full border border-black/10 px-5 py-3 outline-none focus:border-[#bd902f]"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-[#bd902f] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#a67724]"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

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
