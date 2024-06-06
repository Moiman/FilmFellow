import { getIsFriendshipMutual } from "@/services/userService";
import Link from "next/link";

interface Friend {
  id: number;
  email: string;
  username: string;
  twitter: string;
  instagram: string;
  description: string;
  tiktok: string;
}

interface Props {
  friend: Friend;
  userId: number;
}

export const FriendListButton = async ({ friend, userId }: Props) => {
  const mutualFriend = await getIsFriendshipMutual(friend.id, userId);

  return (
    <button className={mutualFriend ? "button-friend" : ""}>
      <Link href={`/users/${friend.id}`}>{friend.username}</Link>
    </button>
  );
};
