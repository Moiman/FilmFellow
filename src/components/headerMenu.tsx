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

          <Link
            href="/search"
            className="dropdown-item"
          >
            Search
          </Link>

          {session && (
            <>
              <Link
                href={`/users/${session?.user.id}`}
                className="dropdown-item"
              >
                Profile
              </Link>

              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="dropdown-item"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="dropdown-item"
              >
                Logout
              </button>
            </>
          )}

          {!session && <nav>{noSessionLinks}</nav>}
        </Dropdown>
      </nav>

      {/* For w > 1024 sub-nav */}
      <nav className="sub-nav-wide highlight-nav">
        <>
          {session && (
            <>
              <Link
                href={`/search/`}
                className={currentPath.includes("/search") ? "active-icon" : ""}
              >
                <Search style={{ strokeWidth: 1.5 }} />
              </Link>

              <Link
                href={`/users/${session?.user.id}`}
                className={currentPath.includes(`/users/${session?.user.id}`) ? "active-icon" : ""}
              >
                <User style={{ strokeWidth: 1.5 }} />
              </Link>

              {session.user.role === "admin" && (
                <Link
                  href="/admin/users"
                  className={currentPath.includes("/admin") ? "active-icon" : ""}
                >
                  <Tool style={{ strokeWidth: 1.5 }} />
                </Link>
              )}

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="button-transparent"
              >
                <LogOut style={{ strokeWidth: 1.5 }} />
              </button>
            </>
          )}

          {!session && noSessionLinks}
        </>
      </nav>
    </>
  );
};
