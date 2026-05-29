import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // admin, manager, reception
  department: text("department").notNull(), // room, restaurant, general
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  maxOccupancy: integer("max_occupancy").notNull(),
  totalRooms: integer("total_rooms").notNull(),
  availableRooms: integer("available_rooms").notNull(),
  roomNumbers: text("room_numbers"), // Comma-separated list of room numbers (e.g. "101, 102, 103")
  amenities: jsonb("amenities").$type<string[]>().notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  bed: text("bed"),
  guests: text("guests"),
  size: text("size"),
  badge: text("badge"),
  discount: text("discount"),
  image: text("image"),
  gallery: jsonb("gallery").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  opening: jsonb("opening").$type<string[]>().notNull(),
  image: text("image"),
  capacity: integer("capacity").notNull(),
  manager: text("manager").notNull(),
  phone: text("phone").notNull(),
  status: text("status").notNull(), // active, maintenance, closed
  todayReservations: integer("today_reservations").default(0),
  monthlyRevenue: integer("monthly_revenue").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: text("category").notNull(),
  image: text("image"),
  author: text("author").notNull(),
  date: text("date"),
  status: text("status").notNull(), // published, draft
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // hotel, room, restaurant, event
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  guestName: text("guest_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  restaurantId: integer("restaurant_id").references(() => restaurants.id),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: integer("guests").notNull(),
  specialRequests: text("special_requests"),
  status: text("status").notNull(), // confirmed, pending, cancelled, completed
  checkedIn: boolean("checked_in").default(false),
  checkedInTime: text("checked_in_time"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  guestName: text("guest_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  roomId: integer("room_id").references(() => rooms.id),
  assignedRoomNumber: text("assigned_room_number"), // The specific room number assigned to this guest (e.g. "101")
  checkIn: text("check_in").notNull(),
  checkOut: text("check_out").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").default(0),
  status: text("status").notNull(), // confirmed, pending, cancelled, completed, checked_in, checked_out
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  ingredients: text("ingredients").notNull(),
  image: text("image"),
  category: text("category").notNull(), // Starter, Main, Dessert, Drink
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const foodOrders = pgTable("food_orders", {
  id: serial("id").primaryKey(),
  guestName: text("guest_name").notNull(),
  roomNumber: text("room_number"),
  tableNumber: text("table_number"),
  phone: text("phone").notNull(),
  items: jsonb("items").$type<{ foodId: number; name: string; quantity: number; price: number }[]>().notNull(),
  totalPrice: integer("total_price").notNull(),
  status: text("status").notNull(), // pending, preparing, served, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
