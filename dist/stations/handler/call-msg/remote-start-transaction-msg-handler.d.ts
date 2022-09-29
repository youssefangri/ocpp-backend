import { ByChargePointOperationMessageGenerator } from '../../../message/by-charge-point/by-charge-point-operation-message-generator';
import { StationWebSocketClient } from '../../station-websocket-client';
import { Station } from '../../station.entity';
import { CallMsgHandlerInterface } from './call-msg-handler-interface';
export declare class RemoteStartTransactionMsgHandler implements CallMsgHandlerInterface {
    private byChargePointOperationMessageGenerator;
    private logger;
    constructor(byChargePointOperationMessageGenerator: ByChargePointOperationMessageGenerator);
    handle(wsClient: StationWebSocketClient, station: Station, requestFromCS: string): void;
    private buildResponseMsg;
}
