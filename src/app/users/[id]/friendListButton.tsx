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
  const isMutualFriend = friend._count.friends > 0;

  return (
    <Link
      href={`/users/${friend.id}`}
      title={friend.username}
      className={isMutualFriend ? "button-friend-mutual" : "button-friend"}
    >
      <p>{friend.username.slice(0, 2).toUpperCase()}</p>
    </Link>
  );
};
