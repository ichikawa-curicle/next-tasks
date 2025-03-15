import { auth } from "@/auth";

export default async function UserAvator() {
  const session = await auth()
  if (!session?.user) return null
  return (
    <img className="w-10 h-10 rounded-full" src={session.user.image!} alt={session.user.name!}></img>
  )
}
