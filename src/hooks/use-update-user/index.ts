import { useSupabaseContext } from "@/hooks/use-supabase-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserWithFields } from "@/models";
import { useSession } from "next-auth/react";

interface Args {
  onSuccess?: () => void;
}

export const useUpdateUser = (args?: Args) => {
  const { authClient } = useSupabaseContext();
  const queryClient = useQueryClient();
  const session = useSession();
  const { isLoading, data, mutate } = useMutation({
    mutationFn: async (
      updatedUser: Partial<UserWithFields> & Pick<UserWithFields, "id">
    ) => {
      if (!session.data?.supabaseAccessToken) throw new Error("Unauthorized");
      await authClient
        .from("users")
        .update(updatedUser)
        .eq("id", updatedUser.id);
    },
    onSuccess: (_, variables) => {
      const result: UserWithFields[] | undefined = queryClient.getQueryData([
        "users",
      ]);
      const userIndex = result?.findIndex((u) => u.id === variables.id);
      if (userIndex === undefined || !result) return;

      queryClient.setQueryData(
        ["users"],
        (oldValue?: UserWithFields[]): UserWithFields[] | undefined => {
          if (!oldValue) return oldValue;
          const updatedUser = Object.assign({}, oldValue[userIndex], variables);
          return Object.assign([], oldValue, { [userIndex]: updatedUser });
        }
      );
      queryClient.setQueryData(
        ["users", variables.id],
        (oldValue?: UserWithFields): UserWithFields | undefined => {
          if (!oldValue) return oldValue;
          return {
            ...oldValue,
            ...variables,
          };
        }
      );

      args?.onSuccess?.();
    },
    retry: 3,
  });

  return {
    isLoading,
    updateUser: mutate,
    data,
  };
};
