import { MeterValue } from './MeterValue';
export declare class MeterValuesRequest {
    connectorId: number;
    transactionId?: number;
    meterValue: MeterValue[];
}
