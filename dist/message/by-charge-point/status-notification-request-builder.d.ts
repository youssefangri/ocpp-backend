import { ByChargePointRequestBuilderInterface } from './by-charge-point-request-builder-interface';
import { Station } from '../../stations/station.entity';
import { StatusNotificationRequest } from '../../models/StatusNotificationRequest';
export declare class StatusNotificationRequestBuilder implements ByChargePointRequestBuilderInterface {
    build(_: Station, payload: any): StatusNotificationRequest;
    getOperationName: () => string;
}
