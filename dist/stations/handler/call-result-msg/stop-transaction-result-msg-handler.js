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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopTransactionResultMsgHandler = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const by_charge_point_operation_message_generator_1 = require("../../../message/by-charge-point/by-charge-point-operation-message-generator");
const IdTagInfoStatusEnum_1 = require("../../../models/IdTagInfoStatusEnum");
const OperationNameFromChargePoint_1 = require("../../../models/OperationNameFromChargePoint");
const station_repository_1 = require("../../station.repository");
let StopTransactionResultMsgHandler = class StopTransactionResultMsgHandler {
    constructor(stationRepository, byChargePointOperationMessageGenerator) {
        this.stationRepository = stationRepository;
        this.byChargePointOperationMessageGenerator = byChargePointOperationMessageGenerator;
        this.logger = new common_1.Logger(StopTransactionResultMsgHandler.name);
    }
    handle(wsClient, station, parsedMessage) {
        const payload = parsedMessage[2];
        const { idTagInfo: { status }, } = payload;
        if (status !== IdTagInfoStatusEnum_1.IdTagInfoStatusEnum.Accepted) {
            this.logger.log(`StopTransaction not accepted for ${wsClient.stationIdentity}`);
            return;
        }
        clearInterval(wsClient.meterValueInterval);
        wsClient.meterValueInterval = null;
        const dto = {
            chargeInProgress: false,
            currentTransactionId: null,
        };
        this.stationRepository.updateStation(station, dto);
        const availableStatusNotificationMessage = this.byChargePointOperationMessageGenerator.createMessage('StatusNotification', station, wsClient.getMessageIdForCall(), {});
        setTimeout(() => {
            wsClient.sendCallMsgForOperation(availableStatusNotificationMessage, OperationNameFromChargePoint_1.OperationNameFromChargePoint.StatusNotification);
        }, 1000);
    }
};
StopTransactionResultMsgHandler = __decorate([
    __param(0, typeorm_1.InjectRepository(station_repository_1.StationRepository)),
    __metadata("design:paramtypes", [station_repository_1.StationRepository,
        by_charge_point_operation_message_generator_1.ByChargePointOperationMessageGenerator])
], StopTransactionResultMsgHandler);
exports.StopTransactionResultMsgHandler = StopTransactionResultMsgHandler;
//# sourceMappingURL=stop-transaction-result-msg-handler.js.map