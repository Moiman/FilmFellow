"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { Role } from "@prisma/client";
import prisma from "@/db";

const createReport = async (
  creatorId: number,
  targetUserId: number,
  content: string,
  reviewId: number | null,
  importedReviewId: string | null,
) => {
  const newReport = await prisma.reports.create({
    data: {
      creatorId,
      targetUserId,
      content,
      reviewId,
      importedReviewId,
    },
  });

  return newReport;
};

const markReportDone = async (reportId: number, done: boolean) => {
  try {
    const markedReport = await prisma.reports.update({
      where: { id: reportId },
      data: {
        done: done,
      },
    });

    return markedReport;
  } catch (error) {
    return { error: "Internal server error" };
  }
};

const deleteReportById = async (reportId: number) => {
  try {
    const deletedReport = await prisma.reports.delete({
      where: {
        id: reportId,
      },
    });

    return deletedReport;
  } catch (error) {
    return { error: "Internal server error" };
  }
};

const getAllReports = async () => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.admin) {
    return [];
  }
  const reports = await prisma.reports.findMany({
    include: {
      creator: {
        select: {
          username: true,
          id: true,
          isActive: true,
          role: true,
          banDuration: true,
        },
      },
      targetUser: {
        select: {
          username: true,
          id: true,
          isActive: true,
          role: true,
          banDuration: true,
        },
      },
      review: {
        select: {
          id: true,
        },
      },
      importedReview: {
        select: {
          id: true,
        },
      },
    },
  });

  return reports;
};

export { createReport, markReportDone, deleteReportById, getAllReports };
