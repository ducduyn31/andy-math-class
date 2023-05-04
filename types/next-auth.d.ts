export * from "next-auth";

declare module "next-auth" {
  interface Session {
    supabaseAccessToken: string;
  }
  interface User {
    isAdmin: boolean | null;
    isEnabled: boolean | null;
    firstName: string | null;
    lastName: string | null;
  }
}
