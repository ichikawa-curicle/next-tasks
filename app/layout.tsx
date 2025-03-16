import { Metadata } from 'next'
import './globals.css'
import NavBar from './components/NavBar/NavBar'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'Task List Application with Next.js',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-200">
        <NavBar />
        <main className="bg-red-200">
          {children}
        </main>
      </body>
    </html>
  )
}
