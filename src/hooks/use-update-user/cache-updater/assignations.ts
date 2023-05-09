import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";
import {
  Exact,
  RemoveAllAssignationsMutation,
  ReplaceBooksAssignationMutation,
  Scalars,
  User_Books_AssignationInsertInput,
} from "@/gql/types";

export const removeAllAssignationsFromCache: MutationUpdaterFunction<
  RemoveAllAssignationsMutation,
  Exact<{ userId: string }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (data?.deleteFromuser_books_assignationCollection?.records) {
    data.deleteFromuser_books_assignationCollection.records.forEach(
      (record) => {
        cache.evict({ id: cache.identify(record) });
      }
    );
  }
};

export const replaceAssignationToCache: MutationUpdaterFunction<
  ReplaceBooksAssignationMutation,
  Exact<{
    userId: Scalars["UUID"];
    assignations:
      | Array<User_Books_AssignationInsertInput>
      | User_Books_AssignationInsertInput;
  }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (data?.deleteFromuser_books_assignationCollection?.records) {
    data.deleteFromuser_books_assignationCollection.records.forEach(
      (record) => {
        cache.evict({ id: cache.identify(record) });
      }
    );
  }
  if (data?.insertIntouser_books_assignationCollection?.records) {
    const newRecords = data.insertIntouser_books_assignationCollection.records;
    const user = newRecords[0].users;
    if (!user) return;
    cache.modify({
      id: cache.identify(user),
      fields: {
        user_books_assignationCollection: (existingAssignations) => {
          return {
            ...existingAssignations,
            edges: newRecords.map((record) => ({
              __typename: "user_books_assignationEdge",
              node: cache.identify(record),
            })),
          };
        },
      },
    });
  }
};
