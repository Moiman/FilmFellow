import { authOptions } from "@/authOptions";
import { findUserById } from "@/services/userService";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Twitter, Instagram, Facebook, Smile, Frown } from "react-feather";
import { ProfileButtons } from "./profileButtons";

interface ProfileInfoProps {
  userId: number;
}

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
            <Facebook color="#74ccca" />
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
          ownProfile={userId === session?.user.id}
        />
      )}
    </div>
  );
};
