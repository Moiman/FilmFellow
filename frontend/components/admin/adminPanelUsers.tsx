"use client";
// import { User } from "next-auth";
import { UserDetails } from "./userDetails";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "../sidebar";
import { Search } from "react-feather";
import { useState } from "react";
interface User {
  email: string;
  id: number | string;
  role: string;
  username: string;
  created_at: Date;
  last_visited: Date;
  isActive: boolean;
}
interface Props {
  users: User[] | undefined;
}

export const AdminPanelUsers = ({ users }: Props) => {
  const currentPath = usePathname();
  const [allUsers, setAllUsers] = useState(users);
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
      <div className="admin-panel-content">
        <div className="searchbar">
          <input
            data-cy="search-input"
            className="searchbar-input"
            placeholder="Search..."
          />
          <button className="button-transparent">
            <Search
              className="searchbar-icon"
              size={20}
            />
          </button>
        </div>
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
