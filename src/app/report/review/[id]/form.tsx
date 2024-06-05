"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@/components/errorMessage";
import { toast } from "react-toastify";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";
import { getReviewById } from "@/services/reviewService";
import { validationSchema, reportMaxLength, reportMinLength } from "@/schemas/reportSchema";

interface Props {
  targetReview: Review;
}

export type Review = NonNullable<Awaited<ReturnType<typeof getReviewById>>>;

interface FormData {
  report: string;
}

export default function ReportReviewForm({ targetReview }: Props) {
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
        Report about review in movie{" "}
        <Link
          className="h4"
          href={`/movies/${targetReview.movieId}`}
        >
          {targetReview.movie.title}
        </Link>
      </h4>
    </div>
  );

  const onSubmit = async (data: FormData) => {
    if (targetReview) {
      if ("author" in targetReview) {
        await createReport(null, data.report.trim(), null, targetReview.id);
      } else {
        await createReport(Number(targetReview.userId), data.report.trim(), targetReview.id, null);
      }
    }

    setReportInput("");

    toast(<p>Report was submitted</p>, {
      icon: <Flag />,
      className: "yellow-toast",
    });

    router.push("/movies/" + targetReview.movieId);
  };

  return (
    <main className="form-main">
      <div className="section-wrapper">
        <Section header={sectionHeader}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form"
          >
            <p
              id="reviewContent"
              aria-description="Review you are reporting"
              className="description reported-review"
            >
              {targetReview.content}
            </p>
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
