"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

export default function Filter({ children, title }: { children: ReactNode; title: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div
        className="filter-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="filter-title">{title}</h4>
        <div className="filter-Chevron">{isOpen ? <ChevronUp /> : <ChevronDown />}</div>
      </div>
      <div className="filter-content">{isOpen ? children : null}</div>
    </div>
  );
}
