import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/authOptions";
import ReportForm from "./form";
import { findUserById } from "@/services/userService";
import { getIsUserReported } from "@/services/reportService";

export default async function ReportPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const targetUserId = parseInt(params.id);

  const user = await findUserById(targetUserId);
  if (!user) {
    notFound();
  }
  const isReported = await getIsUserReported(user.id);
  if (!session || isReported || session.user.id === targetUserId) {
    redirect(`/users/${targetUserId}`);
  } else {
    return <ReportForm targetUser={user} />;
  }
}
