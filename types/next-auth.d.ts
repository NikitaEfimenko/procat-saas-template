import NextAuth, { DefaultSession } from 'next-auth';

type TSubscription = {
  isActive: boolean
  levelName: string
  price: number
  durationMinutes: number
  startDate: string
  endDate: string
}

interface TUser extends DefaultSession['user'] {
  username: string;
  image: string;
  subscriptions: TSubscription[],
  id: string;
}

declare module 'next-auth' {
    interface Session {
      user: TUser,
    }
}
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    profile: TUser,
  }
}