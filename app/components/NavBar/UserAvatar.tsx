import { auth } from "@/auth";
import Link from "next/link";

export default async function UserAvator() {
  const session = await auth()

  const avator = session?.user?.image ? (
    <img className="w-10 h-10 rounded-full" src={session.user.image!} alt={session.user.name!}></img>
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
  )

  return (
    <Link href="/profile">
      {avator}
    </Link>
  )
}
