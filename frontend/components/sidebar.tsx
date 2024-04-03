"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

type iconAlign = "right" | "left";

interface SidebarProps {
  children: ReactNode;
  iconAlign?: iconAlign;
  open?: boolean;
}

/**
 * This component can be used as a sidebar. It works as a wrapper, is as wide as it's content and as long as it's parent .
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children - The children of the Sidebar component. Needs at least 1 child.
 * @param {"right" | "left"} [props.iconAlign] - Align for icon that opens and closes Sidebar. Should always be aligned to same side where main content is. Default is "left";
 * @param {boolean} [props.open] - Is sidebar open by default. Default is "true".
 */

export const Sidebar = ({ children, iconAlign, open }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(open === false ? false : true);

  const renderIcon = () => {
    const IconComponent = isOpen
      ? iconAlign === "left"
        ? ChevronRight
        : ChevronLeft
      : iconAlign === "left"
        ? ChevronLeft
        : ChevronRight;
    return (
      <IconComponent
        color="#ffc700"
        size={20}
      />
    );
  };

  return (
    <div className="sidebar">
      <div
        className="sidebar-header"
        style={{ justifyContent: iconAlign === "right" ? "right" : "left" }}
      >
        <button
          className="button-transparent"
          data-testid="toggle-button"
          style={{ padding: 0 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {renderIcon()}
        </button>
      </div>

      {isOpen ? children : null}
    </div>
  );
};
