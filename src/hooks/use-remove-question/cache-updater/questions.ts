import {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from "@apollo/client";
import { Exact, RemoveQuestionMutation, Scalars } from "@/gql/types";

export const removeQuestionFromCache: MutationUpdaterFunction<
  RemoveQuestionMutation,
  Exact<{ questionId: Scalars["UUID"] }>,
  DefaultContext,
  ApolloCache<any>
> = (cache, { data }) => {
  if (!data?.deleteFromquestionsCollection?.records[0]) return;
  const questionImages =
    data.deleteFromquestionsCollection.records[0].question_imagesCollection?.edges.map(
      (edge) => edge.node
    ) ?? [];
  const answerImages =
    data.deleteFromquestionsCollection.records[0].answerCollection?.edges.map(
      (edge) => edge.node
    ) ?? [];
  cache.evict({
    id: cache.identify(data?.deleteFromquestionsCollection.records[0]),
  });
  questionImages.forEach((image) => {
    cache.evict({
      id: cache.identify(image),
    });
  });
  answerImages.forEach((image) => {
    cache.evict({
      id: cache.identify(image),
    });
  });
};
