import Link from "next/link";
import { Check } from "react-feather";
import { Dropdown } from "./dropdown";
import { getAllGenres } from "@/services/movieService";

export default async function GenreSelector({ selectedGenre }: { selectedGenre: string | undefined }) {
  const getGenres = async () => {
    const fetchedGenres = await getAllGenres();

    const genres = fetchedGenres.map(genre => {
      return (
        <Link
          key={genre.id}
          className="dropdown-item"
          href={"?genre=" + genre.name}
        >
          {genre.name}
          {genre.name === selectedGenre && (
            <Check
              size={20}
              color="#ffc700"
            />
          )}
        </Link>
      );
    });
    genres.unshift(
      <Link
        key={-1}
        className="dropdown-item"
        href={"/"}
      >
        All
        {!selectedGenre && (
          <Check
            size={20}
            color="#ffc700"
          />
        )}
      </Link>,
    );
    return genres;
  };
  return (
    <div className="genre-dropdown">
      <p>Genre</p>
      <Dropdown
        zIndex={10}
        width={200}
        selected={selectedGenre ?? "All"}
      >
        {await getGenres()}
      </Dropdown>
    </div>
  );
}
