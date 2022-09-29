/// <reference types="node" />
import * as WebSocket from 'ws';
export declare class StationWebSocketClient extends WebSocket {
    private logger;
    private _lastMessageId;
    stationIdentity: string;
    connectedTime: Date;
    heartbeatInterval: NodeJS.Timeout;
    meterValueInterval: NodeJS.Timeout;
    callResultMessageFromCS?: string;
    expectingCallResult: boolean;
    private _callMessageOperationFromStation;
    private removeCallMsgOperationNameTimer;
    private _pendingMessageId;
    private connectionCheckInterval;
    private _isAlive;
    get callMessageOperationFromStation(): string;
    set callMessageOperationFromStation(operation: string);
    get lastMessageId(): number;
    get pendingMessageId(): number;
    getMessageIdForCall: () => number;
    sendCallMsgForOperation(msg: string, operationName: string): void;
    clearRemoveCallMsgOperationNameTimer: () => void;
    isLastMessageIdSimilar(reqId: string): boolean;
    createConnectionCheckInterval(): void;
    clearConnectionCheckInterval(): void;
    pongHandler(): void;
    get isAlive(): boolean;
}
