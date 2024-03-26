"use client";
import { ReactElement, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "react-feather";

export type dropdownMenuItem = {
  id: number | string;
  name: string;
};

// PROPS:
// options: Array of items (dropdownMenuItem) to be used in dropdown menu
// onSelect: Function that takes selected item back to the parent and handles it there e.g. with UseState

// defaultOption: Optional default item that is already selected (e.g. "All")
// button: Optional ReactElement that can be used as button for the menu
// maxWidth: Optional maximum width of the dropdown menu, without this width is 100%
// zIndex: Optional z-index to ease future layout handling

interface DropdownMenuProps {
  options: dropdownMenuItem[];
  onSelect: (item: dropdownMenuItem) => void;
  defaultOption?: dropdownMenuItem;
  button?: ReactElement;
  maxWidth?: string | number;
  zIndex?: number;
}

export const DropdownMenu = ({ options, defaultOption, button, maxWidth, zIndex, onSelect }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<dropdownMenuItem | null>(defaultOption ? defaultOption : null);

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
      onClick={() => setIsOpen(!isOpen)}
      style={{ maxWidth: maxWidth ? maxWidth.toString() + "px" : "100%", zIndex: zIndex }}
    >
      {button ? (
        button
      ) : (
        <button className="header">
          {selected.name ? selected.name : "Select one"}
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
        <div className="menu">
          {options.map((option: dropdownMenuItem) => (
            <button
              key={option.id}
              onClick={() => changeValue(option)}
              className="item"
            >
              {option.name}
              {option.id === selected.id ? (
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
