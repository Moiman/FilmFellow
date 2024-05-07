import Link from "next/link";

interface User {
  username: string;
}

interface Report {
  id: number;
  content: string;
  created_at: Date;
  targetUserId: number | null;
  reviewId?: number | null;
  importedReviewId?: string | null;
  done: boolean;
  creatorId: number;
  creator: User | null;
  targetUser: User | null;
}
interface Props {
  report: Report;
  setAllReports: React.Dispatch<React.SetStateAction<Report[]>>;
}

export const ReportComponent = ({ report, setAllReports }: Props) => {
  const showDate = (date: Date) => {
    const dateFormatted = date.toISOString().slice(0, 10).split("-").reverse().join(".");
    return dateFormatted;
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto auto auto",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <label className="label-row">
        <input type="checkbox" />
      </label>
      <Link href={`/users/${report.creatorId}`}>{report.creator?.username}</Link>
      <p>{showDate(report.created_at)}</p>
      <Link href={`/users/${report.targetUserId}`}>{report.targetUser?.username}</Link>
      <p>{report.content}</p>
      <div style={{ display: "grid", gridAutoRows: "1fr 1fr" }}>
        <button>Block</button>
        <button className="button-pink">Delete</button>
      </div>
    </div>
  );
};
