import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/authOptions";
import { getAllUsers } from "@/services/userService";
import { AdminPanelUsers } from "./adminPanelUsers";

export default async function AdminPanelUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/");
  } else {
    const users = await getAllUsers();
    return <AdminPanelUsers users={users} />;
  }
}
