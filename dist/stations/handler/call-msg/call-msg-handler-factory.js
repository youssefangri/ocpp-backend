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
exports.CallMsgHandlerFactory = void 0;
const common_1 = require("@nestjs/common");
const OperationNameFromCentralSystem_1 = require("../../../models/OperationNameFromCentralSystem");
const remote_start_transaction_msg_handler_1 = require("./remote-start-transaction-msg-handler");
const remote_stop_transaction_msg_handler_1 = require("./remote-stop-transaction-msg-handler");
const reset_msg_handler_1 = require("./reset-msg-handler");
let CallMsgHandlerFactory = class CallMsgHandlerFactory {
    constructor(remoteStartTransactionMsgHandler, remoteStopTransactionMsgHandler, resetMsgHandler) {
        this.remoteStartTransactionMsgHandler = remoteStartTransactionMsgHandler;
        this.remoteStopTransactionMsgHandler = remoteStopTransactionMsgHandler;
        this.resetMsgHandler = resetMsgHandler;
    }
    getHandler(operationName) {
        switch (operationName.toLowerCase()) {
            case OperationNameFromCentralSystem_1.OperationNameFromCentralSystem.RemoteStartTransaction.toLowerCase(): {
                return this.remoteStartTransactionMsgHandler;
            }
            case OperationNameFromCentralSystem_1.OperationNameFromCentralSystem.RemoteStopTransaction.toLowerCase(): {
                return this.remoteStopTransactionMsgHandler;
            }
            case OperationNameFromCentralSystem_1.OperationNameFromCentralSystem.Reset.toLowerCase(): {
                return this.resetMsgHandler;
            }
            default:
                return null;
        }
    }
};
CallMsgHandlerFactory = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [remote_start_transaction_msg_handler_1.RemoteStartTransactionMsgHandler,
        remote_stop_transaction_msg_handler_1.RemoteStopTransactionMsgHandler,
        reset_msg_handler_1.ResetMsgHandler])
], CallMsgHandlerFactory);
exports.CallMsgHandlerFactory = CallMsgHandlerFactory;
//# sourceMappingURL=call-msg-handler-factory.js.map