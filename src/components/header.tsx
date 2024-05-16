import Link from "next/link";

import { HeaderSearch } from "./headerSearch";
import { HeaderLinks } from "./headerLinks";
import { HeaderMenu } from "./headerMenu";

export const Header = () => {
  return (
    <header>
      <Link
        href="/"
        className="logo"
      >
        <h1 className="h4">
          🍿<span className="site-name">FilmFellow</span>
        </h1>
      </Link>

      <HeaderLinks />
      <HeaderSearch />
      <HeaderMenu />
    </header>
  );
};
