import { auth } from "@/auth"
import SignoutForm from "./components/SignoutForm"

export default async function Profile() {
  const session = await auth()
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <SignoutForm />
    </div>
  )
}
