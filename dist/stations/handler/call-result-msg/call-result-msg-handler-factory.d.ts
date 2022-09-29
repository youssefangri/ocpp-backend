import { CallResultMsgHandlerInterface } from './call-result-msg-handler-interface';
import { StartTransactionResultMsgHandler } from './start-transaction-result-msg-handler';
import { StopTransactionResultMsgHandler } from './stop-transaction-result-msg-handler';
export declare class CallResultMsgHandlerFactory {
    private startTransactionResultMsgHandler;
    private stopTransactionResultMsgHandler;
    constructor(startTransactionResultMsgHandler: StartTransactionResultMsgHandler, stopTransactionResultMsgHandler: StopTransactionResultMsgHandler);
    getHandler(operationName: string): CallResultMsgHandlerInterface | null;
}
