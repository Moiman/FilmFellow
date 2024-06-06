"use client";
import { useState } from "react";
import { Section } from "@/components/section";
import { ReportComponent } from "./report";
import type { getAllReports } from "@/services/reportService";

type Props = Awaited<ReturnType<typeof getAllReports>>;

export const AdminPanelReports = ({ reports }: { reports: Props }) => {
  const [allReports, setAllReports] = useState(reports);
  const [searchInput, setSearchInput] = useState("");
  const filteredResults = searchInput
    ? allReports.filter(
        report =>
          report.creator?.username.startsWith(searchInput) || report.targetUser?.username.startsWith(searchInput),
      )
    : allReports;
  const sectionHeader = (
    <div className="admin-panel-section-header">
      <h5>Done</h5>
      <h5>Reporter</h5>
      <h5>Date</h5>
      <h5>Target</h5>
      <h5>Description</h5>
      <h5>Action</h5>
    </div>
  );
  return (
    <main>
      <div className="admin-panel-reports">
        <div className="admin-searchbar">
          <input
            data-cy="admin-search-input"
            className="admin-searchbar-input"
            type="text"
            placeholder="Search user..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>
        <Section header={sectionHeader}>
          {filteredResults.length > 0 ? (
            filteredResults.map(report => (
              <ReportComponent
                key={report.id}
                report={report}
                setAllReports={setAllReports}
              />
            ))
          ) : (
            <p>No reports yet.</p>
          )}
        </Section>
      </div>
    </main>
  );
};
