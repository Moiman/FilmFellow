"use client";

import { useRouter } from "next/navigation";

interface ListButtonProps {
  userId: number;
  list: { id: number; name: string; movies: any[] };
}

export const ListButton = ({ userId, list }: ListButtonProps) => {
  const router = useRouter();

  return (
    <button
      className="list-button-style"
      key={list.id}
      onClick={() => router.push(`/users/${userId}/lists/${list.id}`)}
    >
      {/* Placeholder for list thumbnail */}
      <div style={{ height: "45px", aspectRatio: "3/2", backgroundColor: "darkgrey" }} />

      <div className="list-name">
        <p>{list.name}</p>
        <p className="list-movie-amount">{list.movies.length}</p>
      </div>
    </button>
  );
};
