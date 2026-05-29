import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { foodOrders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allOrders = await db.select().from(foodOrders);
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error("Error fetching food orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestName, roomNumber, tableNumber, phone, items, totalPrice } = body;

    if (!guestName || !phone || !items || !totalPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newOrder = await db.insert(foodOrders).values({
      guestName,
      roomNumber: roomNumber || null,
      tableNumber: tableNumber || null,
      phone,
      items,
      totalPrice: Number(totalPrice),
      status: "pending",
    }).returning();

    return NextResponse.json(newOrder[0], { status: 201 });
  } catch (error) {
    console.error("Error creating food order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing ID or status" }, { status: 400 });
    }

    const updated = await db.update(foodOrders)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(foodOrders.id, Number(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    await db.delete(foodOrders).where(eq(foodOrders.id, Number(id)));

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
