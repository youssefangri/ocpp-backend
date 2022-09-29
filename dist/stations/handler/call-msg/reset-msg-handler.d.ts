import { StationWebSocketClient } from '../../station-websocket-client';
import { Station } from '../../station.entity';
import { CallMsgHandlerInterface } from './call-msg-handler-interface';
export declare class ResetMsgHandler implements CallMsgHandlerInterface {
    private logger;
    handle(wsClient: StationWebSocketClient, station: Station, requestFromCS: string): Promise<void>;
    private buildResponseMsg;
}
