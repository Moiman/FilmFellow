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
          width={67.5}
          height={45}
          alt={list.name}
          style={{ aspectRatio: "3/2", objectFit: "cover" }}
        />
      ) : (
        <div style={{ height: "45px", aspectRatio: "3/2", backgroundColor: "darkgrey" }} />
      )}

      <div className="list-name">
        <p>{list.name}</p>
        <p className="list-movie-amount">{list._count.listMovies}</p>
      </div>
    </Link>
  );
};
