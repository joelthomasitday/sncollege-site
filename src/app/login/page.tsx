"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { BrutalInput } from "@/components/admin/brutal-input";
import { BrutalButton } from "@/components/admin/brutal-button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No API logic - UI only
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-brutal-gray flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0a0a0a" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Decorative Background Card */}
        <div className="absolute -top-2 -left-2 w-full h-full bg-brutal-yellow rounded-3xl brutal-border-2" />
        
        {/* Main Card */}
        <div className="relative bg-brutal-white rounded-3xl brutal-border-2 brutal-shadow p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-brutal-black rounded-2xl brutal-shadow-sm flex items-center justify-center brutal-tilt-2">
              <span className="text-brutal-yellow font-black text-3xl brutal-mono">SN</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
              ADMIN LOGIN
            </h1>
            <p className="text-gray-500 brutal-mono text-sm">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <BrutalInput
              label="Email Address"
              type="email"
              placeholder="admin@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <BrutalInput
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 p-2 text-gray-500 hover:text-brutal-black transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Remember Me & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-lg brutal-border-2 accent-brutal-yellow"
                />
                <span className="font-medium">Remember me</span>
              </label>
              <a href="#" className="font-bold text-brutal-black hover:underline underline-offset-4">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <BrutalButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-lg group"
            >
              Login to Dashboard
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
            </BrutalButton>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t-2 border-brutal-gray">
            <p className="text-center text-sm text-gray-500 brutal-mono">
              Protected area • Authorized personnel only
            </p>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-brutal-black rounded-lg brutal-tilt-1" />
        <div className="absolute -top-6 right-10 w-4 h-4 bg-brutal-yellow rounded-full" />
      </div>
    </div>
  );
}
