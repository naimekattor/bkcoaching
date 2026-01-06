import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import AppleProvider from "next-auth/providers/apple";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    backendAccessToken?: string;
    backendRefreshToken?: string;
    role?: string;
    provider?: string; 
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
    AppleProvider({
    clientId: process.env.APPLE_CLIENT_ID!, 
    clientSecret: process.env.APPLE_CLIENT_SECRET!,
    authorization: {
        params: {
          scope: "name email",
          response_mode: "form_post", 
        },
      },
  }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,

  callbacks: {
    async jwt({ token, account, profile,user  }) {
      if (account && (account.provider === "google" || account.provider === "apple")) {
        try {
          const cookieStore = await cookies();
          const role = cookieStore.get("signup_role")?.value || "influencer";
          const googleProfile = profile as any;
          token.provider = account.provider;

          // const payload = {
          //   first_name: googleProfile.given_name ?? googleProfile.name?.split(" ")[0] ?? "",
          //   last_name: googleProfile.family_name ?? googleProfile.name?.split(" ")[1] ?? "",
          //   email: googleProfile.email,
          //   signed_up_as: role,
          // };
          let payload: any = {
            email: user?.email || token.email,
            signed_up_as: role,
            provider: account.provider,
          };
          
          // Handle Google (has name in profile)
          if (account.provider === "google" && profile) {
            const googleProfile = profile as any;
            payload.first_name = googleProfile.given_name || googleProfile.name?.split(" ")[0] || "";
            payload.last_name = googleProfile.family_name || googleProfile.name?.split(" ")[1] || "";
          }
          // Handle Apple (name might be in user object)
          else if (account.provider === "apple") {
            // Apple only returns name on first login
            const nameParts = user?.name?.split(" ") || [];
            payload.first_name = nameParts[0] || "";
            payload.last_name = nameParts.slice(1).join(" ") || "";
            payload.apple_id = profile?.sub || token.sub; // Apple's user ID
          }

          console.log("🚀 Payload sending to Backend:", JSON.stringify(payload, null, 2));

          const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}user_service/social_signup_signin/`;

          const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error("❌ Backend Error Status:", response.status);
            console.error("❌ Backend Error Body:", JSON.stringify(data, null, 2));
            throw new Error(data.message || "Backend rejected social login");
          }

          console.log("✅ Backend Success:", data);

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
          throw error;
        }
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.backendAccessToken) {
        session.accessToken = token.backendAccessToken;
        if (session.user) {
          session.user.role = token.role;
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };