import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Check, List, PlusCircle } from "react-feather";

import { Dropdown } from "@/components/dropdown";
import { toggleMovieList, getUsersOwnLists, createNewList } from "@/services/listService";
import { NewListForm } from "@/components/newListForm";
import Modal from "@/components/modal";

export const AddToList = ({ movieId, movieTitle }: { movieId: number; movieTitle: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lists, setLists] = useState<Awaited<ReturnType<typeof getUsersOwnLists>>>([]);

  useEffect(() => {
    const getLists = async () => {
      setLists(await getUsersOwnLists(movieId));
    };
    getLists();
  }, [movieId]);

  const toggleList = async (listId: number) => {
    const isInList = await toggleMovieList(movieId, listId);
    setLists(lists.map(list => (list.id === listId ? { ...list, isMovieInList: isInList } : list)));

    toast(
      <p>
        <span className="highlight-text">{movieTitle}</span> {isInList ? "added to list" : "removed from list"}
      </p>,
      { icon: <List />, className: isInList ? "cyan-toast" : "yellow-toast" },
    );
  };

  const newListAction = async (formData: FormData) => {
    const name = formData.get("listName");

    if (name) {
      const list = await createNewList(name.toString());
      await toggleMovieList(movieId, list.id);
      setLists(lists.concat({ id: list.id, name: name.toString(), isMovieInList: true }));
      setIsOpen(false);

      toast(
        <p>
          List <span className="highlight-text">{name.toString()}</span> was created and updated
        </p>,
        { icon: <List />, className: "cyan-toast" },
      );
    }
  };

  return (
    <>
      <Dropdown
        button={<button>Add to list</button>}
        width={200}
      >
        {lists.map(list => (
          <button
            key={list.id}
            onClick={() => toggleList(list.id)}
            className="dropdown-item"
          >
            {list.name}
            {list.isMovieInList && (
              <Check
                size={20}
                className="yellow-icon"
              />
            )}
          </button>
        ))}
        <button
          onClick={() => setIsOpen(true)}
          className="dropdown-item"
        >
          <PlusCircle
            size={20}
            className="yellow-icon"
          />
          Add to new list
        </button>
      </Dropdown>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        content={<NewListForm formAction={newListAction} />}
      />
    </>
  );
};
