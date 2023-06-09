import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import * as jose from "jose";

export const serverAuthOptions: AuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.NEXT_EMAIL_SERVER_HOST,
        port: Number(process.env.NEXT_EMAIL_SERVER_PORT),
        auth: {
          user: process.env.NEXT_EMAIL_SERVER_USER,
          pass: process.env.NEXT_EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.NEXT_EMAIL_FROM,
    }),
  ],
  session: {
    strategy: "database",
  },
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.NEXT_PRIVATE_SERVICE_ROLE_KEY as string,
  }),
  callbacks: {
    async session({ session, user, token }) {
      const signingSecret = process.env.NEXT_SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          email: user.email || token.email,
          user_id: user.id,
          role: user.isAdmin ? "service_role" : "authenticated",
        };
        session.supabaseAccessToken = await new jose.SignJWT(payload)
          .setProtectedHeader({
            alg: "HS256",
          })
          .sign(new TextEncoder().encode(signingSecret));
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
};
