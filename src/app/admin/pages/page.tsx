"use client";

import Link from "next/link";
import { Plus, Search, ChevronDown, ExternalLink } from "lucide-react";
import { BrutalButton, BrutalTable, BrutalCard } from "@/components/admin";

// Static sample data
const pages = [
  {
    id: "1",
    title: "About Us",
    slug: "/about",
    status: "Published",
    lastModified: "2024-12-01",
  },
  {
    id: "2",
    title: "Contact Us",
    slug: "/contact",
    status: "Published",
    lastModified: "2024-11-28",
  },
  {
    id: "3",
    title: "Admissions",
    slug: "/admissions",
    status: "Published",
    lastModified: "2024-11-25",
  },
  {
    id: "4",
    title: "Academic Calendar",
    slug: "/academic-calendar",
    status: "Draft",
    lastModified: "2024-11-20",
  },
  {
    id: "5",
    title: "Facilities",
    slug: "/facilities",
    status: "Published",
    lastModified: "2024-11-15",
  },
  {
    id: "6",
    title: "Library",
    slug: "/library",
    status: "Published",
    lastModified: "2024-11-10",
  },
];

const columns = [
  {
    key: "title",
    header: "Page Title",
    render: (item: typeof pages[0]) => (
      <div>
        <p className="font-medium text-slate-800">{item.title}</p>
        <a
          href={item.slug}
          className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1 mt-0.5 transition-smooth"
        >
          {item.slug}
          <ExternalLink size={10} />
        </a>
      </div>
    ),
  },
  {
    key: "lastModified",
    header: "Last Modified",
    className: "w-36",
    render: (item: typeof pages[0]) => (
      <span className="text-sm text-slate-500">{item.lastModified}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    className: "w-28",
    render: (item: typeof pages[0]) => (
      <span
        className={`
          chip
          ${item.status === "Published"
            ? "chip-green"
            : "chip-yellow"
          }
        `}
      >
        {item.status}
      </span>
    ),
  },
];

export default function PagesPage() {
  const handleEdit = (item: typeof pages[0]) => {
    console.log("Edit:", item);
  };

  const handleDelete = (item: typeof pages[0]) => {
    console.log("Delete:", item);
  };

  const handleView = (item: typeof pages[0]) => {
    console.log("View:", item);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Pages</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage static pages and content
          </p>
        </div>
        <Link href="/admin/pages/new">
          <BrutalButton variant="primary">
            <Plus size={18} />
            Create Page
          </BrutalButton>
        </Link>
      </div>

      {/* Filters */}
      <BrutalCard variant="bordered" padding="sm" className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search pages..."
              className="input-clean pl-11"
            />
          </div>
        </div>
        <button className="btn btn-md btn-secondary w-full md:w-auto">
          <span>All Status</span>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </BrutalCard>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        <div className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 shadow-soft">
          <span className="text-xs text-slate-400 mr-2">Total:</span>
          <span className="font-semibold text-slate-700">{pages.length}</span>
        </div>
        <div className="px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
          <span className="text-xs text-emerald-600 mr-2">Published:</span>
          <span className="font-semibold text-emerald-700">
            {pages.filter((p) => p.status === "Published").length}
          </span>
        </div>
        <div className="px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-100">
          <span className="text-xs text-amber-600 mr-2">Drafts:</span>
          <span className="font-semibold text-amber-700">
            {pages.filter((p) => p.status === "Draft").length}
          </span>
        </div>
      </div>

      {/* Table */}
      <BrutalTable
        columns={columns}
        data={pages}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
}
