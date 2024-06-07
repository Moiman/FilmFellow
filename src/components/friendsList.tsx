import Link from "next/link";
import { User } from "react-feather";

type friendListItem = {
  id: number;
  username: string;
  _count: { friends: number };
};

interface friendListProps {
  friends: friendListItem[] | undefined;
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
            <div className="profile-path-placeholder">
              <User />
            </div>
          </Link>
          <p className="person-name">{friend.username}</p>
        </div>
      ))}
    </div>
  );
};
