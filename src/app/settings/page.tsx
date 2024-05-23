import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { Section } from "@/components/section";
import { ProfileSettings } from "./profileSettings";
import { UpdateProfile } from "./updateProfile";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const profileHeader = (
    <div>
      <h2 className="h3">Settings</h2>
    </div>
  );

  if (!session) {
    redirect("/");
  } else {
    return (
      <main>
        <div>
          <Section header={profileHeader}>
            <div className="profile-settings">
              <UpdateProfile userId={Number(session.user.id)} />
              <ProfileSettings user={session?.user} />
            </div>
          </Section>
        </div>
      </main>
    );
  }
}
