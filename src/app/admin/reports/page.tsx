import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { AdminPanelReports } from "./adminPanelReports";
import { getAllReports } from "@/services/reportService";

export default async function AdminPanelReportsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  } else {
    const reports = await getAllReports();
    return <AdminPanelReports reports={reports} />;
  }
}
