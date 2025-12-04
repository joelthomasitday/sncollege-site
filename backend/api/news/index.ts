import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db/db";
import News from "@/backend/models/News";

/**
 * List all news items
 */
export async function listNews() {
  try {
    await connectDB();
    const newsList = await News.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: newsList });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

/**
 * Create a new news item
 */
export async function createNews(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, content, date } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const news = await News.create({
      title,
      content,
      date: date || new Date(),
    });

    return NextResponse.json({ success: true, data: news }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create news" },
      { status: 500 }
    );
  }
}

/**
 * Get a single news item by ID
 */
export async function getNews(id: string) {
  try {
    await connectDB();
    const news = await News.findById(id);

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

/**
 * Update a news item by ID
 */
export async function updateNews(request: NextRequest, id: string) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, content, date } = body;

    const news = await News.findByIdAndUpdate(
      id,
      { title, content, date },
      { new: true, runValidators: true }
    );

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update news" },
      { status: 500 }
    );
  }
}

/**
 * Delete a news item by ID
 */
export async function deleteNews(id: string) {
  try {
    await connectDB();
    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return NextResponse.json(
        { success: false, message: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "News deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete news" },
      { status: 500 }
    );
  }
}
