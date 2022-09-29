"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeterValuesRequestBuilder = void 0;
const MeterValuesRequest_1 = require("../../models/MeterValuesRequest");
const MeterValue_1 = require("../../models/MeterValue");
const SampledValue_1 = require("../../models/SampledValue");
class MeterValuesRequestBuilder {
    constructor() {
        this.getOperationName = () => 'MeterValues';
    }
    build(station, payload) {
        var _a, _b, _c, _d, _e;
        const request = new MeterValuesRequest_1.MeterValuesRequest();
        request.connectorId = 1;
        const sampledValue = new SampledValue_1.SampledValue();
        sampledValue.value = (_a = payload.value) !== null && _a !== void 0 ? _a : station.meterValue;
        sampledValue.context = (_b = payload.context) !== null && _b !== void 0 ? _b : SampledValue_1.ReadingContext.SamplePeriodic;
        sampledValue.measurand = (_c = payload.measurand) !== null && _c !== void 0 ? _c : SampledValue_1.Measurand.EnergyActiveImportRegister;
        sampledValue.unit = (_d = payload.unit) !== null && _d !== void 0 ? _d : SampledValue_1.UnitOfMeasure.Wh;
        sampledValue.location = (_e = payload.location) !== null && _e !== void 0 ? _e : SampledValue_1.Location.Outlet;
        const meterValue = new MeterValue_1.MeterValue();
        meterValue.timestamp = new Date().toISOString();
        meterValue.sampledValue.push(sampledValue);
        request.meterValue.push(meterValue);
        if (station.currentTransactionId) {
            request.transactionId = station.currentTransactionId;
        }
        return request;
    }
}
exports.MeterValuesRequestBuilder = MeterValuesRequestBuilder;
//# sourceMappingURL=meter-values-request-builder.js.map