"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";
import type { User } from "next-auth";
import { reportMaxLength, reportMinLength } from "@/schemas/reportSchema";

interface Props {
  targetUser: User;
}

export default function ReportForm({ targetUser }: Props) {
  const router = useRouter();
  const [reportInput, setReportInput] = useState("");

  const sectionHeader = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h4>
        Report about user{" "}
        <Link
          className="h4 yellow"
          href={`/users/${targetUser?.id}`}
          aria-label={`User you are reporting`}
        >
          {targetUser.username}
        </Link>
      </h4>
    </div>
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReport(Number(targetUser?.id), reportInput.trim(), null, null);

    setReportInput("");

    toast(<p>Report about {targetUser.username} was submitted</p>, {
      icon: <Flag />,
      className: "yellow-toast",
    });

    router.push("/users/" + targetUser.id);
  };

  return (
    <main className="form-main">
      <div className="section-wrapper">
        <Section header={sectionHeader}>
          <form
            onSubmit={onSubmit}
            className="form"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label
                htmlFor="content"
                className="h6"
              >
                Write your report here
              </label>
              <p
                style={{ marginBottom: "0" }}
                className={
                  reportInput.length <= reportMaxLength && reportInput.length >= reportMinLength
                    ? "description grey"
                    : "description pink"
                }
              >
                {reportInput.length}/{reportMaxLength}
              </p>
            </div>
            <textarea
              id="report"
              name="report"
              placeholder="Please describe the reason for your report..."
              rows={10}
              required
              value={reportInput}
              minLength={reportMinLength}
              maxLength={reportMaxLength}
              onChange={e => setReportInput(e.target.value)}
              autoFocus
            />
            <button
              className="form-submit"
              type="submit"
            >
              Submit report
            </button>
          </form>
        </Section>
      </div>
    </main>
  );
}
