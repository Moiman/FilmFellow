"use client";

import { useRouter } from "next/navigation";
import { Flag } from "react-feather";

interface ProfileButtonsProps {
  userId: number;
  activeSession: boolean;
  ownProfile: boolean;
}

export const ProfileButtons = ({ userId, activeSession, ownProfile }: ProfileButtonsProps) => {
  const router = useRouter();

  return (
    <div style={{ display: "inline-flex", marginTop: "40px" }}>
      {activeSession &&
        (ownProfile ? (
          <button onClick={() => router.push("/profile/settings")}>Go to settings</button>
        ) : (
          <>
            <button className="button-cyan">Add to friends</button>

            <button
              className="button-pink"
              style={{ display: "inline-flex", gap: "2px", alignContent: "center" }}
            >
              <Flag size={16} />
              Report
            </button>
          </>
        ))}
    </div>
  );
};
