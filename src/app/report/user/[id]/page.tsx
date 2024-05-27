import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/authOptions";
import ReportForm from "./form";
import { findUserById } from "@/services/userService";

export default async function ReportPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const targetUserId = parseInt(params.id);

  const user = await findUserById(targetUserId);
  if (!user) {
    notFound();
  }
  if (!session) {
    redirect("/");
  } else {
    return <ReportForm targetUser={user} />;
  }
}
