import { ByChargePointOperationMessageGenerator } from '../message/by-charge-point/by-charge-point-operation-message-generator';
import { StationOperationDto } from './dto/station-operation-dto';
import { StationWebSocketClient } from './station-websocket-client';
import { Station } from './station.entity';
import { CallMsgHandlerFactory } from './handler/call-msg/call-msg-handler-factory';
import { CallResultMsgHandlerFactory } from './handler/call-result-msg/call-result-msg-handler-factory';
export declare class StationWebSocketService {
    private byChargePointOperationMessageGenerator;
    private callMsgHandlerFactory;
    private callResultMsgHandlerFactory;
    private logger;
    constructor(byChargePointOperationMessageGenerator: ByChargePointOperationMessageGenerator, callMsgHandlerFactory: CallMsgHandlerFactory, callResultMsgHandlerFactory: CallResultMsgHandlerFactory);
    createStationWebSocket: (station: Station) => StationWebSocketClient;
    onConnectionOpen: (wsClient: StationWebSocketClient, station: Station) => void;
    private createHeartbeatInterval;
    private createMeterValueInterval;
    onMessage: (wsClient: StationWebSocketClient, station: Station, data: string) => void;
    onError(err: Error): void;
    onConnectionClosed: (wsClient: StationWebSocketClient, station: Station, code: number, reason: string) => void;
    prepareAndSendMessageToCentralSystem(wsClient: StationWebSocketClient, station: Station, operationName: string, payload: StationOperationDto): Promise<{
        request: string;
        response: string;
    }>;
    waitForMessage: (wsClient: StationWebSocketClient) => Promise<string | null>;
}
