import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/backend/lib/db/db";
import Course from "@/backend/models/Course";

/**
 * List all courses
 */
export async function listCourses() {
  try {
    await connectDB();
    const courses = await Course.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

/**
 * Create a new course
 */
export async function createCourse(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description, duration, department } = body;

    if (!title || !description || !duration || !department) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const course = await Course.create({
      title,
      description,
      duration,
      department,
    });

    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create course" },
      { status: 500 }
    );
  }
}

/**
 * Get a single course by ID
 */
export async function getCourse(id: string) {
  try {
    await connectDB();
    const course = await Course.findById(id);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

/**
 * Update a course by ID
 */
export async function updateCourse(request: NextRequest, id: string) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description, duration, department } = body;

    const course = await Course.findByIdAndUpdate(
      id,
      { title, description, duration, department },
      { new: true, runValidators: true }
    );

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update course" },
      { status: 500 }
    );
  }
}

/**
 * Delete a course by ID
 */
export async function deleteCourse(id: string) {
  try {
    await connectDB();
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Course deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete course" },
      { status: 500 }
    );
  }
}
