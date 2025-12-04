"use client";

import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import {
  BrutalButton,
  BrutalInput,
  BrutalTextarea,
  BrutalCard,
  BrutalFileUpload,
} from "@/components/admin";

export default function NewGalleryPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery">
          <BrutalButton variant="outline" size="icon">
            <ArrowLeft size={20} />
          </BrutalButton>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Create Album</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Create a new photo album
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <BrutalCard className="space-y-6">
          <BrutalInput
            label="Album Title"
            placeholder="e.g., Annual Day 2024"
            required
          />

          <BrutalTextarea
            label="Description"
            placeholder="Describe this album..."
            className="min-h-[100px]"
          />

          {/* Cover Image */}
          <BrutalFileUpload
            label="Cover Image"
            accept="image/*"
          />

          {/* Multiple Images Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-bold brutal-mono uppercase tracking-wider text-gray-700">
              Album Images
            </label>
            <BrutalFileUpload
              accept="image/*"
              multiple
            />
            <p className="text-sm text-gray-500 brutal-mono">
              You can upload multiple images at once. Supported formats: JPG, PNG, WebP
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-brutal-gray">
            <BrutalButton type="submit" variant="primary" size="lg">
              <Upload size={20} />
              Create Album
            </BrutalButton>
            <Link href="/admin/gallery">
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
