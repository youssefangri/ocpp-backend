import { ByChargePointRequestBuilderInterface } from './by-charge-point-request-builder-interface';
import { HeartbeatRequest } from '../../models/HeartbeatRequest';
export declare class HeartbeatRequestBuilder implements ByChargePointRequestBuilderInterface {
    build(): HeartbeatRequest;
    getOperationName: () => string;
}
