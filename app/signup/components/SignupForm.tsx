"use client"

// import { signUp } from "@/app/signup/actions"
// import { useActionState } from "react"
import ErrorMessage from "@/app/components/ErrorMessage"
import Button from "@/app/components/Button"
import { createUser } from "../actions"
import { useState } from "react"
export default function SignUpForm() {
  // const [state, formAction] = useActionState(signUp, {})
  const [error, setError] = useState('')
  return (
    <form
      // action={formAction}
      action={async (formData) => {
        const { error } = await createUser(formData)
        if (error) {
          setError(error)
        }
      }}
      className="space-y-6"
    >
      {/* {
        state.message ? <ErrorMessage>{ state.message }</ErrorMessage> : null
      } */}
      {error && <ErrorMessage>{ error }</ErrorMessage>}
      <label className="block">
        <span className="block pb-2">Email</span>
        <input className="rounded-md p-2" type="email" name="email" placeholder="メールアドレス" required />
      </label>
      <label className="block">
        <span className="block pb-2">Password</span>
        <input className="rounded-md p-2" type="password" name="password" placeholder="パスワード" required />
      </label>
      <div className="flex justify-center">
        <Button type="submit">サインアップ</Button>
      </div>
    </form>
  )
}
