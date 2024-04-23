"use client";
import { Session } from "next-auth";
import { Section } from "@/components/section";
import { ProfileCard } from "@/components/profileCard";

interface Props {
  session: Session;
}

export default function Profile({ session }: Props) {
  const profileHeader = (
    <div>
      <h2>Settings</h2>
    </div>
  );
  return (
    <main>
      <div>
        <Section header={profileHeader}>
          <ProfileCard user={session.user} />
        </Section>
      </div>
    </main>
  );
}
