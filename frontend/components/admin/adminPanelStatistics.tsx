"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "../sidebar";

export const AdminPanelStatistics = () => {
  const currentPath = usePathname();
  return (
    <main className="sidebar-main">
      <Sidebar iconPosition="right">
        <div className="admin-panel-side-bar">
          <Link
            href="/admin/users"
            style={{ width: "100px", padding: "10px" }}
          >
            Users
          </Link>
          <Link
            href="/admin/reports"
            style={{ width: "100px", padding: "10px" }}
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
      <div>In Progress</div>
    </main>
  );
};
