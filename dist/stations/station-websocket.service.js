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
var StationWebSocketService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationWebSocketService = void 0;
const common_1 = require("@nestjs/common");
const by_charge_point_operation_message_generator_1 = require("../message/by-charge-point/by-charge-point-operation-message-generator");
const ChargePointMessageTypes_1 = require("../models/ChargePointMessageTypes");
const station_websocket_client_1 = require("./station-websocket-client");
const utils_1 = require("./utils");
const call_msg_handler_factory_1 = require("./handler/call-msg/call-msg-handler-factory");
const call_result_msg_handler_factory_1 = require("./handler/call-result-msg/call-result-msg-handler-factory");
const OperationNameFromChargePoint_1 = require("../models/OperationNameFromChargePoint");
let StationWebSocketService = StationWebSocketService_1 = class StationWebSocketService {
    constructor(byChargePointOperationMessageGenerator, callMsgHandlerFactory, callResultMsgHandlerFactory) {
        this.byChargePointOperationMessageGenerator = byChargePointOperationMessageGenerator;
        this.callMsgHandlerFactory = callMsgHandlerFactory;
        this.callResultMsgHandlerFactory = callResultMsgHandlerFactory;
        this.logger = new common_1.Logger(StationWebSocketService_1.name);
        this.createStationWebSocket = (station) => {
            var _a;
            let wsClient;
            const protocols = 'ocpp1.6';
            try {
                wsClient = new station_websocket_client_1.StationWebSocketClient(`${station.centralSystemUrl}/${station.identity}`, protocols);
            }
            catch (error) {
                this.logger.log(`Error connecting for station ${station.identity}: ${(_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : ''}`);
                return null;
            }
            wsClient.on('open', () => this.onConnectionOpen(wsClient, station));
            wsClient.on('message', (data) => this.onMessage(wsClient, station, data));
            wsClient.on('error', error => this.onError(error));
            wsClient.on('close', (code, reason) => this.onConnectionClosed(wsClient, station, code, reason));
            wsClient.on('pong', () => wsClient.pongHandler());
            return wsClient;
        };
        this.onConnectionOpen = (wsClient, station) => {
            this.logger.log(`Connection opened for station ${station.identity}`);
            wsClient.stationIdentity = station.identity;
            wsClient.connectedTime = new Date();
            const bootMessage = this.byChargePointOperationMessageGenerator.createMessage('BootNotification', station, wsClient.getMessageIdForCall());
            wsClient.sendCallMsgForOperation(bootMessage, OperationNameFromChargePoint_1.OperationNameFromChargePoint.BootNotification);
            this.createHeartbeatInterval(wsClient, station);
            if (station.chargeInProgress) {
                this.createMeterValueInterval(wsClient, station);
            }
            wsClient.createConnectionCheckInterval();
        };
        this.onMessage = (wsClient, station, data) => {
            let parsedMessage;
            try {
                parsedMessage = JSON.parse(data);
            }
            catch (error) {
                this.logger.error(`Error parsing message: ${data}`);
                return;
            }
            const messageType = parsedMessage[0];
            switch (messageType) {
                case ChargePointMessageTypes_1.ChargePointMessageTypes.Call: {
                    const operationName = parsedMessage[2];
                    this.logger.log(`Received Call message (identity: ${station.identity}) for operation ${operationName}: ${data}`);
                    const msgHandler = this.callMsgHandlerFactory.getHandler(operationName);
                    msgHandler === null || msgHandler === void 0 ? void 0 : msgHandler.handle(wsClient, station, data);
                    break;
                }
                case ChargePointMessageTypes_1.ChargePointMessageTypes.CallResult: {
                    const [, reqId] = parsedMessage;
                    this.logger.log(`Received CallResult message (identity: ${station.identity}) for operation ${wsClient.callMessageOperationFromStation}: ${data}`);
                    if (!wsClient.isLastMessageIdSimilar(reqId)) {
                        this.logger.error(`Received incorrect reqId. wsClient.lastMessageId: ${wsClient.lastMessageId}. Received message: ${data}`, null, `Identity ${station.identity}`);
                        return;
                    }
                    const msgHandler = this.callResultMsgHandlerFactory.getHandler(wsClient.callMessageOperationFromStation);
                    msgHandler === null || msgHandler === void 0 ? void 0 : msgHandler.handle(wsClient, station, parsedMessage);
                    wsClient.callResultMessageFromCS = wsClient.expectingCallResult ? data : null;
                    wsClient.callMessageOperationFromStation = '';
                    wsClient.clearRemoveCallMsgOperationNameTimer();
                    break;
                }
                default:
                    this.logger.log('data does not have correct messageTypeId', data);
            }
        };
        this.onConnectionClosed = (wsClient, station, code, reason) => {
            clearInterval(wsClient.heartbeatInterval);
            clearInterval(wsClient.meterValueInterval);
            wsClient.clearConnectionCheckInterval();
            if (wsClient === null || wsClient === void 0 ? void 0 : wsClient.connectedTime) {
                const connectedDurationInSeconds = (new Date().getTime() - wsClient.connectedTime.getTime()) / 1000;
                const connectedMinutes = Math.floor(connectedDurationInSeconds / 60);
                const extraConnectedSeconds = connectedDurationInSeconds % 60;
                this.logger.log(`Duration of the connection: ${connectedMinutes} minutes & ${extraConnectedSeconds} seconds. Closing connection ${station.identity}. Code: ${code}. Reason: ${reason}.`);
            }
        };
        this.waitForMessage = (wsClient) => {
            return new Promise(resolve => {
                const { WAIT_FOR_MESSAGE_CHECK_INTERVAL_IN_MS: waitForMessageCheckIntervalInMs, WAIT_FOR_MESSAGE_CHECK_MAX_ATTEMPTS: waitForMessageCheckMaxAttempts, } = process.env;
                let currentAttemp = 0;
                const interval = setInterval(() => {
                    if (currentAttemp > Number(waitForMessageCheckMaxAttempts) - 1) {
                        clearInterval(interval);
                        this.logger.log('Server does not respond');
                        return resolve(null);
                    }
                    else if (wsClient.callResultMessageFromCS) {
                        clearInterval(interval);
                        return resolve(wsClient.callResultMessageFromCS);
                    }
                    this.logger.debug('Message not yet received, checking for more');
                    currentAttemp++;
                }, Number(waitForMessageCheckIntervalInMs));
            });
        };
    }
    createHeartbeatInterval(wsClient, station) {
        wsClient.heartbeatInterval = setInterval(() => {
            if (wsClient.meterValueInterval)
                return;
            const heartbeatMessage = this.byChargePointOperationMessageGenerator.createMessage(OperationNameFromChargePoint_1.OperationNameFromChargePoint.Heartbeat, station, wsClient.getMessageIdForCall());
            wsClient.sendCallMsgForOperation(heartbeatMessage, OperationNameFromChargePoint_1.OperationNameFromChargePoint.Heartbeat);
        }, 60000);
    }
    createMeterValueInterval(wsClient, station) {
        clearInterval(wsClient.meterValueInterval);
        wsClient.meterValueInterval = setInterval(async () => {
            await station.reload();
            station.meterValue =
                station.meterValue + utils_1.calculatePowerUsageInWh(station.updatedAt, station.currentChargingPower);
            await station.save();
            const message = this.byChargePointOperationMessageGenerator.createMessage(OperationNameFromChargePoint_1.OperationNameFromChargePoint.MeterValues, station, wsClient.getMessageIdForCall(), { value: station.meterValue });
            wsClient.sendCallMsgForOperation(message, OperationNameFromChargePoint_1.OperationNameFromChargePoint.MeterValues);
        }, 60000);
    }
    onError(err) {
        var _a, _b;
        this.logger.error(`Error: ${(_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : ''}`, (_b = err.stack) !== null && _b !== void 0 ? _b : '');
    }
    async prepareAndSendMessageToCentralSystem(wsClient, station, operationName, payload) {
        const message = this.byChargePointOperationMessageGenerator.createMessage(operationName, station, wsClient.getMessageIdForCall(), payload);
        if (!message) {
            throw new common_1.BadRequestException(`Cannot form message for operation ${operationName}`);
        }
        wsClient.sendCallMsgForOperation(message, operationName);
        wsClient.expectingCallResult = true;
        const response = await this.waitForMessage(wsClient);
        wsClient.callResultMessageFromCS = null;
        wsClient.expectingCallResult = false;
        return { request: message, response };
    }
};
StationWebSocketService = StationWebSocketService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [by_charge_point_operation_message_generator_1.ByChargePointOperationMessageGenerator,
        call_msg_handler_factory_1.CallMsgHandlerFactory,
        call_result_msg_handler_factory_1.CallResultMsgHandlerFactory])
], StationWebSocketService);
exports.StationWebSocketService = StationWebSocketService;
//# sourceMappingURL=station-websocket.service.js.map