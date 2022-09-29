import { ByChargePointRequestBuilderInterface } from './by-charge-point-request-builder-interface';
import { AuthorizeRequest } from '../../models/AuthorizeRequest';
import { Station } from 'src/stations/station.entity';
export declare class AuthorizeRequestBuilder implements ByChargePointRequestBuilderInterface {
    build(_: Station, payload: any): AuthorizeRequest;
    getOperationName: () => string;
}
