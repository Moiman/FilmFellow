"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, Menu, Tool, User } from "react-feather";

import { Dropdown } from "./dropdown";
import { Links } from "./headerLinks";
import type { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export const HeaderMenu = ({ session }: Props) => {
  const currentPath = usePathname();

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
    <>
      <nav className="sub-nav-narrow">
        <Dropdown
          maxHeight={0}
          width={100}
          zIndex={20}
          button={
            <button
              className="button-transparent"
              aria-label="Menu"
            >
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
            <nav>
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
            </nav>
          )}
        </Dropdown>
      </nav>

      {/* For w > 1024 sub-nav */}
      <nav className="sub-nav-wide highlight-nav">
        <>
          {session ? (
            session.user.role === "admin" ? (
              <>
                {SubNavLinks.map(link => (
                  <Link
                    onClick={link.text === "Logout" ? () => signOut() : undefined}
                    key={link.href}
                    href={link.href}
                    className={currentPath === link.href && link.href !== "/" ? "active-icon" : ""}
                    aria-label={link.text}
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
                    className={currentPath === link.href && link.href !== "/" ? "active-icon" : ""}
                    aria-label={link.text}
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
      </nav>
    </>
  );
};
