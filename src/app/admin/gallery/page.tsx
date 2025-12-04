"use client";

import Link from "next/link";
import { Plus, Search, Grid, List, Image as ImageIcon } from "lucide-react";
import { BrutalButton, BrutalCard } from "@/components/admin";
import { useState } from "react";

// Static sample data
const galleryItems = [
  {
    id: "1",
    title: "Annual Day 2024",
    imageCount: 45,
    thumbnail: "/placeholder-1.jpg",
    createdAt: "2024-12-01",
  },
  {
    id: "2",
    title: "Sports Day",
    imageCount: 78,
    thumbnail: "/placeholder-2.jpg",
    createdAt: "2024-11-28",
  },
  {
    id: "3",
    title: "Science Exhibition",
    imageCount: 32,
    thumbnail: "/placeholder-3.jpg",
    createdAt: "2024-11-20",
  },
  {
    id: "4",
    title: "Campus Tour",
    imageCount: 24,
    thumbnail: "/placeholder-4.jpg",
    createdAt: "2024-11-15",
  },
  {
    id: "5",
    title: "Guest Lecture",
    imageCount: 18,
    thumbnail: "/placeholder-5.jpg",
    createdAt: "2024-11-10",
  },
  {
    id: "6",
    title: "Freshers Party",
    imageCount: 56,
    thumbnail: "/placeholder-6.jpg",
    createdAt: "2024-11-05",
  },
];

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Gallery</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Manage photo albums and media files
          </p>
        </div>
        <Link href="/admin/gallery/new">
          <BrutalButton variant="primary">
            <Plus size={20} />
            Create Album
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
              placeholder="Search albums..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <BrutalButton
            variant={viewMode === "grid" ? "primary" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid size={20} />
          </BrutalButton>
          <BrutalButton
            variant={viewMode === "list" ? "primary" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List size={20} />
          </BrutalButton>
        </div>
      </BrutalCard>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="px-5 py-3 rounded-xl border-2 border-slate-200 bg-white shadow-soft">
          <span className="font-mono text-sm text-gray-500">Albums:</span>
          <span className="ml-2 font-black text-lg">{galleryItems.length}</span>
        </div>
        <div className="px-5 py-3 rounded-xl border-2 border-amber-400 bg-amber-50">
          <span className="font-mono text-sm">Total Images:</span>
          <span className="ml-2 font-black text-lg">
            {galleryItems.reduce((acc, item) => acc + item.imageCount, 0)}
          </span>
        </div>
      </div>

      {/* Gallery Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl border-2 border-slate-200 shadow-card
                overflow-hidden bg-white hover:shadow-elevated hover:-translate-y-1 transition-all duration-200"
            >
              {/* Placeholder Image */}
              <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                <ImageIcon size={48} className="text-gray-400" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                <h3 className="font-bold text-lg text-white">{item.title}</h3>
                <p className="text-amber-400 text-sm font-mono">
                  {item.imageCount} images
                </p>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <BrutalButton size="icon" variant="primary" className="!p-2">
                  <ImageIcon size={16} />
                </BrutalButton>
              </div>

              {/* Image Count Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/80 text-white text-sm font-bold font-mono">
                {item.imageCount}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {galleryItems.map((item) => (
            <BrutalCard
              key={item.id}
              padding="sm"
              className="flex items-center gap-6 hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-24 h-24 rounded-xl border-2 border-slate-200 bg-slate-100 flex items-center justify-center flex-shrink-0">
                <ImageIcon size={32} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 font-mono text-sm">
                  {item.imageCount} images • Created {item.createdAt}
                </p>
              </div>
              <div className="flex gap-2">
                <BrutalButton size="sm" variant="outline">
                  Edit
                </BrutalButton>
                <BrutalButton size="sm" variant="destructive">
                  Delete
                </BrutalButton>
              </div>
            </BrutalCard>
          ))}
        </div>
      )}
    </div>
  );
}
