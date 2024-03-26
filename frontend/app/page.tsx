"use client";
import { DropdownMenu, type dropdownMenuItem } from "@/components/dropdownMenu";
import { Section } from "@/components/section";
import { useState } from "react";
import { Menu } from "react-feather";

export default function Home() {
  const exampleHeader = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h3>Component header</h3> <button>Button</button>
    </div>
  );

  const [selectedGenre, setSelectedGenre] = useState<dropdownMenuItem | null>(null);

  const handleGenreChange = (genre: dropdownMenuItem) => {
    setSelectedGenre(genre);
    console.log(genre);
  };

  const exampleList = [
    { id: 1, name: "All" },
    { id: 23, name: "Drama" },
    { id: 5, name: "Horror" },
    { id: 2, name: "Sci-fi" },
    { id: 16, name: "Western" },
  ];

  return (
    <main>
      <h1>FilmFellow</h1>

      <DropdownMenu
        options={exampleList}
        onSelect={handleGenreChange}
        defaultOption={exampleList[0]}
        zIndex={30}
        maxWidth={400}
      />

      <DropdownMenu
        options={exampleList}
        onSelect={handleGenreChange}
        defaultOption={exampleList[1]}
        zIndex={20}
        showSelected={true}
      />

      <DropdownMenu
        options={exampleList}
        onSelect={handleGenreChange}
        defaultOption={exampleList[0]}
        button={<button>Testi</button>}
        zIndex={10}
      />

      <DropdownMenu
        options={exampleList}
        onSelect={handleGenreChange}
        defaultOption={exampleList[0]}
        button={
          <button
            className="button-transparent"
            style={{ display: "inline-flex", justifyContent: "right", width: "100%" }}
          >
            <Menu
              size={20}
              color={"white"}
            />
          </button>
        }
      />

      <Section header={exampleHeader}>
        <p>This is a example usage of {"<Section>"} with component header.</p>
      </Section>

      <Section header="String header">
        <p>This is a example usage of {"<Section>"} with string header.</p>
      </Section>
    </main>
  );
}
