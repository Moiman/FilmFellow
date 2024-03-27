"use client";
import { DropdownMenu } from "@/components/dropdownMenu";
import { Section } from "@/components/section";
import { useState } from "react";
import { Check } from "react-feather";

export default function Home() {
  const exampleHeader = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h3>Component header</h3> <button>Button</button>
    </div>
  );

  /* For dropdown example */
  type Genre = {
    id: number;
    name: string;
  };

  /* Placeholder for data */
  const exampleGenres: Genre[] = [
    { id: 1, name: "All" },
    { id: 23, name: "Drama" },
    { id: 5, name: "Horror" },
    { id: 2, name: "Sci-fi" },
    { id: 16, name: "Western" },
    { id: 161, name: "Action" },
    { id: 162, name: "Romance" },
    { id: 163, name: "Comedy" },
    { id: 164, name: "Musical" },
  ];

  const [selectedGenre, setSelectedGenre] = useState<Genre>(exampleGenres[0]);

  const handleGenreChange = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  return (
    <main>
      <h1>FilmFellow</h1>

      <DropdownMenu
        selected={selectedGenre ? selectedGenre : exampleGenres.find((genre: Genre) => (genre.name = "All"))}
        zIndex={30}
        width={400}
      >
        {exampleGenres.map((option: Genre) => (
          <button
            key={option.id}
            onClick={() => handleGenreChange(option)}
            className="dropdown-item"
          >
            {option.name}
            {option.id === selectedGenre.id ? (
              <Check
                size={20}
                color="#ffc700"
              />
            ) : null}
          </button>
        ))}
      </DropdownMenu>

      <DropdownMenu
        button={<button>Test menu with align and button</button>}
        zIndex={10}
        buttonAlign="right"
      >
        <button className="dropdown-item">1</button>
        <button className="dropdown-item">2</button>
        <button className="dropdown-item">3</button>
      </DropdownMenu>

      <Section header={exampleHeader}>
        <p>This is a example usage of {"<Section>"} with component header.</p>
      </Section>

      <Section header="String header">
        <p>This is a example usage of {"<Section>"} with string header.</p>
      </Section>
    </main>
  );
}
