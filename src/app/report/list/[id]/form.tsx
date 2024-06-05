"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";
import { getList } from "@/services/listService";
import { reportValidationSchema, reportMaxLength, reportMinLength } from "@/schemas/reportSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { ErrorMessage } from "@/components/errorMessage";

interface Props {
  list: List;
}

type List = NonNullable<Awaited<ReturnType<typeof getList>>>;

interface FormData {
  report: string;
}

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(reportValidationSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.report) {
      await createReport(list.userId, data.report.toString(), null, null, Number(list.id));

      toast(<p>Report was submitted</p>, {
        icon: <Flag />,
        className: "yellow-toast",
      });

      router.push("/lists/" + list.id);
    }
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
              required
              rows={10}
              {...register("report")}
              onChange={e => setReportInput(e.target.value)}
              autoFocus
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
