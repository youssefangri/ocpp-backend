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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RemoteStopTransactionMsgHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteStopTransactionMsgHandler = void 0;
const common_1 = require("@nestjs/common");
const RemoteStopTransactionResponse_1 = require("../../../models/RemoteStopTransactionResponse");
const by_charge_point_operation_message_generator_1 = require("../../../message/by-charge-point/by-charge-point-operation-message-generator");
const ChargePointMessageTypes_1 = require("../../../models/ChargePointMessageTypes");
const RemoteStartStopStatusEnum_1 = require("../../../models/RemoteStartStopStatusEnum");
const OperationNameFromChargePoint_1 = require("../../../models/OperationNameFromChargePoint");
const station_repository_1 = require("../../station.repository");
const typeorm_1 = require("@nestjs/typeorm");
const create_update_station_dto_1 = require("../../dto/create-update-station.dto");
const utils_1 = require("../../utils");
let RemoteStopTransactionMsgHandler = RemoteStopTransactionMsgHandler_1 = class RemoteStopTransactionMsgHandler {
    constructor(stationRepository, byChargePointOperationMessageGenerator) {
        this.stationRepository = stationRepository;
        this.byChargePointOperationMessageGenerator = byChargePointOperationMessageGenerator;
        this.logger = new common_1.Logger(RemoteStopTransactionMsgHandler_1.name);
    }
    async handle(wsClient, station, requestFromCS) {
        await station.reload();
        const parsedMessage = JSON.parse(requestFromCS);
        const [, uniqueId, , payload] = parsedMessage;
        const { transactionId } = payload;
        const response = this.buildResponse(station, transactionId);
        const responseMsg = JSON.stringify([ChargePointMessageTypes_1.ChargePointMessageTypes.CallResult, uniqueId, response]);
        this.logger.verbose(`Sending response for station ${wsClient.stationIdentity}: ${responseMsg}`);
        wsClient.send(responseMsg);
        if (response.status === RemoteStartStopStatusEnum_1.RemoteStartStopStatusEnum.Accepted) {
            const dto = new create_update_station_dto_1.CreateOrUpdateStationDto();
            dto.meterValue = station.meterValue + utils_1.calculatePowerUsageInWh(station.updatedAt, station.currentChargingPower);
            this.stationRepository.updateStation(station, dto);
            const stopTransactionMsg = this.byChargePointOperationMessageGenerator.createMessage(OperationNameFromChargePoint_1.OperationNameFromChargePoint.StopTransaction, station, wsClient.getMessageIdForCall());
            wsClient.sendCallMsgForOperation(stopTransactionMsg, OperationNameFromChargePoint_1.OperationNameFromChargePoint.StopTransaction);
        }
    }
    buildResponse(station, transactionId) {
        const response = new RemoteStopTransactionResponse_1.RemoteStopTransactionResponse();
        response.status = RemoteStartStopStatusEnum_1.RemoteStartStopStatusEnum.Accepted;
        if (station.currentTransactionId !== transactionId) {
            this.logger.error(`Different transaction_ID received: ${transactionId}. Current transactionId: ${station.currentTransactionId}`);
            response.status = RemoteStartStopStatusEnum_1.RemoteStartStopStatusEnum.Rejected;
        }
        return response;
    }
};
RemoteStopTransactionMsgHandler = RemoteStopTransactionMsgHandler_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(station_repository_1.StationRepository)),
    __metadata("design:paramtypes", [station_repository_1.StationRepository,
        by_charge_point_operation_message_generator_1.ByChargePointOperationMessageGenerator])
], RemoteStopTransactionMsgHandler);
exports.RemoteStopTransactionMsgHandler = RemoteStopTransactionMsgHandler;
//# sourceMappingURL=remote-stop-transaction-msg-handler.js.map