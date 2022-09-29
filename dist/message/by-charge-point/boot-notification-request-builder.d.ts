import { BootNotifcationRequest } from '../../models/BootNotificationRequest';
import { Station } from 'src/stations/station.entity';
import { ByChargePointRequestBuilderInterface } from './by-charge-point-request-builder-interface';
export declare class BootNotificationRequestBuilder implements ByChargePointRequestBuilderInterface {
    build(station: Station, payload: any): BootNotifcationRequest;
    getOperationName: () => string;
}
