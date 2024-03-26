"use client";
import { ReactElement, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

export type dropdownMenuItem = {
  id: number | string;
  name: string;
};

interface DropdownMenuProps {
  options: dropdownMenuItem[];
  defaultOption?: dropdownMenuItem;
  button?: ReactElement;
  maxWidth?: string | number;
  zIndex?: string | number;
  onSelect: (item: dropdownMenuItem) => void;
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
        <div className="header">
          {selected !== null ? selected.name : "Select one"}
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
        </div>
      )}
      {isOpen && (
        <div className="menu">
          {options.map((option: dropdownMenuItem) => (
            <div
              key={option.id}
              onClick={() => changeValue(option)}
              className={option.id === selected.id ? "selected item" : "item"}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
