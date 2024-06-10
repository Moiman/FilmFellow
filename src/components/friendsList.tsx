import Link from "next/link";
import { User } from "react-feather";
import { Friend } from "./friendListButton";

interface friendListProps {
  friends: Friend[] | undefined;
}

export const FriendsList = ({ friends }: friendListProps) => {
  return (
    <div className="person-list">
      {friends?.map(friend => (
        <div
          key={friend.id}
          className="person-wrapper"
        >
          <Link href={`/users/${friend.id}`}>
            <div
              className={friend._count.friends > 0 ? "profile-path-placeholder-friends" : "profile-path-placeholder"}
            >
              <User />
            </div>
          </Link>
          <p className="person-name">{friend.username}</p>
        </div>
      ))}
    </div>
  );
};
