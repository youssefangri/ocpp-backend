import { MeterValue } from './MeterValue';
export declare class StopTransactionRequest {
    transactionId: number;
    timestamp: string;
    meterStop: number;
    transactionData?: MeterValue[];
}
