import {
  Chapters_Select_StateInsertInput,
  Exact,
  SaveSelectedChaptersMutation,
} from "@/gql/types";
import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";

export const updateSavedChapterCache: MutationUpdaterFunction<
  SaveSelectedChaptersMutation,
  Exact<{
    selectedChapters: Chapters_Select_StateInsertInput;
  }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }, { variables }) => {
  if (
    !data ||
    data.insertIntochapters_select_stateCollection?.affectedCount !== 1
  )
    return;
  const selectedChapters = variables?.selectedChapters;

  cache.modify({
    fields: {
      chapters_select_stateCollection: (existingChapters) => {
        return {
          ...existingChapters,
          edges: [
            {
              __typename: "chapters_select_stateEdge",
              node: {
                __typename: "chapters_select_state",
                email: selectedChapters?.email,
                state: selectedChapters?.state,
              },
            },
          ],
        };
      },
    },
  });
};
