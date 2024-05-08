"use client";
import { Sidebar } from "@/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function SideBarLayout({ children }: Props) {
  const currentPath = usePathname();
  return (
    <main className="sidebar-main">
      <Sidebar iconPosition="right">
        <div className="admin-panel-sidebar">
          <Link
            href="/admin/users"
            className={currentPath === "/admin/users" ? "active-admin-link" : ""}
          >
            Users
          </Link>
          <Link
            href="/admin/reports"
            className={currentPath === "/admin/reports" ? "active-admin-link" : ""}
          >
            Reports
          </Link>
          <Link
            href="/admin/statistics"
            className={currentPath === "/admin/statistics" ? "active-admin-link" : ""}
          >
            Statistics
          </Link>
        </div>
      </Sidebar>
      {children}
    </main>
  );
}
