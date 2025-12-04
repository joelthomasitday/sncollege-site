"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Newspaper,
  Images,
  FileText,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/faculty", label: "Faculty", icon: Users },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/pages", label: "Pages", icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white text-slate-700 p-2.5 rounded-lg shadow-card border border-slate-200 transition-smooth hover:bg-slate-50"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-blue-900 text-white
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo / Brand */}
        <div className="p-5 border-b border-blue-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-soft">
              <GraduationCap className="w-6 h-6 text-blue-900" />
            </div>
            <div>
              <h1 className="font-semibold text-lg tracking-tight">SN College</h1>
              <p className="text-xs text-blue-200">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          <p className="text-[10px] text-blue-300 uppercase tracking-widest px-3 py-2 font-medium">
            Main Menu
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-smooth group
                  ${
                    isActive
                      ? "bg-white text-blue-900 font-medium shadow-soft"
                      : "text-blue-100 hover:bg-blue-800/50 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`transition-smooth ${
                    isActive ? "text-blue-600" : "text-blue-300 group-hover:text-white"
                  }`}
                />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-3 border-t border-blue-800/50">
          <button
            className="
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-blue-200 hover:bg-red-500/10 hover:text-red-300
              transition-smooth group
            "
          >
            <LogOut
              size={20}
              className="text-blue-300 group-hover:text-red-300 transition-smooth"
            />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
