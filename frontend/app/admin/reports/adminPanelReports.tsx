"use client";
import { Section } from "@/components/section";
import { ReportComponent } from "./report";
import { useState } from "react";

interface Props {
  reports: Report[];
}

interface User {
  username: string;
  isActive: boolean;
  role: string;
}

interface Report {
  id: number;
  content: string;
  created_at: Date;
  targetUserId: number | null;
  reviewId?: number | null;
  importedReviewId?: string | null;
  done: boolean;
  creatorId: number;
  creator: User | null;
  targetUser: User | null;
}

export const AdminPanelReports = ({ reports }: Props) => {
  const [allReports, setAllReports] = useState(reports);
  const [searchInput, setSearchInput] = useState("");
  const filteredResults = searchInput
    ? allReports.filter(
        report =>
          report.creator?.username.startsWith(searchInput) || report.targetUser?.username.startsWith(searchInput),
      )
    : allReports;
  const sectionHeader = (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto auto"}}>
      <h4>Done</h4>
      <h4>Reporter</h4>
      <h4>Date</h4>
      <h4>Target</h4>
      <h4>Description</h4>
      <h4>Action</h4>
    </div>
  );
  return (
    <main>
      <div>
        <div className="admin-searchbar">
          <input
            data-cy="admin-search-input"
            className="admin-searchbar-input"
            placeholder="Search..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
        <Section header={sectionHeader}>
          {filteredResults.map(report => (
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
