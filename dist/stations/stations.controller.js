"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationsController = void 0;
const common_1 = require("@nestjs/common");
const create_update_station_dto_1 = require("./dto/create-update-station.dto");
const get_station_filter_dto_1 = require("./dto/get-station-filter.dto");
const station_operation_dto_1 = require("./dto/station-operation-dto");
const stations_service_1 = require("./stations.service");
let StationsController = class StationsController {
    constructor(stationsService) {
        this.stationsService = stationsService;
        this.logger = new common_1.Logger('StationsController');
    }
    getStations(filterDto) {
        this.logger.log(`Getting all stations.`);
        return this.stationsService.getStations(filterDto);
    }
    getStationById(id) {
        return this.stationsService.getStationById(id);
    }
    createStation(createStationDto) {
        this.logger.log(`Creating new station. Data: ${JSON.stringify(createStationDto)}`);
        return this.stationsService.createStation(createStationDto);
    }
    updateStation(id, updateStationDto) {
        return this.stationsService.updateStation(id, updateStationDto);
    }
    createStationOperation(id, operationName, stationOperationDto) {
        return this.stationsService.sendStationOperationRequest(id, operationName, stationOperationDto);
    }
};
__decorate([
    common_1.Get(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_station_filter_dto_1.GetStationsFilterDto]),
    __metadata("design:returntype", Promise)
], StationsController.prototype, "getStations", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StationsController.prototype, "getStationById", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_update_station_dto_1.CreateOrUpdateStationDto]),
    __metadata("design:returntype", Promise)
], StationsController.prototype, "createStation", null);
__decorate([
    common_1.Put('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_update_station_dto_1.CreateOrUpdateStationDto]),
    __metadata("design:returntype", void 0)
], StationsController.prototype, "updateStation", null);
__decorate([
    common_1.Post('/:id/operations/:operation'),
    common_1.HttpCode(200),
    common_1.UsePipes(new common_1.ValidationPipe({ skipMissingProperties: true })),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __param(1, common_1.Param('operation')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, station_operation_dto_1.StationOperationDto]),
    __metadata("design:returntype", void 0)
], StationsController.prototype, "createStationOperation", null);
StationsController = __decorate([
    common_1.Controller('stations'),
    __metadata("design:paramtypes", [stations_service_1.StationsService])
], StationsController);
exports.StationsController = StationsController;
//# sourceMappingURL=stations.controller.js.map