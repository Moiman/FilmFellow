"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";
import { getList } from "@/services/listService";

interface Props {
  list: List;
}

type List = NonNullable<Awaited<ReturnType<typeof getList>>>;

export default function ReportListForm({ list }: Props) {
  const [reportInput, setReportInput] = useState("");
  const router = useRouter();
  const sectionHeader = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h4>
        Report about list{" "}
        <Link
          className="h4"
          href={`/lists/${list.id}`}
        >
          {list.name}
        </Link>{" "}
        by user{" "}
        <Link
          className="h4"
          href={`/users/${list.userId}`}
        >
          {list.user.username}
        </Link>
      </h4>
    </div>
  );

  const handleReportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReport(list.userId, reportInput, null, null, Number(list.id));
    setReportInput("");

    toast(<p>Report was submitted</p>, {
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
