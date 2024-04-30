import Link from "next/link";
import { useRouter } from "next/navigation";

interface ListButtonProps {
  userId: number;
  list: { id: number; name: string; movies: any[] };
}

export const ListButton = ({ userId, list }: ListButtonProps) => {
  return (
    <Link
      className="list-button-style"
      href={`/users/${userId}/lists/${list.id}`}
    >
      {/* Placeholder for list thumbnail */}
      <div style={{ height: "45px", aspectRatio: "3/2", backgroundColor: "darkgrey" }} />

      <div className="list-name">
        <p>{list.name}</p>
        <p className="list-movie-amount">{list.movies.length}</p>
      </div>
    </Link>
  );
};
