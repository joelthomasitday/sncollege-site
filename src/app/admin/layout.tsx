import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";

export const metadata = {
  title: "Admin Dashboard | SN College",
  description: "Admin panel for managing college content",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="animate-fadeIn">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
            <p className="text-slate-400">
              © 2024 SN College Admin Panel
            </p>
            <p className="text-slate-300 text-xs">
              v1.0.0 • Built with Next.js
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
