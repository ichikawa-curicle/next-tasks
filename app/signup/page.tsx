import SignUpForm from "./components/SignupForm";

export default function SignUpPage() {
  return (
    <div className="flex justify-center py-12">
      <div className="p-10 rounded-lg space-y-8 bg-gray-300">
        <SignUpForm />
      </div>
    </div>
  )
}
