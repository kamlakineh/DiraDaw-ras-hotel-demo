import "dotenv/config";
import { db } from "./index";
import { users, rooms, restaurants, blogs, reservations, bookings, gallery, foods, foodOrders } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data (in dependency order)
  await db.delete(foodOrders);
  await db.delete(foods);
  await db.delete(bookings);
  await db.delete(reservations);
  await db.delete(blogs);
  await db.delete(rooms);
  await db.delete(restaurants);
  await db.delete(gallery);
  await db.delete(users);
  console.log("✅ Cleared old data");

  // Insert default admin user
  await db.insert(users).values({
    username: "diradaw",
    password: "pass1234",
    role: "admin",
    department: "general",
  });

  console.log("✅ Admin user created: diradaw/pass1234");

  // Insert manager user
  await db.insert(users).values({
    username: "manager",
    password: "manager123",
    role: "manager",
    department: "restaurant",
  });

  console.log("✅ Manager user created: manager/manager123");

  // Insert all rooms (no local images — to be set via UploadThing)
  await db.insert(rooms).values([
    {
      name: "Superior Rooms",
      price: 129,
      maxOccupancy: 2,
      totalRooms: 15,
      availableRooms: 10,
      roomNumbers: "101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115",
      amenities: ["Free WiFi", "32 Inch TV", "Swimming Pool", "BreakFast", "Television", "Free Baby Bed", "Mini-bar", "Mini Refrigerator", "Safe Box"],
      description: "Our Superior Room offers a comfortable and welcoming space, ideal for business or leisure travelers.",
      longDescription: "Our Superior Rooms are designed for guests who appreciate comfort and style. Elegantly furnished and flooded with natural light, these rooms offer a perfect balance of functionality and relaxation—ideal for both business and leisure travelers.",
      bed: "Double Bed",
      guests: "1-2 Persons",
      size: "215–325 sq.ft.",
      discount: "5% OFF",
      image: null,
      gallery: [],
    },
    {
      name: "Deluxe Rooms",
      price: 149,
      maxOccupancy: 2,
      totalRooms: 12,
      availableRooms: 8,
      roomNumbers: "2, 9, 40, 8, 5, 206, 207, 208, 209, 210, 211, 212",
      amenities: ["Free WiFi", "32 Inch TV", "Swimming Pool", "BreakFast", "Television", "Free Baby Bed", "Mini-bar", "Mini Refrigerator", "Safe Box"],
      description: "The Deluxe Room provides extra space and added comfort for a relaxing stay. Guests can enjoy our amenities.",
      longDescription: "The Deluxe Room provides extra space and added comfort for a truly relaxing stay. With premium furnishings and thoughtful amenities, guests can enjoy a peaceful environment where every detail is tailored to help you unwind and feel at home.",
      bed: "Queen Bed",
      guests: "1-2 Persons",
      size: "300–450 sq.ft.",
      badge: "Popular",
      discount: "10% OFF",
      image: null,
      gallery: [],
    },
    {
      name: "Premium Rooms",
      price: 199,
      maxOccupancy: 4,
      totalRooms: 10,
      availableRooms: 6,
      roomNumbers: "301, 302, 303, 304, 305, 306, 307, 308, 309, 310",
      amenities: ["Free WiFi", "50 Inch TV", "Swimming Pool", "BreakFast", "Television", "Free Baby Bed", "Mini-bar", "Mini Refrigerator", "Safe Box"],
      description: "The Premium Room offers extra space, comfort, and premium amenities for a relaxing stay.",
      longDescription: "Our Premium Rooms are designed for guests who appreciate extra space, comfort, and thoughtful details. Elegantly furnished and flooded with natural light, these rooms offer a perfect balance of style and functionality—ideal for both business and leisure travelers.",
      bed: "King Size Bed",
      guests: "3-4 Persons",
      size: "430–645 sq.ft.",
      discount: "10% OFF",
      image: null,
      gallery: [],
    },
    {
      name: "Executive Rooms",
      price: 249,
      maxOccupancy: 4,
      totalRooms: 8,
      availableRooms: 5,
      roomNumbers: "401, 402, 403, 404, 405, 406, 407, 408",
      amenities: ["Free WiFi", "55 Inch TV", "Swimming Pool", "BreakFast", "Television", "Free Baby Bed", "Mini-bar", "Mini Refrigerator", "Safe Box"],
      description: "Designed for business and upscale travelers, the Executive Room combines elegance and functionality.",
      longDescription: "Designed for business and upscale travelers, the Executive Room combines elegance and functionality. With a dedicated workspace and premium amenities, it's the perfect choice for those who need to stay productive while enjoying luxury accommodations.",
      bed: "Twin Bed",
      guests: "3-4 Persons",
      size: "645–1,015 sq.ft.",
      discount: "15% OFF",
      image: null,
      gallery: [],
    },
    {
      name: "Honeymoon Suite",
      price: 399,
      maxOccupancy: 2,
      totalRooms: 4,
      availableRooms: 3,
      roomNumbers: "501, 502, 503, 504",
      amenities: ["Free WiFi", "60 Inch TV", "Swimming Pool", "BreakFast", "Television", "Free Baby Bed", "Mini-bar", "Mini Refrigerator", "Safe Box"],
      description: "Spacious suite with separate living and sleeping areas and premium furnishings.",
      longDescription: "Spacious suite with separate living and sleeping areas and premium furnishings. Perfect for couples seeking a romantic getaway, our Honeymoon Suite offers luxurious amenities, stunning views, and an intimate atmosphere for an unforgettable experience.",
      bed: "Queen Bed",
      guests: "1 Couple",
      size: "1,015–3,100 sq.ft.",
      badge: "Most Loved",
      discount: "20% OFF",
      image: null,
      gallery: [],
    },
    {
      name: "Normal Rooms",
      price: 100,
      maxOccupancy: 1,
      totalRooms: 20,
      availableRooms: 12,
      roomNumbers: "10, 45, 30, 31, 45, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120",
      amenities: ["Free WiFi", "24 Inch TV", "Swimming Pool", "BreakFast", "Television"],
      description: "Our Normal Room offers a comfortable and affordable space, perfect for budget-conscious travelers seeking quality accommodation.",
      longDescription: "Our Normal Room offers a comfortable and affordable space, perfect for budget-conscious travelers seeking quality accommodation. Despite the affordable price, we don't compromise on comfort or cleanliness, ensuring a pleasant stay for all our guests.",
      bed: "Single Bed",
      guests: "1 Person",
      size: "150–200 sq.ft.",
      image: null,
      gallery: [],
    },
  ]);

  console.log("✅ 6 rooms created");

  // Insert all 9 restaurants (no local images)
  await db.insert(restaurants).values([
    {
      name: "Jegol – Arabic Restaurant",
      description: "Step into a world where your senses are indulged with the exotic aromas and flavours of the Middle East. Jegol invites you to savour a captivating Arabian dining experience.",
      opening: ["Lunch: 12:00 PM – 04:00 PM", "Dinner: 06:00 PM – 11:00 PM"],
      image: null,
      capacity: 60,
      manager: "Ahmed Mohammed",
      phone: "+251 251 113 256",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
    {
      name: "The Terrace",
      description: "Sit and watch the world go by or meet with friends and colleagues in a setting that is perfect for a relaxed rendezvous. With chic décor and laid-back ambience, The Terrace is cosmopolitan and unique.",
      opening: ["10:00 AM – 12:00 AM"],
      image: null,
      capacity: 40,
      manager: "Sarah Johnson",
      phone: "+251 251 113 257",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
    {
      name: "Ertale Lounge",
      description: "An enticing menu of classic African dishes is served with enthusiasm at this lively venue with stylish colonial-inspired décor, indoor seating and comfortable furnishings.",
      opening: ["04:00 PM – 01:30 AM"],
      image: null,
      capacity: 50,
      manager: "Michael Tesfaye",
      phone: "+251 251 113 258",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
    {
      name: "Bean Kaffa",
      description: "A casual yet sophisticated vibe surrounds you with fine teas and coffees, high-end beers and wines, freshly made cakes, bakery items, pastries, and à la carte snacks.",
      opening: ["08:00 AM – 12:00 AM"],
      image: null,
      capacity: 35,
      manager: "Luna Kassa",
      phone: "+251 251 113 259",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
    {
      name: "Baboon – Lounge Bar",
      description: "A lively yet relaxed lounge bar with drink blends, cuisine with surprising twists, fine cigars, live entertainment and a sociable atmosphere.",
      opening: ["04:00 PM – 01:30 AM"],
      image: null,
      capacity: 45,
      manager: "David Bekele",
      phone: "+251 251 113 260",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
    {
      name: "Moodz Sport Bar & Terrace",
      description: "Perfect for meeting colleagues, friends, or family with coffee, tea, refreshments, juices, smoothies, sandwiches, salads, burgers, and wraps.",
      opening: ["10:00 AM – 02:00 AM"],
      image: null,
      capacity: 55,
      manager: "Rachel Solomon",
      phone: "+251 251 113 261",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
    {
      name: "The African Hub",
      description: "Embark on a culinary journey worldwide for breakfast, lunch and dinner with extensive buffet and à la carte options prepared to your liking.",
      opening: ["Breakfast: 06:00 AM – 10:00 AM", "Lunch: 12:00 PM – 04:00 PM", "Dinner: 06:00 PM – 11:00 PM"],
      image: null,
      capacity: 80,
      manager: "Samuel Negash",
      phone: "+251 251 113 262",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
    {
      name: "Aquarius Pool Bar",
      description: "The perfect spot for catching up over sips of handcrafted cocktails before or after dinner while enjoying fresh air.",
      opening: ["08:00 AM – 08:00 PM"],
      image: null,
      capacity: 30,
      manager: "Nina Hailu",
      phone: "+251 251 113 263",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
    {
      name: "Ras Restaurant",
      description: "An all-day dining venue serving international cuisine with unique à la carte choices, buffet-style breakfast and lunch, and an open-style kitchen atmosphere.",
      opening: ["Breakfast: 06:00 AM – 10:00 AM", "Lunch: 12:00 PM – 04:00 PM", "Dinner: 06:00 PM – 11:00 PM"],
      image: null,
      capacity: 100,
      manager: "Thomas Gebre",
      phone: "+251 251 113 264",
      status: "active",
      todayReservations: 0,
      monthlyRevenue: 0,
    },
  ]);

  console.log("✅ 9 restaurants created");

  // Insert reception users for each restaurant
  await db.insert(users).values([
    { username: "jegol", password: "jegol123", role: "reception", department: "restaurant" },
    { username: "terrace", password: "terrace123", role: "reception", department: "restaurant" },
    { username: "ertale", password: "ertale123", role: "reception", department: "restaurant" },
    { username: "bean", password: "bean123", role: "reception", department: "restaurant" },
    { username: "baboon", password: "baboon123", role: "reception", department: "restaurant" },
    { username: "moodz", password: "moodz123", role: "reception", department: "restaurant" },
    { username: "african", password: "african123", role: "reception", department: "restaurant" },
    { username: "aquarius", password: "aquarius123", role: "reception", department: "restaurant" },
    { username: "ras", password: "ras123", role: "reception", department: "restaurant" },
    { username: "roomreception1", password: "room123", role: "reception", department: "room" },
  ]);

  console.log("✅ Restaurant reception users created");

  // Insert blog posts (no local images)
  await db.insert(blogs).values([
    {
      title: "Recap of Recent Events Hosted at Our Hotel",
      category: "Event",
      date: "27 Nov 2025",
      image: null,
      excerpt: "Join us as we look back at the memorable events and celebrations that took place at Dire Dawa Ras Hotel. From corporate conferences to wedding receptions, discover how we make every occasion special.",
      content: "Join us as we look back at the memorable events and celebrations that took place at Dire Dawa Ras Hotel. From corporate conferences to wedding receptions, discover how we make every occasion special. Our dedicated events team works tirelessly to ensure every detail is perfect, from catering to decoration. This past quarter, we hosted over 50 successful events, including international business meetings, cultural festivals, and intimate family gatherings. Our state-of-the-art banquet halls and personalized service continue to make us the preferred venue for discerning hosts.",
      author: "Dire Dawa Ras Hotel",
      status: "published",
    },
    {
      title: "Meet Our Chef: Culinary Inspiration Stories",
      category: "Restaurant",
      date: "14 Oct 2025",
      image: null,
      excerpt: "Discover the culinary journey of our executive chef and the inspiration behind our signature dishes. Learn about local ingredients and international techniques that create unforgettable dining experiences.",
      content: "Discover the culinary journey of our executive chef and the inspiration behind our signature dishes. With over 20 years of experience in luxury hotels across Africa and Europe, Chef Marcus brings a unique fusion of Ethiopian and Mediterranean cuisine to our restaurant. His passion for using locally sourced ingredients combined with classical French techniques has earned our restaurant recognition as one of the finest dining establishments in the region. In this exclusive interview, he shares his creative process and the stories behind our most beloved dishes.",
      author: "Dire Dawa Ras Hotel",
      status: "published",
    },
    {
      title: "Business Travel Tips for a Productive Stay",
      category: "Travel",
      date: "15 Jul 2025",
      image: null,
      excerpt: "Maximize your productivity during business trips with our expert tips. Learn about our business-friendly amenities, high-speed connectivity, and services designed for the modern corporate traveler.",
      content: "Maximize your productivity during business trips with our expert tips. Our hotel is specifically designed to cater to the needs of business travelers, featuring ergonomic workspaces in every room, 24-hour business center, and high-speed fiber optic internet throughout the property. We also offer secretarial services, meeting rooms with the latest AV equipment, and a dedicated concierge team to assist with travel arrangements. Discover how to balance work and relaxation during your stay, with recommendations for our wellness facilities and nearby attractions perfect for unwinding after a productive day.",
      author: "Dire Dawa Ras Hotel",
      status: "published",
    },
  ]);

  console.log("✅ 3 blog posts created");

  // Insert gallery items
  await db.insert(gallery).values([
    { title: "Standard Superior Room", description: "Beautifully styled standard superior room", category: "room", image: "/images/room-1.jpg" },
    { title: "Standard Double Room", description: "Spacious standard double room", category: "room", image: "/images/room-2.jpg" },
    { title: "Luxury Suite Living Area", description: "Stunning living area of our luxury suite", category: "room", image: "/images/room-3.jpg" },
    { title: "Deluxe Premium Room", description: "Elegant deluxe premium room decoration", category: "room", image: "/images/room-4.jpg" },
    { title: "Executive Honeymoon Suite", description: "Incredibly spacious executive suite", category: "room", image: "/images/room-5.jpg" },
    { title: "Terrace Dining Experience", description: "Outdoor terrace dining atmosphere", category: "restaurant", image: "/images/restaurant-about.jpg" },
    { title: "Main Banquet Hall", description: "Grand banquet hall setup for corporate conferences and events", category: "event", image: "/images/banquets.jpg" },
    { title: "Ras Spa & Wellness Centre", description: "Relaxing and refreshing spa therapy room", category: "hotel", image: "/images/spa.jpg" },
    { title: "Main Lobby Entrance", description: "Welcome to Dire Dawa Ras Hotel lobby", category: "hotel", image: "/images/about.jpg" },
    { title: "Bespoke Hospitality", description: "Warm and inviting customer service", category: "hotel", image: "/images/experience.jpg" },
  ]);

  console.log("✅ 10 gallery items created");

  // Insert food items
  await db.insert(foods).values([
    { name: "Tibs (Beef)", price: 25, ingredients: "Fresh beef, onions, garlic, berbere spice, butter, rosemary", category: "Main", restaurantId: 1, image: null },
    { name: "Kitfo (Raw Beef)", price: 28, ingredients: "Minced raw beef, spiced butter, mitmita, cardamom", category: "Main", restaurantId: 1, image: null },
    { name: "Doro Wat (Chicken Stew)", price: 22, ingredients: "Chicken, red onions, berbere, niter kibbeh, hard-boiled eggs", category: "Main", restaurantId: 1, image: null },
    { name: "Shiro (Chickpea Stew)", price: 18, ingredients: "Chickpea flour, onions, garlic, berbere, turmeric", category: "Main", restaurantId: 1, image: null },
    { name: "Injera (Sourdough Flatbread)", price: 5, ingredients: "Teff flour, water, yeast starter", category: "Starter", restaurantId: 1, image: null },
    { name: "Sambusa (Fried Pastry)", price: 8, ingredients: "Lentil filling, onions, garlic, cumin, pastry dough", category: "Starter", restaurantId: 1, image: null },
    { name: "Azifa (Lentil Salad)", price: 10, ingredients: "Green lentils, onions, garlic, mustard, lemon juice", category: "Starter", restaurantId: 1, image: null },
    { name: "Cheesecake", price: 12, ingredients: "Cream cheese, sugar, eggs, vanilla, graham cracker crust", category: "Dessert", restaurantId: 2, image: null },
    { name: "Baklava", price: 10, ingredients: "Phyllo dough, walnuts, honey, cinnamon, butter", category: "Dessert", restaurantId: 2, image: null },
    { name: "Ethopian Coffee", price: 6, ingredients: "Freshly roasted Ethiopian coffee beans, water", category: "Drink", restaurantId: 2, image: null },
    { name: "Spiced Tea", price: 4, ingredients: "Black tea, cardamom, cinnamon, cloves, ginger", category: "Drink", restaurantId: 2, image: null },
    { name: "Fresh Mango Juice", price: 7, ingredients: "Fresh mangoes, water, sugar", category: "Drink", restaurantId: 2, image: null },
  ]);

  console.log("✅ 12 food items created");

  console.log("Seeding completed!");
  process.exit(0);
}

seed().catch(console.error);
