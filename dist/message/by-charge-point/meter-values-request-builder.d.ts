import { ByChargePointRequestBuilderInterface } from './by-charge-point-request-builder-interface';
import { Station } from '../../stations/station.entity';
import { MeterValuesRequest } from '../../models/MeterValuesRequest';
export declare class MeterValuesRequestBuilder implements ByChargePointRequestBuilderInterface {
    build(station: Station, payload: any): MeterValuesRequest;
    getOperationName: () => string;
}
