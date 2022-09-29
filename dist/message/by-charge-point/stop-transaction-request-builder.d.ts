import { ByChargePointRequestBuilderInterface } from './by-charge-point-request-builder-interface';
import { Station } from 'src/stations/station.entity';
import { StopTransactionRequest } from '../../models/StopTransactionRequest';
export declare class StopTransactionRequestBuilder implements ByChargePointRequestBuilderInterface {
    build(station: Station, payload: any): StopTransactionRequest;
    getOperationName: () => string;
}
