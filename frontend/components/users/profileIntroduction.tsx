import Link from "next/link";
import { Twitter, Instagram, Facebook } from "react-feather";

interface ProfileIntroductionProps {
  userId: string;
}

export const ProfileIntroduction = ({ userId }: ProfileIntroductionProps) => {
  return (
    <div className="profile-page-basic-data">
      <h5>Username</h5>
      <div style={{ backgroundColor: "grey", width: "150px", height: "150px", borderRadius: "50%" }} />

      <h5>Description</h5>
      <p className="profile-description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum, amet. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quia, esse?
      </p>

      <h5>Social media</h5>
      <div className="profile-social-media">
        <div style={{}}>
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

      <button className="button-cyan">Add to friends</button>
    </div>
  );
};
