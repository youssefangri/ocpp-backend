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
exports.Station = void 0;
const typeorm_1 = require("typeorm");
let Station = class Station extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.vendor = process.env.DEFAULT_VENDOR;
        this.model = process.env.DEFAULT_MODEL;
        this.meterValue = "0";
        this.chargeInProgress = false;
        this.currentTransactionId = null;
        this.currentChargingPower = 11000;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Station.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Station.prototype, "identity", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Station.prototype, "vendor", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Station.prototype, "model", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Station.prototype, "centralSystemUrl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Station.prototype, "meterValue", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Station.prototype, "chargeInProgress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Station.prototype, "currentTransactionId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Station.prototype, "currentChargingPower", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Station.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Station.prototype, "updatedAt", void 0);
Station = __decorate([
    typeorm_1.Entity()
], Station);
exports.Station = Station;
//# sourceMappingURL=station.entity.js.map