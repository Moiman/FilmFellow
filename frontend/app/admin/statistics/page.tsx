import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import { AdminPanelStatistics } from "@/components/admin/adminPanelStatistics";

export default async function AdminPanelStatisticsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  } else {
    return <AdminPanelStatistics />;
  }
}
