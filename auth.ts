import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "@/globals/db"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/app/lib/zod"
import { getUserByEmail } from "@/app/lib/user"
import bcrypt from "bcryptjs"

const providers = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      // ここに認証ロジックを書く (認証失敗時は null を返す？)

      // 入力チェック
      const validatedFields = signInSchema.safeParse(credentials)
      if (!validatedFields.success) return null

      const { email, password } = validatedFields.data
      
      // ユーザー存在チェック
      const user = await getUserByEmail(email)
      if (!user) return null

      // パスワード一致チェック
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        console.log('auth.ts:authorize:パスワードが一致しません')
        return null
      }

      return user
    },
  }),
  GitHub,
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider({})
      return { id: providerData.id, name: providerData.name, type: providerData.type }
    }
    return provider
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: providers,
  callbacks: {
    async authorized({ auth, request: { nextUrl: { pathname, origin } } }) {
      // ここに認可ロジックを書く
      // false: サインインページにリダイレクト, true: スルー, Response: リダイレクト
      console.log('auth:', !!auth)
      console.log('pathname:', pathname)
      console.log('origin:', origin)

      return !!auth
    },
  },
  pages: {
    signIn: "/signin",  // カスタムサインインページ (設定しなければ付属のページが開く)
  },
  session: {
    strategy: "jwt"
  },
  // debug: true,
})
