"use client";
import { useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";

import { toast } from "react-toastify";
import { Eye, EyeOff, Save } from "react-feather";

import Modal from "@/components/modal";
import { ErrorMessage } from "@/components/errorMessage";

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
    .matches(/^[^<>{};]*$/, "Username contains invalid characters")
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
  const [showPassword, setShowPassword] = useState(false);
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
      toast.error(<p>Something went wrong!</p>);
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
          message: "Can't change email to same as you already have",
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
        toast(<p>Your e-mail was changed!</p>, {
          icon: <Save />,
          className: "cyan-toast",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(<p>Something went wrong!</p>);
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
          message: "Can't change username to same as you already have",
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
        toast(<p>Your username was changed!</p>, {
          icon: <Save />,
          className: "cyan-toast",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(<p>Something went wrong!</p>);
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
        toast(<p>Your password was changed!</p>, {
          icon: <Save />,
          className: "cyan-toast",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(<p>Something went wrong!</p>);
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
    <div className="profile-settings-right">
      <div className="profile-settings-divider">
        <h3>User Information</h3>

        <p className="description">Here you can change your username, email or password.</p>

        {activeUsername ? (
          <form
            onSubmit={handleUsernameChange(handleUsernameSubmit)}
            className="profile-settings-wrapper"
          >
            <label htmlFor="username">Username</label>
            <div className="profile-settings-input">
              <input
                id="username"
                type="text"
                {...usernameRegister("username")}
                required
              />

              <button type="submit">Save</button>
            </div>
            <div>
              {error && <p className="error-text">{error}</p>}
              {errorsUsername.username && <ErrorMessage message={errorsUsername.username.message} />}
            </div>
          </form>
        ) : (
          <div className="profile-settings-wrapper">
            <label>Username</label>
            <div className="profile-settings-input">
              <p>{user.username}</p>
              <button
                onClick={() => {
                  setActiveUsername(!activeUsername);
                  setActiveEmail(false);
                  setActivePassword(false);
                  resetAllFields();
                }}
                aria-label="Edit username"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {activeEmail ? (
          <form
            onSubmit={handleEmailChange(handleEmailSubmit)}
            className="profile-settings-wrapper"
          >
            <label htmlFor="email">Email</label>
            <div className="profile-settings-input">
              <input
                id="email"
                type="email"
                {...emailRegister("email")}
                required
              />

              <button type="submit">Save</button>
            </div>
            <div>
              {error && <p className="error-text">{error}</p>}
              {errorsEmail.email && <ErrorMessage message={errorsEmail.email.message} />}
            </div>
          </form>
        ) : (
          <div className="profile-settings-wrapper">
            <label>Email</label>

            <div className="profile-settings-input">
              <p>{user.email}</p>
              <button
                onClick={() => {
                  setActiveUsername(false);
                  setActiveEmail(!activeEmail);
                  setActivePassword(false);
                  resetAllFields();
                }}
                aria-label="Edit e-mail"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {activePassword ? (
          <form
            onSubmit={handlePasswordChange(handlePasswordSubmit)}
            className="profile-settings-wrapper"
          >
            <label htmlFor="password">Password</label>
            <div className="profile-settings-input">
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...passwordRegister("password")}
                  required
                  placeholder="Set new password"
                />
                <button
                  className="form-group-icon button-transparent"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <button type="submit">Save</button>
            </div>
            <div>
              {error && <p className="error-text">{error}</p>}
              {errorsPassword.password && <ErrorMessage message={errorsPassword.password.message} />}
            </div>
          </form>
        ) : (
          <div className="profile-settings-wrapper">
            <label>Password</label>

            <div className="profile-settings-input">
              <p>************</p>
              <button
                onClick={() => {
                  setActiveUsername(false);
                  setActiveEmail(false);
                  setActivePassword(!activePassword);
                  resetAllFields();
                }}
                aria-label="Edit password"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        <div className="profile-settings-wrapper">
          <label>Delete Account</label>
          <div className="profile-settings-input">
            <p>Permanently delete your account.</p>
            <button
              className="button-pink"
              onClick={() => setIsOpen(true)}
            >
              Delete
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            content={
              <div style={{ display: "grid", textAlign: "center" }}>
                <div>
                  <h3 className="h4">Are you sure you want to delete your account?</h3>

                  <p className="description">
                    If you delete your account, all your lists, reviews and other data will be destroyed permanently.
                  </p>

                  {error !== "" && <ErrorMessage message={error} />}
                </div>
                <div className="modal-buttons">
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
                    Delete account
                  </button>
                </div>
              </div>
            }
          />
        </div>
      </div>
      {/* Hide until implemented
      <div className="profile-settings-divider">
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
      <div className="profile-settings-divider">
        <h3>Content Filter</h3>
        <p className="description">
          Here you can choose to filter content and make your movie browsing experience more suitable for your needs.
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
          */}
    </div>
  );
};
