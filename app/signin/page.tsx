import Button from "@/app/components/Button";
import SigninForm from "./components/SignInForm";
import { auth, providerMap, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignInPage(props: { searchParams: Promise<{ callbackUrl?: string }> }) {
  // セッションがある場合はダッシュボードにリダイレクト
  const session = await auth()
  if (session?.user) {
    redirect("/dashboard")
  }
  const searchParams = await props.searchParams
  const { callbackUrl = "/" } = searchParams

  // TODO パスワードを忘れた場合はどうする？

  return (
    <div className="flex justify-center py-12">
      <div className="p-10 rounded-lg space-y-8 bg-gray-300">
        <SigninForm callbackUrl={callbackUrl} />
        <div className="flex justify-center text-gray-500">
          または
        </div>
        {Object.values(providerMap).map((provider) => {
          return (
            <form
              action={async () => {
                "use server"
                await signIn(provider.id, {
                  redirectTo: callbackUrl,
                })
              }}
              className="flex justify-center"
              key={provider.id}
            >
              <Button type="submit">{provider.name} でサインイン</Button>
            </form>
          )
        })}
      </div>
    </div>
  )
}
