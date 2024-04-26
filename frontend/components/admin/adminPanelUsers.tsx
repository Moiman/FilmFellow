"use client";
import { User } from "next-auth";
import { UserDetails } from "./userDetails";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "../sidebar";

interface Props {
  users: User[] | undefined;
}

export const AdminPanelUsers = ({ users }: Props) => {
  const currentPath = usePathname();
  console.log(users![0]);
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
          >
            Reports
          </Link>
          <Link
            href="/admin/statistics"
            style={{ width: "100px", padding: "10px" }}
          >
            Statistics
          </Link>
        </div>
      </Sidebar>
      <div className="admin-panel-home-content">
        {users?.map(user => (
          <UserDetails
            key={user.id as number}
            user={user}
          />
        ))}
      </div>
    </main>
  );
};
