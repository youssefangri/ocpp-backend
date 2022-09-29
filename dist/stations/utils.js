"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePowerUsageInWh = void 0;
const calculatePowerUsageInWh = (startTime, chargingPower) => {
    const hours = (new Date().getTime() - startTime.getTime()) / 1000 / 3600;
    return Math.floor(chargingPower * hours);
};
exports.calculatePowerUsageInWh = calculatePowerUsageInWh;
//# sourceMappingURL=utils.js.map