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
  const isReported = await getIsListReported(Number(list.id));
  if (!session || isReported || list.userId === Number(session.user.id)) {
    redirect(`/lists/${list.id}`);
  } else {
    return <ReportListForm list={list} />;
  }
}
