import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { Tool, Trash2 } from "react-feather";

import { Role } from "@prisma/client";
import { Dropdown } from "@/components/dropdown";
import { deleteReportById, type getAllReports, markReportDone } from "@/services/reportService";
import Modal from "@/components/modal";
import { deleteReviewById } from "@/services/reviewService";
import { changeUserStatusById } from "@/services/userService";
import { deleteListByAdmin } from "@/services/listService";

interface Props {
  report: Reports[0];
  setAllReports: React.Dispatch<React.SetStateAction<Reports>>;
}

const banOptions = [
  { id: 0, banDuration: 86400, text: "1 Day" },
  { id: 1, banDuration: 604800, text: "7 Days" },
  { id: 2, banDuration: 2592000, text: "30 Days" },
  { id: 3, banDuration: null, text: "Forever" },
];
type Reports = Awaited<ReturnType<typeof getAllReports>>;

export const ReportComponent = ({ report, setAllReports }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");

  const handleBanSubmit = async (banDuration: number | null) => {
    try {
      if (!report.targetUserId) {
        setError("Missing target user");
        return;
      }

      const bannedUser = await changeUserStatusById(report.targetUserId, false, banDuration);

      setAllReports(reports =>
        reports.map(report => {
          return {
            ...report,
            targetUser:
              report.targetUser && report.targetUserId === bannedUser.id
                ? {
                    ...report.targetUser,
                    isActive: bannedUser.isActive,
                    banDuration: bannedUser.banDuration,
                  }
                : report.targetUser,
            creator:
              report.creator && report.creatorId === bannedUser.id
                ? {
                    ...report.creator,
                    isActive: bannedUser.isActive,
                    banDuration: bannedUser.banDuration,
                  }
                : report.creator,
          };
        }),
      );

      setError("");

      toast(
        <p>
          {report.targetUser?.username} was blocked
          {bannedUser.banDuration ? " until " + bannedUser.banDuration.toDateString() : " forever"}
        </p>,
        {
          icon: <Tool />,
          className: "cyan-toast",
        },
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Internal server error");
      }
    }
  };

  const handleUnBanSubmit = async () => {
    try {
      if (!report.targetUserId) {
        setError("Missing target user");
        return;
      }

      const unbannedUser = await changeUserStatusById(report.targetUserId, true, null);

      setAllReports(reports =>
        reports.map(report => {
          return {
            ...report,
            targetUser:
              report.targetUser && report.targetUserId === unbannedUser.id
                ? {
                    ...report.targetUser,
                    isActive: unbannedUser.isActive,
                  }
                : report.targetUser,
            creator:
              report.creator && report.creatorId === unbannedUser.id
                ? {
                    ...report.creator,
                    isActive: unbannedUser.isActive,
                  }
                : report.creator,
          };
        }),
      );
      setError("");

      toast(<p>{unbannedUser.username} was unblocked</p>, {
        icon: <Tool />,
        className: "yellow-toast",
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Internal server error");
      }
    }
  };

  const handleCheckBox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await markReportDone(report.id, e.target.checked);
      setError("");
    } catch (error) {
      setError("Internal server error");
    }
  };

  const showDate = (date: Date) => {
    const dateFormatted = date.toISOString().slice(0, 10).split("-").reverse().join(".");
    return dateFormatted;
  };

  const handleDeleteReportSubmit = async () => {
    try {
      const response = await deleteReportById(report.id);
      setAllReports(reports => reports.filter(report => report.id !== response.id));
      setError("");

      toast(<p>Report was deleted</p>, {
        icon: <Trash2 />,
        className: "yellow-toast",
      });
    } catch (error) {
      setError("Internal server error");
    }
  };

  const handleDeleteListSubmit = async () => {
    try {
      if (report.listId) {
        const response = await deleteListByAdmin(report.listId);
        setAllReports(reports => reports.filter(report => report.listId !== response.id));
        setError("");

        toast(<p>List was deleted</p>, {
          icon: <Trash2 />,
          className: "yellow-toast",
        });
      }
    } catch (error) {
      setError("Internal server error");
    }
  };

  const handleDeleteReview = async () => {
    try {
      if (report.reviewId) {
        const response = await deleteReviewById(report.reviewId);
        setAllReports(reports => reports.filter(report => report.reviewId !== response.id));
        toast(<p>Review was deleted</p>, {
          icon: <Trash2 />,
          className: "yellow-toast",
        });
      } else {
        const response = await deleteReviewById(String(report.importedReviewId));
        setAllReports(reports => reports.filter(report => report.importedReviewId !== response.id));
        toast(<p>Review was deleted</p>, {
          icon: <Trash2 />,
          className: "yellow-toast",
        });
      }
    } catch (error) {
      setModalError("Internal server error");
    }
  };

  const closeReviewDeleteModal = () => {
    setOpenModal(false);
    setModalError("");
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

        <Link
          className={report.creator?.isActive ? "admin-panel-status-active" : "admin-panel-status-suspended"}
          href={`/users/${report.creatorId}`}
          title={
            report.creator?.isActive
              ? "Active"
              : "On suspension " +
                (report.creator?.banDuration ? "until " + report.creator.banDuration.toDateString() : "forever")
          }
        >
          {report.creator?.username}
        </Link>
      </div>
      <div>
        <label className="admin-panel-report-label">Date</label>
        <p>{showDate(report.created_at)}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "auto" }}>
        <label className="admin-panel-report-label">Target</label>
        {report.targetUserId !== null && (
          <Link
            className={report.targetUser?.isActive ? "admin-panel-status-active" : "admin-panel-status-suspended"}
            href={`/users/${report.targetUserId}`}
            title={
              report.targetUser?.isActive
                ? "Active"
                : "On suspension " +
                  (report.targetUser?.banDuration ? "until " + report.targetUser.banDuration.toDateString() : "forever")
            }
          >
            {report.targetUser?.username}
          </Link>
        )}
        {(report.importedReviewId || report.reviewId) && (
          <>
            {report.review ? (
              <Link href={`/movies/${report.review.movie.id}`}>{report.review.movie.title}</Link>
            ) : (
              <Link href={`/movies/${report.importedReview?.movie.id}`}>{report.importedReview?.movie.title}</Link>
            )}

            <p
              className="admin-panel-review-paragraph"
              onClick={() => setOpenModal(true)}
            >
              Show reported review
            </p>
            <Modal
              isOpen={openModal}
              closeModal={closeReviewDeleteModal}
              content={
                <div className="review-grid-modal-item">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h3 className="h4">Are you sure you want to delete this review?</h3>
                  </div>
                  <div>
                    {report.importedReview ? (
                      <p className="review-grid-content description">{report.importedReview.content}</p>
                    ) : (
                      <p className="review-grid-content description">{report.review?.content}</p>
                    )}
                  </div>
                  {modalError && (
                    <p
                      className="error-text"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {modalError}
                    </p>
                  )}
                  <div className="modal-buttons">
                    <button onClick={closeReviewDeleteModal}>Cancel</button>
                    <button
                      className="button-pink"
                      onClick={handleDeleteReview}
                    >
                      Delete Review
                    </button>
                  </div>
                </div>
              }
            />
          </>
        )}
        {report.listId && <Link href={`/lists/${report.listId}`}>{report.list?.name}</Link>}
      </div>

      <div className="admin-panel-report-content report-description">
        <label className="admin-panel-report-label">Description</label>
        <p className="description">{report.content}</p>
      </div>

      {report.targetUser?.role !== Role.admin ? (
        <div>
          <label className="admin-panel-report-label">Actions</label>
          <div className="report-buttons">
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
              report.targetUser !== null && <button onClick={handleUnBanSubmit}>Lift Ban</button>
            )}
            <button
              className="button-pink"
              onClick={handleDeleteReportSubmit}
            >
              Delete Report
            </button>
            {report.listId && (
              <button
                className="button-pink"
                onClick={handleDeleteListSubmit}
              >
                Delete List
              </button>
            )}
            {error && (
              <div>
                <p className="error-text">{error}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <label className="admin-panel-report-label">Actions</label>
          <button
            className="button-pink"
            onClick={handleDeleteReportSubmit}
          >
            Delete Report
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
