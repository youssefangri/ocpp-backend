import { AuthorizeRequest } from './AuthorizeRequest';
import { BootNotifcationRequest } from './BootNotificationRequest';
import { HeartbeatRequest } from './HeartbeatRequest';
import { MeterValuesRequest } from './MeterValuesRequest';
import { StartTransactionRequest } from './StartTransactionRequest';
import { StatusNotificationRequest } from './StatusNotificationRequest';
import { StopTransactionRequest } from './StopTransactionRequest';
export declare type ByChargePointRequestTypes = BootNotifcationRequest | HeartbeatRequest | AuthorizeRequest | StartTransactionRequest | StopTransactionRequest | StatusNotificationRequest | MeterValuesRequest;
