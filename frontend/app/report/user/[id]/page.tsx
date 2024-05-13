import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/authOptions";
import ReportForm from "./form";

interface Params {
  id: string;
}

export default async function ReportPage({ params }: { params: Params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  } else {
    return (
      <ReportForm
        targetUserId={params.id}
        creator={session.user.id}
      />
    );
  }
}
