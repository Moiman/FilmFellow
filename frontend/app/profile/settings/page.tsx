import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { Section } from "@/components/section";
import { ProfileSettings } from "@/components/profileSettings";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const profileHeader = (
    <div>
      <h2>Settings</h2>
    </div>
  );
  if (!session) {
    redirect("/");
  } else {
    return (
      <main>
        <div>
          <Section header={profileHeader}>
            <ProfileSettings user={session?.user} />
          </Section>
        </div>
      </main>
    );
  }
}
