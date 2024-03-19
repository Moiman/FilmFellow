import Link from "next/link";
import { LogOut, Menu, Search, Tool, User } from "react-feather";

export const Links = [
  { text: "New", href: "/new" },
  { text: "Popular", href: "/popular" },
  { text: "Best Rated", href: "/bestrated" },
];

export const Header = () => {
  // Placeholder: check if user is logged in
  const isLoggedIn = false;

  return (
    <header className="header">
      <Link
        href="/"
        className="logo"
      >
        <h4>🍿</h4>
        <h4>FilmFellow</h4>
      </Link>

      <nav className="main-nav highlight-nav">
        {Links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
          >
            {link.text}
          </Link>
        ))}
      </nav>

      {/* Placeholder for search bar component */}
      <div className="searchbar">
        <input
          className="searchbar-input"
          placeholder="Search..."
        />
        <Search
          className="searchbar-icon"
          size={20}
        />
      </div>

      {/* Replace with dropdown component when done */}
      <div className="sub-nav-narrow highlight-nav">
        <Menu style={{ strokeWidth: 1.5 }} />
      </div>

      {/* For w > 1024 sub-nav */}
      <div className="sub-nav-wide highlight-nav">
        <>
          {isLoggedIn ? (
            <>
              <Link href="/admin">
                <Tool style={{ strokeWidth: 1.5 }} />
              </Link>
              <Link href="/profile">
                <User style={{ strokeWidth: 1.5 }} />
              </Link>
              <Link href="/">
                <LogOut style={{ strokeWidth: 1.5 }} />
              </Link>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </>
      </div>
    </header>
  );
};
