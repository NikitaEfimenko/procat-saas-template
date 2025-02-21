'use client'
import { signIn, useSession } from "next-auth/react"
import { ReactNode, useEffect, useState } from "react"

type AuthAuthProps = {
  loader?: ReactNode
}

export const AutoAuth = ({
  loader = <p>loading...</p>
}: AuthAuthProps) => {
  const [loading, setLoading] = useState(true)
  const { status } = useSession();
  console.log(status, "is status")
  useEffect(() => {
    const trySignIn = async () => {
      const webapp = (window as any)?.Telegram?.WebApp
      console.log(webapp?.initData, "init_data", status)
      if (webapp && webapp?.initData && status === "unauthenticated") {
        await signIn('procat', undefined, webapp.initData)
      }
      setLoading(false)
    }
    trySignIn()
  }, [status])

  if (status === "authenticated") {
    return null;
  }

  return loading ? <div className="bg-black w-full h-full z-50 absolute flex flex-col items-center justify-center">
    {loader}
  </div> : null
}