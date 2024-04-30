import { authOptions } from "@/authOptions";
import { findUserById } from "@/services/authService";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Twitter, Instagram, Facebook } from "react-feather";
import { ProfileButtons } from "./profileButtons";

interface ProfileInfoProps {
  userId: string;
}

export const ProfileInfo = async ({ userId }: ProfileInfoProps) => {
  const session = await getServerSession(authOptions);
  const user = await findUserById(Number(userId));

  return (
    <div className="profile-info">
      <h5>{user?.username}</h5>
      <div style={{ backgroundColor: "grey", width: "150px", height: "150px", borderRadius: "50%" }} />

      <div>
        <h6>Description</h6>
        <p className="profile-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis atque maxime repudiandae quasi sunt delectus
          perferendis, provident pariatur reprehenderit iure quas officia mollitia, corporis ipsa.
        </p>
      </div>

      <div className="full-width">
        <h6>Social media</h6>
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
            <h5>Friends</h5>
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

      <ProfileButtons
        userId={userId}
        activeSession={!!session}
        ownProfile={userId === session?.user.id}
      />
    </div>
  );
};
