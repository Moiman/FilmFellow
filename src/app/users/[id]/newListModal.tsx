"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Film } from "react-feather";

import Modal from "@/components/modal";
import { NewListForm } from "@/components/newListForm";
import { createNewList } from "@/services/listService";

export const NewListModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const newListAction = async (formData: FormData) => {
    const name = formData.get("name");
    if (name) {
      await createNewList(name.toString());
      setIsOpen(false);

      toast(
        <p>
          List <span className="highlight-text">{name.toString()}</span> was created
        </p>,
        { icon: <Film />, className: "yellow-toast" },
      );
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Add new list</button>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        content={<NewListForm formAction={newListAction} />}
      />
    </>
  );
};
