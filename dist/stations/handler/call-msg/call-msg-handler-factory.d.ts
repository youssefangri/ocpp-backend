import { OperationNameFromCentralSystem } from '../../../models/OperationNameFromCentralSystem';
import { CallMsgHandlerInterface } from './call-msg-handler-interface';
import { RemoteStartTransactionMsgHandler } from './remote-start-transaction-msg-handler';
import { RemoteStopTransactionMsgHandler } from './remote-stop-transaction-msg-handler';
import { ResetMsgHandler } from './reset-msg-handler';
export declare class CallMsgHandlerFactory {
    private remoteStartTransactionMsgHandler;
    private remoteStopTransactionMsgHandler;
    private resetMsgHandler;
    constructor(remoteStartTransactionMsgHandler: RemoteStartTransactionMsgHandler, remoteStopTransactionMsgHandler: RemoteStopTransactionMsgHandler, resetMsgHandler: ResetMsgHandler);
    getHandler(operationName: OperationNameFromCentralSystem): CallMsgHandlerInterface | null;
}
