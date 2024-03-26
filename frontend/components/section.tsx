import { ReactElement } from "react";

interface SectionProps {
  header: string | ReactElement;
  children: ReactElement;
}

export const Section = ({ header, children }: SectionProps) => {
  return (
    <section className="section">
      <div className="section-header">{typeof header === "string" ? <h3>{header}</h3> : header}</div>
      <div className="section-content">{children}</div>
    </section>
  );
};
