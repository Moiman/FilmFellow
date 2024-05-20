"use client";

import { useRouter } from "next/navigation";
import { Trash } from "react-feather";
import { toast } from "react-toastify";
import { deleteList } from "@/services/listService";

export const DeleteList = ({ id, name, userId }: { id: number; name: string; userId: number | string }) => {
  const router = useRouter();

  const deleteClick = async () => {
    await deleteList(id);
    toast(
      <p>
        List <span className="highlight-text">{name}</span> was deleted
      </p>,
      {
        icon: <Trash strokeWidth={2.5} />,
        className: "pink-toast",
      },
    );
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
