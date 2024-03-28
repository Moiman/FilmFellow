import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

type buttonAlign = "center" | "right" | "left";

/* 
This can be used for example as dropdown menu or select component, works as a wrapper for links, options etc.
 
MANDATORY PROPS:
children: Needs at least 1 child: you can use button with dropdown-item class for default styling or make a custom one

OPTIONAL PROPS:
selected: String for header, for example currently selected option, default is "Choose one"
button: Optional ReactNode to replace header, use only Buttons for accessibility 
buttonAlign: Optional align for custom button, default is left
width: Optional width of the dropdown menu, without this width is 100% parent width
maxHeight: Optional maximum height of the dropdown menu, without this height if fit-content
zIndex: Optional z-index to ease future layout handling
*/

interface DropdownMenuProps {
  children: ReactNode;
  selected?: string;
  button?: ReactNode;
  buttonAlign?: buttonAlign;
  width?: number;
  height?: number;
  zIndex?: number;
}

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