"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationRepository = void 0;
const typeorm_1 = require("typeorm");
const station_entity_1 = require("./station.entity");
let StationRepository = class StationRepository extends typeorm_1.Repository {
    async createStation(createStationDto) {
        var _a;
        const { identity, centralSystemUrl, meterValue, currentChargingPower } = createStationDto;
        let latestStation = null;
        if (!identity) {
            latestStation = await this.getLatestStation();
        }
        const station = this.create();
        station.identity = identity !== null && identity !== void 0 ? identity : `${process.env.DEFAULT_IDENTITY_NAME}${((_a = latestStation === null || latestStation === void 0 ? void 0 : latestStation.id) !== null && _a !== void 0 ? _a : 0) + 1}`;
        station.centralSystemUrl = centralSystemUrl !== null && centralSystemUrl !== void 0 ? centralSystemUrl : `${process.env.DEFAULT_CENTRAL_SYSTEM_URL}`;
        station.meterValue = meterValue !== null && meterValue !== void 0 ? meterValue : 0;
        station.currentChargingPower = currentChargingPower !== null && currentChargingPower !== void 0 ? currentChargingPower : 11000;
        await station.save();
        return station;
    }
    async getLatestStation() {
        const query = this.createQueryBuilder('station');
        return await query.orderBy('id', 'DESC').getOne();
    }
    async updateStation(station, updateStationDto) {
        Object.keys(updateStationDto).forEach(key => {
            station[key] = updateStationDto[key];
        });
        await station.save();
        return station;
    }
    async getStations(filterDto) {
        const { identity } = filterDto;
        const query = this.createQueryBuilder('station');
        if (identity) {
            query.andWhere('station.identity like :identity', {
                identity: `%${identity}%`,
            });
        }
        const stations = await query.getMany();
        return stations;
    }
};
StationRepository = __decorate([
    typeorm_1.EntityRepository(station_entity_1.Station)
], StationRepository);
exports.StationRepository = StationRepository;
//# sourceMappingURL=station.repository.js.map