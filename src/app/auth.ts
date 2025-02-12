import NextAuth from "next-auth";
import { Procat } from "@/app/sdk/procat-auth-provider";
import { instance } from "@/app//sdk/api";


export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  useSecureCookies: false,
  providers: [
    Procat({
      clientId: process.env.PROCAT_CLIENT_ID!,
      clientSecret: process.env.PROCAT_CLIENT_SECRET!,
      host: process.env.PROCAT_ID_HOST!
    }),
  ],
  debug: true,
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async jwt({ token, user, profile, account }) {
      console.log(token, account)
      const now = Math.floor(Date.now() / 1000);
      if (profile) {
        token.user = profile
      }
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      if (token.expiresAt && now < (token.expiresAt as number)) {
        return token;
      }
      instance.injectToken(token)
      return await instance.switchToken()
    },

    async session({ session, token, user }) {
      if (token) {
        instance.injectToken(token)
        let userProfile = {}
        try {
          userProfile = await instance.fetchProfile()
        }
        catch {
          userProfile = {}
        }
        console.log(userProfile, "is new profile")
        // @ts-ignore
        session.user = { token, ...token.user, ...(userProfile ?? {}), ...session.user, accessToken: token.accessToken, userId: session.userId }
      }
      return session
    }
  }
})
