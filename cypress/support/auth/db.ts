import { createClient } from "@supabase/supabase-js";

export const clearAuthDB = async (domain: string, key: string) => {
  const supabase = createClient(domain, key, {
    db: {
      schema: "next_auth",
    },
  });

  const deleteSessions = supabase
    .from("sessions")
    .delete()
    .neq("sessionToken", "0");

  const deleteUsers = supabase.from("users").delete().neq("email", "");

  return Promise.all([deleteSessions, deleteUsers]);
};
