import Link from "next/link";

import type { getUserLists } from "@/services/listService";

interface ListButtonProps {
  list: Awaited<ReturnType<typeof getUserLists>>[0];
}

export const ListButton = ({ list }: ListButtonProps) => {
  return (
    <Link
      className="list-button-style"
      href={`/lists/${list.id}`}
    >
      {/* Placeholder for list thumbnail */}
      <div style={{ height: "45px", aspectRatio: "3/2", backgroundColor: "darkgrey" }} />

      <div className="list-name">
        <p>{list.name}</p>
        <p className="list-movie-amount">{list._count.listMovies}</p>
      </div>
    </Link>
  );
};
