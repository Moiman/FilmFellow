"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";
import type { User } from "next-auth";

interface Props {
  targetUser: User | null;
}

export default function ReportForm({ targetUser }: Props) {
  const [reportInput, setReportInput] = useState("");
  const router = useRouter();
  const sectionHeader = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h4>
        Report about user{" "}
        <Link
          className="h4"
          href={`/users/${targetUser?.id}`}
        >
          {targetUser?.username}
        </Link>
      </h4>
    </div>
  );

  const handleReportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReport(Number(targetUser?.id), reportInput, null, null);
    setReportInput("");

    toast(<p>Report about {targetUser?.username} was submitted</p>, {
      icon: <Flag />,
      className: "yellow-toast",
    });

    router.push("/");
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
