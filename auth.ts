import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/app/lib/zod"
import { getUserByEmail } from "@/app/lib/user"
import bcrypt from "bcryptjs"
import { prisma } from "@/app/lib/prisma"

const providers = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      // 入力チェック
      const validatedFields = signInSchema.safeParse(credentials)
      if (!validatedFields.success) return null

      const { email, password } = validatedFields.data
      
      // ユーザー存在チェック
      const user = await getUserByEmail(email)
      if (!user || !user.password) return null

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
  providers: providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && user.email && profile?.id) {
        try {
          // 既存のユーザーを検索
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          })

          if (existingUser) {
            // 既存ユーザーの場合、GitHub情報を更新
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                githubId: String(profile.id),
                name: user.name ?? existingUser.name,
                image: user.image ?? existingUser.image,
              },
            })
          } else {
            // 新規ユーザーの場合、新しくレコードを作成
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name ?? null,
                image: user.image ?? null,
                githubId: String(profile.id),
              },
            })
          }
        } catch (error) {
          console.error("GitHub認証時のDB処理でエラーが発生しました:", error)
          return false
        }
      }
      return true
    },
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
