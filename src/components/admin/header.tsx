"use client";

import { Bell, Search, ChevronDown, Settings, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  title?: string;
}

export function AdminHeader({ title = "Dashboard" }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
            {title}
          </h1>
          <div className="hidden md:block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse-dot" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-50 rounded-lg px-4 py-2 border border-slate-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-500/20 transition-smooth">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-40 lg:w-56 text-slate-600 placeholder:text-slate-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-smooth">
            <Bell size={20} className="text-slate-500" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 p-1.5 pr-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-smooth bg-white">
                <Avatar className="h-8 w-8 border-2 border-blue-100">
                  <AvatarImage src="" alt="Admin" />
                  <AvatarFallback className="bg-blue-500 text-white text-sm font-medium">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-slate-700">Admin User</p>
                  <p className="text-xs text-slate-400">admin@college.edu</p>
                </div>
                <ChevronDown size={16} className="hidden lg:block text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border border-slate-200 shadow-elevated rounded-lg p-1"
            >
              <DropdownMenuLabel className="text-slate-700 font-medium px-2 py-1.5">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem className="rounded-md cursor-pointer hover:bg-slate-50 px-2 py-2 gap-2 text-slate-600">
                <User size={16} className="text-slate-400" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-md cursor-pointer hover:bg-slate-50 px-2 py-2 gap-2 text-slate-600">
                <Settings size={16} className="text-slate-400" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem className="rounded-md cursor-pointer text-red-500 hover:bg-red-50 px-2 py-2 gap-2">
                <LogOut size={16} />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
