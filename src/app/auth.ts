import NextAuth from "next-auth";
import { Procat } from "@/app/sdk/procat-auth-provider";

 
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
      if (profile) {
        token.user = profile
      }
      if (account) {
        console.log(account)
        token.accessToken = account.access_token;
      }
      console.log(profile, "in jwt")
      return token
    },
    
    async session({ session, token, user }) {
      if (token) {
        console.log(token, "is_token_session")
        console.log(user, "is user in session")
        let userProfile = {}
        try {
          userProfile = await fetch(`${process.env.PROCAT_ID_HOST}/users/userinfo`, {
            headers: { Authorization: `Bearer ${token.accessToken}` }
          }).then(res => res.json());
        }
        catch {
          userProfile = {}
        }
        console.log(userProfile, "is new profile")
        // @ts-ignore
        session.user = {...token.user, ...(userProfile ?? {}), ...session.user, accessToken: token.accessToken, userId: session.userId }
      }
      return session
    }
  }
})
