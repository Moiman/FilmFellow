import Link from "next/link";

import { HeaderSearch } from "./headerSearch";
import { HeaderLinks } from "./headerLinks";
import { HeaderMenu } from "./headerMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";

export const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header>
      <Link
        href="/"
        className="logo"
        aria-label="Link to homepage"
      >
        <h1 className="h4">
          🍿<span className="site-name">FilmFellow</span>
        </h1>
      </Link>

      <HeaderLinks />
      <HeaderSearch />
      <HeaderMenu session={session} />
    </header>
  );
};
