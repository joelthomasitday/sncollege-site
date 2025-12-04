"use client";

import Link from "next/link";
import { Plus, Search, Filter, Calendar, Eye } from "lucide-react";
import { BrutalButton, BrutalTable, BrutalCard } from "@/components/admin";

// Static sample data
const news = [
  {
    id: "1",
    title: "Annual Day Celebration 2024",
    category: "Events",
    author: "Admin",
    publishedAt: "2024-12-01",
    status: "Published",
    views: 1240,
  },
  {
    id: "2",
    title: "New Computer Lab Inaugurated",
    category: "Infrastructure",
    author: "Admin",
    publishedAt: "2024-11-28",
    status: "Published",
    views: 890,
  },
  {
    id: "3",
    title: "Admission Open for 2025-26",
    category: "Admission",
    author: "Admin",
    publishedAt: "2024-11-25",
    status: "Draft",
    views: 0,
  },
  {
    id: "4",
    title: "Sports Day Results Announced",
    category: "Sports",
    author: "Admin",
    publishedAt: "2024-11-20",
    status: "Published",
    views: 2100,
  },
  {
    id: "5",
    title: "Guest Lecture on AI & ML",
    category: "Academic",
    author: "Admin",
    publishedAt: "2024-11-15",
    status: "Published",
    views: 560,
  },
];

const columns = [
  {
    key: "title",
    header: "Title",
    render: (item: typeof news[0]) => (
      <div>
        <p className="font-bold">{item.title}</p>
        <p className="text-sm text-gray-500 brutal-mono">{item.category}</p>
      </div>
    ),
  },
  {
    key: "publishedAt",
    header: "Date",
    className: "w-32",
    render: (item: typeof news[0]) => (
      <div className="flex items-center gap-2 text-sm">
        <Calendar size={14} className="text-gray-400" />
        <span className="brutal-mono">{item.publishedAt}</span>
      </div>
    ),
  },
  {
    key: "views",
    header: "Views",
    className: "w-24",
    render: (item: typeof news[0]) => (
      <div className="flex items-center gap-2">
        <Eye size={14} className="text-gray-400" />
        <span className="brutal-mono font-bold">{item.views}</span>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    className: "w-28",
    render: (item: typeof news[0]) => (
      <span
        className={`
          px-3 py-1 rounded-lg text-sm font-bold brutal-mono
          ${item.status === "Published"
            ? "bg-green-100 text-green-700 border-2 border-green-500"
            : "bg-yellow-100 text-yellow-700 border-2 border-yellow-500"
          }
        `}
      >
        {item.status}
      </span>
    ),
  },
];

export default function NewsPage() {
  const handleEdit = (item: typeof news[0]) => {
    console.log("Edit:", item);
  };

  const handleDelete = (item: typeof news[0]) => {
    console.log("Delete:", item);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">News & Articles</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Manage news articles and announcements
          </p>
        </div>
        <Link href="/admin/news/new">
          <BrutalButton variant="primary">
            <Plus size={20} />
            Create Article
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
              placeholder="Search news..."
              className="w-full pl-12 pr-4 py-3 rounded-xl brutal-border-2 bg-brutal-white focus:brutal-shadow transition-all"
            />
          </div>
        </div>
        <BrutalButton variant="outline" className="w-full md:w-auto">
          <Filter size={18} />
          Filter by Category
        </BrutalButton>
      </BrutalCard>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="px-5 py-3 rounded-xl brutal-border-2 bg-brutal-white brutal-shadow-sm">
          <span className="brutal-mono text-sm text-gray-500">Total:</span>
          <span className="ml-2 font-black text-lg">{news.length}</span>
        </div>
        <div className="px-5 py-3 rounded-xl brutal-border-2 bg-green-50 border-green-500">
          <span className="brutal-mono text-sm text-green-700">Published:</span>
          <span className="ml-2 font-black text-lg text-green-700">
            {news.filter((n) => n.status === "Published").length}
          </span>
        </div>
        <div className="px-5 py-3 rounded-xl brutal-border-2 bg-yellow-50 border-yellow-500 brutal-tilt-2">
          <span className="brutal-mono text-sm text-yellow-700">Drafts:</span>
          <span className="ml-2 font-black text-lg text-yellow-700">
            {news.filter((n) => n.status === "Draft").length}
          </span>
        </div>
      </div>

      {/* Table */}
      <BrutalTable
        columns={columns}
        data={news}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
