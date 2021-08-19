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
exports.Registro = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
/* Entidade para o TypeORM. É bastante boilerplate, mas facilita a inserção de dados no banco,
    de maneira que não é necessário construir queries DML */
let Registro = class Registro extends typeorm_1.BaseEntity {
    constructor(type, message, isIdentified, createdAt, deleted, whistleblowerName, whistleblowerBirth
    //id: number
    ) {
        super();
        this.type = type;
        this.message = message;
        this.isIdentified = isIdentified;
        this.createdAt = createdAt;
        this.deleted = deleted;
        this.whistleblowerBirth = whistleblowerBirth;
        this.whistleblowerName = whistleblowerName;
        //this.id = id;
    }
    beforeInsert() {
        this.id = Date.now() + Math.random(); // não me orgulho disso
        this.createdAt = new Date(Date.now());
    }
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Registro.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Registro.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Registro.prototype, "message", void 0);
__decorate([
    typeorm_1.Column({ name: "is_identified" }),
    __metadata("design:type", Boolean)
], Registro.prototype, "isIdentified", void 0);
__decorate([
    typeorm_1.Column({ name: "whistleblower_name" }),
    __metadata("design:type", String)
], Registro.prototype, "whistleblowerName", void 0);
__decorate([
    typeorm_1.Column({ name: "whistleblower_birth" }),
    __metadata("design:type", Date)
], Registro.prototype, "whistleblowerBirth", void 0);
__decorate([
    typeorm_1.Column({ name: "created_at" }),
    __metadata("design:type", Date)
], Registro.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ name: "deleted" }),
    __metadata("design:type", Boolean)
], Registro.prototype, "deleted", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Registro.prototype, "beforeInsert", null);
Registro = __decorate([
    typeorm_1.Entity({ name: "registros" }),
    __metadata("design:paramtypes", [String, String, Boolean, Date, Boolean, String, Date
        //id: number
    ])
], Registro);
exports.Registro = Registro;
