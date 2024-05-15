import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Register from "./form";

export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  } else {
    return <Register />;
  }
}
