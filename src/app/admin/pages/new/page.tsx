"use client";

import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";
import {
  BrutalButton,
  BrutalInput,
  BrutalTextarea,
  BrutalSelect,
  BrutalCard,
} from "@/components/admin";

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
];

export default function NewPagePage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/pages">
          <BrutalButton variant="outline" size="icon">
            <ArrowLeft size={20} />
          </BrutalButton>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight">Create Page</h1>
          <p className="text-gray-500 brutal-mono mt-1">
            Create a new static page
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <BrutalCard className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BrutalInput
              label="Page Title"
              placeholder="e.g., About Us"
              required
            />
            <BrutalInput
              label="URL Slug"
              placeholder="e.g., /about-us"
              required
            />
          </div>

          <BrutalSelect
            label="Status"
            options={statusOptions}
            placeholder="Select status"
          />

          <BrutalInput
            label="Meta Title"
            placeholder="SEO title for search engines"
          />

          <BrutalTextarea
            label="Meta Description"
            placeholder="SEO description for search engines"
            className="min-h-[80px]"
          />

          <BrutalTextarea
            label="Page Content"
            placeholder="Write your page content here. You can use HTML markup..."
            className="min-h-[400px]"
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-brutal-gray">
            <BrutalButton type="submit" variant="primary" size="lg">
              <Save size={20} />
              Save Page
            </BrutalButton>
            <BrutalButton type="button" variant="outline" size="lg">
              <Eye size={20} />
              Preview
            </BrutalButton>
            <Link href="/admin/pages">
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
