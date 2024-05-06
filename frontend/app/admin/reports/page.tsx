import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { AdminPanelReports } from "./adminPanelReports";

export default async function AdminPanelReportsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  } else {
    return <AdminPanelReports />;
  }
}
