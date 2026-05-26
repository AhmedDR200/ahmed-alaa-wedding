import { useCallback, useRef } from "react";

/** Returns an onClick handler that fires after three quick taps within 550ms. */
export function useTripleTap(onTriple: () => void) {
  const countRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  return useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    countRef.current += 1;
    timerRef.current = window.setTimeout(() => {
      countRef.current = 0;
    }, 550);
    if (countRef.current >= 3) {
      countRef.current = 0;
      onTriple();
    }
  }, [onTriple]);
}
