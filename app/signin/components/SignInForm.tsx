"use client"

import Button from "@/app/components/Button"
import { useState } from "react"
import { authenticate } from "../actions"
import ErrorMessage from "@/app/components/ErrorMessage"

export default function SigninForm({ callbackUrl }: { callbackUrl: string }) {
  const [error, setError] = useState("")

  return (
    <form
      action={async (formData) => {
        const { error } = await authenticate(formData, callbackUrl)
        if (error) {
          setError(error)
        }
      }}
      className="space-y-6"
    >
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
      <label className="block">
        <span className="block pb-2">Email</span>
        <input className="rounded-md p-2" type="email" name="email" placeholder="メールアドレス" required />
      </label>
      <label className="block">
        <span className="block pb-2">Password</span>
        <input className="rounded-md p-2" type="password" name="password" placeholder="パスワード" required />
      </label>
      <div className="flex justify-center">
        <Button type="submit">サインイン</Button>
      </div>
    </form>
  )
}
