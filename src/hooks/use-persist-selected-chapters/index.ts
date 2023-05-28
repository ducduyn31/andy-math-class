import { Chapter } from "@/models";
import {
  useLoadLastSelectedChaptersLazyQuery,
  useSaveSelectedChaptersMutation,
} from "@/gql/types";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo } from "react";

interface UsePersistSelectedChaptersReturn {
  saveSelectedChapters: (selectedChapters: Chapter[]) => void;
  lastSelectedChapters: Set<string> | null;
}

export const usePersistSelectedChapters =
  (): UsePersistSelectedChaptersReturn => {
    const session = useSession();
    const [saveChapters, {}] = useSaveSelectedChaptersMutation();
    const [loadStates, { data }] = useLoadLastSelectedChaptersLazyQuery();

    useEffect(() => {
      loadStates({
        variables: {
          email: session?.data?.user?.email || "",
        },
      });
    }, [loadStates, session]);

    const saveSelectedChapters = useCallback(
      (selectedChapters: Chapter[]) => {
        const chapters = selectedChapters.map((chapter) => chapter.id);
        saveChapters({
          variables: {
            selectedChapters: {
              email: session?.data?.user?.email,
              state: JSON.stringify(chapters),
            },
          },
        });
      },
      [saveChapters, session]
    );

    const lastState = useMemo((): Set<string> | null => {
      if (!data) return null;
      const jsonState =
        data?.chapters_select_stateCollection?.edges?.[0]?.node?.state;
      const chapterIds = jsonState ? JSON.parse(jsonState) : [];
      return new Set<string>(chapterIds);
    }, [data]);

    return {
      saveSelectedChapters,
      lastSelectedChapters: lastState,
    };
  };
