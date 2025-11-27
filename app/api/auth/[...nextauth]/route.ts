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
      if (account && profile && account.provider === "google") {
        const googleProfile = profile as typeof profile & {
          given_name?: string;
          family_name?: string;
        };
        token.googleUser = {
          email: googleProfile.email,
          first_name: googleProfile.given_name ?? "",
          last_name: googleProfile.family_name ?? "",
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
