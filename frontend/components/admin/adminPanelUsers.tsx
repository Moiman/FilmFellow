"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserDetails } from "./userDetails";
import { Sidebar } from "../sidebar";

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
  const [searchInput, setSearchInput] = useState("");
  const filteredResults = searchInput ? allUsers?.filter(user => user.username.startsWith(searchInput)) : allUsers;
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
            data-cy="admin-search-input"
            className="searchbar-input"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {filteredResults?.map(user => (
          <UserDetails
            key={user.id as number}
            user={user}
            setAllUsers={setAllUsers}
          />
        ))}
      </div>
    </main>
  );
};
