import { Dropdown } from "@/components/dropdown";
import { deleteReportById, markReportDone } from "@/services/reportService";
import { Role } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

interface User {
  username: string;
  isActive: boolean;
  role: string;
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

const banOptions = [
  { id: 0, banDuration: 86400, text: "1 Day" },
  { id: 1, banDuration: 604800, text: "7 Days" },
  { id: 2, banDuration: 2592000, text: "30 Days" },
  { id: 3, banDuration: null, text: "Forever" },
];

export const ReportComponent = ({ report, setAllReports }: Props) => {
  const [error, setError] = useState("");
  const handleBanSubmit = async (banDuration: number | null) => {
    try {
      const banDetails = {
        isActive: false,
        banDuration: banDuration,
      };

      const response = await fetch(`/api/users/update/${report.targetUserId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(banDetails),
      });

      if (!response.ok) {
        setError(response.statusText);
        throw response.status;
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        throw data.error;
      }

      setAllReports(reports =>
        reports.map(report => {
          if (report.targetUserId === data.id && report.targetUser) {
            return { ...report, targetUser: { ...report.targetUser, isActive: data.isActive } };
          }
          return report;
        }),
      );

      setError("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnBanSubmit = async () => {
    try {
      const banDetails = {
        isActive: true,
        banDuration: null,
      };

      const response = await fetch(`/api/users/update/${report.targetUserId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(banDetails),
      });

      if (!response.ok) {
        setError(response.statusText);
        throw response.status;
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        throw data.error;
      }

      setAllReports(reports =>
        reports.map(report => {
          if (report.targetUserId === data.id && report.targetUser) {
            return { ...report, targetUser: { ...report.targetUser, isActive: data.isActive } };
          }
          return report;
        }),
      );
      setError("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await markReportDone(report.id, e.target.checked);
  };
  const showDate = (date: Date) => {
    const dateFormatted = date.toISOString().slice(0, 10).split("-").reverse().join(".");
    return dateFormatted;
  };
  const handleDeleteReportSubmit = async () => {
    const response = await deleteReportById(report.id);
    setAllReports(reports => reports.filter(report => report.id !== response.id));
  };
  return (
    <div
      style={{
        display: "grid",
        // gridTemplateColumns: "auto auto auto auto auto auto",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
        // justifyContent: "space-between"
      }}
    >
      <label className="label-row">
        <input
          type="checkbox"
          defaultChecked={report.done}
          onChange={e => handleCheckBox(e)}
        />
      </label>
      <div>
        <Link
          style={{ marginLeft: "5px" }}
          href={`/users/${report.creatorId}`}
        >
          {report.creator?.username}
        </Link>

        <p className={report.creator?.isActive ? "admin-panel-status-active" : "admin-panel-status-suspended"}>
          {report.creator?.isActive ? "Active" : "On Suspension"}
        </p>
      </div>
      <p>{showDate(report.created_at)}</p>
      <div>
        <Link
          style={{ marginLeft: "5px" }}
          href={`/users/${report.targetUserId}`}
        >
          {report.targetUser?.username}
        </Link>

        <p className={report.targetUser?.isActive ? "admin-panel-status-active" : "admin-panel-status-suspended"}>
          {report.targetUser?.isActive ? "Active" : "On Suspension"}
        </p>
      </div>
      <p>{report.content}</p>
      {report.targetUser?.role !== Role.admin ? (
        <div /*style={{ display: "grid", justifyContent: "flex-start" }}*/>
          {report.targetUser?.isActive ? (
            <Dropdown
              // buttonAlign="right"
              zIndex={5}
              button={<button>Block user</button>}
            >
              {banOptions.map(option => (
                <button
                  key={option.id}
                  className="dropdown-item"
                  onClick={() => handleBanSubmit(option.banDuration)}
                >
                  {option.text}
                </button>
              ))}
            </Dropdown>
          ) : (
            <button onClick={handleUnBanSubmit}>Lift Ban</button>
          )}
          <button
            className="button-pink"
            onClick={handleDeleteReportSubmit}
          >
            Delete
          </button>
        </div>
      ) : (
        <div /*style={{ display: "grid", justifyContent: "flex-start" }}*/>
          <button
            // style={{ width: "125%" }}
            className="button-pink"
            onClick={handleDeleteReportSubmit}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
