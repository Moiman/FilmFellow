import { Flag } from "react-feather";

interface ProfileButtonsProps {
  ownProfile: boolean;
}

export const ProfileButtons = ({ ownProfile }: ProfileButtonsProps) => {
  return (
    <div style={{ display: "inline-flex", marginTop: "40px" }}>
      {ownProfile ? (
        <form action="/profile/settings">
          <button type="submit">Go to settings</button>
        </form>
      ) : (
        <>
          <button className="button-cyan">Add to friends</button>

          <button className="button-pink button-icon-text">
            <Flag size={16} />
            Report
          </button>
        </>
      )}
    </div>
  );
};
