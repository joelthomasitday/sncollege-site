"use client";

import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { BrutalButton, BrutalTable, BrutalCard, BrutalInput } from "@/components/admin";

// Static sample data
const courses = [
  { id: "1", name: "BSc Computer Science", code: "BCS101", duration: "3 Years", status: "Active" },
  { id: "2", name: "BSc Mathematics", code: "BMT102", duration: "3 Years", status: "Active" },
  { id: "3", name: "BA English Literature", code: "BEL103", duration: "3 Years", status: "Active" },
  { id: "4", name: "BCom Accounting", code: "BCA104", duration: "3 Years", status: "Inactive" },
  { id: "5", name: "MSc Physics", code: "MPH201", duration: "2 Years", status: "Active" },
  { id: "6", name: "MA History", code: "MHI202", duration: "2 Years", status: "Active" },
];

const columns = [
  { key: "code", header: "Code", className: "w-24" },
  { key: "name", header: "Course Name" },
  { key: "duration", header: "Duration", className: "w-28" },
  {
    key: "status",
    header: "Status",
    className: "w-28",
    render: (course: typeof courses[0]) => (
      <span
        className={`
          px-3 py-1 rounded-lg text-sm font-bold brutal-mono
          ${course.status === "Active" 
            ? "bg-green-100 text-green-700 border-2 border-green-500" 
            : "bg-gray-100 text-gray-600 border-2 border-gray-400"
          }
        `}
      >
        {course.status}
      </span>
    ),
  },
];

export default function CoursesPage() {
  const handleEdit = (course: typeof courses[0]) => {
    console.log("Edit:", course);
  };

  const handleDelete = (course: typeof courses[0]) => {
    console.log("Delete:", course);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Courses</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Manage all courses offered by the college
          </p>
        </div>
        <Link href="/admin/courses/new">
          <BrutalButton variant="primary">
            <Plus size={20} />
            Add New Course
          </BrutalButton>
        </Link>
      </div>

      {/* Filters */}
      <BrutalCard padding="sm" className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 rounded-xl brutal-border-2 bg-brutal-white focus:brutal-shadow transition-all"
            />
          </div>
        </div>
        <BrutalButton variant="outline" className="w-full md:w-auto">
          <Filter size={18} />
          Filters
        </BrutalButton>
      </BrutalCard>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-4">
        <div className="px-5 py-3 rounded-xl brutal-border-2 bg-brutal-white brutal-shadow-sm">
          <span className="brutal-mono text-sm text-gray-500">Total:</span>
          <span className="ml-2 font-black text-lg">{courses.length}</span>
        </div>
        <div className="px-5 py-3 rounded-xl brutal-border-2 bg-green-50 border-green-500">
          <span className="brutal-mono text-sm text-green-700">Active:</span>
          <span className="ml-2 font-black text-lg text-green-700">
            {courses.filter((c) => c.status === "Active").length}
          </span>
        </div>
        <div className="px-5 py-3 rounded-xl brutal-border-2 bg-gray-100 border-gray-400">
          <span className="brutal-mono text-sm text-gray-600">Inactive:</span>
          <span className="ml-2 font-black text-lg text-gray-600">
            {courses.filter((c) => c.status === "Inactive").length}
          </span>
        </div>
      </div>

      {/* Table */}
      <BrutalTable
        columns={columns}
        data={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
