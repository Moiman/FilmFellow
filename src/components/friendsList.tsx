import Link from "next/link";
import { User, UserCheck } from "react-feather";
import type { Friend } from "./friendListButton";

interface friendListProps {
  friends: Friend[];
}

export const FriendsList = ({ friends }: friendListProps) => {
  return (
    <div className="person-list">
      {friends.map(friend => (
        <div
          key={friend.id}
          className="person-wrapper"
        >
          <Link href={`/users/${friend.id}`}>
            <div className={"profile-path-placeholder"}>{friend._count.friends > 0 ? <UserCheck /> : <User />}</div>
          </Link>
          <p className="person-name">{friend.username}</p>
        </div>
      ))}
    </div>
  );
};
