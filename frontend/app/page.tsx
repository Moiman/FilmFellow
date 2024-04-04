"use client";
import { Dropdown } from "@/components/dropdown";
import { Section } from "@/components/section";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";
import { Check } from "react-feather";

export default function Home() {
  const exampleHeader = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h3>Component header</h3>
      <Dropdown
        button={<button>Test menu</button>}
        width={200}
        buttonAlign="right"
      >
        <button className="dropdown-item">1</button>
        <button className="dropdown-item">2</button>
        <button className="dropdown-item">3</button>
      </Dropdown>
    </div>
  );

  /* Placeholder data */
  const exampleGenres = [
    { id: 1, name: "All" },
    { id: 23, name: "Drama" },
    { id: 5, name: "Horror" },
    { id: 2, name: "Sci-fi" },
    { id: 16, name: "Western" },
    { id: 9, name: "Action" },
    { id: 12, name: "Romance" },
    { id: 86, name: "Comedy" },
    { id: 234, name: "Musical" },
  ];

  const [selectedGenre, setSelectedGenre] = useState(exampleGenres[0]);

  return (
    <main className="sidebar-main">
      <div className="home-content">
        <h1>FilmFellow</h1>

        {/* Example of dropdown element */}
        <div
          style={{
            marginBottom: "10px",
            width: "100%",
            display: "inline-flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h6>Genre</h6>
          <Dropdown
            selected={selectedGenre ? selectedGenre.name : undefined}
            width={200}
            zIndex={10}
          >
            {exampleGenres.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedGenre(option)}
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
          </Dropdown>
        </div>

        {/* Examples of sections */}
        <Section header={exampleHeader}>
          <p>This is a example usage of {"<Section>"} with component header.</p>
        </Section>

        <Section header="String header">
          <p>This is a example usage of {"<Section>"} with string header.</p>
        </Section>
      </div>

      <Sidebar iconPosition="left">
        <p style={{ width: "300px", padding: "20px" }}>
          This is a example of sidebar that is on the right side and is open by default.
        </p>
      </Sidebar>
    </main>
  );
}
