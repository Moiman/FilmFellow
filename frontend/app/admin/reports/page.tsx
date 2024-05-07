import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { AdminPanelReports } from "./adminPanelReports";
import { getAllReports } from "@/services/reportService";

export default async function AdminPanelReportsPage() {
  const session = await getServerSession(authOptions);
  const reports = await getAllReports();
  if (!session || session.user.role !== "admin") {
    redirect("/");
  } else {
    return <AdminPanelReports reports={reports}/>;
  }
}
