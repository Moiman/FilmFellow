import { authOptions } from "@/authOptions";
import { findUserById } from "@/services/authService";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Twitter, Instagram, Facebook, Flag } from "react-feather";
import { ProfileButtons } from "./profileButtons";

interface ProfileIntroductionProps {
  userId: number;
}

export const ProfileIntroduction = async ({ userId }: ProfileIntroductionProps) => {
  const session = await getServerSession(authOptions);
  const user = await findUserById(Number(userId));

  return (
    <div className="profile-page-basic-data">
      <>
        <h5>{user?.username}</h5>
        <div style={{ backgroundColor: "grey", width: "150px", height: "150px", borderRadius: "50%" }} />
      </>

      <div>
        <div style={{ width: "100%" }}>
          <h6>Description</h6>
        </div>
        <p className="profile-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis atque maxime repudiandae quasi sunt delectus
          perferendis, provident pariatur reprehenderit iure quas officia mollitia, corporis ipsa.
        </p>
      </div>

      <div style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <h6>Social media</h6>
        </div>
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

      <div style={{ width: "100%" }}>
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
        activeSession={session ? true : false}
        ownProfile={Number(userId) === session?.user.id ? true : false}
      />
    </div>
  );
};
