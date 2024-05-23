import { Instagram, Smile, Twitter } from "react-feather";
import { tiktokIcon } from "../users/[id]/profileInfo";

export const UpdateProfile = ({ userId }: { userId: number }) => {
  return (
    <div className="profile-settings-left">
      <Smile
        size={200}
        strokeWidth={1}
        color={"grey"}
      />

      <div style={{ marginBottom: "20px" }}>
        <h3 className="h5">Description</h3>
        <textarea
          rows={5}
          value="Description"
          readOnly
        />
      </div>

      <h3 className="h5">Social Media</h3>
      <div className="profile-settings-social-media">
        <div className="social-media-row pink">
          <Twitter />
          <input
            type="text"
            value="@username"
            readOnly
          />
        </div>
        <div className="social-media-row yellow">
          <Instagram />
          <input
            type="text"
            value="@username"
            readOnly
          />
        </div>
        <div className="social-media-row cyan">
          {tiktokIcon}
          <input
            type="text"
            value="@username"
            readOnly
          />
        </div>
        <button>Save</button>
      </div>
    </div>
  );
};
