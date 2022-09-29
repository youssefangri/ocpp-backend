"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeRequestBuilder = void 0;
const AuthorizeRequest_1 = require("../../models/AuthorizeRequest");
const station_entity_1 = require("../../stations/station.entity");
class AuthorizeRequestBuilder {
    constructor() {
        this.getOperationName = () => 'Authorize';
    }
    build(_, payload) {
        const request = new AuthorizeRequest_1.AuthorizeRequest();
        request.idTag = payload.idTag;
        return request;
    }
}
exports.AuthorizeRequestBuilder = AuthorizeRequestBuilder;
//# sourceMappingURL=authorize-request-builder.js.map