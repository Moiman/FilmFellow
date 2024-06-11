import { Flag } from "react-feather";
import { getIsUserReported } from "@/services/reportService";
import { FriendsButton } from "@/components/friendsButton";
import { getIsUserAlreadyFriend } from "@/services/friendService";

interface ProfileButtonsProps {
  ownProfile: boolean;
  userId: number;
}

export const ProfileButtons = async ({ ownProfile, userId }: ProfileButtonsProps) => {
  const isReported = await getIsUserReported(userId);
  const isFriend = await getIsUserAlreadyFriend(userId);
  return (
    <div style={{ display: "inline-flex", marginTop: "40px" }}>
      {ownProfile ? (
        <form action="/settings">
          <button type="submit">Go to settings</button>
        </form>
      ) : (
        <>
          <FriendsButton
            userId={userId}
            isFriend={isFriend}
          />
          <form action={`/report/user/${userId}`}>
            <button
              type="submit"
              className="button-pink button-icon-text"
              disabled={isReported}
            >
              <Flag size={16} />
              {isReported ? "Reported" : "Report"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};
