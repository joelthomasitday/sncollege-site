import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db/db";
import Page from "@/backend/models/Page";

/**
 * List all pages
 */
export async function listPages() {
  try {
    await connectDB();
    const pages = await Page.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: pages });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

/**
 * Create a new page
 */
export async function createPage(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { slug, title, content } = body;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return NextResponse.json(
        { success: false, message: "Page with this slug already exists" },
        { status: 400 }
      );
    }

    const page = await Page.create({
      slug,
      title,
      content,
    });

    return NextResponse.json({ success: true, data: page }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create page" },
      { status: 500 }
    );
  }
}

/**
 * Get a single page by ID
 */
export async function getPage(id: string) {
  try {
    await connectDB();
    const page = await Page.findById(id);

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

/**
 * Update a page by ID
 */
export async function updatePage(request: NextRequest, id: string) {
  try {
    await connectDB();
    const body = await request.json();
    const { slug, title, content } = body;

    const page = await Page.findByIdAndUpdate(
      id,
      { slug, title, content },
      { new: true, runValidators: true }
    );

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update page" },
      { status: 500 }
    );
  }
}

/**
 * Delete a page by ID
 */
export async function deletePage(id: string) {
  try {
    await connectDB();
    const page = await Page.findByIdAndDelete(id);

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Page deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete page" },
      { status: 500 }
    );
  }
}
