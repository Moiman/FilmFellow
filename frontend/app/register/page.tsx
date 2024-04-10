import { redirect } from "next/navigation";
import Register from "./form";
import { getServerSession } from "next-auth";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <Register />;
}
