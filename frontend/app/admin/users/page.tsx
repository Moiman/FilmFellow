import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { AdminPanelUsers } from "@/app/admin/users/adminPanelUsers";
import { getAllUsers } from "@/services/userService";

export default async function AdminPanelUsersPage() {
  const session = await getServerSession(authOptions);
  const users = await getAllUsers();
  if (!session || session.user.role !== "admin") {
    redirect("/");
  } else {
    return <AdminPanelUsers users={users} />;
  }
}
