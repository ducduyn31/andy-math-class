import { useRemoveQuestionMutation } from "@/gql/types";
import { removeQuestionFromCache } from "@/hooks/use-remove-question/cache-updater/questions";

interface Args {
  onSuccess?: () => void;
}

export const useRemoveQuestion = (args?: Args) => {
  const [removeQuestionGQL, { loading }] = useRemoveQuestionMutation({
    onCompleted: () => {
      args?.onSuccess?.();
    },
    update: removeQuestionFromCache,
  });

  const removeQuestion = async (questionId: string) => {
    await removeQuestionGQL({ variables: { questionId } });
  };

  return { removeQuestion, loading };
};
