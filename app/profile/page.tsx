import { auth } from "@/auth"
import SignoutForm from "./components/SignoutForm"

export default async function Profile() {
  const session = await auth()
  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-10">
      <pre className="bg-white p-4">{JSON.stringify(session, null, 2)}</pre>
      <SignoutForm />
    </div>
  )
}
