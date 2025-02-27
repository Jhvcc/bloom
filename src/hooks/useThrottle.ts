import { useCallback, useRef } from "react";

type AnyFunction = (...args: any[]) => any;

export function useThrottle<T extends AnyFunction>(func: T, delay: number): (...args: Parameters<T>) => void {
  const lastCall = useRef<number>(0)
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall.current < delay) {
      return
    }
    lastCall.current = now
    func(...args)
  }, [func, delay])
}