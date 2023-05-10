import React, { createContext, useContext, useMemo } from "react";
import {
  createClient,
  SupabaseClient,
  SupabaseClientOptions,
} from "@supabase/supabase-js";
import { Maybe } from "@/models/types";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { Database } from "@/database";

const createUserClient = (args?: {
  session?: Maybe<Session>;
  options?: SupabaseClientOptions<"public">;
}): SupabaseClient<Database, "public"> => {
  const _options = args?.options ?? {};
  if (args?.session?.supabaseAccessToken) {
    _options.global = {
      ..._options.global,
      headers: {
        ..._options.global?.headers,
        authorization: `Bearer ${args.session.supabaseAccessToken}`,
      },
    };
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    _options
  );
};

const createSupabaseStorage = (args?: {
  session?: Maybe<Session>;
}): SupabaseClient<Database, "public">["storage"] => {
  const supabase = createUserClient({ session: args?.session });
  return supabase?.storage;
};

export type SupabaseContextType = {
  storage: SupabaseClient<Database, "public">["storage"];
};

const SupabaseContext = createContext<SupabaseContextType>({
  storage: createSupabaseStorage(),
});

export const SupabaseProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data: session } = useSession();
  const storage = useMemo(() => createSupabaseStorage({ session }), [session]);
  return (
    <SupabaseContext.Provider value={{ storage }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabaseContext = () => useContext(SupabaseContext);
export default SupabaseContext;
