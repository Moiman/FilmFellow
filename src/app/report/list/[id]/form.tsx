"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";
import { getList } from "@/services/listService";
import { reportMaxLength, reportMinLength } from "@/schemas/reportSchema";

interface Props {
  list: List;
}

type List = NonNullable<Awaited<ReturnType<typeof getList>>>;

export default function ReportListForm({ list }: Props) {
  const router = useRouter();

  const [reportInput, setReportInput] = useState<string>("");

  const sectionHeader = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h4>
        Report about list{" "}
        <Link
          className="h4 yellow"
          href={`/lists/${list.id}`}
        >
          {list.name}
        </Link>{" "}
        by user{" "}
        <Link
          className="h4 yellow"
          href={`/users/${list.userId}`}
        >
          {list.user.username}
        </Link>
      </h4>
    </div>
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createReport(list.userId, reportInput, null, null, Number(list.id));

    setReportInput("");

    toast(<p>Report was submitted</p>, {
      icon: <Flag />,
      className: "yellow-toast",
    });

    router.push("/lists/" + list.id);
  };

  return (
    <main className="form-main">
      <div className="section-wrapper">
        <Section header={sectionHeader}>
          <form
            onSubmit={e => onSubmit(e)}
            className="form"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label
                htmlFor="report"
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
              required
              rows={10}
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
