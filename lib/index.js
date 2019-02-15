"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const createTraps = (setValue) => {
    return {
        get(target, key, receiver) {
            if (key === `$`) {
                let newValue;
                if (Array.isArray(target)) {
                    newValue = [...target];
                }
                else {
                    newValue = Object.assign({}, target);
                }
                return () => setValue(newValue);
            }
            return Reflect.get(target, key, receiver);
        }
    };
};
function useProState(target) {
    if (typeof target !== 'object') {
        throw Error('useProState can only receive object');
    }
    const [value, setValue] = react_1.useState(target);
    const traps = createTraps(setValue);
    return new Proxy(value, traps);
}
exports.default = useProState;
