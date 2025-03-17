import { auth } from "@/auth"
import SignoutForm from "./components/SignoutForm"

export default async function Profile() {
  const session = await auth()
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">プロフィール</h1>
      <pre className="bg-white overflow-x-auto p-4">{JSON.stringify(session, null, 2)}</pre>
      <SignoutForm />
    </div>
  )
}
