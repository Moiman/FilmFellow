"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";
import type { User } from "next-auth";
import { ErrorMessage } from "@/components/errorMessage";

interface Props {
  targetUser: User | null;
}

interface FormData {
  report: string;
}

const maxLength = 500;

const validationSchema = yup.object().shape({
  report: yup
    .string()
    .trim()
    .required("Report is required")
    .max(maxLength, "Report cannot exceed " + maxLength + " characters"),
});

export default function ReportForm({ targetUser }: Props) {
  const router = useRouter();
  const [reportInput, setReportInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const sectionHeader = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h4>
        Report about user{" "}
        <Link
          className="h4"
          href={`/users/${targetUser?.id}`}
          aria-label={`User you are reporting`}
        >
          {targetUser?.username}
        </Link>
      </h4>
    </div>
  );

  const onSubmit = async (data: FormData) => {
    await createReport(Number(targetUser?.id), data.report.trim(), null, null);
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
            onSubmit={handleSubmit(onSubmit)}
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
                className={reportInput.length <= maxLength ? "description grey" : "description pink"}
              >
                {reportInput.length}/{maxLength}
              </p>
            </div>
            <textarea
              id="report"
              placeholder="Please describe the reason for your report..."
              rows={10}
              value={reportInput}
              {...register("report")}
              onChange={e => setReportInput(e.target.value)}
            />
            {errors.report && <ErrorMessage message={errors.report.message} />}
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
