import { CreateOrUpdateStationDto } from './dto/create-update-station.dto';
import { GetStationsFilterDto } from './dto/get-station-filter.dto';
import { StationOperationDto } from './dto/station-operation-dto';
import { Station } from './station.entity';
import { StationsService } from './stations.service';
export declare class StationsController {
    private stationsService;
    private logger;
    constructor(stationsService: StationsService);
    getStations(filterDto: GetStationsFilterDto): Promise<Station[]>;
    getStationById(id: number): Promise<Station>;
    createStation(createStationDto: CreateOrUpdateStationDto): Promise<Station>;
    updateStation(id: number, updateStationDto: CreateOrUpdateStationDto): Promise<Station>;
    createStationOperation(id: number, operationName: string, stationOperationDto: StationOperationDto): Promise<{
        request: string;
        response: string;
    }>;
}
