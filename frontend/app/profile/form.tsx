"use client";
import * as yup from "yup";
import { Section } from "@/components/section";
import { ProfileCard } from "@/components/profileCard";
import { Session } from "next-auth";

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
