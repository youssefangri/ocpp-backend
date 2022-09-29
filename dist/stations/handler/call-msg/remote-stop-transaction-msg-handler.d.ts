import { ByChargePointOperationMessageGenerator } from '../../../message/by-charge-point/by-charge-point-operation-message-generator';
import { StationWebSocketClient } from '../../station-websocket-client';
import { Station } from '../../station.entity';
import { CallMsgHandlerInterface } from './call-msg-handler-interface';
import { StationRepository } from '../../station.repository';
export declare class RemoteStopTransactionMsgHandler implements CallMsgHandlerInterface {
    private stationRepository;
    private byChargePointOperationMessageGenerator;
    private logger;
    constructor(stationRepository: StationRepository, byChargePointOperationMessageGenerator: ByChargePointOperationMessageGenerator);
    handle(wsClient: StationWebSocketClient, station: Station, requestFromCS: string): Promise<void>;
    private buildResponse;
}
