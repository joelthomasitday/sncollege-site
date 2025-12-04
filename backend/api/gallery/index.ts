import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db/db";
import Gallery from "@/backend/models/Gallery";

/**
 * List all gallery albums
 */
export async function listGallery() {
  try {
    await connectDB();
    const galleries = await Gallery.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: galleries });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch galleries" },
      { status: 500 }
    );
  }
}

/**
 * Create a new gallery album
 */
export async function createGallery(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description, images } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const gallery = await Gallery.create({
      title,
      description,
      images: images || [],
    });

    return NextResponse.json({ success: true, data: gallery }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create gallery" },
      { status: 500 }
    );
  }
}

/**
 * Get a single gallery album by ID
 */
export async function getGallery(id: string) {
  try {
    await connectDB();
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return NextResponse.json(
        { success: false, message: "Gallery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: gallery });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

/**
 * Update a gallery album by ID
 */
export async function updateGallery(request: NextRequest, id: string) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description, images } = body;

    const gallery = await Gallery.findByIdAndUpdate(
      id,
      { title, description, images },
      { new: true, runValidators: true }
    );

    if (!gallery) {
      return NextResponse.json(
        { success: false, message: "Gallery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: gallery });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update gallery" },
      { status: 500 }
    );
  }
}

/**
 * Delete a gallery album by ID
 */
export async function deleteGallery(id: string) {
  try {
    await connectDB();
    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return NextResponse.json(
        { success: false, message: "Gallery not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Gallery deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete gallery" },
      { status: 500 }
    );
  }
}
