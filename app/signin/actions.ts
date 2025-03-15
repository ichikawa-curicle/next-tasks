"use server"

import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export async function authenticate(formData: FormData, callbackUrl: string): Promise<{ error?: string }> {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    })
  } catch (error) {
    console.log(error)
    return { error: "ログインに失敗しました" }
  }
  redirect(callbackUrl)
}
