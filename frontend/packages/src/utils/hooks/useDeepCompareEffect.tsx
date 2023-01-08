import {
  DependencyList,
  EffectCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { isEqual } from "lodash";

const useDeepCompareMemoize = <T extends unknown = unknown>(value: T) => {
  const ref = useRef<T>(value);
  const signalRef = useRef<number>(0);

  if (!isEqual(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return useMemo(() => ref.current, [signalRef.current]);
};

export const useDeepCompareEffect = (
  effect: EffectCallback,
  deps?: DependencyList
) => {
  return useEffect(effect, useDeepCompareMemoize(deps));
};
