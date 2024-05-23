import { authOptions } from "@/authOptions";
import { findUserById } from "@/services/userService";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Twitter, Instagram, Smile, Frown } from "react-feather";
import { ProfileButtons } from "./profileButtons";

interface ProfileInfoProps {
  userId: number;
}

export const tiktokIcon = (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 7.33333C17.5307 7.33333 14.0204 5.31371 14.0204 2"
      stroke="#74ccca"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.5102 11.4737C5.467 11.4737 3 13.8301 3 16.7368C3 19.6436 5.467 22 8.5102 22C11.5534 22 14.0204 19.6436 14.0204 16.7368V2"
      stroke="#74ccca"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ProfileInfo = async ({ userId }: ProfileInfoProps) => {
  const session = await getServerSession(authOptions);
  const user = await findUserById(Number(userId));

  return (
    <div className="profile-info">
      <h2 className="h4">{user?.username}</h2>
      {user?.isActive ? <Smile className="profile-picture" /> : <Frown className="profile-picture" />}

      <div>
        <h3 className="h5">Description</h3>
        <p className="profile-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis atque maxime repudiandae quasi sunt delectus
          perferendis, provident pariatur reprehenderit iure quas officia mollitia, corporis ipsa.
        </p>
      </div>

      <div className="full-width">
        <h3 className="h5">Social media</h3>
        <div className="profile-social-media">
          <div>
            <Twitter color="#d75eb5" />
            <p>@username</p>
          </div>

          <div>
            <Instagram color="#ffc700" />
            <p>@username</p>
          </div>

          <div>
            {tiktokIcon}
            <p>@username</p>
          </div>
        </div>
      </div>

      <div className="full-width">
        <div className="profile-friend-list">
          <div className="friends-title">
            <h3 className="h5">Friends</h3>
            <Link href={`/users/${userId}/friends`}>See all</Link>
          </div>

          <div className="friends-wrapper">
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
            <button className="button-friend" />
          </div>
        </div>
      </div>

      {session && (
        <ProfileButtons
          userId={userId}
          ownProfile={userId === session.user.id}
        />
      )}
    </div>
  );
};
