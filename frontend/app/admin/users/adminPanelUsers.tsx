"use client";
import { useState } from "react";
import { UserDetails } from "./userDetails";

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
  users: User[];
}

export const AdminPanelUsers = ({ users }: Props) => {
  const [allUsers, setAllUsers] = useState(users);
  const [searchInput, setSearchInput] = useState("");
  const filteredResults = searchInput ? allUsers.filter(user => user.username.startsWith(searchInput)) : allUsers;
  return (
    <div className="admin-panel-content">
      <div className="admin-searchbar">
        <input
          data-cy="admin-search-input"
          className="admin-searchbar-input"
          placeholder="Search..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>
      {filteredResults.map(user => (
        <UserDetails
          key={user.id}
          selectedUser={user}
          setAllUsers={setAllUsers}
        />
      ))}
    </div>
  );
};
