import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db/db";
import Faculty from "@/backend/models/Faculty";

/**
 * List all faculty members
 */
export async function listFaculty() {
  try {
    await connectDB();
    const facultyMembers = await Faculty.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: facultyMembers });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
}

/**
 * Create a new faculty member
 */
export async function createFaculty(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, designation, department, photoUrl } = body;

    if (!name || !designation || !department) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const faculty = await Faculty.create({
      name,
      designation,
      department,
      photoUrl,
    });

    return NextResponse.json({ success: true, data: faculty }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create faculty" },
      { status: 500 }
    );
  }
}

/**
 * Get a single faculty member by ID
 */
export async function getFaculty(id: string) {
  try {
    await connectDB();
    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return NextResponse.json(
        { success: false, message: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: faculty });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
}

/**
 * Update a faculty member by ID
 */
export async function updateFaculty(request: NextRequest, id: string) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, designation, department, photoUrl } = body;

    const faculty = await Faculty.findByIdAndUpdate(
      id,
      { name, designation, department, photoUrl },
      { new: true, runValidators: true }
    );

    if (!faculty) {
      return NextResponse.json(
        { success: false, message: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: faculty });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update faculty" },
      { status: 500 }
    );
  }
}

/**
 * Delete a faculty member by ID
 */
export async function deleteFaculty(id: string) {
  try {
    await connectDB();
    const faculty = await Faculty.findByIdAndDelete(id);

    if (!faculty) {
      return NextResponse.json(
        { success: false, message: "Faculty not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Faculty deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete faculty" },
      { status: 500 }
    );
  }
}
