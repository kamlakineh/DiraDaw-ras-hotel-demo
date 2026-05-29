import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { reservations } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("restaurantId");

    let result;
    if (restaurantId) {
      result = await db
        .select()
        .from(reservations)
        .where(eq(reservations.restaurantId, Number(restaurantId)));
    } else {
      result = await db.select().from(reservations);
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      guestName,
      phone,
      email,
      restaurantId,
      date,
      time,
      guests,
      specialRequests,
      status,
    } = body;

    const newReservation = await db
      .insert(reservations)
      .values({
        guestName,
        phone,
        email: email || "",
        restaurantId: restaurantId ? Number(restaurantId) : null,
        date,
        time,
        guests: Number(guests),
        specialRequests,
        status: status || "pending",
      })
      .returning();

    return NextResponse.json(newReservation[0], { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, checkedIn, checkedInTime } = body;

    const updated = await db
      .update(reservations)
      .set({
        status,
        checkedIn,
        checkedInTime,
        updatedAt: new Date(),
      })
      .where(eq(reservations.id, id))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    await db.delete(reservations).where(eq(reservations.id, Number(id)));
    return NextResponse.json({ message: "Reservation deleted" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Failed to delete reservation" },
      { status: 500 }
    );
  }
}
