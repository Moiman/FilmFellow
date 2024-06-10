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
  const filteredResults = searchInput
    ? allUsers.filter(user => user.username.toLowerCase().startsWith(searchInput))
    : allUsers;
  return (
    <div className="admin-panel-content">
      <div className="admin-searchbar">
        <input
          type="text"
          data-cy="admin-search-input"
          className="admin-searchbar-input"
          placeholder="Search user..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value.toLowerCase())}
        />
      </div>
      <div className="admin-panel-user-wrapper">
        {filteredResults.map(user => (
          <UserDetails
            key={user.id}
            selectedUser={user}
            setAllUsers={setAllUsers}
          />
        ))}
      </div>
    </div>
  );
};
