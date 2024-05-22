import Link from "next/link";
import Image from "next/image";

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
      {list.listMovies.length > 0 && list.listMovies[0]?.movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w92/${list.listMovies[0]?.movie.poster_path}`}
          width={60}
          height={60}
          alt={list.name}
          className="list-thumbnail"
        />
      ) : (
        <div className="list-thumbnail list-thumbnail-placeholder" />
      )}

      <div className="list-name">
        <p>{list.name}</p>
        <p className="list-movie-amount">{list._count.listMovies}</p>
      </div>
    </Link>
  );
};
