"use client";
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

  const handleReportSubmit = async (formData: FormData) => {
    const about = formData.get("about");
    if (about) {
      await createReport(list.userId, about.toString(), null, null, Number(list.id));

      toast(<p>Report was submitted</p>, {
        icon: <Flag />,
        className: "yellow-toast",
      });

      router.push("/");
    }
  };

  return (
    <main className="form-main">
      <div className="section-wrapper">
        <Section header={sectionHeader}>
          <form
            action={handleReportSubmit}
            className="form"
          >
            <label htmlFor="about">Write your report here</label>
            <textarea
              id="about"
              name="about"
              required
              rows={10}
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
