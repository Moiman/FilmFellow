import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Profile from "./form";
import { authOptions } from "@/authOptions";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  } else {
    return <Profile session={session}/>;
  }
}
