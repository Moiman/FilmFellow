import { redirect } from "next/navigation";
import { getAllUsers } from "@/services/authService";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { AdminPanelUsers } from "@/components/admin/adminPanelUsers";

export default async function AdminPanelUsersPage() {
  const session = await getServerSession(authOptions);
  const users = await getAllUsers();
  if (!session || session.user.role !== "admin") {
    redirect("/");
  } else {
    return <AdminPanelUsers users={users} />;
  }
}
