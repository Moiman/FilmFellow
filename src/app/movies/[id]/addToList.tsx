import { useEffect, useState } from "react";
import { Check } from "react-feather";

import { Dropdown } from "@/components/dropdown";
import { toggleMovieList, getUsersOwnLists } from "@/services/listService";

export const AddToList = ({ movieId }: { movieId: number }) => {
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
  };

  return (
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
              color="#ffc700"
            />
          )}
        </button>
      ))}
    </Dropdown>
  );
};
