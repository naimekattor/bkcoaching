import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}user_service/login/`;
          const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok || data.status !== "success") {
            throw new Error(data.message || "Invalid credentials");
          }

          const userData = data.data;
          // Returning the user object with tokens
          return {
            id: userData.user?.id || userData.id || "",
            email: credentials.email,
            name: `${userData.user?.first_name || ""} ${userData.user?.last_name || ""}`.trim(),
            accessToken: userData.access_token,
            refreshToken: userData.refresh_token,
            role: userData.user?.signed_up_as || "influencer", // Assuming a default
          };
        } catch (error: any) {
          console.error("❌ Credentials Login Error:", error.message);
          throw new Error(error.message || "Failed to log in");
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },

  callbacks: {
    // async jwt({ token, account, profile,user  }) {
    //   if (account && (account.provider === "google" || account.provider === "apple")) {
    //     try {
    //       const cookieStore = await cookies();
    //       const role = cookieStore.get("signup_role")?.value || "influencer";
    //       const googleProfile = profile as any;
    //       token.provider = account.provider;

    //       // const payload = {
    //       //   first_name: googleProfile.given_name ?? googleProfile.name?.split(" ")[0] ?? "",
    //       //   last_name: googleProfile.family_name ?? googleProfile.name?.split(" ")[1] ?? "",
    //       //   email: googleProfile.email,
    //       //   signed_up_as: role,
    //       // };
    //       let payload: any = {
    //         email: user?.email || token.email,
    //         signed_up_as: role,
    //         provider: account.provider,
    //       };

    //       // Handle Google (has name in profile)
    //       if (account.provider === "google" && profile) {
    //         const googleProfile = profile as any;
    //         payload.first_name = googleProfile.given_name || googleProfile.name?.split(" ")[0] || "";
    //         payload.last_name = googleProfile.family_name || googleProfile.name?.split(" ")[1] || "";
    //       }
    //       // Handle Apple (name might be in user object)
    //       else if (account.provider === "apple") {
    //         // Apple only returns name on first login
    //         const nameParts = user?.name?.split(" ") || [];
    //         payload.first_name = nameParts[0] || "";
    //         payload.last_name = nameParts.slice(1).join(" ") || "";
    //         payload.apple_id = profile?.sub || token.sub; // Apple's user ID
    //       }

    //       console.log("🚀 Payload sending to Backend:", JSON.stringify(payload, null, 2));

    //       const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}user_service/social_signup_signin/`;

    //       const response = await fetch(backendUrl, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Accept": "application/json",
    //         },
    //         body: JSON.stringify(payload),
    //       });

    //       const data = await response.json();

    //       if (!response.ok) {
    //         console.error("❌ Backend Error Status:", response.status);
    //         console.error("❌ Backend Error Body:", JSON.stringify(data, null, 2));
    //         throw new Error(data.message || "Backend rejected social login");
    //       }

    //       console.log("✅ Backend Success:", data);

    //       const accessToken = data.data?.access_token || data.access_token;
    //       const refreshToken = data.data?.refresh_token || data.refresh_token;

    //       if (accessToken) {
    //         token.backendAccessToken = accessToken;
    //         token.backendRefreshToken = refreshToken;
    //         token.role = role;
    //       } else {
    //         throw new Error("No access token received from backend");
    //       }
    //     } catch (error) {
    //       console.error("🔥 Critical Error in JWT Callback:", error);
    //       throw error;
    //     }
    //   }

    //   return token;
    // },
    async jwt({ token, account, profile, user }) {
      // SOCIAL PROVIDERS (Google, Apple)
      if (account && (account.provider === "google" || account.provider === "apple")) {
        try {
          const cookieStore = await cookies();
          const role = cookieStore.get("signup_role")?.value || "influencer";
          token.provider = account.provider;

          const email = user?.email || token.email;
          if (!email) {
            console.error("❌ Social login failed: email missing");
            return token;
          }

          let payload: any = {
            email,
            signed_up_as: role,
            provider: account.provider,
          };

          if (account.provider === "google" && profile) {
            const googleProfile = profile as any;
            payload.first_name = googleProfile.given_name || googleProfile.name?.split(" ")[0] || "";
            payload.last_name = googleProfile.family_name || googleProfile.name?.split(" ")[1] || "";
          }

          if (account.provider === "apple") {
            payload.apple_id = profile?.sub || token.sub;
            if (user?.name) {
              const parts = user.name.split(" ");
              payload.first_name = parts[0] || "";
              payload.last_name = parts.slice(1).join(" ");
            } else {
              payload.first_name = "Name";
              payload.last_name = "";
            }
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
      // CREDENTIALS PROVIDER
      else if (user && (user as any).accessToken) {
        token.backendAccessToken = (user as any).accessToken;
        token.backendRefreshToken = (user as any).refreshToken;
        token.role = (user as any).role;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token.backendAccessToken) {
        session.accessToken = token.backendAccessToken;
        session.refreshToken = token.backendRefreshToken; // Add refresh token to session
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