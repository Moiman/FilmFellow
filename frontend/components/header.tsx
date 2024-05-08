"use client";

import Link from "next/link";
import { LogOut, Menu, Search, Tool, User } from "react-feather";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Dropdown } from "./dropdown";

export const Header = () => {
  const { data: session } = useSession();
  const currentPath = usePathname();

  const Links = [
    { text: "New", href: "/new" },
    { text: "Popular", href: "/popular" },
    { text: "Best Rated", href: "/bestrated" },
  ];

  const SubNavLinks = [
    {
      icon: <Tool style={{ strokeWidth: 1.5 }} />,
      text: "Admin",
      href: "/admin/users",
    },
    { icon: <User style={{ strokeWidth: 1.5 }} />, text: "Profile", href: `/users/${session?.user.id}` },
    {
      icon: <LogOut style={{ strokeWidth: 1.5 }} />,
      text: "Logout",
      href: "/",
    },
  ];

  return (
    <header>
      <Link
        href="/"
        className="logo"
      >
        <h1 className="h4">🍿FilmFellow</h1>
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
          type="text"
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
            <button className="button-transparent">
              <Menu
                data-cy="menu-icon"
                style={{ strokeWidth: 1.5 }}
              />
            </button>
          }
          buttonAlign="right"
        >
          {Links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="dropdown-item"
            >
              {link.text}
            </Link>
          ))}
          {session ? (
            session.user.role === "admin" ? (
              SubNavLinks.map(link => (
                <Link
                  onClick={link.text === "Logout" ? () => signOut() : undefined}
                  key={link.href}
                  href={link.href}
                  className="dropdown-item"
                >
                  {link.text}
                </Link>
              ))
            ) : (
              SubNavLinks.filter(navlinks => navlinks.href !== "/admin/users").map(link => (
                <Link
                  onClick={link.text === "Logout" ? () => signOut() : undefined}
                  key={link.href}
                  href={link.href}
                  className="dropdown-item"
                >
                  {link.text}
                </Link>
              ))
            )
          ) : (
            <>
              <Link
                key="login"
                href="/login"
                className="dropdown-item"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="dropdown-item"
              >
                Register
              </Link>
            </>
          )}
        </Dropdown>
      </div>

      {/* For w > 1024 sub-nav */}
      <div className="sub-nav-wide highlight-nav">
        <>
          {session ? (
            session.user.role === "admin" ? (
              <>
                {SubNavLinks.map(link => (
                  <Link
                    onClick={link.text === "Logout" ? () => signOut() : undefined}
                    key={link.href}
                    href={link.href}
                    className={currentPath === link.href ? "active-icon" : ""}
                  >
                    {link.icon}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {SubNavLinks.filter(navlinks => navlinks.href !== "/admin/users").map(link => (
                  <Link
                    onClick={link.text === "Logout" ? () => signOut() : undefined}
                    key={link.href}
                    href={link.href}
                    className={currentPath === link.href ? "active-icon" : ""}
                  >
                    {link.icon}
                  </Link>
                ))}
              </>
            )
          ) : (
            <>
              <Link
                href="/login"
                className={currentPath === "/login" ? "active-link" : ""}
                style={{ lineHeight: "1.4" }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={currentPath === "/register" ? "active-link" : ""}
                style={{ lineHeight: "1.4" }}
              >
                Register
              </Link>
            </>
          )}
        </>
      </div>
    </header>
  );
};
