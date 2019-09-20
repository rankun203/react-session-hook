"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useInterval_1 = __importDefault(require("./useInterval"));
exports.default = (session) => {
    const { expiration, isAuthenticated, removeSession, refreshFn, refreshInterval, setSession } = session;
    /***
     * Remove Session Timer
     */
    const sessionExpiresIn = expiration && isAuthenticated ? expiration.valueOf() - Date.now() : null;
    useInterval_1.default(() => removeSession(), sessionExpiresIn);
    /***
     * RefreshFn timer
     */
    let refreshExpiresIn = null;
    if (refreshFn && refreshInterval) {
        refreshExpiresIn = Math.min(refreshInterval, sessionExpiresIn || Infinity);
    }
    useInterval_1.default(() => {
        refreshFn(session, setSession);
    }, refreshExpiresIn);
};
//# sourceMappingURL=useSessionTimers.js.map