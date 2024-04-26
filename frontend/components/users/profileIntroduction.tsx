import Link from "next/link";
import { Twitter, Instagram, Facebook, Flag } from "react-feather";

interface ProfileIntroductionProps {
  userId: string;
}

export const ProfileIntroduction = ({ userId }: ProfileIntroductionProps) => {
  return (
    <div className="profile-page-basic-data">
      <>
        <h5>Username</h5>
        <div style={{ backgroundColor: "grey", width: "150px", height: "150px", borderRadius: "50%" }} />
      </>

      <div>
        <div style={{ width: "100%" }}>
          <h6>Description</h6>
        </div>
        <p className="profile-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum, amet. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Quia, esse?
        </p>
      </div>

      <div style={{ width: "100%" }}>
        <div style={{ width: "100%" }}>
          <h6>Social media</h6>
        </div>
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
      </div>

      <div style={{ width: "100%" }}>
        <div className="profile-friend-list">
          <div className="friends-title">
            <h5>Friends</h5>
            <Link href={`/users/${userId}/friends`}>See all</Link>
          </div>

          {/* Show max. 10 friends? */}
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

      <div style={{ display: "inline-flex", marginTop: "40px" }}>
        <button className="button-cyan">Add to friends</button>

        <button
          className="button-pink"
          style={{ display: "inline-flex", gap: "2px", alignContent: "center" }}
        >
          <Flag size={16} />
          Report
        </button>

        {/* Show this button instead if own profile
          <button>Go to settings</button>
        */}
      </div>
    </div>
  );
};
