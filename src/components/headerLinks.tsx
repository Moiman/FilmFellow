"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";

export const links = [
  { text: "New", href: "/new" },
  { text: "Popular", href: "/popular" },
  { text: "Best Rated", href: "/bestrated" },
];

export const HeaderLinks = ({ session }: { session: Session | null }) => {
  const currentPath = usePathname();

  return (
    <nav className="main-nav highlight-nav">
      {session && (
        <Link
          href="/recommendations"
          className={currentPath === "/recommendations" ? "active-link" : ""}
        >
          Recommendations
        </Link>
      )}
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={currentPath === link.href ? "active-link" : ""}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
};
