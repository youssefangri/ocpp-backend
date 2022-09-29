"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BootNotificationRequestBuilder = void 0;
const BootNotificationRequest_1 = require("../../models/BootNotificationRequest");
const station_entity_1 = require("../../stations/station.entity");
class BootNotificationRequestBuilder {
    constructor() {
        this.getOperationName = () => 'BootNotification';
    }
    build(station, payload) {
        var _a, _b;
        const request = new BootNotificationRequest_1.BootNotifcationRequest();
        request.chargePointVendor = (_a = payload === null || payload === void 0 ? void 0 : payload.vendor) !== null && _a !== void 0 ? _a : station.vendor;
        request.chargePointModel = (_b = payload === null || payload === void 0 ? void 0 : payload.model) !== null && _b !== void 0 ? _b : station.model;
        return request;
    }
}
exports.BootNotificationRequestBuilder = BootNotificationRequestBuilder;
//# sourceMappingURL=boot-notification-request-builder.js.map