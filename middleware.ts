export { auth as middleware } from "@/auth"

// import { auth } from "@/auth"
// export default auth(({ auth, nextUrl: { pathname, origin } }) => {
//   // ここにも追加の認可ロジックを書ける
//   // undefined: スルー, Response: リダイレクト
//   console.log('middleware.ts:auth:', !!auth)
//   console.log('pathname:', pathname)
//   console.log('origin:', origin)
// })

export const config = {
  // ミドルウェア (認可ロジック) を適用するパスを設定する
  matcher: [
    "/dashboard",
    "/profile",
  ],
}
