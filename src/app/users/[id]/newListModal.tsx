"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal";
import { createNewList } from "@/services/listService";

export const NewListModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const newListAction = async (formData: FormData) => {
    const name = formData.get("name");
    if (name) {
      const list = await createNewList(name.toString());
      router.push("/lists/" + list.id);
    }
  };

  const modalForm = (
    <form
      className="form"
      action={newListAction}
    >
      <label>List name</label>
      <input
        type="text"
        name="name"
        placeholder="list name..."
        required
      />
      <button
        className="form-submit"
        type="submit"
      >
        Create new list
      </button>
    </form>
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add new list</button>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        content={modalForm}
      />
    </>
  );
};
