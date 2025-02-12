
import { auth } from "@/app/auth"
import { ReactNode } from "react"
import { checkAccess, nullguard } from "../helpers"
import { instance } from "../api"
import { getToken } from "next-auth/jwt"

export type TGuardProps = {
  level: string,
  children?: ReactNode,
  expiredFallback: ReactNode,
  noAccessFallback: ReactNode
}
export const Guard = async ({ level, children, expiredFallback, noAccessFallback }: TGuardProps) => {
  const session = await auth()
  if (!session?.user) return null

  return nullguard(checkAccess(session, level), (status) => {
    switch (status) {
      case "expired":
        return expiredFallback
      case "no-access":
        return noAccessFallback
      case "success":
        return children
    }
  })
}

export const SubscriptionsLevelList = async () => {
  const session = await auth()
  if (!session?.user) {
    return null
  }
  instance.injectToken(session.token)
  const levelsList: Array<any> = await instance.fetchSubscriptionsLevels()
  return <div className="flex items-center gap-3">
    {levelsList.map(el => <div className="p-4 border rounded-lg">{JSON.stringify(el)}</div>)}
  </div>
}


