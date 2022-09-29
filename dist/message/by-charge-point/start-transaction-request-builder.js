"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartTransactionRequestBuilder = void 0;
const station_entity_1 = require("../../stations/station.entity");
const StartTransactionRequest_1 = require("../../models/StartTransactionRequest");
class StartTransactionRequestBuilder {
    constructor() {
        this.getOperationName = () => 'StartTransaction';
    }
    build(station, payload) {
        const request = new StartTransactionRequest_1.StartTransactionRequest();
        request.connectorId = 1;
        request.idTag = payload.idTag;
        request.meterStart = station.meterValue;
        request.timestamp = new Date().toISOString();
        return request;
    }
}
exports.StartTransactionRequestBuilder = StartTransactionRequestBuilder;
//# sourceMappingURL=start-transaction-request-builder.js.map