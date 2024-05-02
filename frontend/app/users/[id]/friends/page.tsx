import Link from "next/link";
import { findUserById } from "@/services/authService";
import { notFound } from "next/navigation";

import { Section } from "@/components/section";

export default async function userFriends({ params }: { params: { id: string } }) {
  const user = await findUserById(Number(params.id));

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Section
        header={
          <h2 className="yellow-name-header h3">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s friends
          </h2>
        }
      >
        <></>
      </Section>
    </main>
  );
}
