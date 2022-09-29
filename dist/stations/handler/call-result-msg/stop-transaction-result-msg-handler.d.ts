import { ByChargePointOperationMessageGenerator } from '../../../message/by-charge-point/by-charge-point-operation-message-generator';
import { CallResultMessage } from '../../../models/CallResultMessage';
import { StationWebSocketClient } from '../../station-websocket-client';
import { Station } from '../../station.entity';
import { StationRepository } from '../../station.repository';
import { CallResultMsgHandlerInterface } from './call-result-msg-handler-interface';
export declare class StopTransactionResultMsgHandler implements CallResultMsgHandlerInterface {
    private stationRepository;
    private byChargePointOperationMessageGenerator;
    private logger;
    constructor(stationRepository: StationRepository, byChargePointOperationMessageGenerator: ByChargePointOperationMessageGenerator);
    handle(wsClient: StationWebSocketClient, station: Station, parsedMessage: CallResultMessage): void | Promise<void>;
}
