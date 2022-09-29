"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartbeatRequestBuilder = void 0;
const HeartbeatRequest_1 = require("../../models/HeartbeatRequest");
class HeartbeatRequestBuilder {
    constructor() {
        this.getOperationName = () => 'Heartbeat';
    }
    build() {
        return new HeartbeatRequest_1.HeartbeatRequest();
    }
}
exports.HeartbeatRequestBuilder = HeartbeatRequestBuilder;
//# sourceMappingURL=heartbeat-request-builder.js.map