import { Flag } from "react-feather";
import { getIsUserReported } from "@/services/reportService";

interface ProfileButtonsProps {
  ownProfile: boolean;
  userId: number;
}

export const ProfileButtons = async ({ ownProfile, userId }: ProfileButtonsProps) => {
  const isReported = await getIsUserReported(userId);
  return (
    <div style={{ display: "inline-flex", marginTop: "40px" }}>
      {ownProfile ? (
        <form action="/settings">
          <button type="submit">Go to settings</button>
        </form>
      ) : (
        <>
          <button className="button-cyan">Add to friends</button>
          {!isReported && (
            <form action={`/report/user/${userId}`}>
              <button
                type="submit"
                className="button-pink button-icon-text"
              >
                <Flag size={16} />
                Report
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};
