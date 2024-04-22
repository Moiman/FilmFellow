"use client";
import { Session } from "next-auth";
import { Section } from "@/components/section";
import { ProfileCard } from "@/components/profileCard";

interface Props {
  session: Session;
}

export default function Profile({ session }: Props) {
  console.log(session.user);

  const profileHeader = (
    <div className="">
      <h2>Settings</h2>
    </div>
  );
  return (
    <main className="">
      <div className="">
        <Section header={profileHeader}>
          <ProfileCard user={session.user} />
        </Section>
      </div>
    </main>
  );
}
