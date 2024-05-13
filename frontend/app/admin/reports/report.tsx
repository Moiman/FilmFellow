import { Dropdown } from "@/components/dropdown";
import { deleteReportById, markReportDone } from "@/services/reportService";
import { Role } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

interface User {
  username: string;
  isActive: boolean;
  role: string;
  banDuration: Date | null;
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
            return {
              ...report,
              targetUser: {
                ...report.targetUser,
                isActive: data.isActive,
                banDuration: new Date(data.banDuration),
              },
            };
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
    const response = await markReportDone(report.id, e.target.checked);
    if ("error" in response) {
      setError(response.error);
      return;
    }
    setError("");
  };
  const showDate = (date: Date) => {
    const dateFormatted = date.toISOString().slice(0, 10).split("-").reverse().join(".");
    return dateFormatted;
  };
  const handleDeleteReportSubmit = async () => {
    const response = await deleteReportById(report.id);
    if ("error" in response) {
      setError(response.error);
      return;
    }
    setError("");
    setAllReports(reports => reports.filter(report => report.id !== response.id));
  };
  return (
    <div className="admin-panel-reports-grid">
      <div>
        <label className="admin-panel-report-label">Done</label>
        <input
          type="checkbox"
          id="checkbox"
          defaultChecked={report.done}
          onChange={e => handleCheckBox(e)}
        />
      </div>
      <div>
        <label className="admin-panel-report-label">Reporter</label>
        <Link href={`/users/${report.creatorId}`}>{report.creator?.username}</Link>

        <p className={report.creator?.isActive ? "admin-panel-status-active" : "admin-panel-status-suspended"}>
          {report.creator?.isActive
            ? "Active"
            : "On suspension " +
              (report.creator?.banDuration ? "until " + report.creator.banDuration.toDateString() : "forever")}
        </p>
      </div>
      <div>
        <label className="admin-panel-report-label">Date</label>
        <p>{showDate(report.created_at)}</p>
      </div>
      <div>
        <label className="admin-panel-report-label">Target</label>
        <Link href={`/users/${report.targetUserId}`}>{report.targetUser?.username}</Link>

        <p className={report.targetUser?.isActive ? "admin-panel-status-active" : "admin-panel-status-suspended"}>
          {report.targetUser?.isActive
            ? "Active"
            : "On suspension " +
              (report.targetUser?.banDuration ? "until " + report.targetUser.banDuration.toDateString() : "forever")}
        </p>
      </div>
      <div className="admin-panel-report-content description">
        <label className="admin-panel-report-label">Description</label>
        <p>{report.content}</p>
      </div>

      {report.targetUser?.role !== Role.admin ? (
        <div>
          <label className="admin-panel-report-label">Actions</label>
          {report.targetUser?.isActive ? (
            <Dropdown
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
          {error && (
            <div>
              <p className="error-text">{error}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <label className="admin-panel-report-label">Actions</label>
          <button
            className="button-pink"
            onClick={handleDeleteReportSubmit}
          >
            Delete
          </button>
          {error && (
            <div>
              <p className="error-text">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
