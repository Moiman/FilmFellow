import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/authOptions";
import ReportListForm from "./form";
import { getList } from "@/services/listService";
import { getIsListReported } from "@/services/reportService";

export default async function ReportListPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const list = await getList(params.id);

  if (!list) {
    notFound();
  }

  if (!session || (await getIsListReported(Number(list.id))) || list.userId === session.user.id) {
    redirect(`/lists/${list.id}`);
  } else {
    return <ReportListForm list={list} />;
  }
}
