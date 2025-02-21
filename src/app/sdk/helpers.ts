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

export const getInitDataFromUrl = (): string | null => {
  if (typeof window !== "undefined") {
    let initData = (window as any)?.Telegram?.WebApp?.initData;

    if (!initData) {
      const params = new URLSearchParams(window.location.search);
      initData = params.get('initData');
      
      if (initData) {
        initData = decodeURIComponent(initData);
      }
    }

    return initData;
  }
  
  // Возвращаем null, если код выполняется на сервере
  return null;
};

export const extendWithInitData = (url: string): string => {
  if (typeof window !== "undefined") {
    const webapp = (window as any)?.Telegram?.WebApp;
    let initData = webapp?.initData;

    if (initData) {
      const encodedInitData = encodeURIComponent(initData);
      const urlObj = new URL(url);
      urlObj.searchParams.set('initData', encodedInitData);
      return urlObj.toString();
    }
  }

  // Возвращаем оригинальный URL, если код выполняется на сервере или нет initData
  return url;
};

