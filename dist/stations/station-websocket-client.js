"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationWebSocketClient = void 0;
const common_1 = require("@nestjs/common");
const WebSocket = require("ws");
class StationWebSocketClient extends WebSocket {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(StationWebSocketClient.name);
        this._lastMessageId = 0;
        this.stationIdentity = '';
        this.connectedTime = null;
        this.heartbeatInterval = null;
        this.meterValueInterval = null;
        this.callResultMessageFromCS = null;
        this.expectingCallResult = false;
        this._callMessageOperationFromStation = '';
        this.removeCallMsgOperationNameTimer = null;
        this._pendingMessageId = 0;
        this.connectionCheckInterval = null;
        this._isAlive = true;
        this.getMessageIdForCall = () => {
            this._pendingMessageId = this.lastMessageId + 1;
            return this._pendingMessageId;
        };
        this.clearRemoveCallMsgOperationNameTimer = () => {
            clearTimeout(this.removeCallMsgOperationNameTimer);
        };
    }
    get callMessageOperationFromStation() {
        return this._callMessageOperationFromStation;
    }
    set callMessageOperationFromStation(operation) {
        this._callMessageOperationFromStation = operation;
    }
    get lastMessageId() {
        return this._lastMessageId;
    }
    get pendingMessageId() {
        return this._pendingMessageId;
    }
    sendCallMsgForOperation(msg, operationName) {
        if (this.callMessageOperationFromStation) {
            this.logger.error(`Ongoing operation: ${this.callMessageOperationFromStation}. Not sending ${msg}`);
            return;
        }
        this._lastMessageId = this._pendingMessageId;
        this.logger.verbose(JSON.stringify({
            message: "Sending message for station",
            stationIdentity: this.stationIdentity,
            operationName,
            rawMessage: msg,
        }));
        this.send(msg);
        this.callMessageOperationFromStation = operationName;
        const { WAIT_FOR_MESSAGE_CHECK_INTERVAL_IN_MS: waitForMessageCheckIntervalInMs, WAIT_FOR_MESSAGE_CHECK_MAX_ATTEMPTS: waitForMessageCheckMaxAttempts, } = process.env;
        const removeCallMsgOperationNameTimeoutInMs = Number(waitForMessageCheckIntervalInMs) * Number(waitForMessageCheckMaxAttempts);
        this.removeCallMsgOperationNameTimer = setTimeout(() => {
            this.callMessageOperationFromStation = '';
        }, removeCallMsgOperationNameTimeoutInMs);
    }
    isLastMessageIdSimilar(reqId) {
        return this._lastMessageId.toString() === reqId;
    }
    createConnectionCheckInterval() {
        this.connectionCheckInterval = setInterval(() => {
            if (this._isAlive === false) {
                this.logger.log(`Connection from ${this.stationIdentity} is broken from ping-pong check. Terminating`);
                return this.terminate();
            }
            this._isAlive = false;
            this.ping();
        }, 60000);
    }
    clearConnectionCheckInterval() {
        clearTimeout(this.connectionCheckInterval);
    }
    pongHandler() {
        this._isAlive = true;
    }
    get isAlive() {
        return this._isAlive;
    }
}
exports.StationWebSocketClient = StationWebSocketClient;
//# sourceMappingURL=station-websocket-client.js.map