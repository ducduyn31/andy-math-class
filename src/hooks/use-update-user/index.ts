import {
  useRemoveAllAssignationsMutation,
  useReplaceBooksAssignationMutation,
  useUpdateUserMutation,
} from "@/gql/types";
import { UpdateUserFormValues } from "@/helpers/admin/users/form";
import {
  removeAllAssignationsFromCache,
  replaceAssignationToCache,
} from "@/hooks/use-update-user/cache-updater/assignations";
import { SelectOption } from "@/helpers/form";

interface Args {
  onSuccess?: () => void;
}

export type UseUpdateUserArgs = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  assignedBookIds?: string[];
  isEnabled?: boolean;
  isAdmin?: boolean;
};

export const useUpdateUser = (args?: Args) => {
  const [updateUserGQL, { data, loading: userLoading }] = useUpdateUserMutation(
    {
      onCompleted: () => {
        args?.onSuccess?.();
      },
    }
  );
  const [replaceAssignations, { loading: assignationLoading }] =
    useReplaceBooksAssignationMutation({
      update: replaceAssignationToCache,
    });
  const [removeAllAssignations, { loading: removeAssignationsLoading }] =
    useRemoveAllAssignationsMutation({
      update: removeAllAssignationsFromCache,
    });

  const updateUser = async ({
    id,
    assignedBookIds,
    ...rest
  }: UseUpdateUserArgs) => {
    await updateUserGQL({
      variables: {
        userId: id,
        updatedUser: {
          ...rest,
        },
      },
    });
    if (!assignedBookIds?.length) {
      await removeAllAssignations({
        variables: {
          userId: id,
        },
      });
    } else {
      await replaceAssignations({
        variables: {
          userId: id,
          assignations: assignedBookIds.map((bookId) => ({
            book: bookId,
            user: id,
          })),
        },
      });
    }
  };

  return {
    loading: assignationLoading || userLoading || removeAssignationsLoading,
    updateUser,
    data,
  };
};
