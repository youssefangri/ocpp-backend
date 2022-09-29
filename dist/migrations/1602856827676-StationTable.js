"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationTable1602856827676 = void 0;
const typeorm_1 = require("typeorm");
class StationTable1602856827676 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'station',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'identity',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'vendor',
                    type: 'varchar(20)',
                    isNullable: false,
                    default: `'${process.env.DEFAULT_VENDOR}'`,
                },
                {
                    name: 'model',
                    type: 'varchar(20)',
                    isNullable: false,
                    default: `'${process.env.DEFAULT_MODEL}'`,
                },
                {
                    name: 'centralSystemUrl',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'meterValue',
                    type: 'string',
                    unsigned: true,
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'chargeInProgress',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                },
                {
                    name: 'currentTransactionId',
                    type: 'int',
                    unsigned: true,
                    isNullable: true,
                },
                {
                    name: 'currentChargingPower',
                    type: 'int',
                    unsigned: true,
                    isNullable: false,
                    default: 11000,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }
    async down(queryRunner) {
        queryRunner.query('DROP TABLE station;');
    }
}
exports.StationTable1602856827676 = StationTable1602856827676;
//# sourceMappingURL=1602856827676-StationTable.js.map