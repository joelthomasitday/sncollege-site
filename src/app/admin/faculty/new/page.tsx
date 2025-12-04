"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import {
  BrutalButton,
  BrutalInput,
  BrutalTextarea,
  BrutalSelect,
  BrutalCard,
  BrutalFileUpload,
} from "@/components/admin";

const departmentOptions = [
  { value: "cs", label: "Computer Science" },
  { value: "math", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "english", label: "English" },
  { value: "history", label: "History" },
  { value: "chemistry", label: "Chemistry" },
];

const designationOptions = [
  { value: "professor", label: "Professor" },
  { value: "associate", label: "Associate Professor" },
  { value: "assistant", label: "Assistant Professor" },
  { value: "lecturer", label: "Lecturer" },
];

export default function NewFacultyPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/faculty">
          <BrutalButton variant="outline" size="icon">
            <ArrowLeft size={20} />
          </BrutalButton>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Add Faculty Member</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Create a new faculty profile
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <BrutalCard className="space-y-6">
          {/* Photo Upload */}
          <BrutalFileUpload
            label="Profile Photo"
            accept="image/*"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrutalInput
              label="Full Name"
              placeholder="e.g., Dr. Rajesh Sharma"
              required
            />
            <BrutalInput
              label="Email"
              type="email"
              placeholder="e.g., rajesh@college.edu"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrutalInput
              label="Phone"
              type="tel"
              placeholder="e.g., +91 98765 43210"
            />
            <BrutalSelect
              label="Department"
              options={departmentOptions}
              placeholder="Select department"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrutalSelect
              label="Designation"
              options={designationOptions}
              placeholder="Select designation"
            />
            <BrutalInput
              label="Qualification"
              placeholder="e.g., Ph.D in Computer Science"
            />
          </div>

          <BrutalTextarea
            label="Bio / About"
            placeholder="Brief introduction about the faculty member..."
            className="min-h-[120px]"
          />

          <BrutalInput
            label="Specialization"
            placeholder="e.g., Machine Learning, Data Science"
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-brutal-gray">
            <BrutalButton type="submit" variant="primary" size="lg">
              <Save size={20} />
              Save Faculty
            </BrutalButton>
            <Link href="/admin/faculty">
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
