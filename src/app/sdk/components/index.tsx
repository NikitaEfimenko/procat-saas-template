
import { auth } from "@/app/auth"
import React, { ReactNode } from "react"
import { checkAccess, nullguard } from "../helpers"

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


