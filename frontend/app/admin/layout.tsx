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
        <div className="admin-panel-side-bar">
          <Link
            href="/admin/users"
            style={{ width: "100px", padding: "10px" }}
            className={currentPath === "/admin/users" ? "admin-panel-active-link" : ""}
          >
            Users
          </Link>
          <Link
            href="/admin/reports"
            style={{ width: "100px", padding: "10px" }}
            className={currentPath === "/admin/reports" ? "admin-panel-active-link" : ""}
          >
            Reports
          </Link>
          <Link
            href="/admin/statistics"
            style={{ width: "100px", padding: "10px" }}
            className={currentPath === "/admin/statistics" ? "admin-panel-active-link" : ""}
          >
            Statistics
          </Link>
        </div>
      </Sidebar>
      {children}
    </main>
  );
}
