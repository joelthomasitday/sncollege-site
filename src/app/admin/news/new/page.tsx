"use client";

import Link from "next/link";
import { ArrowLeft, Save, Send } from "lucide-react";
import {
  BrutalButton,
  BrutalInput,
  BrutalTextarea,
  BrutalSelect,
  BrutalCard,
  BrutalFileUpload,
} from "@/components/admin";

const categoryOptions = [
  { value: "events", label: "Events" },
  { value: "admission", label: "Admission" },
  { value: "academic", label: "Academic" },
  { value: "sports", label: "Sports" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "announcement", label: "Announcement" },
];

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

export default function NewNewsPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/news">
          <BrutalButton variant="outline" size="icon">
            <ArrowLeft size={20} />
          </BrutalButton>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Create Article</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Write a new news article or announcement
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <BrutalCard className="space-y-6">
          <BrutalInput
            label="Title"
            placeholder="Enter article title..."
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrutalSelect
              label="Category"
              options={categoryOptions}
              placeholder="Select category"
            />
            <BrutalSelect
              label="Status"
              options={statusOptions}
              placeholder="Select status"
            />
          </div>

          <BrutalFileUpload
            label="Featured Image"
            accept="image/*"
          />

          <BrutalInput
            label="Excerpt"
            placeholder="Brief summary of the article..."
          />

          <BrutalTextarea
            label="Content"
            placeholder="Write your article content here..."
            className="min-h-[300px]"
          />

          <BrutalInput
            label="Tags"
            placeholder="e.g., annual-day, celebration, 2024 (comma separated)"
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-brutal-gray">
            <BrutalButton type="submit" variant="primary" size="lg">
              <Send size={20} />
              Publish Article
            </BrutalButton>
            <BrutalButton type="button" variant="outline" size="lg">
              <Save size={20} />
              Save as Draft
            </BrutalButton>
            <Link href="/admin/news">
              <BrutalButton type="button" variant="ghost" size="lg">
                Cancel
              </BrutalButton>
            </Link>
          </div>
        </BrutalCard>
      </form>
    </div>
  );
}
