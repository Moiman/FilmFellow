import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/authOptions";
import ReportListForm from "./form";
import { getList } from "@/services/listService";

export default async function ReportListPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const list = await getList(params.id);

  if (!list) {
    notFound();
  }
  if (!session) {
    redirect("/");
  } else {
    return <ReportListForm list={list} />;
  }
}
