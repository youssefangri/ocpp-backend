"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_module_1 = require("../message/message.module");
const call_msg_handler_factory_1 = require("./handler/call-msg/call-msg-handler-factory");
const remote_start_transaction_msg_handler_1 = require("./handler/call-msg/remote-start-transaction-msg-handler");
const remote_stop_transaction_msg_handler_1 = require("./handler/call-msg/remote-stop-transaction-msg-handler");
const reset_msg_handler_1 = require("./handler/call-msg/reset-msg-handler");
const call_result_msg_handler_factory_1 = require("./handler/call-result-msg/call-result-msg-handler-factory");
const start_transaction_result_msg_handler_1 = require("./handler/call-result-msg/start-transaction-result-msg-handler");
const stop_transaction_result_msg_handler_1 = require("./handler/call-result-msg/stop-transaction-result-msg-handler");
const station_websocket_service_1 = require("./station-websocket.service");
const station_repository_1 = require("./station.repository");
const stations_controller_1 = require("./stations.controller");
const stations_service_1 = require("./stations.service");
let StationsModule = class StationsModule {
};
StationsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([station_repository_1.StationRepository]), message_module_1.MessageModule],
        controllers: [stations_controller_1.StationsController],
        providers: [
            station_websocket_service_1.StationWebSocketService,
            stations_service_1.StationsService,
            call_msg_handler_factory_1.CallMsgHandlerFactory,
            call_result_msg_handler_factory_1.CallResultMsgHandlerFactory,
            start_transaction_result_msg_handler_1.StartTransactionResultMsgHandler,
            stop_transaction_result_msg_handler_1.StopTransactionResultMsgHandler,
            remote_start_transaction_msg_handler_1.RemoteStartTransactionMsgHandler,
            remote_stop_transaction_msg_handler_1.RemoteStopTransactionMsgHandler,
            reset_msg_handler_1.ResetMsgHandler,
        ],
        exports: [stations_service_1.StationsService],
    })
], StationsModule);
exports.StationsModule = StationsModule;
//# sourceMappingURL=stations.module.js.map