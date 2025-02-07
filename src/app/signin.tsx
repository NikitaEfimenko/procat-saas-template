import { signIn, signOut } from "@/app/auth"
 
export function SignIn() {
  return (
    <form
      className="z-50"
      action={async () => {
        "use server"
        await signIn("procat", { redirectTo: "/" })
      }}
    >
      <button className="py-2 px-4 border border-white" type="submit">Login with Procat</button>
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button className="py-2 px-4 border border-white" type="submit">logout</button>
    </form>
  )
}