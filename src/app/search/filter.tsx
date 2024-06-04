"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

export default function Filter({ children, title }: { children: ReactNode; title: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="filter-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="h5">{title}</h3>
        <div className="filter-chevron yellow">{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
      </div>
      {isOpen && <div className="filter-content">{children}</div>}
    </>
  );
}
