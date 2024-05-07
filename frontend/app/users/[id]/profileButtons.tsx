import { Flag } from "react-feather";

interface ProfileButtonsProps {
  ownProfile: boolean;
  userId: number;
}

export const ProfileButtons = ({ ownProfile, userId }: ProfileButtonsProps) => {
  return (
    <div style={{ display: "inline-flex", marginTop: "40px" }}>
      {ownProfile ? (
        <form action="/profile/settings">
          <button type="submit">Go to settings</button>
        </form>
      ) : (
        <>
          <button className="button-cyan">Add to friends</button>
          <form action={`/report/user/${userId}`}>
            <button
              type="submit"
              className="button-pink button-icon-text"
            >
              <Flag size={16} />
              Report
            </button>
          </form>
        </>
      )}
    </div>
  );
};
