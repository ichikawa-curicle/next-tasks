import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export default function Button({
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`
        px-4 py-2
        rounded-full
        bg-white hover:bg-gray-100
        border border-gray-300
      `}
    >
      {children}
    </button>
  )
}
