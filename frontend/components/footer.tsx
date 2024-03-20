import Link from "next/link";
import { GitHub } from "react-feather";

export const Footer = () => {
  return (
    <footer>
      <div className="content">
        <div className="github-link">
          <GitHub size={18} />
          <Link href="https://github.com/Moiman/FilmFellow/">GitHub</Link>
        </div>
      </div>
    </footer>
  );
};
