import { signOut } from "@/auth"
import Button from "@/app/components/Button"

export default function SignoutForm() {
  async function action() {
    "use server"
    await signOut({ redirectTo: "/" })
  }

  return (
    <form action={action}>
      <Button type="submit">サインアウト</Button>
    </form>
  )
}
