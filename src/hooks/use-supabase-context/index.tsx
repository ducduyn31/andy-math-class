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

export const createClientWithSession = (args?: {
  session?: Maybe<Session>;
  options?: SupabaseClientOptions<keyof Database>;
}) => {
  if (!args?.session?.supabaseAccessToken) {
    return createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      args?.options
    );
  }
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      ...args?.options,
      global: {
        headers: {
          Authorization: `Bearer ${args.session.supabaseAccessToken}`,
        },
      },
    }
  );
};

export type SupabaseContextType = {
  client: SupabaseClient<Database>;
  authClient: SupabaseClient<Database>;
};

const SupabaseContext = createContext<SupabaseContextType>({
  client: createClientWithSession(),
  authClient: createClientWithSession({
    options: { db: { schema: "next_auth" } },
  }),
});

export const SupabaseProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data: session } = useSession();

  const authClient = useMemo(() => {
    return createClientWithSession({
      session,
      options: { db: { schema: "next_auth" } },
    });
  }, [session]);

  const dbClient = useMemo(() => {
    return createClientWithSession({ session });
  }, [session]);

  return (
    <SupabaseContext.Provider value={{ authClient, client: dbClient }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabaseContext = () => useContext(SupabaseContext);
export default SupabaseContext;
