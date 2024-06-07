import Link from "next/link";

interface Friend {
  id: number;
  username: string;
  _count: { friends: number };
}

interface Props {
  friend: Friend;
}

export const FriendListButton = async ({ friend }: Props) => {
  const mutualFriend = friend._count.friends > 0 ? true : false;
  return (
    <button className={mutualFriend ? "button-friend" : "button-friend-mutual"}>
      <Link href={`/users/${friend.id}`}>{friend.username}</Link>
    </button>
  );
};
