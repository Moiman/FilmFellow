import Link from "next/link";
import { GitHub } from "react-feather";

export const Footer = () => {
  return (
    <footer>
      <div className="content">
        <Link
          href="https://github.com/Moiman/FilmFellow/"
          className="github-link"
        >
          <GitHub size={18} /> GitHub
        </Link>
      </div>
    </footer>
  );
};
