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
exports.StationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const station_repository_1 = require("./station.repository");
const station_websocket_service_1 = require("./station-websocket.service");
const WebSocketReadyStates_1 = require("../models/WebSocketReadyStates");
let StationsService = class StationsService {
    constructor(stationRepository, stationWebSocketService) {
        this.stationRepository = stationRepository;
        this.stationWebSocketService = stationWebSocketService;
        this.logger = new common_1.Logger('StationsService');
        this.connectedStationsClients = new Set();
    }
    async getStations(filterDto) {
        return this.stationRepository.getStations(filterDto);
    }
    async getStationById(id) {
        const station = await this.stationRepository.findOne(id);
        if (!station) {
            throw new common_1.NotFoundException(`Station ${id} not found`);
        }
        return station;
    }
    async createStation(createStationDto) {
        this.logger.log(`Adding to db`);
        const station = await this.stationRepository.createStation(createStationDto);
        this.logger.log(`Station is ${station}`);
        this.connectStationToCentralSystem(station);
        return station;
    }
    async updateStation(id, updateStationDto) {
        const station = await this.getStationById(id);
        return this.stationRepository.updateStation(station, updateStationDto);
    }
    connectStationToCentralSystem(station) {
        const newStationWebSocketClient = this.stationWebSocketService.createStationWebSocket(station);
        if (newStationWebSocketClient) {
            this.connectedStationsClients.add(newStationWebSocketClient);
        }
    }
    async connectAllStationsToCentralSystem() {
        var _a;
        let dbStations = [];
        try {
            dbStations = await this.getStations({});
        }
        catch (error) {
            this.logger.error(`Error fetching stations information`, (_a = error === null || error === void 0 ? void 0 : error.stack) !== null && _a !== void 0 ? _a : '');
        }
        this.connectedStationsClients.forEach(client => {
            if (client.readyState !== WebSocketReadyStates_1.WebSocketReadyStates.CONNECTING && client.readyState !== WebSocketReadyStates_1.WebSocketReadyStates.OPEN) {
                this.logger.log(`Connection ${client.stationIdentity} is dead. Removing`);
                this.connectedStationsClients.delete(client);
            }
        });
        const connectedStationsIdentity = [...this.connectedStationsClients].map(client => client.stationIdentity);
        const unconnectedStations = dbStations.filter(dbStation => !connectedStationsIdentity.includes(dbStation.identity));
        unconnectedStations.forEach(station => this.connectStationToCentralSystem(station));
    }
    async sendStationOperationRequest(id, operationName, stationOperationDto) {
        const station = await this.getStationById(id);
        const wsClient = [...this.connectedStationsClients].find(st => st.stationIdentity === station.identity);
        if (!wsClient || wsClient.readyState !== WebSocketReadyStates_1.WebSocketReadyStates.OPEN) {
            throw new common_1.BadRequestException(`Station WS client not found or not connected! ${wsClient === null || wsClient === void 0 ? void 0 : wsClient.readyState}`);
        }
        const { request, response } = await this.stationWebSocketService.prepareAndSendMessageToCentralSystem(wsClient, station, operationName, stationOperationDto);
        this.logger.log(`Response to be sent to API client: ${JSON.stringify(response)}`);
        return { request, response };
    }
};
StationsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(station_repository_1.StationRepository)),
    __metadata("design:paramtypes", [station_repository_1.StationRepository,
        station_websocket_service_1.StationWebSocketService])
], StationsService);
exports.StationsService = StationsService;
//# sourceMappingURL=stations.service.js.map