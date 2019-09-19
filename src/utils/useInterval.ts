import { useEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number | null) {
  // @ts-ignore
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id: NodeJS.Timeout;
    if (delay !== null) {
      id = setInterval(tick, delay);
    }
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
