"use server";

import * as yup from "yup";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { Role } from "@prisma/client";
import prisma from "@/db";
import { validationSchema } from "@/schemas/reportSchema";

const createReport = async (
  targetUserId: number | null,
  content: string,
  reviewId: number | null,
  importedReviewId: string | null,
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw "Invalid session";
  }

  try {
    await validationSchema.validate({ report: content });
  } catch (validationError) {
    if (validationError instanceof yup.ValidationError) {
      throw new Error(validationError.message);
    }
    throw new Error("An unexpected error occurred");
  }

  const newReport = await prisma.reports.create({
    data: {
      creatorId: Number(session.user.id),
      targetUserId,
      content,
      reviewId,
      importedReviewId,
    },
  });

  return newReport;
};

const markReportDone = async (reportId: number, done: boolean) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.admin) {
    throw "Invalid session";
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
    throw "Invalid session";
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
    },
    orderBy: { created_at: "desc" },
  });

  return reports;
};

export { createReport, markReportDone, deleteReportById, getAllReports };
