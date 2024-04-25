"use client";
import { useState } from "react";
import { Facebook, Instagram, Twitter, Smile } from "react-feather";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import Modal from "./modal";

interface Props {
  user: User;
}

interface UpdateUsernameFormValues {
  username: string;
}

interface UpdateEmailFormValues {
  email: string;
}

interface UpdatePasswordFormValues {
  password: string;
}

const updateEmailSchema = yup.object({
  email: yup.string().trim().required("Email is required").email("Must be a valid email"),
});

const updateUsernameSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(2, "Username too short, minimum length is 2")
    .max(50, "Username too long, max length is 50"),
});

const updatePasswordSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])/, "Password requires atleast 1 regural character")
    .matches(/^(?=.*[A-Z])/, "Password requires atleast 1 capital character")
    .matches(/^(?=.*[0-9])/, "Password requires atleast 1 number")
    .matches(/^(?=.*[!@#$%^&*])/, "Password requires atleast 1 special character"),
});

export const ProfileSettings = ({ user }: Props) => {
  const [activeUsername, setActiveUsername] = useState(false);
  const [activeEmail, setActiveEmail] = useState(false);
  const [activePassword, setActivePassword] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { update } = useSession();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/delete`, {
        method: "DELETE",
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

      setError("");
      signOut();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    handleSubmit: handleEmailChange,
    register: emailRegister,
    reset: emailReset,
    setError: setEmailError,
    formState: { errors: errorsEmail },
  } = useForm<UpdateEmailFormValues>({
    defaultValues: {
      email: user.email,
    },
    resolver: yupResolver(updateEmailSchema),
  });

  const {
    handleSubmit: handleUsernameChange,
    register: usernameRegister,
    reset: usernameReset,
    setError: setUsernameError,
    formState: { errors: errorsUsername },
  } = useForm<UpdateUsernameFormValues>({
    defaultValues: {
      username: user.username,
    },
    resolver: yupResolver(updateUsernameSchema),
  });

  const {
    handleSubmit: handlePasswordChange,
    register: passwordRegister,
    reset: passwordReset,
    formState: { errors: errorsPassword },
  } = useForm<UpdatePasswordFormValues>({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(updatePasswordSchema),
  });

  const handleEmailSubmit = async (formData: UpdateEmailFormValues) => {
    try {
      const updatedEmail = {
        email: formData.email,
      };
      if (updatedEmail.email === user.email) {
        setEmailError("email", {
          type: "manual",
          message: "Cant change email to same as you already have",
        });
        return;
      }
      const response = await fetch(`/api/users/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmail),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }
      if (response.ok && !data.error) {
        await update(data);
        setActiveEmail(false);
        emailReset();
        setError("");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameSubmit = async (formData: UpdateUsernameFormValues) => {
    try {
      const updatedUsername = {
        username: formData.username,
      };
      if (updatedUsername.username === user.username) {
        setUsernameError("username", {
          type: "manual",
          message: "Cant change username to same as you already have",
        });
        return;
      }
      const response = await fetch(`/api/users/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUsername),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }
      if (response.ok && !data.error) {
        await update(data);
        setActiveUsername(false);
        usernameReset();
        setError("");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordSubmit = async (formData: UpdatePasswordFormValues) => {
    try {
      const updatedPassword = {
        password: formData.password,
      };
      const response = await fetch(`/api/users/update`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPassword),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }
      if (response.ok && !data.error) {
        await update(data);
        setActivePassword(false);
        passwordReset();
        setError("");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetAllFields = () => {
    setError("");
    passwordReset();
    emailReset();
    usernameReset();
  };

  const closeModal = () => {
    setIsOpen(false);
    setError("");
  };

  return (
    <div className="profile-card">
      <div className="profile-card-left">
        <Smile size={200} />
        <div>
          <h3>Description</h3>
          <textarea rows={5} />
        </div>
        <h3>Social Media</h3>
        <div className="profile-card-social-media">
          <Twitter size={20} />
          <input
            type="text"
            value={"@username"}
            readOnly
          />
          <Instagram size={20} />
          <input
            type="text"
            value={"@username"}
            readOnly
          />
          <Facebook size={20} />
          <input
            type="text"
            value={"@username"}
            readOnly
          />
        </div>
      </div>
      <div className="profile-card-right">
        <div className="profile-card-content-divider">
          <h3>User Information</h3>
          <p className="description">Here you can change your username, email or password </p>

          {activeUsername ? (
            <form
              onSubmit={handleUsernameChange(handleUsernameSubmit)}
              className="profile-card-element"
            >
              <label
                className="profile-card-label"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                {...usernameRegister("username")}
                required
              />

              <button type="submit">Save</button>
              <div>
                {error && <p className="error-text">{error}</p>}
                {errorsUsername.username && <p className="error-text">{errorsUsername.username.message}</p>}
              </div>
            </form>
          ) : (
            <div className="profile-card-element">
              <label className="profile-card-label">Username</label>
              <p>{user.username}</p>
              <button
                onClick={() => {
                  setActiveUsername(!activeUsername);
                  setActiveEmail(false);
                  setActivePassword(false);
                  resetAllFields();
                }}
              >
                Edit
              </button>
            </div>
          )}
          {activeEmail ? (
            <form
              onSubmit={handleEmailChange(handleEmailSubmit)}
              className="profile-card-element"
            >
              <label
                className="profile-card-label"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...emailRegister("email")}
                required
              />

              <button type="submit">Save</button>
              <div>
                {error && <p className="error-text">{error}</p>}
                {errorsEmail.email && <p className="error-text">{errorsEmail.email.message}</p>}
              </div>
            </form>
          ) : (
            <div className="profile-card-element">
              <label className="profile-card-label">Email</label>
              <p>{user.email}</p>
              <button
                onClick={() => {
                  setActiveUsername(false);
                  setActiveEmail(!activeEmail);
                  setActivePassword(false);
                  resetAllFields();
                }}
              >
                Edit
              </button>
            </div>
          )}
          {activePassword ? (
            <form
              onSubmit={handlePasswordChange(handlePasswordSubmit)}
              className="profile-card-element"
            >
              <label
                className="profile-card-label"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...passwordRegister("password")}
                required
                placeholder="Set new password"
              />

              <button type="submit">Save</button>
              <div>
                {error && <p className="error-text">{error}</p>}
                {errorsPassword.password && <p className="error-text">{errorsPassword.password.message}</p>}
              </div>
            </form>
          ) : (
            <div className="profile-card-element">
              <label className="profile-card-label">Password</label>
              <p>xxxxxxxxxxxxxxxxxxx</p>
              <button
                onClick={() => {
                  setActiveUsername(false);
                  setActiveEmail(false);
                  setActivePassword(!activePassword);
                  resetAllFields();
                }}
              >
                Edit
              </button>
            </div>
          )}
          <div className="profile-card-element">
            <label className="profile-card-label">Delete Account</label>
            <p className="description">Permanently delete your account</p>
            <button
              className="button-pink"
              onClick={() => setIsOpen(true)}
            >
              Delete
            </button>
            <Modal
              isOpen={isOpen}
              closeModal={closeModal}
              content={
                <>
                  <div className="profile-card-modal-content">
                    <h3>Are you sure you want to delete your account ?</h3>

                    <p className="description">
                      If you delete your account, all your lists, reviews and other data will be destroyed permanently.
                    </p>
                  </div>

                  {error && (
                    <p
                      className="error-text"
                      style={{ display: "flex", justifyContent: "center", padding: "5px" }}
                    >
                      {error}
                    </p>
                  )}
                  <div className="profile-card-modal-buttons">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="button-pink"
                      onClick={handleDelete}
                    >
                      Delete Account
                    </button>
                  </div>
                </>
              }
            />
          </div>
        </div>
        <div className="profile-card-content-divider">
          <h3>Profile Privacy</h3>
          <p className="description">Here you can choose who can see your profile.</p>
          <form>
            <label className="label-row">
              <input
                type="radio"
                name="selectOne"
              />
              Everyone
            </label>
            <label className="label-row">
              <input
                type="radio"
                name="selectOne"
              />
              All users
            </label>
            <label className="label-row">
              <input
                type="radio"
                name="selectOne"
              />
              Users you follow
            </label>
            <label className="label-row">
              <input
                type="radio"
                name="selectOne"
              />
              Only me
            </label>
          </form>
        </div>
        <div className="profile-card-content-divider">
          <h3>Content Filter</h3>
          <p className="description">
            Here you can choose to filter content and make your movie browsing experience more suitable for your needs
          </p>
          <form>
            <label className="label-row">
              <input type="checkbox" /> Violence
            </label>
            <label className="label-row">
              <input type="checkbox" /> Lorem Ipsum
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};
