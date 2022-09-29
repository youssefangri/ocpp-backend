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
var StartTransactionResultMsgHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartTransactionResultMsgHandler = void 0;
const common_1 = require("@nestjs/common");
const IdTagInfoStatusEnum_1 = require("../../../models/IdTagInfoStatusEnum");
const station_repository_1 = require("../../../stations/station.repository");
const utils_1 = require("../../../stations/utils");
const by_charge_point_operation_message_generator_1 = require("../../../message/by-charge-point/by-charge-point-operation-message-generator");
const OperationNameFromChargePoint_1 = require("../../../models/OperationNameFromChargePoint");
let StartTransactionResultMsgHandler = StartTransactionResultMsgHandler_1 = class StartTransactionResultMsgHandler {
    constructor(stationRepository, byChargePointOperationMessageGenerator) {
        this.stationRepository = stationRepository;
        this.byChargePointOperationMessageGenerator = byChargePointOperationMessageGenerator;
        this.logger = new common_1.Logger(StartTransactionResultMsgHandler_1.name);
    }
    async handle(wsClient, station, parsedMessage) {
        const [, , payload] = parsedMessage;
        const { transactionId, idTagInfo: { status }, } = payload;
        if (status === IdTagInfoStatusEnum_1.IdTagInfoStatusEnum.Accepted && transactionId > 0) {
            const dto = {
                chargeInProgress: true,
                currentTransactionId: transactionId,
            };
            this.stationRepository.updateStation(station, dto);
            this.createMeterValueInterval(wsClient, station);
        }
    }
    createMeterValueInterval(wsClient, station) {
        clearInterval(wsClient.meterValueInterval);
        wsClient.meterValueInterval = setInterval(async () => {
            await station.reload();
            station.meterValue =
                station.meterValue + utils_1.calculatePowerUsageInWh(station.updatedAt, station.currentChargingPower);
            await station.save();
            const message = this.byChargePointOperationMessageGenerator.createMessage('MeterValues', station, wsClient.getMessageIdForCall(), { value: station.meterValue });
            this.logger.log(`Sending message for station ${wsClient.stationIdentity}: ${message}`);
            wsClient.sendCallMsgForOperation(message, OperationNameFromChargePoint_1.OperationNameFromChargePoint.MeterValues);
        }, 60000);
    }
};
StartTransactionResultMsgHandler = StartTransactionResultMsgHandler_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [station_repository_1.StationRepository,
        by_charge_point_operation_message_generator_1.ByChargePointOperationMessageGenerator])
], StartTransactionResultMsgHandler);
exports.StartTransactionResultMsgHandler = StartTransactionResultMsgHandler;
//# sourceMappingURL=start-transaction-result-msg-handler.js.map