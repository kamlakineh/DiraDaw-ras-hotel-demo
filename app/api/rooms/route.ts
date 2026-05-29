import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { rooms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allRooms = await db.select().from(rooms);
    return NextResponse.json(allRooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, maxOccupancy, totalRooms, availableRooms, roomNumbers, amenities, description, longDescription, bed, guests, size, badge, discount, image, gallery } = body;

    const newRoom = await db.insert(rooms).values({
      name,
      price,
      maxOccupancy,
      totalRooms,
      availableRooms,
      roomNumbers,
      amenities,
      description,
      longDescription,
      bed,
      guests,
      size,
      badge,
      discount,
      image,
      gallery: gallery || [],
    }).returning();

    return NextResponse.json(newRoom[0], { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, price, maxOccupancy, totalRooms, availableRooms, roomNumbers, amenities, description, longDescription, bed, guests, size, badge, discount, image, gallery } = body;

    const updatedRoom = await db.update(rooms)
      .set({
        name,
        price,
        maxOccupancy,
        totalRooms,
        availableRooms,
        roomNumbers,
        amenities,
        description,
        longDescription,
        bed,
        guests,
        size,
        badge,
        discount,
        image,
        gallery,
        updatedAt: new Date(),
      })
      .where(eq(rooms.id, id))
      .returning();

    if (updatedRoom.length === 0) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRoom[0]);
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
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
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    const deletedRoom = await db.delete(rooms).where(eq(rooms.id, Number(id))).returning();

    if (deletedRoom.length === 0) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}
