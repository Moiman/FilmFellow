"use client";

import { useRouter } from "next/navigation";
import { Trash } from "react-feather";
import { deleteList } from "@/services/listService";

export const DeleteList = ({ id, userId }: { id: number; userId: number | string }) => {
  const router = useRouter();

  const deleteClick = async () => {
    await deleteList(id);
    router.push("/users/" + userId);
  };

  return (
    <button
      className="button-transparent"
      onClick={deleteClick}
    >
      <Trash
        className="delete-button"
        size={20}
      />
    </button>
  );
};
