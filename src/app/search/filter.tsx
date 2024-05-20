"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

export default function Filter({ children, title }: { children: ReactNode; title: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="filter-dropdown">
      <div onClick={() => setIsOpen(!isOpen)}>
        <h4>{title}</h4>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen ? children : null}
    </div>
  );
}
