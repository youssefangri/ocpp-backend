"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flushPromises = void 0;
exports.flushPromises = () => new Promise(resolve => setImmediate(resolve));
//# sourceMappingURL=helper.js.map