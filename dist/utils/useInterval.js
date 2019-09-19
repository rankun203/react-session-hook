"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useInterval(callback, delay) {
    // @ts-ignore
    const savedCallback = react_1.useRef();
    // Remember the latest callback.
    react_1.useEffect(() => {
        savedCallback.current = callback;
    });
    // Set up the interval.
    react_1.useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        let id;
        if (delay !== null) {
            id = setInterval(tick, delay);
        }
        return () => clearInterval(id);
    }, [delay]);
}
exports.default = useInterval;
//# sourceMappingURL=useInterval.js.map