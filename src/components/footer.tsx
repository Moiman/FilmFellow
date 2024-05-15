import Image from "next/image";
import Link from "next/link";
import { GitHub } from "react-feather";

export const Footer = () => {
  return (
    <footer>
      <div className="content">
        <Link href="https://github.com/Moiman/FilmFellow/">
          <GitHub size={20} />
        </Link>

        <Link href="https://www.themoviedb.org/">
          <Image
            src="/logos/tmdb_logo.svg"
            height={32}
            width={32}
            alt="The Movie Database"
          />
        </Link>
      </div>
    </footer>
  );
};
