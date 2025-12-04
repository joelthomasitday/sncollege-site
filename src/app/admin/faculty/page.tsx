"use client";

import Link from "next/link";
import { Plus, Search, Filter, Mail, Phone } from "lucide-react";
import { BrutalButton, BrutalTable, BrutalCard } from "@/components/admin";

// Static sample data
const faculty = [
  {
    id: "1",
    name: "Dr. Rajesh Sharma",
    department: "Computer Science",
    designation: "Professor",
    email: "rajesh@college.edu",
    phone: "+91 98765 43210",
  },
  {
    id: "2",
    name: "Dr. Priya Patel",
    department: "Mathematics",
    designation: "Associate Professor",
    email: "priya@college.edu",
    phone: "+91 98765 43211",
  },
  {
    id: "3",
    name: "Prof. Amit Kumar",
    department: "Physics",
    designation: "Assistant Professor",
    email: "amit@college.edu",
    phone: "+91 98765 43212",
  },
  {
    id: "4",
    name: "Dr. Sneha Gupta",
    department: "English",
    designation: "Professor",
    email: "sneha@college.edu",
    phone: "+91 98765 43213",
  },
  {
    id: "5",
    name: "Prof. Vikram Singh",
    department: "History",
    designation: "Associate Professor",
    email: "vikram@college.edu",
    phone: "+91 98765 43214",
  },
];

const columns = [
  {
    key: "name",
    header: "Name",
    render: (item: typeof faculty[0]) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl brutal-border-2 bg-brutal-yellow flex items-center justify-center font-bold text-lg">
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold">{item.name}</p>
          <p className="text-sm text-gray-500 brutal-mono">{item.designation}</p>
        </div>
      </div>
    ),
  },
  { key: "department", header: "Department" },
  {
    key: "contact",
    header: "Contact",
    render: (item: typeof faculty[0]) => (
      <div className="space-y-1">
        <p className="text-sm flex items-center gap-2">
          <Mail size={14} className="text-gray-400" />
          {item.email}
        </p>
        <p className="text-sm flex items-center gap-2 brutal-mono">
          <Phone size={14} className="text-gray-400" />
          {item.phone}
        </p>
      </div>
    ),
  },
];

export default function FacultyPage() {
  const handleEdit = (item: typeof faculty[0]) => {
    console.log("Edit:", item);
  };

  const handleDelete = (item: typeof faculty[0]) => {
    console.log("Delete:", item);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Faculty</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Manage faculty members and their profiles
          </p>
        </div>
        <Link href="/admin/faculty/new">
          <BrutalButton variant="primary">
            <Plus size={20} />
            Add Faculty Member
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
              placeholder="Search faculty..."
              className="w-full pl-12 pr-4 py-3 rounded-xl brutal-border-2 bg-brutal-white focus:brutal-shadow transition-all"
            />
          </div>
        </div>
        <BrutalButton variant="outline" className="w-full md:w-auto">
          <Filter size={18} />
          Filter by Department
        </BrutalButton>
      </BrutalCard>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="px-5 py-3 rounded-xl brutal-border-2 bg-brutal-white brutal-shadow-sm">
          <span className="brutal-mono text-sm text-gray-500">Total Faculty:</span>
          <span className="ml-2 font-black text-lg">{faculty.length}</span>
        </div>
        <div className="px-5 py-3 rounded-xl brutal-border-2 bg-brutal-yellow brutal-tilt-1">
          <span className="brutal-mono text-sm">Professors:</span>
          <span className="ml-2 font-black text-lg">
            {faculty.filter((f) => f.designation === "Professor").length}
          </span>
        </div>
      </div>

      {/* Table */}
      <BrutalTable
        columns={columns}
        data={faculty}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
