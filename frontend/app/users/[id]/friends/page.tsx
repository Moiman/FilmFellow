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
          <h3 className="yellow-name-header">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s friends
          </h3>
        }
      >
        <></>
      </Section>
    </main>
  );
}
