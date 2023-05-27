import { EffectCallback, useCallback, useEffect, useRef } from "react";
import { isNullOrUndefined } from "@/helpers/valid";

export const useEffectOnceLoad = <T>(
  effect: EffectCallback,
  dependencies: T[]
) => {
  const hasLoadedRef = useRef(false);

  const doEffect = useCallback(
    (deps: T[]) => {
      if (
        isNullOrUndefined(deps) ||
        deps.some(isNullOrUndefined) ||
        hasLoadedRef.current
      )
        return;
      hasLoadedRef.current = true;
      effect();
    },
    [effect]
  );

  useEffect(() => {
    doEffect(dependencies);
  }, [doEffect, dependencies]);
};
