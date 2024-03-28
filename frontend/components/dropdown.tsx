import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

type buttonAlign = "center" | "right" | "left";

interface DropdownMenuProps {
  children: ReactNode;
  selected?: string;
  button?: ReactNode;
  buttonAlign?: buttonAlign;
  width?: number;
  height?: number;
  zIndex?: number;
}

/**
 * This component can be used as a dropdown menu or select component. It works as a wrapper for links, options, etc.
 *
 * @component
 * @param {React.ReactNode} children - The children of the Dropdown component. Needs at least 1 child. You can use a button with the "dropdown-item" class for default styling or make a custom one.
 * @param {string} [selected] - Optional string for the header, for example, the currently selected option. Default is "Choose one".
 * @param {React.ReactNode} [button] - Optional ReactNode to replace the header. Use only Buttons for accessibility.
 * @param {"center"|"left"|"right"} [buttonAlign] - Optional alignment (center, right, left) for custom button. Default is "left".
 * @param {string} [width] - Optional width of the dropdown menu. Without this default width is 100% of parent width.
 * @param {string} [maxHeight] - Optional maximum height of the dropdown menu. Without this default height is "fit-content".
 * @param {number} [zIndex] - Optional z-index to ease future layout handling.
 * @returns {JSX.Element} A JSX element representing the Dropdown component.
 */

export const Dropdown = ({ children, selected, button, buttonAlign, width, height, zIndex }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className="dropdown"
      style={{
        zIndex: zIndex,
        justifyContent: buttonAlign ? buttonAlign : "left",
        maxWidth: width ? width + "px" : "100%",
      }}
    >
      {button ? (
        <div onClick={() => setIsOpen(!isOpen)}>{button}</div>
      ) : (
        <button
          className="dropdown-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected ? selected : "Choose one"}
          {!isOpen ? (
            <ChevronDown
              size={20}
              color={"#ffc700"}
            />
          ) : (
            <ChevronUp
              size={20}
              color={"#ffc700"}
            />
          )}
        </button>
      )}

      {isOpen && (
        <div
          className="dropdown-menu"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            maxHeight: height ? height + "px" : "fit-content",
            minWidth: width ? width + "px" : "fit-content",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
