"use client";
import { useState } from "react";
import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";

interface Props {
  targetUserId: string;
  creator: number | string;
}

export default function ReportForm({ targetUserId, creator }: Props) {
  const [reportInput, setReportInput] = useState("");
  const sectionHeader = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h4>Report</h4>
    </div>
  );

  const handleReportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReport(creator as number, parseInt(targetUserId), reportInput, null, null);
    setReportInput("");
  };

  return (
    <main className="form-main">
      <div className="section-wrapper">
        <Section header={sectionHeader}>
          <form
            onSubmit={handleReportSubmit}
            className="form"
          >
            <label htmlFor="about">Write your report here</label>
            <textarea
              id="about"
              required
              rows={10}
              value={reportInput}
              onChange={e => setReportInput(e.target.value)}
            />
            <button
              className="form-submit"
              type="submit"
            >
              Submit Report
            </button>
          </form>
        </Section>
      </div>
    </main>
  );
}
