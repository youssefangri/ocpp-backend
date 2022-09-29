import { Station } from 'src/stations/station.entity';
import { ByChargePointRequestBuilderFactory } from './by-charge-point-request-builder-factory';
import { OperationNameFromChargePoint } from '../../models/OperationNameFromChargePoint';
export declare class ByChargePointOperationMessageGenerator {
    private readonly byChargePointRequestBuilderFactory;
    constructor(byChargePointRequestBuilderFactory: ByChargePointRequestBuilderFactory);
    createMessage(operationName: string | OperationNameFromChargePoint, station: Station, uniqueId: number, payload?: any): string;
}
