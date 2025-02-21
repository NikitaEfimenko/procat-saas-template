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
  const [text, setText] = useState("")

  useEffect(() => {
    const trySignIn = async () => {
      const webapp = (window as any)?.Telegram?.WebApp
      console.log(webapp?.initData, "initData")
      setText(`${webapp?.initData, "initData"}`)
      try{
        if (webapp && webapp?.initData) {
          await signIn('procat', undefined, webapp.initData)
        }
      } finally {
        setLoading(false)
      }
    }
    console.log(status, "status")
    setText(`${status} initData`)
    if (!status || status === "unauthenticated" || status === "loading") {
      trySignIn()
    } else {
      setLoading(false)
    }
  }, [status])

  if (status === "authenticated") {
    return null;
  }

  return <>
  <p className="text-xl text-red-800">{text}</p>
  {loading ? <div className="bg-black w-full h-full z-50 absolute flex flex-col items-center justify-center">
    {loader}
  </div> : null}
  </>
}