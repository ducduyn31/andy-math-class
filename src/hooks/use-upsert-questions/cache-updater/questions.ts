import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";
import {
  CreateNewQuestionMutation,
  Exact,
  QuestionsInsertInput,
} from "@/gql/types";

export const createNewQuestionInCache: MutationUpdaterFunction<
  CreateNewQuestionMutation,
  Exact<{
    newQuestion: Array<QuestionsInsertInput> | QuestionsInsertInput;
  }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (!data?.insertIntoquestionsCollection?.records[0]) return;
  const newQuestion = data.insertIntoquestionsCollection.records[0];
  cache.modify({
    fields: {
      questionsCollection: (existingQuestionsCollection) => {
        return {
          ...existingQuestionsCollection,
          edges: [
            ...existingQuestionsCollection.edges,
            {
              __typename: "questionsEdge",
              node: newQuestion,
            },
          ],
        };
      },
    },
  });
};
