import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.googleUser = {
          email: profile.email,
          first_name: profile.given_name,
          last_name: profile.family_name,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.googleUser = token.googleUser;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
