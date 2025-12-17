import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000, 
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Keep debug on for now

  callbacks: {
    async jwt({ token, account, profile }) {
      // Runs only on initial sign-in
      if (account && profile && account.provider === "google") {
        try {
          const cookieStore = await cookies();
          const role = cookieStore.get("signup_role")?.value || "influencer";
          const googleProfile = profile as any;

          // 1. Prepare Payload
          const payload = {
            first_name: googleProfile.given_name ?? googleProfile.name?.split(" ")[0] ?? "",
            last_name: googleProfile.family_name ?? googleProfile.name?.split(" ")[1] ?? "",
            email: googleProfile.email,
            signed_up_as: role,
          };

          console.log("🚀 Payload sending to Backend:", JSON.stringify(payload, null, 2));

          // 2. Use FETCH directly (Bypass apiClient to avoid token/header issues)
          // Ensure NEXT_PUBLIC_API_URL is defined in .env
          const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}user_service/social_signup_signin/`; 
          
          const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(payload),
          });

          // 3. Parse Response
          const data = await response.json();

          // 4. Detailed Error Logging
          if (!response.ok) {
            console.error("❌ Backend Error Status:", response.status);
            console.error("❌ Backend Error Body:", JSON.stringify(data, null, 2));
            throw new Error(data.message || "Backend rejected social login");
          }

          console.log("✅ Backend Success:", data);

          // 5. Save Tokens
          // Check exactly where your API puts the token (data.data.access_token vs data.access_token)
          const accessToken = data.data?.access_token || data.access_token;
          const refreshToken = data.data?.refresh_token || data.refresh_token;

          if (accessToken) {
            token.backendAccessToken = accessToken;
            token.backendRefreshToken = refreshToken;
            token.role = role;
          } else {
            throw new Error("No access token received from backend");
          }

        } catch (error) {
          console.error("🔥 Critical Error in JWT Callback:", error);
          throw error; // This redirects to the error page
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token.backendAccessToken) {
        session.accessToken = token.backendAccessToken as string;
        session.user = {
          ...session.user,
          role: token.role as string,
        };
      }
      return session;
    }
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };