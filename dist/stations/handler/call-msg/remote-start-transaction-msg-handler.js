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
var RemoteStartTransactionMsgHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteStartTransactionMsgHandler = void 0;
const common_1 = require("@nestjs/common");
const OperationNameFromChargePoint_1 = require("../../../models/OperationNameFromChargePoint");
const by_charge_point_operation_message_generator_1 = require("../../../message/by-charge-point/by-charge-point-operation-message-generator");
const ChargePointMessageTypes_1 = require("../../../models/ChargePointMessageTypes");
const RemoteStartStopStatusEnum_1 = require("../../../models/RemoteStartStopStatusEnum");
const RemoteStartTransactionResponse_1 = require("../../../models/RemoteStartTransactionResponse");
let RemoteStartTransactionMsgHandler = RemoteStartTransactionMsgHandler_1 = class RemoteStartTransactionMsgHandler {
    constructor(byChargePointOperationMessageGenerator) {
        this.byChargePointOperationMessageGenerator = byChargePointOperationMessageGenerator;
        this.logger = new common_1.Logger(RemoteStartTransactionMsgHandler_1.name);
    }
    handle(wsClient, station, requestFromCS) {
        const parsedMessage = JSON.parse(requestFromCS);
        const [, uniqueId, , payload] = parsedMessage;
        const { idTag } = payload;
        const remoteStartResponse = this.buildResponseMsg();
        const responseMessage = JSON.stringify([ChargePointMessageTypes_1.ChargePointMessageTypes.CallResult, uniqueId, remoteStartResponse]);
        this.logger.log(`Sending response for remote start (identity: ${wsClient.stationIdentity}): ${responseMessage}`);
        wsClient.send(responseMessage);
        const startTransactionMsg = this.byChargePointOperationMessageGenerator.createMessage(OperationNameFromChargePoint_1.OperationNameFromChargePoint.StartTransaction, station, wsClient.getMessageIdForCall(), { idTag });
        this.logger.log(`Sending message for station ${wsClient.stationIdentity}: ${startTransactionMsg}`);
        wsClient.sendCallMsgForOperation(startTransactionMsg, OperationNameFromChargePoint_1.OperationNameFromChargePoint.StartTransaction);
    }
    buildResponseMsg() {
        const response = new RemoteStartTransactionResponse_1.RemoteStartTransactionResponse();
        response.status = RemoteStartStopStatusEnum_1.RemoteStartStopStatusEnum.Accepted;
        return response;
    }
};
RemoteStartTransactionMsgHandler = RemoteStartTransactionMsgHandler_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [by_charge_point_operation_message_generator_1.ByChargePointOperationMessageGenerator])
], RemoteStartTransactionMsgHandler);
exports.RemoteStartTransactionMsgHandler = RemoteStartTransactionMsgHandler;
//# sourceMappingURL=remote-start-transaction-msg-handler.js.map