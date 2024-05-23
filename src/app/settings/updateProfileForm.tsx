"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Instagram, Twitter } from "react-feather";

import { tiktokIcon } from "../users/[id]/profileInfo";
import { updateDescriptionAndSocialMedia } from "@/services/userService";

interface UpdateProfileFormProps {
  userId: number;
  description: string;
  twitter: string;
  instagram: string;
  tiktok: string;
}

export const UpdateProfileForm = ({ userId, description, twitter, instagram, tiktok }: UpdateProfileFormProps) => {
  const [userDescription, setUserDescription] = useState<string>(description);

  const [userTwitter, setUserTwitter] = useState<string>(twitter);
  const [userInstagram, setUserInstagram] = useState<string>(instagram);
  const [userTiktok, setUserTiktok] = useState<string>(tiktok);

  const handleSubmit = async () => {
    await updateDescriptionAndSocialMedia(userId, userDescription, userTwitter, userInstagram, userTiktok);
    toast("Your profile was updated!");
  };

  return (
    <form action={handleSubmit}>
      <div style={{ marginBottom: "20px" }}>
        <h3 className="h5">Description</h3>
        <textarea
          rows={5}
          placeholder="Tell about yourself!"
          name="description"
          value={userDescription}
          onChange={e => setUserDescription(e.currentTarget.value)}
        />
      </div>

      <h3 className="h5">Social Media</h3>
      <div className="profile-settings-social-media">
        <div className="social-media-row pink">
          <Twitter />
          <input
            type="text"
            placeholder="Your Twitter handle"
            name="twitter"
            value={userTwitter}
            onChange={e => setUserTwitter(e.currentTarget.value)}
          />
        </div>
        <div className="social-media-row yellow">
          <Instagram />
          <input
            type="text"
            placeholder="Your Instagram handle"
            name="instagram"
            value={userInstagram}
            onChange={e => setUserInstagram(e.currentTarget.value)}
          />
        </div>
        <div className="social-media-row cyan">
          {tiktokIcon}
          <input
            type="text"
            placeholder="Your Instagram handle"
            name="tiktok"
            value={userTiktok}
            onChange={e => setUserTiktok(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className="submit-button">
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
