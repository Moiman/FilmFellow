"use server";
import { authOptions } from "@/authOptions";
import { PrismaClient } from "@prisma/client";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

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

const markReportDone = async (reportId: number) => {
  const markedReport = await prisma.reports.update({
    where: { id: reportId },
    data: {
      done: true,
    },
  });

  return markedReport;
};

const deleteReportById = async (reportId: number) => {
  const deletedReport = await prisma.reports.delete({
    where: {
      id: reportId,
    },
  });

  return deletedReport;
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
          id: true
        },
      },
      targetUser: {
        select: {
          username: true,
          id:true
        }
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
