import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Top() {
  // セッションがある場合はダッシュボードにリダイレクト
  const session = await auth()
  if (session?.user) {
    redirect("/dashboard")
  }
  return (
    <div className="text-center py-12 bg-red-200">
      <h1 className="text-9xl">Tasks</h1>
      <p>チームのタスクを一元管理。</p>
    </div>
  )
}
