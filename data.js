// Images generated via the image generation tool
export const hotelExteriorImage =
  "/assets/images/hotel_exterior_1779716287291.png";
export const deluxeRoomImage = "/assets/images/deluxe_room_1779716306191.png";
export const executiveSuiteImage =
  "/assets/images/executive_suite_1779716324308.png";
export const twinRoomImage = "/assets/images/twin_room_1779716342283.png";

export const roomsData = [
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    type: "deluxe",
    price: 3200,
    image: deluxeRoomImage,
    description:
      "Indulge in spacious elegance with our Deluxe Room, featuring high-end custom bedding, beautiful ambient illumination, and magnificent city views designed for ultimate relaxation.",
    capacity: { adults: 2, children: 1 },
    amenities: [
      "King Bed",
      "High-speed Wi-Fi",
      "Flat Screen TV",
      "Mini Bar",
      "Premium Bath Amenities",
      "Room Service",
    ],
    rating: 4.8,
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    type: "suite",
    price: 5500,
    image: executiveSuiteImage,
    description:
      "Our expansive Executive Suite offers independent living and working zones, custom modern velvet furnishings, a glass coffee table, and elite VIP privileges.",
    capacity: { adults: 3, children: 2 },
    amenities: [
      "Plush Lounge",
      "Working Desk",
      "King Bed",
      "Private Balcony",
      "Espresso Machine",
      "Exclusive Access",
    ],
    rating: 4.9,
  },
  {
    id: "standard-twin",
    name: "Standard Twin Room",
    type: "twin",
    price: 2800,
    image: twinRoomImage,
    description:
      "Designed for seamless comfort, our Standard Twin Room features two premium single beds adorned with high-thread-count white linens, dynamic desk lighting, and smart workspaces.",
    capacity: { adults: 2, children: 1 },
    amenities: [
      "Twin Beds",
      "High-speed Wi-Fi",
      "Writing Desk",
      "In-room Safe",
      "Modern En Suite Bathroom",
    ],
    rating: 4.7,
  },
];

export const valueProps = [
  {
    id: "rooms",
    title: "Comfortable Rooms",
    description:
      "Relax in our stylish and spacious rooms designed with complete comfort in mind.",
    iconName: "BedDouble",
  },
  {
    id: "dining",
    title: "Fine Dining",
    description:
      "Enjoy delicious local and international cuisine lovingly crafted by our chefs.",
    iconName: "Utensils",
  },
  {
    id: "wifi",
    title: "Free Wi-Fi",
    description:
      "Stay connected with high speed internet enabled seamlessly inside all areas.",
    iconName: "Wifi",
  },
  {
    id: "events",
    title: "Meeting & Events",
    description:
      "Explore the perfect, customized venue options for your elite corporate meetings and social events.",
    iconName: "Users",
  },
  {
    id: "service",
    title: "24/7 Service",
    description:
      "We are proudly here for you around the clock to cater to your every aesthetic and travel need.",
    iconName: "ConciergeBell",
  },
];

export const galleryImages = [
  {
    src: hotelExteriorImage,
    title: "Hotel Entrance & Facade",
    category: "exterior",
  },
  {
    src: deluxeRoomImage,
    title: "Deluxe King Bed",
    category: "rooms",
  },
  {
    src: executiveSuiteImage,
    title: "Executive Suite Lounge",
    category: "rooms",
  },
  {
    src: twinRoomImage,
    title: "Twin Bedroom Setup",
    category: "rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    title: "Fine Dining Gourmet Steak",
    category: "dining",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    title: "Traditional Ethiopian Coffee Ceremony",
    category: "dining",
  },
];
