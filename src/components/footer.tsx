import Image from "next/image";
import Link from "next/link";
import { GitHub } from "react-feather";

export const Footer = () => {
  return (
    <footer>
      <div className="content">
        <Link
          href="https://github.com/Moiman/FilmFellow/"
          title="GitHub"
          aria-label="GitHub"
        >
          <GitHub size={20} />
        </Link>

        <Link
          href="https://www.themoviedb.org/"
          aria-label="The Movie Database"
        >
          <Image
            src="/logos/tmdb_logo.svg"
            height={32}
            width={32}
            alt="The Movie Database"
            title="The Movie Database"
          />
        </Link>

        <Link
          href="https://www.justwatch.com/"
          aria-label="JustWatch"
        >
          <Image
            src="/logos/justwatch_logo.svg"
            height={30}
            width={80}
            alt="JustWatch"
            title="JustWatch"
          />
        </Link>
      </div>
    </footer>
  );
};
