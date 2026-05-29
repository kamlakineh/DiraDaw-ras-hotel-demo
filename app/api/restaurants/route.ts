import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { restaurants } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allRestaurants = await db.select().from(restaurants);
    return NextResponse.json(allRestaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, opening, image, capacity, manager, phone, status } = body;

    const newRestaurant = await db.insert(restaurants).values({
      name,
      description,
      opening,
      image,
      capacity,
      manager,
      phone,
      status,
      todayReservations: 0,
      monthlyRevenue: 0,
    }).returning();

    return NextResponse.json(newRestaurant[0], { status: 201 });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, opening, image, capacity, manager, phone, status, todayReservations, monthlyRevenue } = body;

    const updatedRestaurant = await db.update(restaurants)
      .set({
        name,
        description,
        opening,
        image,
        capacity,
        manager,
        phone,
        status,
        todayReservations,
        monthlyRevenue,
        updatedAt: new Date(),
      })
      .where(eq(restaurants.id, id))
      .returning();

    if (updatedRestaurant.length === 0) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRestaurant[0]);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return NextResponse.json(
      { error: "Failed to update restaurant" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Restaurant ID is required" },
        { status: 400 }
      );
    }

    const deletedRestaurant = await db.delete(restaurants).where(eq(restaurants.id, Number(id))).returning();

    if (deletedRestaurant.length === 0) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return NextResponse.json(
      { error: "Failed to delete restaurant" },
      { status: 500 }
    );
  }
}
