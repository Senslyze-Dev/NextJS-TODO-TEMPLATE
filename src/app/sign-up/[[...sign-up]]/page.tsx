import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SignUp />
    </div>
  )
}
