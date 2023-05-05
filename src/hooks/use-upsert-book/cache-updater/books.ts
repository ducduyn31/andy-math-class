import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";
import {
  BooksInsertInput,
  BooksUpdateInput,
  CreateNewBooksMutation,
  Exact,
  UpdateExistingBookMutation,
} from "@/gql/types";

export const updateCacheOnUpdateBook: MutationUpdaterFunction<
  UpdateExistingBookMutation,
  Exact<{ bookId: any; updatedBook: BooksUpdateInput }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (data?.updatebooksCollection?.records) {
    data.updatebooksCollection.records.forEach((book) => {
      cache.modify({
        id: cache.identify({ __typename: "books", id: book.id }),
        fields: {
          name: () => book.name,
        },
      });
    });
  }
};

export const updateCacheOnInsertBook: MutationUpdaterFunction<
  CreateNewBooksMutation,
  Exact<{ booksInput: BooksInsertInput | BooksInsertInput[] }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (data?.insertIntobooksCollection?.records) {
    data.insertIntobooksCollection.records.forEach((book) => {
      cache.modify({
        fields: {
          booksCollection: (existingBooksCollection) => {
            return {
              ...existingBooksCollection,
              edges: [
                ...existingBooksCollection.edges,
                {
                  __typename: "booksEdge",
                  node: book,
                },
              ],
            };
          },
        },
      });
    });
  }
};
