import Link from "next/link";
import { findUserById, getUserFriends } from "@/services/userService";
import { notFound } from "next/navigation";

import { Section } from "@/components/section";
import { FriendsList } from "@/components/friendsList";

export default async function userFriends({ params }: { params: { id: string } }) {
  const user = await findUserById(Number(params.id));

  if (!user) {
    notFound();
  }

  const friends = await getUserFriends(Number(params.id));

  return (
    <main>
      <Section
        header={
          <h2 className="yellow-name-header h3">
            <Link href={"/users/" + params.id}>{user.username}</Link>&rsquo;s friends
          </h2>
        }
      >
        <FriendsList friends={friends?.friends} />
      </Section>
    </main>
  );
}
