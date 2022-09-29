"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const stations_service_1 = require("./stations/stations.service");
const port = process.env.APP_PORT || 8080;
async function bootstrap() {
    const logger = new common_1.Logger('bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const stationsService = app.get(stations_service_1.StationsService);
    await stationsService.connectAllStationsToCentralSystem();
    setInterval(() => {
        stationsService.connectAllStationsToCentralSystem();
    }, 30000);
    await app.listen(port);
    logger.log(`Application listenning on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map