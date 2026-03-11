import { useRef } from "react";

type PersistFn<TArgs extends unknown[], TResult> = (...args: TArgs) => TResult;

/**
 * usePersistFn instead of useCallback to reduce cognitive load
 */
export function usePersistFn<TArgs extends unknown[], TResult>(
  fn: PersistFn<TArgs, TResult>,
) {
  const fnRef = useRef<PersistFn<TArgs, TResult>>(fn);
  fnRef.current = fn;

  const persistFn = useRef<PersistFn<TArgs, TResult> | null>(null);
  if (!persistFn.current) {
    persistFn.current = function (this: unknown, ...args: TArgs): TResult {
      return fnRef.current!.apply(this, args);
    };
  }

  return persistFn.current!;
}
