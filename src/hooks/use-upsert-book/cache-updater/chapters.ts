import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";
import {
  ChaptersInsertInput,
  CreateNewChaptersMutation,
  Exact,
  RemoveChaptersMutation,
} from "@/gql/types";

export const updateCacheOnRemoveChapters: MutationUpdaterFunction<
  RemoveChaptersMutation,
  Exact<{ chapterIds: any }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (data?.deleteFromchaptersCollection?.records) {
    data.deleteFromchaptersCollection.records.forEach((chapter) => {
      cache.evict({
        id: cache.identify(chapter),
      });
    });
  }
};

export const updateCacheOnInsertChapters: MutationUpdaterFunction<
  CreateNewChaptersMutation,
  Exact<{ chaptersInput: ChaptersInsertInput | ChaptersInsertInput[] }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (data?.insertIntochaptersCollection?.records) {
    data.insertIntochaptersCollection.records.forEach((chapter) => {
      cache.modify({
        id: cache.identify({ __typename: "books", id: chapter.book }),
        fields: {
          chaptersCollection: (existingChaptersCollection) => {
            return {
              ...existingChaptersCollection,
              edges: [
                ...existingChaptersCollection.edges,
                {
                  __typename: "chaptersEdge",
                  node: chapter,
                },
              ],
            };
          },
        },
      });
    });
  }
};
