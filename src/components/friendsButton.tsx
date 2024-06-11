"use client";
import { addFriend, removeFriend } from "@/services/friendService";

interface Props {
  userId: number;
  isFriend: boolean;
}

export const FriendsButton = ({ userId, isFriend }: Props) => {
  const addFriendHandler = async () => {
    await addFriend(userId);
  };
  const removeFriendHandler = async () => {
    await removeFriend(userId);
  };

  return isFriend ? (
    <button
      className="button-pink"
      onClick={removeFriendHandler}
    >
      Remove friend
    </button>
  ) : (
    <button
      className="button-cyan"
      onClick={addFriendHandler}
    >
      Add to friends
    </button>
  );
};
