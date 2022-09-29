"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ResetMsgHandler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetMsgHandler = void 0;
const common_1 = require("@nestjs/common");
const ChargePointMessageTypes_1 = require("../../../models/ChargePointMessageTypes");
const ResetResponse_1 = require("../../../models/ResetResponse");
const ResetStatusEnum_1 = require("../../../models/ResetStatusEnum");
let ResetMsgHandler = ResetMsgHandler_1 = class ResetMsgHandler {
    constructor() {
        this.logger = new common_1.Logger(ResetMsgHandler_1.name);
    }
    async handle(wsClient, station, requestFromCS) {
        const parsedMessage = JSON.parse(requestFromCS);
        const [, uniqueId, , payload] = parsedMessage;
        const { type } = payload;
        this.logger.log(`Reset command received for identity ${station.identity}. Type: ${type}`);
        const resetResponse = this.buildResponseMsg();
        const responseMessage = JSON.stringify([ChargePointMessageTypes_1.ChargePointMessageTypes.CallResult, uniqueId, resetResponse]);
        this.logger.verbose(`Sending response for station ${wsClient.stationIdentity}: ${responseMessage}`);
        wsClient.send(responseMessage);
        station.chargeInProgress = false;
        station.currentTransactionId = null;
        await station.save();
        wsClient.close(1012, 'Reset requested by Central System');
    }
    buildResponseMsg() {
        const response = new ResetResponse_1.ResetResponse();
        response.status = ResetStatusEnum_1.ResetStatusEnum.Accepted;
        return response;
    }
};
ResetMsgHandler = ResetMsgHandler_1 = __decorate([
    common_1.Injectable()
], ResetMsgHandler);
exports.ResetMsgHandler = ResetMsgHandler;
//# sourceMappingURL=reset-msg-handler.js.map