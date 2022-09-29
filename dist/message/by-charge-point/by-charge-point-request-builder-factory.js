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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByChargePointRequestBuilderFactory = void 0;
const common_1 = require("@nestjs/common");
const authorize_request_builder_1 = require("./authorize-request-builder");
const boot_notification_request_builder_1 = require("./boot-notification-request-builder");
const heartbeat_request_builder_1 = require("./heartbeat-request-builder");
const meter_values_request_builder_1 = require("./meter-values-request-builder");
const start_transaction_request_builder_1 = require("./start-transaction-request-builder");
const status_notification_request_builder_1 = require("./status-notification-request-builder");
const stop_transaction_request_builder_1 = require("./stop-transaction-request-builder");
let ByChargePointRequestBuilderFactory = class ByChargePointRequestBuilderFactory {
    constructor(authorizeRequestBuilder, bootNotificationRequestBuilder, heartbeatRequestBuidler, meterValuesRequestBuilder, startTransactionRequestBuilder, statusNotificationRequestBuilder, stopTransactionRequestBuilder) {
        this.authorizeRequestBuilder = authorizeRequestBuilder;
        this.bootNotificationRequestBuilder = bootNotificationRequestBuilder;
        this.heartbeatRequestBuidler = heartbeatRequestBuidler;
        this.meterValuesRequestBuilder = meterValuesRequestBuilder;
        this.startTransactionRequestBuilder = startTransactionRequestBuilder;
        this.statusNotificationRequestBuilder = statusNotificationRequestBuilder;
        this.stopTransactionRequestBuilder = stopTransactionRequestBuilder;
    }
    getBuilderFromOperationName(operationName) {
        switch (operationName.toLowerCase()) {
            case 'authorize':
                return this.authorizeRequestBuilder;
            case 'bootnotification':
                return this.bootNotificationRequestBuilder;
            case 'heartbeat':
                return this.heartbeatRequestBuidler;
            case 'metervalues':
                return this.meterValuesRequestBuilder;
            case 'starttransaction':
                return this.startTransactionRequestBuilder;
            case 'statusnotification':
                return this.statusNotificationRequestBuilder;
            case 'stoptransaction':
                return this.stopTransactionRequestBuilder;
            default:
                return null;
        }
    }
};
ByChargePointRequestBuilderFactory = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [authorize_request_builder_1.AuthorizeRequestBuilder,
        boot_notification_request_builder_1.BootNotificationRequestBuilder,
        heartbeat_request_builder_1.HeartbeatRequestBuilder,
        meter_values_request_builder_1.MeterValuesRequestBuilder,
        start_transaction_request_builder_1.StartTransactionRequestBuilder,
        status_notification_request_builder_1.StatusNotificationRequestBuilder,
        stop_transaction_request_builder_1.StopTransactionRequestBuilder])
], ByChargePointRequestBuilderFactory);
exports.ByChargePointRequestBuilderFactory = ByChargePointRequestBuilderFactory;
//# sourceMappingURL=by-charge-point-request-builder-factory.js.map