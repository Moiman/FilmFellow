interface SectionProps {
  header: string | React.ReactNode;
  children: React.ReactNode;
}

export const Section = ({ header, children }: SectionProps) => {
  return (
    <section className="section">
      <div className="section-header">{typeof header === "string" ? <h3>{header}</h3> : header}</div>
      <div className="section-content">{children}</div>
    </section>
  );
};
