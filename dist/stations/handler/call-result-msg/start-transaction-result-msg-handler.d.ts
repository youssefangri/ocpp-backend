import { StationRepository } from '../../../stations/station.repository';
import { StationWebSocketClient } from '../../../stations/station-websocket-client';
import { Station } from '../../../stations/station.entity';
import { CallResultMsgHandlerInterface } from './call-result-msg-handler-interface';
import { ByChargePointOperationMessageGenerator } from '../../../message/by-charge-point/by-charge-point-operation-message-generator';
import { CallResultMessage } from '../../../models/CallResultMessage';
export declare class StartTransactionResultMsgHandler implements CallResultMsgHandlerInterface {
    private stationRepository;
    private byChargePointOperationMessageGenerator;
    private logger;
    constructor(stationRepository: StationRepository, byChargePointOperationMessageGenerator: ByChargePointOperationMessageGenerator);
    handle(wsClient: StationWebSocketClient, station: Station, parsedMessage: CallResultMessage): Promise<void>;
    private createMeterValueInterval;
}
