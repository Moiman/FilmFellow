"use client";
import { ReactElement, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "react-feather";

/* Add more optional items if needed, id and name are only mandatory ones? */
export type dropdownMenuItem = {
  id: number | string;
  name: string;
  href?: string;
};

type buttonAlign = "center" | "right" | "left";

/* 
MANDATORY PROPS:
options: Array of items (dropdownMenuItem) to be used in dropdown menu
onSelect: Function that takes selected item back to the parent and handles it there e.g. with UseState

OPTIONAL PROPS:
defaultOption: Optional default item that is already selected (e.g. "All")
button: Optional ReactElement that can be used as button for the menu
buttonAlign: Optional align for custom button, default is left
width: Optional width of the dropdown menu, without this width is 100% parent width
maxHeight: Optional maximum height of the dropdown menu, without this height is as long as it's content
zIndex: Optional z-index to ease future layout handling
showSelected: show checkmark on selected item
*/

interface DropdownMenuProps {
  options: dropdownMenuItem[];
  onSelect: (item: dropdownMenuItem) => void;
  defaultOption?: dropdownMenuItem;
  button?: ReactElement;
  buttonAlign?: buttonAlign;
  width?: number;
  height?: number;
  zIndex?: number;
  showSelected?: boolean;
}

export const DropdownMenu = ({
  options,
  defaultOption,
  button,
  buttonAlign,
  width,
  height,
  zIndex,
  onSelect,
  showSelected,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<dropdownMenuItem | null>(defaultOption ? defaultOption : options[0]);

  if (selected === null) {
    return null;
  }

  const changeValue = (item: dropdownMenuItem) => {
    setSelected(item);
    onSelect(item);
  };

  return (
    <div
      className="dropdown-menu"
      style={{
        zIndex: zIndex,
        justifyContent: buttonAlign ? buttonAlign : "left",
      }}
    >
      {button ? (
        <div onClick={() => setIsOpen(!isOpen)}>{button}</div>
      ) : (
        <button
          className="header"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected && selected.name}
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
          className="menu"
          style={{ maxHeight: height ? height + "px" : "fit-content", minWidth: width ? width + "px" : "fit-content" }}
        >
          {options.map((option: dropdownMenuItem) => (
            <button
              key={option.id}
              onClick={() => changeValue(option)}
              className="item"
            >
              {option.name}
              {option.id === selected.id && showSelected === true ? (
                <Check
                  size={20}
                  color="#ffc700"
                />
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
