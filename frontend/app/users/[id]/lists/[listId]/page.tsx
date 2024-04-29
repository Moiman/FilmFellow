import Link from "next/link";
import { notFound } from "next/navigation";
import { findUserById } from "@/services/authService";

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
          <h3 className="yellow-name-header">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s (list name here) (id {params.listId})
          </h3>
        }
      >
        <></>
      </Section>
    </main>
  );
}
