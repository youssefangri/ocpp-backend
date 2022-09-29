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
exports.CallResultMsgHandlerFactory = void 0;
const common_1 = require("@nestjs/common");
const OperationNameFromChargePoint_1 = require("../../../models/OperationNameFromChargePoint");
const start_transaction_result_msg_handler_1 = require("./start-transaction-result-msg-handler");
const stop_transaction_result_msg_handler_1 = require("./stop-transaction-result-msg-handler");
let CallResultMsgHandlerFactory = class CallResultMsgHandlerFactory {
    constructor(startTransactionResultMsgHandler, stopTransactionResultMsgHandler) {
        this.startTransactionResultMsgHandler = startTransactionResultMsgHandler;
        this.stopTransactionResultMsgHandler = stopTransactionResultMsgHandler;
    }
    getHandler(operationName) {
        switch (operationName.toLowerCase()) {
            case OperationNameFromChargePoint_1.OperationNameFromChargePoint.StartTransaction.toLowerCase(): {
                return this.startTransactionResultMsgHandler;
            }
            case OperationNameFromChargePoint_1.OperationNameFromChargePoint.StopTransaction.toLowerCase(): {
                return this.stopTransactionResultMsgHandler;
            }
            default:
                return null;
        }
    }
};
CallResultMsgHandlerFactory = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [start_transaction_result_msg_handler_1.StartTransactionResultMsgHandler,
        stop_transaction_result_msg_handler_1.StopTransactionResultMsgHandler])
], CallResultMsgHandlerFactory);
exports.CallResultMsgHandlerFactory = CallResultMsgHandlerFactory;
//# sourceMappingURL=call-result-msg-handler-factory.js.map