"use client";

import { Section } from "@/components/section";
import { ReportComponent } from "./report";
import { useState } from "react";

interface Props {
  reports: Report[];
}

interface Report {
  id: number;
  content: string;
  created_at: Date;
  userId: number;
  reviewId?: number | null;
  importedReviewId?: string | null;
  done: boolean;
}

export const AdminPanelReports = ({ reports }: Props) => {
  const [allReports, setAllReports] = useState(reports);
  const sectionHeader = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr" }}>
      <h4>Done</h4>
      <h4>Reporter</h4>
      <h4>Date</h4>
      <h4>About</h4>
      <h4>Description</h4>
      <h4>Action</h4>
    </div>
  );
  return (
    <main>
      <div>
        <Section header={sectionHeader}>
          {reports.map(report => (
            <ReportComponent
              key={report.id}
              report={report}
              setAllReports={setAllReports}
            ></ReportComponent>
          ))}
        </Section>
      </div>
    </main>
  );
};
