import { Section } from "@/components/section";
import { ProfileSettings } from "@/components/profileSettings";

interface Props {
  sessionUser: User;
}
export interface User {
  email: string;
  id: string | number;
  role: string;
  username: string;
}

export default function Profile({ sessionUser }: Props) {
  const profileHeader = (
    <div>
      <h2>Settings</h2>
    </div>
  );
  return (
    <main>
      <div>
        <Section header={profileHeader}>
          <ProfileSettings user={sessionUser} />
        </Section>
      </div>
    </main>
  );
}
