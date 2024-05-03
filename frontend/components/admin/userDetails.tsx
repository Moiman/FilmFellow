import { Smile } from "react-feather";
import { useState } from "react";
import { Role } from "@prisma/client";
import Modal from "../modal";
import { Dropdown } from "../dropdown";

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
  user: User;
  key: number;
  setAllUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>;
}

export const UserDetails = ({ user, setAllUsers }: Props) => {
  const [modalError, setModalError] = useState("");
  const [error, setError] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRoleChangeOpen, setIsRoleChangeOpen] = useState(false);

  const handleBanSubmit = async (banDuration: number | null) => {
    try {
      const banDetails = {
        isActive: false,
        banDuration: banDuration,
      };

      const response = await fetch(`/api/users/update/${user.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(banDetails),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }
      if (response.ok && !data.error) {
        setAllUsers(prev =>
          prev?.map(User => {
            if (User.id === user.id) {
              return { ...User, isActive: data.isActive };
            }
            return User;
          }),
        );
        setError("");
      }
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

      const response = await fetch(`/api/users/update/${user.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(banDetails),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }
      if (response.ok && !data.error) {
        setAllUsers(prev =>
          prev?.map(User => {
            if (User.id === user.id) {
              return { ...User, isActive: data.isActive };
            }
            return User;
          }),
        );
        setError("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async () => {
    try {
      const roleChange = {
        role: Role.admin,
      };

      const response = await fetch(`/api/users/update/${user.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roleChange),
      });

      const data = await response.json();
      if (!response.ok) {
        setModalError(data.error);
        return;
      }
      if (response.ok && !data.error) {
        setAllUsers(prev =>
          prev?.map(User => {
            if (User.id === user.id) {
              return { ...User, role: data.role };
            }
            return User;
          }),
        );
        setModalError("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserDelete = async () => {
    try {
      const response = await fetch(`/api/users/delete/${user.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        setModalError(data.error);
        return;
      }
      if (response.ok && !data.error) {
        setAllUsers(prev => prev?.filter(User => User.id !== data.id));
        setModalError("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showDate = (date: Date) => {
    const dateFormatted = date.toISOString().slice(0, 10).split("-").reverse().join(".");
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
    <>
      <div className="admin-panel-user-list">
        <div className="admin-panel-left-side">
          <div style={{ padding: "10px" }}>
            <Smile size={90} />
          </div>
          <div style={{ padding: "10px" }}>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
          <div style={{ padding: "10px" }}>
            <p>Last visited: {showDate(user.last_visited)}</p>
            <p>User since: {showDate(user.created_at)}</p>
            <div style={{ display: "inline-flex" }}>
              Status:
              <p className={user.isActive === true ? "admin-panel-status-active" : "admin-panel-status-suspended"}>
                {user.isActive === true ? "Active" : "On Suspension"}
              </p>
            </div>
          </div>
        </div>
        {user.role !== Role.admin && (
          <div
            className="admin-panel-right-side"
            style={{ padding: "20px" }}
          >
            {user.isActive === true ? (
              <Dropdown
                buttonAlign="right"
                zIndex={5}
                button={<button>Block user</button>}
              >
                <button
                  onClick={() => {
                    handleBanSubmit(86400);
                  }}
                  className="dropdown-item"
                >
                  1 Day
                </button>
                <button
                  onClick={() => {
                    handleBanSubmit(604800);
                  }}
                  className="dropdown-item"
                >
                  7 Days
                </button>
                <button
                  onClick={() => {
                    handleBanSubmit(2592000);
                  }}
                  className="dropdown-item"
                >
                  30 Days
                </button>
                <button
                  onClick={() => {
                    handleBanSubmit(null);
                  }}
                  className="dropdown-item"
                >
                  Forever
                </button>
              </Dropdown>
            ) : (
              <button onClick={() => handleUnBanSubmit()}>Lift Ban</button>
            )}
            <button
              onClick={() => openDeleteModal()}
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
                    <button
                      onClick={() => {
                        closeDeleteModal();
                      }}
                    >
                      Cancel
                    </button>
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
              onClick={() => openRoleChangeModal()}
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
                    <button
                      onClick={() => {
                        closeRoleChangeModal();
                      }}
                    >
                      Cancel
                    </button>
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
    </>
  );
};
