"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

type buttonAlign = "center" | "right" | "left";

interface DropdownMenuProps {
  children: ReactNode;
  selected?: string;
  button?: ReactNode;
  buttonAlign?: buttonAlign;
  width?: number;
  maxHeight?: number;
  zIndex?: number;
}

/**
 * This component can be used as a dropdown menu or select component. It works as a wrapper for links, options, etc.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children - The children of the Dropdown component. Needs at least 1 child. You can use a button with the "dropdown-item" class for default styling or make a custom one.
 * @param {string} [props.selected] - Optional string for the header, for example, the currently selected option. Default is "Choose one".
 * @param {React.ReactNode} [props.button] - Optional ReactNode to replace the header. Use only Buttons for accessibility.
 * @param {"center"|"left"|"right"} [props.buttonAlign] - Optional alignment (center, right, left) for custom button. Default is "left".
 * @param {string} [props.width] - Optional width of the dropdown menu. Without this default width is 100% of parent width.
 * @param {string} [props.maxHeight] - Optional maximum height of the dropdown menu.  Without this default height is 200px. Max height 0 makes dropdrown height fit-content.
 * @param {number} [props.zIndex] - Optional z-index to ease future layout handling.
 * @returns {JSX.Element} A JSX element representing the Dropdown component.
 */

export const Dropdown = ({
  children,
  selected,
  button,
  buttonAlign,
  width,
  maxHeight = 200,
  zIndex,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="dropdown"
      style={{
        justifyContent: buttonAlign ? buttonAlign : "left",
        width: width ? width + "px" : "100%",
      }}
    >
      {button ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? true : false}
        >
          {button}
        </div>
      ) : (
        <button
          className="dropdown-header"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? true : false}
        >
          {selected ? selected : "Choose one"}
          {!isOpen ? (
            <ChevronDown
              size={20}
              className="yellow-icon"
              aria-label="Expand"
            />
          ) : (
            <ChevronUp
              size={20}
              className="yellow-icon"
              aria-label="Collapse"
            />
          )}
        </button>
      )}

      {isOpen && (
        <div
          className="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            zIndex: zIndex,
            maxHeight: maxHeight !== 0 ? maxHeight + "px" : "fit-content",
            minWidth: width ? width + "px" : "fit-content",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
