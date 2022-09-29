import { Repository } from 'typeorm';
import { CreateOrUpdateStationDto } from './dto/create-update-station.dto';
import { GetStationsFilterDto } from './dto/get-station-filter.dto';
import { Station } from './station.entity';
export declare class StationRepository extends Repository<Station> {
    createStation(createStationDto: CreateOrUpdateStationDto): Promise<Station>;
    getLatestStation(): Promise<Station>;
    updateStation(station: Station, updateStationDto: CreateOrUpdateStationDto): Promise<Station>;
    getStations(filterDto: GetStationsFilterDto): Promise<Station[]>;
}
