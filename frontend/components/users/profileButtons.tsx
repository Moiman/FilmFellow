"use client";

import { useRouter } from "next/navigation";
import { Flag } from "react-feather";

interface ProfileButtonsProps {
  activeSession: boolean;
  ownProfile: boolean;
}

export const ProfileButtons = ({ activeSession, ownProfile }: ProfileButtonsProps) => {
  const router = useRouter();

  return (
    <div style={{ display: "inline-flex", marginTop: "40px" }}>
      {activeSession &&
        (ownProfile ? (
          <button onClick={() => router.push("/profile/settings")}>Go to settings</button>
        ) : (
          <>
            <button className="button-cyan">Add to friends</button>

            <button className="button-pink button-icon-text">
              <Flag size={16} />
              Report
            </button>
          </>
        ))}
    </div>
  );
};
