import {
  createClient,
  SupabaseClient,
  SupabaseClientOptions,
} from "@supabase/supabase-js";
import { Database } from "@/database";

export const createServerAuthClient = (args?: {
  options?: SupabaseClientOptions<"next_auth">;
}): SupabaseClient<Database, "next_auth"> | null => {
  if (typeof window !== "undefined") return null;

  const _options: SupabaseClientOptions<"next_auth"> = {
    ...args?.options,
    db: { schema: "next_auth" },
  };
  return createClient<Database, "next_auth">(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PRIVATE_SERVICE_ROLE_KEY as string,
    _options
  );
};
