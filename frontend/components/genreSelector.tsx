import { fetchGenres } from "@/app/movieFetches";
import Link from "next/link";
import { Check } from "react-feather";
import { Dropdown } from "./dropdown";
import { headers } from "next/headers";

export default async function GenreSelector({ genre }: { genre: string | undefined }) {
  const selectedGenre = genre;

  const getGenres = async () => {
    const fetchedGenres = await fetchGenres();

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
