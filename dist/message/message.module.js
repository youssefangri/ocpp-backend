"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const authorize_request_builder_1 = require("./by-charge-point/authorize-request-builder");
const boot_notification_request_builder_1 = require("./by-charge-point/boot-notification-request-builder");
const by_charge_point_operation_message_generator_1 = require("./by-charge-point/by-charge-point-operation-message-generator");
const by_charge_point_request_builder_factory_1 = require("./by-charge-point/by-charge-point-request-builder-factory");
const heartbeat_request_builder_1 = require("./by-charge-point/heartbeat-request-builder");
const meter_values_request_builder_1 = require("./by-charge-point/meter-values-request-builder");
const start_transaction_request_builder_1 = require("./by-charge-point/start-transaction-request-builder");
const status_notification_request_builder_1 = require("./by-charge-point/status-notification-request-builder");
const stop_transaction_request_builder_1 = require("./by-charge-point/stop-transaction-request-builder");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [],
        providers: [
            authorize_request_builder_1.AuthorizeRequestBuilder,
            boot_notification_request_builder_1.BootNotificationRequestBuilder,
            heartbeat_request_builder_1.HeartbeatRequestBuilder,
            meter_values_request_builder_1.MeterValuesRequestBuilder,
            start_transaction_request_builder_1.StartTransactionRequestBuilder,
            status_notification_request_builder_1.StatusNotificationRequestBuilder,
            stop_transaction_request_builder_1.StopTransactionRequestBuilder,
            by_charge_point_request_builder_factory_1.ByChargePointRequestBuilderFactory,
            by_charge_point_operation_message_generator_1.ByChargePointOperationMessageGenerator,
        ],
        exports: [by_charge_point_operation_message_generator_1.ByChargePointOperationMessageGenerator],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map