import { Session } from "next-auth";

export type AccessStatus = "success" | "expired" | "no-access"

export const checkAccess = (session: Session, level: string): AccessStatus => {
  const sub = session.user.subscriptions.find(sub => sub.levelName === level)
  if (!sub) return "no-access"

  return (Date.now() < (+new Date(sub.endDate))) ? "success" : "expired"
}

export const getSubExpires = (session: Session, level: string): Date => {
  const sub = session.user.subscriptions.find(sub => sub.levelName === level)
  if (!sub) return new Date(Date.now() - 1000 * 5)

  return new Date(sub.endDate)
}

export function nullguard<V>(v: V, render: (v: NonNullable<V>) => React.ReactNode): React.ReactNode {
  if (!v) return null;
  if (Array.isArray(v) && !v.length) return null;
  return render(v);
}
