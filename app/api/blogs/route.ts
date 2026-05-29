import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allBlogs = await db.select().from(blogs);
    return NextResponse.json(allBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, image, author, date, status } = body;

    const newBlog = await db.insert(blogs).values({
      title,
      content,
      excerpt,
      category,
      image,
      author,
      date,
      status,
    }).returning();

    return NextResponse.json(newBlog[0], { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content, excerpt, category, image, author, date, status } = body;

    const updatedBlog = await db.update(blogs)
      .set({
        title,
        content,
        excerpt,
        category,
        image,
        author,
        date,
        status,
        updatedAt: new Date(),
      })
      .where(eq(blogs.id, id))
      .returning();

    if (updatedBlog.length === 0) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBlog[0]);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
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
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deletedBlog = await db.delete(blogs).where(eq(blogs.id, Number(id))).returning();

    if (deletedBlog.length === 0) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
