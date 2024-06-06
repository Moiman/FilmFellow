"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { Role } from "@prisma/client";
import prisma from "@/db";
import { reportValidationSchema } from "@/schemas/reportSchema";
import { validateFormData } from "@/utils/validateFormData";

const createReport = async (
  targetUserId: number | null,
  content: string,
  reviewId: number | null,
  importedReviewId: string | null,
  listId?: number | null,
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  validateFormData(reportValidationSchema, { report: content });

  const newReport = await prisma.reports.create({
    data: {
      creatorId: Number(session.user.id),
      targetUserId,
      content,
      reviewId,
      importedReviewId,
      listId,
    },
  });

  return newReport;
};

const markReportDone = async (reportId: number, done: boolean) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.admin) {
    throw new Error("Unauthorized");
  }

  const markedReport = await prisma.reports.update({
    where: { id: reportId },
    data: {
      done: done,
    },
  });

  return markedReport;
};

const deleteReportById = async (reportId: number) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.admin) {
    throw new Error("Unauthorized");
  }

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
    throw new Error("Unauthorized");
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
          content: true,
          movie: true,
        },
      },
      importedReview: {
        select: {
          id: true,
          content: true,
          movie: true,
        },
      },
      list: {
        select: {
          id: true,
          userId: true,
          name: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
  });

  return reports;
};

const getIsUserReported = async (targetUserId: number) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const reported = !!(await prisma.reports.findFirst({
    where: {
      creatorId: Number(session.user.id),
      targetUserId: targetUserId,
    },
  }));

  return reported;
};

const getIsListReported = async (listId: number) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const reported = !!(await prisma.reports.findFirst({
    where: {
      creatorId: Number(session.user.id),
      listId: listId,
    },
  }));

  return reported;
};

export { createReport, markReportDone, deleteReportById, getAllReports, getIsUserReported, getIsListReported };
