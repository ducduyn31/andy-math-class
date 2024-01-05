import { GetPageUsersQuery, useGetPageUsersQuery } from "@/gql/types";
import { useState } from "react";

export const useFetchUsersRecursive = () => {
  const [finalResult, setFinalResult] = useState<GetPageUsersQuery | undefined>(
    undefined
  );
  const [isFetching, setIsFetching] = useState(true);

  const { loading, fetchMore } = useGetPageUsersQuery({
    variables: {
      limit: 30,
    },
    onCompleted: async (data) => {
      const endCursor = data?.usersCollection?.pageInfo?.endCursor;
      const hasNextPage = data?.usersCollection?.pageInfo?.hasNextPage;
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
          if (!prev.usersCollection) return fetchMoreResult;
          const newEdges = prev.usersCollection.edges.concat(
            fetchMoreResult?.usersCollection?.edges || []
          );

          if (fetchMoreResult.usersCollection?.edges)
            fetchMoreResult.usersCollection.edges = newEdges;

          return newEdges.length ? fetchMoreResult : prev;
        },
      });
    },
    onError: (error) => {
      console.log(error);
      setIsFetching(false);
    },
  });

  return {
    data: finalResult,
    loading,
    completed: !isFetching,
  };
};
