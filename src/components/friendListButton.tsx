import Link from "next/link";

export interface Friend {
  id: number;
  username: string;
  _count: { friends: number };
}

interface Props {
  friend: Friend;
}

export const FriendListButton = async ({ friend }: Props) => {
  const mutualFriend = friend._count.friends > 0;

  return (
    <button className={mutualFriend ? "button-friend-mutual" : "button-friend"}>
      <Link href={`/users/${friend.id}`}>{friend.username}</Link>
    </button>
  );
};
