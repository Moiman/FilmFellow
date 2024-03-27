import { ReactElement, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

/* Add more optional items if needed, id and name are only mandatory ones? */
export type dropdownMenuItem = {
  id: number | string;
  name: string;
  href?: string;
};

type buttonAlign = "center" | "right" | "left";

/* 
MANDATORY PROPS:
children: Needs at least 1 child: you can use button with dropdown-item class for styling or make a custom one

OPTIONAL PROPS:
selected: Optional default item that is already selected (e.g. "All")
button: Optional ReactElement that can be used as button for the menu instead showing selected item
buttonAlign: Optional align for custom button, default is left
width: Optional width of the dropdown menu, without this width is 100% parent width
maxHeight: Optional maximum height of the dropdown menu, without this height is as long as it's content
zIndex: Optional z-index to ease future layout handling
*/

interface DropdownMenuProps {
  children: any;
  selected?: dropdownMenuItem;
  button?: ReactElement;
  buttonAlign?: buttonAlign;
  width?: number;
  height?: number;
  zIndex?: number;
}

export const DropdownMenu = ({ children, selected, button, buttonAlign, width, height, zIndex }: DropdownMenuProps) => {
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
          {selected ? selected.name : "Choose one"}
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
          style={{ maxHeight: height ? height + "px" : "fit-content", minWidth: width ? width + "px" : "fit-content" }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
