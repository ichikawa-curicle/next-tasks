"use server"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { prisma } from "@/app/lib/prisma"
import { signUpSchema } from "@/app/lib/zod"
import { getUserByEmail } from "@/app/lib/user"

export async function createUser(formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  
  // 単項目チェック
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.message,
    }
  }

  const { email, password } = validatedFields.data

  // 存在チェック
  const user = await getUserByEmail(email)
  if (user) {
    return {
      error: '既に登録されているユーザーです。'
    }
  }

  // ユーザー登録
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      }
    })
  } catch (error) {
    console.error(error)
    return {
      error: 'ユーザー登録に失敗しました'
    }
  }

  redirect('/signin')
}
