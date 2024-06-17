"use client";

import { addFriend, removeFriend } from "@/services/friendService";
import { UserMinus, UserPlus } from "react-feather";

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
      style={{ display: "flex", alignItems: "center", gap: "5px" }}
    >
      <UserMinus size={16} /> Remove friend
    </button>
  ) : (
    <button
      className="button-cyan"
      onClick={addFriendHandler}
      style={{ display: "flex", alignItems: "center", gap: "5px" }}
    >
      <UserPlus size={16} /> Add to friends
    </button>
  );
};
