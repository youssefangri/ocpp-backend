"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByChargePointOperationMessageGenerator = void 0;
const station_entity_1 = require("../../stations/station.entity");
const common_1 = require("@nestjs/common");
const ChargePointMessageTypes_1 = require("../../models/ChargePointMessageTypes");
const by_charge_point_request_builder_factory_1 = require("./by-charge-point-request-builder-factory");
let ByChargePointOperationMessageGenerator = class ByChargePointOperationMessageGenerator {
    constructor(byChargePointRequestBuilderFactory) {
        this.byChargePointRequestBuilderFactory = byChargePointRequestBuilderFactory;
    }
    createMessage(operationName, station, uniqueId, payload) {
        const builder = this.byChargePointRequestBuilderFactory.getBuilderFromOperationName(operationName);
        if (builder === null) {
            return '';
        }
        const chargePointRequest = builder.build(station, payload !== null && payload !== void 0 ? payload : {});
        const message = JSON.stringify([
            ChargePointMessageTypes_1.ChargePointMessageTypes.Call,
            uniqueId.toString(),
            builder.getOperationName(),
            chargePointRequest,
        ]);
        return message;
    }
};
ByChargePointOperationMessageGenerator = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [by_charge_point_request_builder_factory_1.ByChargePointRequestBuilderFactory])
], ByChargePointOperationMessageGenerator);
exports.ByChargePointOperationMessageGenerator = ByChargePointOperationMessageGenerator;
//# sourceMappingURL=by-charge-point-operation-message-generator.js.map