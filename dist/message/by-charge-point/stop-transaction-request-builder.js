"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopTransactionRequestBuilder = void 0;
const station_entity_1 = require("../../stations/station.entity");
const StopTransactionRequest_1 = require("../../models/StopTransactionRequest");
class StopTransactionRequestBuilder {
    constructor() {
        this.getOperationName = () => 'StopTransaction';
    }
    build(station, payload) {
        var _a;
        const request = new StopTransactionRequest_1.StopTransactionRequest();
        request.transactionId = (_a = payload.transactionId) !== null && _a !== void 0 ? _a : station.currentTransactionId;
        request.meterStop = station.meterValue;
        request.timestamp = new Date().toISOString();
        payload.transactionData ? (request.transactionData = payload.transactionData) : '';
        return request;
    }
}
exports.StopTransactionRequestBuilder = StopTransactionRequestBuilder;
//# sourceMappingURL=stop-transaction-request-builder.js.map