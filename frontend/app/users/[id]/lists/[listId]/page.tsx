import Link from "next/link";
import { notFound } from "next/navigation";
import { findUserById } from "@/services/userService";

import { Section } from "@/components/section";

export default async function userFriends({ params }: { params: { id: string; listId: string } }) {
  const user = await findUserById(Number(params.id));

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Section
        header={
          <h2 className="yellow-name-header h3">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s list name
          </h2>
        }
      >
        <></>
      </Section>
    </main>
  );
}
