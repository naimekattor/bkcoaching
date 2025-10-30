import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

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
      // When Google login completes
      if (account && profile) {
        try {
          const payload = {
            first_name: profile.given_name || "",
            last_name: profile.family_name || "",
            email: profile.email,
            password: "google_auth",
            signup_method: "google",
            signed_up_as: "brand", // or read from query param if needed
          };

          // ✅ Try to sign up
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}user_service/signup/`,
            payload
          );

          // Store tokens from backend
          token.accessToken = res.data?.data?.access_token;
          token.refreshToken = res.data?.data?.refresh_token;
          token.user = res.data?.data?.user;
        } catch (err: any) {
          // 🔁 If already signed up, then login instead
          if (err.response?.status === 400) {
            try {
              const loginRes = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}user_service/login/`,
                {
                  email: profile.email,
                  password: "google_auth",
                  login_method: "google",
                }
              );
              token.accessToken = loginRes.data?.data?.access_token;
              token.refreshToken = loginRes.data?.data?.refresh_token;
              token.user = loginRes.data?.data?.user;
            } catch (loginErr) {
              console.error("Google login failed:", loginErr);
            }
          } else {
            console.error("OAuth signup error:", err);
          }
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
