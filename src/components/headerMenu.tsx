"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { LogOut, Menu, Search, Tool, User } from "react-feather";

import { Dropdown } from "./dropdown";
import { links } from "./headerLinks";

export const HeaderMenu = ({ session }: { session: Session | null }) => {
  const currentPath = usePathname();

  const subNavLinks = [
    {
      icon: <Search style={{ strokeWidth: 1.5 }} />,
      text: "Search",
      href: "/search",
    },
    { icon: <User style={{ strokeWidth: 1.5 }} />, text: "Profile", href: `/users/${session?.user.id}` },
    {
      icon: <Tool style={{ strokeWidth: 1.5 }} />,
      text: "Admin",
      href: "/admin/users",
    },
    {
      icon: <LogOut style={{ strokeWidth: 1.5 }} />,
      text: "Logout",
      href: "/",
    },
  ];

  const menuButton = (
    <button
      className="button-transparent"
      aria-label="Menu"
    >
      <Menu
        data-cy="menu-icon"
        style={{ strokeWidth: 1.5 }}
      />
    </button>
  );

  const noSessionLinks = (
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
  );

  return (
    <>
      {/* For w < 1024 sub-nav */}
      <nav className="sub-nav-narrow">
        <Dropdown
          maxHeight={0}
          width={150}
          zIndex={20}
          button={menuButton}
          buttonAlign="right"
        >
          {session && (
            <Link
              href="/recommendations"
              className="dropdown-item"
            >
              Recommendations
            </Link>
          )}
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="dropdown-item"
            >
              {link.text}
            </Link>
          ))}
          {session &&
            subNavLinks.map(link => (
              <Link
                onClick={link.text === "Logout" ? () => signOut({ callbackUrl: "/" }) : undefined}
                key={link.href}
                href={link.href}
                className="dropdown-item"
              >
                {link.text}
              </Link>
            ))}
          {!session && <nav>{noSessionLinks}</nav>}
        </Dropdown>
      </nav>

      {/* For w > 1024 sub-nav */}
      <nav className="sub-nav-wide highlight-nav">
        <>
          {session && (
            <>
              {subNavLinks.map(link =>
                session.user.role !== "admin" && link.text === "Admin" ? null : (
                  <Link
                    onClick={link.text === "Logout" ? () => signOut({ callbackUrl: "/" }) : undefined}
                    key={link.href}
                    href={link.href}
                    className={currentPath === link.href && link.href !== "/" ? "active-icon" : ""}
                    aria-label={link.text}
                  >
                    {link.icon}
                  </Link>
                ),
              )}
            </>
          )}

          {!session && noSessionLinks}
        </>
      </nav>
    </>
  );
};
