import useInterval from "./useInterval";

import { UseSession } from "../interfaces";

export default <TProfile>(session: UseSession<TProfile>) => {
  const {
    expiration,
    isAuthenticated,
    removeSession,
    refreshFn,
    refreshInterval,
    setSession
  } = session;

  /***
   * Remove Session Timer
   */
  const sessionExpiresIn =
    expiration && isAuthenticated ? expiration.valueOf() - Date.now() : Number.MAX_SAFE_INTEGER;

  useInterval(() => removeSession(), sessionExpiresIn);

  /***
   * RefreshFn timer
   */
  let refreshExpiresIn: number | null = Number.MAX_SAFE_INTEGER;

  if (refreshFn && refreshInterval) {
    refreshExpiresIn = Math.min(refreshInterval, sessionExpiresIn || Infinity);
  }

  useInterval(() => {
    const refreshed = Promise.resolve(refreshFn!(session));
    refreshed.then(s => setSession(s));
  }, refreshExpiresIn);
};
