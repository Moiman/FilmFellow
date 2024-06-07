"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

type IconAlign = "right" | "left";

interface SidebarProps {
  children: ReactNode;
  iconPosition?: IconAlign;
  defaultOpen?: boolean;
}

/**
 * A sidebar that can be toggled open and closed.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children - The content of the Sidebar. Needs at least 1 child.
 * @param {"right" | "left"} [props.iconPosition=left] - Position of the toggle icon. Default is "left".
 * @param {boolean} [props.defaultOpen=true] - Whether the sidebar is open by default. Default is "true".
 * @returns {JSX.Element} A JSX element representing the Sidebar component.
 */

export const Sidebar = ({ children, iconPosition, defaultOpen }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen !== undefined ? defaultOpen : true);

  const renderIcon = () => {
    const IconComponent = isOpen
      ? iconPosition === "right"
        ? ChevronLeft
        : ChevronRight
      : iconPosition === "right"
        ? ChevronRight
        : ChevronLeft;
    return (
      <IconComponent
        className="yellow"
        size={20}
      />
    );
  };

  return (
    <div className="sidebar">
      <div className={`sidebar-header ${iconPosition === "right" ? "sidebar-header--right" : ""}`}>
        <button
          className="button-transparent"
          data-testid="toggle-button"
          style={{ padding: 0 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          {renderIcon()}
        </button>
      </div>

      {isOpen && children}
    </div>
  );
};
