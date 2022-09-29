import { AuthorizeRequestBuilder } from './authorize-request-builder';
import { BootNotificationRequestBuilder } from './boot-notification-request-builder';
import { ByChargePointRequestBuilderInterface } from './by-charge-point-request-builder-interface';
import { HeartbeatRequestBuilder } from './heartbeat-request-builder';
import { MeterValuesRequestBuilder } from './meter-values-request-builder';
import { StartTransactionRequestBuilder } from './start-transaction-request-builder';
import { StatusNotificationRequestBuilder } from './status-notification-request-builder';
import { StopTransactionRequestBuilder } from './stop-transaction-request-builder';
export declare class ByChargePointRequestBuilderFactory {
    private readonly authorizeRequestBuilder;
    private readonly bootNotificationRequestBuilder;
    private readonly heartbeatRequestBuidler;
    private readonly meterValuesRequestBuilder;
    private readonly startTransactionRequestBuilder;
    private readonly statusNotificationRequestBuilder;
    private readonly stopTransactionRequestBuilder;
    constructor(authorizeRequestBuilder: AuthorizeRequestBuilder, bootNotificationRequestBuilder: BootNotificationRequestBuilder, heartbeatRequestBuidler: HeartbeatRequestBuilder, meterValuesRequestBuilder: MeterValuesRequestBuilder, startTransactionRequestBuilder: StartTransactionRequestBuilder, statusNotificationRequestBuilder: StatusNotificationRequestBuilder, stopTransactionRequestBuilder: StopTransactionRequestBuilder);
    getBuilderFromOperationName(operationName: string): ByChargePointRequestBuilderInterface | null;
}
