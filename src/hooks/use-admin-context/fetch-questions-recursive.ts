import { GetPageQuestionsQuery, useGetPageQuestionsQuery } from "@/gql/types";
import { useState } from "react";

export const useFetchQuestionsRecursive = () => {
  const [finalResult, setFinalResult] = useState<
    GetPageQuestionsQuery | undefined
  >(undefined);
  const [isFetching, setIsFetching] = useState(true);

  const { loading, fetchMore } = useGetPageQuestionsQuery({
    variables: {
      limit: 5000,
    },
    onCompleted: async (data) => {
      const endCursor = data?.questionsCollection?.pageInfo?.endCursor;
      const hasNextPage = data?.questionsCollection?.pageInfo?.hasNextPage;
      if (!hasNextPage) {
        setFinalResult(data);
        setIsFetching(false);
        return;
      }

      await fetchMore({
        variables: {
          limit: 1000,
          cursor: endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (!prev.questionsCollection) return fetchMoreResult;
          const newEdges = prev.questionsCollection.edges.concat(
            fetchMoreResult?.questionsCollection?.edges || []
          );

          if (fetchMoreResult.questionsCollection?.edges)
            fetchMoreResult.questionsCollection.edges = newEdges;

          return newEdges.length ? fetchMoreResult : prev;
        },
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    data: finalResult,
    loading,
    completed: !isFetching,
  };
};
