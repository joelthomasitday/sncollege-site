"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import {
  BrutalButton,
  BrutalInput,
  BrutalTextarea,
  BrutalSelect,
  BrutalCard,
} from "@/components/admin";

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const durationOptions = [
  { value: "1", label: "1 Year" },
  { value: "2", label: "2 Years" },
  { value: "3", label: "3 Years" },
  { value: "4", label: "4 Years" },
];

export default function NewCoursePage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No API logic - UI only
    console.log("Form submitted");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/courses">
          <BrutalButton variant="outline" size="icon">
            <ArrowLeft size={20} />
          </BrutalButton>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Add New Course</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Create a new course for the college
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <BrutalCard className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrutalInput
              label="Course Name"
              placeholder="e.g., BSc Computer Science"
              required
            />
            <BrutalInput
              label="Course Code"
              placeholder="e.g., BCS101"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrutalSelect
              label="Duration"
              options={durationOptions}
              placeholder="Select duration"
            />
            <BrutalSelect
              label="Status"
              options={statusOptions}
              placeholder="Select status"
            />
          </div>

          <BrutalTextarea
            label="Description"
            placeholder="Enter course description..."
            className="min-h-[150px]"
          />

          <BrutalInput
            label="Eligibility"
            placeholder="e.g., 10+2 with Science stream"
          />

          <BrutalInput
            label="Fees (per year)"
            type="number"
            placeholder="e.g., 50000"
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-brutal-gray">
            <BrutalButton type="submit" variant="primary" size="lg">
              <Save size={20} />
              Save Course
            </BrutalButton>
            <Link href="/admin/courses">
              <BrutalButton type="button" variant="outline" size="lg">
                Cancel
              </BrutalButton>
            </Link>
          </div>
        </BrutalCard>
      </form>
    </div>
  );
}
