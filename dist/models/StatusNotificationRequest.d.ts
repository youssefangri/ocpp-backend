import { StatusNotificationErrorCodeEnum } from './StatusNotificationErrorCodeEnum';
import { StatusNotificationStatusEnum } from './StatusNotificationStatusEnum';
export declare class StatusNotificationRequest {
    connectorId: number;
    errorCode: StatusNotificationErrorCodeEnum;
    status: StatusNotificationStatusEnum;
    info?: string;
    timestamp?: string;
    vendorId?: string;
    vendorErrorCode?: string;
}
