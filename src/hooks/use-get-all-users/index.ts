import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseContext } from "@/hooks/use-supabase-context";
import { useSession } from "next-auth/react";
import { mapUser, User } from "@/models";

export const useGetAllUsers = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const { authClient } = useSupabaseContext();

  const persistUserToCache = (user: User) => {
    queryClient.setQueryData(["users", user.id], user);
  };

  const { isLoading, data } = useQuery(
    ["users"],
    async () => {
      const { data, error } = await authClient.from("users").select("*");
      if (error) return null;
      return data;
    },
    {
      enabled:
        !!authClient &&
        session.status === "authenticated" &&
        !!session.data?.supabaseAccessToken,
      onSuccess: (data) => {
        data?.map(mapUser).forEach(persistUserToCache);
      },
    }
  );

  return { isLoading, data };
};
