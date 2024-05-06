import { Smile } from "react-feather";
import { useState } from "react";
import { Role } from "@prisma/client";
import Modal from "../../../components/modal";
import { Dropdown } from "../../../components/dropdown";

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
  selectedUser: User;
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserDetails = ({ selectedUser, setAllUsers }: Props) => {
  const [modalError, setModalError] = useState("");
  const [error, setError] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRoleChangeOpen, setIsRoleChangeOpen] = useState(false);

  const banOptions = [
    { id: 0, banDuration: 86400, text: "1 Day" },
    { id: 1, banDuration: 604800, text: "7 Days" },
    { id: 2, banDuration: 2592000, text: "30 Days" },
    { id: 3, banDuration: null, text: "Forever" },
  ];

  const handleBanSubmit = async (banDuration: number | null) => {
    try {
      const banDetails = {
        isActive: false,
        banDuration: banDuration,
      };

      const response = await fetch(`/api/users/update/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(banDetails),
      });

      if (!response.ok) {
        setError(response.statusText);
        throw response.status;
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        throw data.error;
      }

      setAllUsers(users =>
        users.map(user => {
          if (user.id === selectedUser.id) {
            return { ...user, isActive: data.isActive };
          }
          return user;
        }),
      );
      setError("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnBanSubmit = async () => {
    try {
      const banDetails = {
        isActive: true,
        banDuration: null,
      };

      const response = await fetch(`/api/users/update/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(banDetails),
      });

      if (!response.ok) {
        setError(response.statusText);
        throw response.status;
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        throw data.error;
      }

      setAllUsers(users =>
        users.map(user => {
          if (user.id === selectedUser.id) {
            return { ...user, isActive: data.isActive };
          }
          return user;
        }),
      );
      setError("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async () => {
    try {
      const roleChange = {
        role: Role.admin,
      };

      const response = await fetch(`/api/users/update/${selectedUser.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roleChange),
      });

      if (!response.ok) {
        setModalError(response.statusText);
        throw response.status;
      }

      const data = await response.json();

      if (data.error) {
        setModalError(data.error);
        throw data.error;
      }
      setAllUsers(users =>
        users.map(user => {
          if (user.id === selectedUser.id) {
            return { ...user, role: data.role };
          }
          return user;
        }),
      );
      setModalError("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserDelete = async () => {
    try {
      const response = await fetch(`/api/users/delete/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setModalError(response.statusText);
        throw response.status;
      }

      const data = await response.json();

      if (data.error) {
        setModalError(data.error);
        throw data.error;
      }

      setAllUsers(users => users.filter(user => user.id !== data.id));
      setModalError("");
    } catch (error) {
      console.error(error);
    }
  };

  const showDate = (date: Date) => {
    const dateFormatted = date.toLocaleDateString().slice(0, 10).split("-").reverse().join(".");
    return dateFormatted;
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setModalError("");
  };

  const closeRoleChangeModal = () => {
    setIsRoleChangeOpen(false);
    setModalError("");
  };

  const openDeleteModal = () => {
    setIsDeleteOpen(true);
    setError("");
  };

  const openRoleChangeModal = () => {
    setIsRoleChangeOpen(true);
    setError("");
  };

  return (
    <div className="admin-panel-user-list">
      <div className="admin-panel-left-side">
        <div style={{ padding: "10px" }}>
          <Smile size={90} />
        </div>
        <div style={{ padding: "10px" }}>
          <p>{selectedUser.username}</p>
          <p>{selectedUser.email}</p>
        </div>
        <div style={{ padding: "10px" }}>
          <p>Last visited: {showDate(selectedUser.last_visited)}</p>
          <p>User since: {showDate(selectedUser.created_at)}</p>
          <div style={{ display: "inline-flex" }}>
            <p>Status: </p>
            <p className={selectedUser.isActive ? "admin-panel-status-active" : "admin-panel-status-suspended"}>
              {selectedUser.isActive ? "Active" : "On Suspension"}
            </p>
          </div>
        </div>
      </div>
      {selectedUser.role !== Role.admin && (
        <div
          className="admin-panel-right-side"
          style={{ padding: "20px" }}
        >
          {selectedUser.isActive ? (
            <Dropdown
              buttonAlign="right"
              zIndex={5}
              button={<button>Block user</button>}
            >
              {banOptions.map(option => (
                <button
                  key={option.id}
                  className="dropdown-item"
                  onClick={() => handleBanSubmit(option.banDuration)}
                >
                  {option.text}
                </button>
              ))}
            </Dropdown>
          ) : (
            <button onClick={handleUnBanSubmit}>Lift Ban</button>
          )}
          <button
            onClick={openDeleteModal}
            className="button-pink"
          >
            Delete
          </button>
          <Modal
            isOpen={isDeleteOpen}
            closeModal={closeDeleteModal}
            content={
              <>
                <div style={{ display: "grid", justifyContent: "center", textAlign: "center" }}>
                  <h3>Are you sure you want to delete this account ?</h3>

                  <p
                    className="description"
                    style={{ marginBottom: "25%" }}
                  >
                    If you delete this account, all of the user lists, reviews and other data will be destroyed
                    permanently.
                  </p>
                </div>

                {modalError && (
                  <p
                    className="error-text"
                    style={{ display: "flex", justifyContent: "center", padding: "5px" }}
                  >
                    {modalError}
                  </p>
                )}
                <div className="profile-settings-modal-buttons">
                  <button onClick={closeDeleteModal}>Cancel</button>
                  <button
                    className="button-pink"
                    onClick={handleUserDelete}
                  >
                    Delete Account
                  </button>
                </div>
              </>
            }
          />
          <button
            onClick={openRoleChangeModal}
            className="button-cyan"
          >
            Make admin
          </button>
          <Modal
            isOpen={isRoleChangeOpen}
            closeModal={closeRoleChangeModal}
            content={
              <>
                <div
                  className="profile-settings-modal-content"
                  style={{ marginBottom: "25%" }}
                >
                  <h3>Are you sure you want to change this user to admin ?</h3>
                </div>

                {modalError && (
                  <p
                    className="error-text"
                    style={{ display: "flex", justifyContent: "center", padding: "5px" }}
                  >
                    {modalError}
                  </p>
                )}
                <div className="profile-settings-modal-buttons">
                  <button onClick={closeRoleChangeModal}>Cancel</button>
                  <button
                    className="button-pink"
                    onClick={handleRoleChange}
                  >
                    Make Admin
                  </button>
                </div>
              </>
            }
          />
          {error && (
            <div>
              <p className="error-text">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
