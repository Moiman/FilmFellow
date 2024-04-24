"use client";
import { useState } from "react";
import { Facebook, Instagram, Twitter, Smile } from "react-feather";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "./modal";

interface Props {
  user: User;
}
interface User {
  email: string;
  id: number | string;
  role: string;
  username: string;
}
interface updateUsernameFormValues {
  username: string;
}

interface updateEmailFormValues {
  email: string;
}

interface updatePasswordFormValues {
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

export const ProfileCard = ({ user }: Props) => {
  const [activeUsername, setUsernameActive] = useState(false);
  const [activeEmail, setEmailActive] = useState(false);
  const [activePassword, setPasswordActive] = useState(false);
  const [error, setError] = useState("");
  const [radioButtonValue, setRadioButtonValue] = useState("");
  const { update } = useSession();
  const router = useRouter();
  console.log(radioButtonValue);
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/delete`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        throw data.error;
      }

      if (response.ok && !data.error) {
        setError("");
        signOut();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const {
    handleSubmit: handleEmailChange,
    register: emailRegister,
    reset: emailReset,
    formState: { errors: errorsEmail },
  } = useForm<updateEmailFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(updateEmailSchema),
  });

  const {
    handleSubmit: handleUsernameChange,
    register: usernameRegister,
    reset: usernameReset,
    formState: { errors: errorsUsername },
  } = useForm<updateUsernameFormValues>({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(updateUsernameSchema),
  });

  const {
    handleSubmit: handlePasswordChange,
    register: passwordRegister,
    reset: passwordReset,
    formState: { errors: errorsPassword },
  } = useForm<updatePasswordFormValues>({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(updatePasswordSchema),
  });

  const handleEmailSubmit = async (formData: updateEmailFormValues) => {
    try {
      const updatedEmail = {
        email: formData.email,
      };
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
        setEmailActive(false);
        emailReset();
        setError("");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameSubmit = async (formData: updateUsernameFormValues) => {
    try {
      const updatedUsername = {
        username: formData.username,
      };
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
        setUsernameActive(false);
        usernameReset();
        setError("");
        router.refresh();
      }

      /*
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          username: data.username,
        },
      };

      await update(newSession);
*/
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordSubmit = async (formData: updatePasswordFormValues) => {
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
        setPasswordActive(false);
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
          <p>Here you can change your username, email or password </p>

          {activeUsername ? (
            <form
              onSubmit={handleUsernameChange(handleUsernameSubmit)}
              className="profile-card-forms"
            >
              <label
                className="profile-card-forms-first-element"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                {...usernameRegister("username")}
                required
                placeholder="Set new username"
              />

              <button type="submit">Save</button>
              <div>
                {error && <p className="error-text">{error}</p>}
                {errorsUsername.username && <p className="error-text">{errorsUsername.username.message}</p>}
              </div>
            </form>
          ) : (
            <div className="profile-card-forms">
              <label className="profile-card-forms-first-element">Username</label>
              <p>{user.username}</p>
              <button
                onClick={() => {
                  setUsernameActive(!activeUsername);
                  setEmailActive(false);
                  setPasswordActive(false);
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
              className="profile-card-forms"
            >
              <label
                className="profile-card-forms-first-element"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...emailRegister("email")}
                required
                placeholder="Set new email"
              />

              <button type="submit">Save</button>
              <div>
                {error && <p className="error-text">{error}</p>}
                {errorsEmail.email && <p className="error-text">{errorsEmail.email.message}</p>}
              </div>
            </form>
          ) : (
            <div className="profile-card-forms">
              <label className="profile-card-forms-first-element">Email</label>
              <p>{user.email}</p>
              <button
                onClick={() => {
                  setUsernameActive(false);
                  setEmailActive(!activeEmail);
                  setPasswordActive(false);
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
              className="profile-card-forms"
            >
              <label
                className="profile-card-forms-first-element"
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
            <div className="profile-card-forms">
              <label className="profile-card-forms-first-element">Password</label>
              <p>xxxxxxxxxxxxxxxxxxx</p>
              <button
                onClick={() => {
                  setUsernameActive(false);
                  setEmailActive(false);
                  setPasswordActive(!activePassword);
                  resetAllFields();
                }}
              >
                Edit
              </button>
            </div>
          )}
          <div className="profile-card-forms">
            <label className="profile-card-forms-first-element">Delete Account</label>
            <p>Permanently delete your account</p>
            <Modal
              resetErrors={() => setError("")}
              modalId={user.id as number}
              cancelVerificationComponent={
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button>Cancel</button>
                </div>
              }
              content={
                <div className="profile-card-modal-content">
                  <p>Are you sure you want to delete your account ? </p>
                </div>
              }
              _onOk={handleDelete}
              okLink={
                <>
                  {error && (
                    <p
                      className="error-text"
                      style={{ display: "flex", justifyContent: "center", padding: "5px" }}
                    >
                      {error}
                    </p>
                  )}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button>Delete Account</button>
                  </div>
                </>
              }
              openModalText="Delete"
            />
          </div>
        </div>
        <div className="profile-card-content-divider">
          <h3>Profile Privacy</h3>
          <p>Here you can choose who can see your profile.</p>
          <form>
            <label className="label-row">
              <input
                type="radio"
                name="selectOne"
                value={"Everyone"}
                onChange={e => setRadioButtonValue(e.target.value)}
              />
              Everyone
            </label>
            <label className="label-row">
              <input
                type="radio"
                name="selectOne"
                value={"All users"}
                onChange={e => setRadioButtonValue(e.target.value)}
              />
              All users
            </label>
            <label className="label-row">
              <input
                type="radio"
                name="selectOne"
                value={"Users you follow"}
                onChange={e => setRadioButtonValue(e.target.value)}
              />
              Users you follow
            </label>
            <label className="label-row">
              <input
                type="radio"
                name="selectOne"
                value={"Only me"}
                onChange={e => setRadioButtonValue(e.target.value)}
              />
              Only me
            </label>
          </form>
        </div>
        <div className="profile-card-content-divider">
          <h3>Content Filter</h3>
          <p>
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
