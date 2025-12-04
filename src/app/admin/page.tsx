import {
  BookOpen,
  Users,
  Newspaper,
  Images,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { MetricWidget, PlaceholderChart, BrutalCard, BrutalButton } from "@/components/admin";
import Link from "next/link";

// Static data for UI demonstration
const metrics = [
  { title: "Total Courses", value: 24, icon: BookOpen, variant: "default" as const },
  { title: "Total Faculty", value: 45, icon: Users, variant: "primary" as const },
  { title: "News Articles", value: 128, icon: Newspaper, variant: "accent" as const },
  { title: "Gallery Items", value: 312, icon: Images, variant: "default" as const },
  { title: "Total Pages", value: 18, icon: FileText, variant: "primary" as const },
];

const recentActivity = [
  { action: "New course added", item: "BSc Computer Science", time: "2 hours ago" },
  { action: "Faculty updated", item: "Dr. Sharma's profile", time: "5 hours ago" },
  { action: "News published", item: "Annual Day 2024", time: "1 day ago" },
  { action: "Gallery uploaded", item: "Sports Day Photos", time: "2 days ago" },
];

const quickActions = [
  { label: "Add New Course", icon: BookOpen, href: "/admin/courses/new" },
  { label: "Add Faculty Member", icon: Users, href: "/admin/faculty/new" },
  { label: "Create News Article", icon: Newspaper, href: "/admin/news/new" },
  { label: "Upload Gallery", icon: Images, href: "/admin/gallery/new" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">
            Welcome back, <span className="text-blue-600">Admin</span> 👋
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Here&apos;s what&apos;s happening with your college today.
          </p>
        </div>
        <BrutalButton variant="primary" className="w-fit">
          <TrendingUp size={18} />
          View Analytics
        </BrutalButton>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <MetricWidget
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            variant={metric.variant}
            trend={
              index < 3
                ? { value: 12 + index * 3, isPositive: index !== 2 }
                : undefined
            }
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlaceholderChart type="bar" title="Monthly Visitors" />
        <PlaceholderChart type="line" title="Content Growth" />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <BrutalCard variant="elevated" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-slate-700">Recent Activity</h2>
            <BrutalButton variant="ghost" size="sm">
              View All
              <ArrowUpRight size={14} />
            </BrutalButton>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-100 transition-smooth hover:bg-blue-50/50 hover:border-blue-100"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {activity.item}
                  </p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </BrutalCard>

        {/* Quick Actions */}
        <BrutalCard variant="default" className="bg-blue-50 border-blue-100">
          <h2 className="text-base font-semibold text-slate-700 mb-5">Quick Actions</h2>
          <div className="space-y-2.5">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium transition-smooth hover:border-blue-300 hover:shadow-soft group">
                  <action.icon size={18} className="text-blue-500" />
                  {action.label}
                  <Plus size={16} className="ml-auto text-slate-300 group-hover:text-blue-500 transition-smooth" />
                </button>
              </Link>
            ))}
          </div>
        </BrutalCard>
      </div>

      {/* Pie Chart */}
      <div className="max-w-md">
        <PlaceholderChart type="pie" title="Content Distribution" />
      </div>
    </div>
  );
}
