"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusNotificationRequestBuilder = void 0;
const StatusNotificationRequest_1 = require("../../models/StatusNotificationRequest");
const StatusNotificationStatusEnum_1 = require("../../models/StatusNotificationStatusEnum");
const StatusNotificationErrorCodeEnum_1 = require("../../models/StatusNotificationErrorCodeEnum");
class StatusNotificationRequestBuilder {
    constructor() {
        this.getOperationName = () => 'StatusNotification';
    }
    build(_, payload) {
        var _a, _b;
        const request = new StatusNotificationRequest_1.StatusNotificationRequest();
        request.connectorId = 1;
        request.errorCode = (_a = payload.errorCode) !== null && _a !== void 0 ? _a : StatusNotificationErrorCodeEnum_1.StatusNotificationErrorCodeEnum.NoError;
        request.status = (_b = payload.status) !== null && _b !== void 0 ? _b : StatusNotificationStatusEnum_1.StatusNotificationStatusEnum.Available;
        request.timestamp = new Date().toISOString();
        return request;
    }
}
exports.StatusNotificationRequestBuilder = StatusNotificationRequestBuilder;
//# sourceMappingURL=status-notification-request-builder.js.map