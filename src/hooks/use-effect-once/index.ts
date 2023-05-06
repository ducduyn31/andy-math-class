import { EffectCallback, useEffect, useRef, useState } from "react";

export const useEffectOnce = (effect: EffectCallback) => {
  const effectFn = useRef(effect);
  const destroyFn = useRef<ReturnType<EffectCallback>>();
  const effectCalled = useRef(false);
  const rendered = useRef(false);
  const [, setVal] = useState(0);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      effectCalled.current = true;
      destroyFn.current = effectFn.current();
    }

    setVal((val) => val + 1);

    return () => {
      if (destroyFn.current) {
        destroyFn.current();
      }
    };
  }, []);
};
