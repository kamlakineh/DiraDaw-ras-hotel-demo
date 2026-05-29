import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { foods } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allFoods = await db.select().from(foods);
    return NextResponse.json(allFoods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json({ error: "Failed to fetch foods" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, ingredients, category, image, restaurantId } = body;

    if (!name || !price || !ingredients || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newFood = await db.insert(foods).values({
      name,
      price: Number(price),
      ingredients,
      category,
      image: image || null,
      restaurantId: restaurantId ? Number(restaurantId) : null,
    }).returning();

    return NextResponse.json(newFood[0], { status: 201 });
  } catch (error) {
    console.error("Error creating food:", error);
    return NextResponse.json({ error: "Failed to create food" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, price, ingredients, category, image, restaurantId } = body;

    if (!id) {
      return NextResponse.json({ error: "Food ID is required" }, { status: 400 });
    }

    const updated = await db.update(foods)
      .set({
        name,
        price: Number(price),
        ingredients,
        category,
        image,
        restaurantId: restaurantId ? Number(restaurantId) : null,
        updatedAt: new Date(),
      })
      .where(eq(foods.id, Number(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Food item not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating food:", error);
    return NextResponse.json({ error: "Failed to update food" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Food ID is required" }, { status: 400 });
    }

    const deleted = await db.delete(foods).where(eq(foods.id, Number(id))).returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Food item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error("Error deleting food:", error);
    return NextResponse.json({ error: "Failed to delete food" }, { status: 500 });
  }
}
