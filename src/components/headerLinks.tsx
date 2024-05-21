"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Links = [
  { text: "New", href: "/new" },
  { text: "Popular", href: "/popular" },
  { text: "Best Rated", href: "/bestrated" },
];

export const HeaderLinks = () => {
  const currentPath = usePathname();

  return (
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
  );
};
