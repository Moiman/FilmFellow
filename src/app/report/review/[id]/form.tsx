"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Flag } from "react-feather";

import { Section } from "@/components/section";
import { createReport } from "@/services/reportService";
import { getReviewById } from "@/services/reviewService";

interface Props {
  targetReview: Review;
}

export type Review = NonNullable<Awaited<ReturnType<typeof getReviewById>>>;

export default function ReportReviewForm({ targetReview }: Props) {
  const [reportInput, setReportInput] = useState("");
  const router = useRouter();
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

  const handleReportSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (targetReview) {
      if ("author" in targetReview) {
        await createReport(null, reportInput, null, targetReview.id);
      } else {
        await createReport(Number(targetReview.userId), reportInput, targetReview.id, null);
      }
    }

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
            <p className="description">
              {targetReview.content.length > 303 ? targetReview.content.slice(0, 300) + "..." : targetReview.content}
            </p>
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
