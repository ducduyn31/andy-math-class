import { useState } from "react";
import { GetPageBooksQuery, useGetPageBooksQuery } from "@/gql/types";

export const useFetchBooksRecursive = () => {
  const [finalResult, setFinalResult] = useState<GetPageBooksQuery | undefined>(
    undefined
  );
  const [isFetching, setIsFetching] = useState(true);

  const { loading, fetchMore } = useGetPageBooksQuery({
    variables: {
      limit: 30,
    },
    onCompleted: async (data) => {
      const endCursor = data?.booksCollection?.pageInfo?.endCursor;
      const hasNextPage = data?.booksCollection?.pageInfo?.hasNextPage;
      if (!hasNextPage) {
        setFinalResult(data);
        setIsFetching(false);
        return;
      }

      await fetchMore({
        variables: {
          limit: 30,
          cursor: endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (!prev.booksCollection) return fetchMoreResult;
          const newEdges = prev.booksCollection.edges.concat(
            fetchMoreResult?.booksCollection?.edges || []
          );

          if (fetchMoreResult.booksCollection?.edges)
            fetchMoreResult.booksCollection.edges = newEdges;

          return newEdges.length ? fetchMoreResult : prev;
        },
      });
    },
  });

  return {
    data: finalResult,
    loading,
    completed: !isFetching,
  };
};
