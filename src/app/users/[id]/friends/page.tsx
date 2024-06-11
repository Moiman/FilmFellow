import Link from "next/link";
import { notFound } from "next/navigation";
import { findUserById } from "@/services/userService";

import { Section } from "@/components/section";
import { FriendsList } from "@/components/friendsList";

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
        {user.friends.length !== 0 ? <FriendsList friends={user.friends} /> : <p>No friends yet</p>}
      </Section>
    </main>
  );
}
