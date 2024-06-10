"use client";
import { addFriend, removeFriend } from "@/services/friendService";

interface Props {
  userId: number;
  friends: boolean;
}

export const FriendsButton = ({ userId, friends }: Props) => {
  const addFriendHandler = async () => {
    await addFriend(userId);
  };
  const removeFriendHandler = async () => {
    await removeFriend(userId);
  };

  return friends ? (
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
