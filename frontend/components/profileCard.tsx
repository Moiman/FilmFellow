"use client";
import { useState } from "react";
import { Facebook, Instagram, Twitter, Smile } from "react-feather";

interface Props {
  user: User;
}
interface User {
  email: string;
  id: number | string;
  role: string;
  username: string;
}

export const ProfileCard = ({ user }: Props) => {
  const [activeUsername, setUsernameActive] = useState(false);
  const [activeEmail, setEmailActive] = useState(false);
  const [activePassword, setPasswordActive] = useState(false);
  const [radioButtonValue, setRadioButtonValue] = useState("");
  const [checkBoxValue, setCheckBoxValue] = useState("");
  console.log(user);
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
          />
          <Instagram size={20} />
          <input
            type="text"
            value={"@username"}
          />
          <Facebook size={20} />
          <input
            type="text"
            value={"@username"}
          />
        </div>
      </div>
      <div className="profile-card-right">
        <div className="profile-card-content-divider">
          <h3>User Information</h3>
          <p>Here you can change your username, email or password </p>

          {activeUsername ? (
            <form className="profile-card-forms">
              <label
                className="profile-card-forms-first-element"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                required
              />

              <button onClick={() => setUsernameActive(!activeUsername)}>Edit</button>
            </form>
          ) : (
            <div>
              <h3>Username</h3>
              <p>{user.username}</p>
              <button onClick={() => setUsernameActive(!activeUsername)}>Edit</button>
            </div>
          )}
          {activeEmail ? (
            <form className="profile-card-forms">
              <label
                className="profile-card-forms-first-element"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
              />

              <button onClick={() => setEmailActive(!activeEmail)}>Edit</button>
            </form>
          ) : (
            <div>
              <h3>Email</h3>
              <p>{user.email}</p>
              <button onClick={() => setEmailActive(!activeEmail)}>Edit</button>
            </div>
          )}
          {activePassword ? (
            <form className="profile-card-forms">
              <label
                className="profile-card-forms-first-element"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
              />

              <button onClick={() => setPasswordActive(!activePassword)}>Edit</button>
            </form>
          ) : (
            <div>
              <h3>Password</h3>
              <p>xxxxxxxxxxxxxxxxxxx</p>
              <button onClick={() => setPasswordActive(!activePassword)}>Edit</button>
            </div>
          )}
        </div>
        <div className="profile-card-content-divider">
          <h3>Profile Privacy</h3>
          <p>Here you can choose who can see your profile.</p>
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
