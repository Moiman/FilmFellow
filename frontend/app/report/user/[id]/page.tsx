import { getServerSession } from "next-auth";
import ReportForm from "./form";
import { redirect } from "next/navigation";

interface Params {
  id: string;
}

export default async function ReportPage({ params }: { params: Params }) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  } else {
    return <ReportForm userId={params.id}/>;
  }
}
