"use client";

import Link from "next/link";
import { LogOut, Menu, Search, Tool, User } from "react-feather";
import { usePathname } from "next/navigation";
import { Dropdown } from "./dropdown";

export const Links = [
  { text: "New", href: "/new" },
  { text: "Popular", href: "/popular" },
  { text: "Best Rated", href: "/bestrated" },
];

export const SubNavLinks = [
  {
    icon: <Tool style={{ strokeWidth: 1.5 }} />,
    text: "Admin",
    href: "/admin",
  },
  { icon: <User style={{ strokeWidth: 1.5 }} />, text: "Profile", href: "/profile" },
  { icon: <LogOut style={{ strokeWidth: 1.5 }} />, text: "Logout", href: "" },
];

export const Header = () => {
  // Placeholder: check if user is logged in
  const isLoggedIn = false;
  const currentPath = usePathname();

  return (
    <header>
      <Link
        href="/"
        className="logo"
      >
        <h4>🍿</h4>
        <h4>FilmFellow</h4>
      </Link>

      <nav className="main-nav highlight-nav">
        {Links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={currentPath === link.href ? "active-link" : ""}
          >
            {link.text}
          </Link>
        ))}
      </nav>

      {/* Placeholder for search bar component */}
      <div className="searchbar">
        <input
          data-cy="search-input"
          className="searchbar-input"
          placeholder="Search..."
        />
        <button className="button-transparent">
          <Search
            className="searchbar-icon"
            size={20}
          />
        </button>
      </div>

      <div className="sub-nav-narrow">
        <Dropdown
          width={100}
          zIndex={20}
          button={
            <button
              className="button-transparent"
              style={{
                display: "inline-flex",
                justifyContent: "right",
                alignContent: "center",
                margin: "0",
                padding: "0",
              }}
            >
              <Menu
                style={{ strokeWidth: 1.5 }}
                color="white"
              />
            </button>
          }
          buttonAlign="right"
        >
          {Links.map((link: any) => (
            <Link
              key={link.href}
              href={link.href}
              className="dropdown-item"
            >
              {link.text}
            </Link>
          ))}
          {isLoggedIn ? (
            SubNavLinks.map((link: any) => (
              <Link
                key={link.href}
                href={link.href}
                className="dropdown-item"
              >
                {link.text}
              </Link>
            ))
          ) : (
            <Link
              key="login"
              href="/login"
              className="dropdown-item"
            >
              Login
            </Link>
          )}
        </Dropdown>
      </div>

      {/* For w > 1024 sub-nav */}
      <div className="sub-nav-wide highlight-nav">
        <>
          {isLoggedIn ? (
            <>
              {SubNavLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={currentPath === link.href ? "active-icon" : ""}
                >
                  {link.icon}
                </Link>
              ))}
            </>
          ) : (
            <Link
              href="/login"
              className={currentPath === "/login" ? "active-link" : ""}
              style={{ lineHeight: "1.4" }}
            >
              Login
            </Link>
          )}
        </>
      </div>
    </header>
  );
};
