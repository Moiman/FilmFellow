"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Columns, Grid, Table } from "react-feather";

export default function LinkStyleLinks({ listId }: { listId: string | number }) {
  const currentPath = usePathname();

  return (
    <>
      <Link
        href={`/lists/${listId}/`}
        aria-label="List layout"
        className={!currentPath.includes("grid") && !currentPath.includes("catalogue") ? "active-icon" : ""}
      >
        <Grid size={20} />
      </Link>
      <Link
        href={`/lists/${listId}/grid`}
        aria-label="Grid layout"
        className={currentPath.includes("grid") ? "active-icon" : ""}
      >
        <Columns size={20} />
      </Link>
      <Link
        href={`/lists/${listId}/catalogue`}
        aria-label="Catalogue layout"
        className={currentPath.includes("catalogue") ? "active-icon" : ""}
      >
        <Table size={20} />
      </Link>
    </>
  );
}
