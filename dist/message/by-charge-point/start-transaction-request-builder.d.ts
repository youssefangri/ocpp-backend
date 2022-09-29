import { ByChargePointRequestBuilderInterface } from './by-charge-point-request-builder-interface';
import { Station } from 'src/stations/station.entity';
import { StartTransactionRequest } from '../../models/StartTransactionRequest';
export declare class StartTransactionRequestBuilder implements ByChargePointRequestBuilderInterface {
    build(station: Station, payload: any): StartTransactionRequest;
    getOperationName: () => string;
}
