import { Check } from "react-feather";
import { Dropdown } from "@/components/dropdown";

type Props = {
  selectedSortOption: string;
  setSelectedSortOption: any;
};

const options = ["New", "Popular", "Best rated"];

export default function SortSelector({ selectedSortOption, setSelectedSortOption }: Props) {
  return (
    <div className="genre-dropdown">
      <p>Sort</p>
      <Dropdown
        zIndex={10}
        width={120}
        selected={selectedSortOption ?? "All"}
        maxHeight={400}
      >
        {options.map(option => (
          <button
            key={option}
            className="dropdown-item"
            onClick={() => setSelectedSortOption(option)}
          >
            {option}
            {option === selectedSortOption && (
              <Check
                size={20}
                className="yellow-icon"
              />
            )}
          </button>
        ))}
      </Dropdown>
    </div>
  );
}
