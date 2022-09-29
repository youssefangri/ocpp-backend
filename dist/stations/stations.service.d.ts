import { CreateOrUpdateStationDto } from './dto/create-update-station.dto';
import { GetStationsFilterDto } from './dto/get-station-filter.dto';
import { Station } from './station.entity';
import { StationRepository } from './station.repository';
import { StationWebSocketService } from './station-websocket.service';
import { StationWebSocketClient } from './station-websocket-client';
import { StationOperationDto } from './dto/station-operation-dto';
export declare class StationsService {
    private stationRepository;
    private stationWebSocketService;
    private logger;
    connectedStationsClients: Set<StationWebSocketClient>;
    constructor(stationRepository: StationRepository, stationWebSocketService: StationWebSocketService);
    getStations(filterDto: GetStationsFilterDto): Promise<Station[]>;
    getStationById(id: number): Promise<Station>;
    createStation(createStationDto: CreateOrUpdateStationDto): Promise<Station>;
    updateStation(id: number, updateStationDto: CreateOrUpdateStationDto): Promise<Station>;
    connectStationToCentralSystem(station: Station): void;
    connectAllStationsToCentralSystem(): Promise<void>;
    sendStationOperationRequest(id: number, operationName: string, stationOperationDto: StationOperationDto): Promise<{
        request: string;
        response: string;
    }>;
}
