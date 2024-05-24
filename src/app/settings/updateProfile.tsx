import { getDescriptionAndSocialMedia } from "@/services/userService";
import { Smile } from "react-feather";
import { UpdateProfileForm } from "./updateProfileForm";

export const UpdateProfile = async ({ userId }: { userId: number }) => {
  const user = await getDescriptionAndSocialMedia(userId);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-settings-left">
      <Smile className="profile-picture" />
      <div>
        <h3>About Me</h3>
        <UpdateProfileForm
          userId={userId}
          description={user.description}
          twitter={user.twitter}
          instagram={user.instagram}
          tiktok={user.tiktok}
        />
      </div>
    </div>
  );
};
