import { auth } from "@/auth";
import Link from "next/link";
import SignoutForm from "../../profile/components/SignoutForm";
import UserAvator from "./UserAvatar";
import Button from "@/app/components/Button";

export default async function NavBar() {
  const session = await auth()
  return (
    <nav className="
      flex justify-between items-center
      py-4 px-6
      border-b
      bg-blue-200
    ">
      <h1><Link href="/" className="text-4xl font-semibold bg-green-200">Tasks</Link></h1>
      <div className="flex space-x-3 bg-green-200">
        {
          session?.user ? (
            <>
              <UserAvator />
            </>
          ) : (
            <>
              <Button><Link href="/signin">サインイン</Link></Button>
              <Button><Link href="/signup">サインアップ</Link></Button>
            </>
          )
        }
      </div>
    </nav>
  )
}