import { BaseEntity } from 'typeorm';
export declare class Station extends BaseEntity {
    id: number;
    identity: string;
    vendor: string;
    model: string;
    centralSystemUrl: string;
    meterValue: string;
    chargeInProgress: boolean;
    currentTransactionId: number;
    currentChargingPower: number;
    createdAt: Date;
    updatedAt: Date;
}
