interface Report {
  id: number;
  content: string;
  created_at: Date;
  userId: number;
  reviewId?: number | null;
  importedReviewId?: string | null;
  done: boolean;
}
interface Props {
  report: Report;
  setAllReports: React.Dispatch<React.SetStateAction<Report[]>>;
}

export const ReportComponent = ({ report, setAllReports }: Props) => {
  return <div>
    <p>{report.done}</p>
  </div>;
};
