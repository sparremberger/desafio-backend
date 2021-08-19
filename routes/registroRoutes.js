"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registroController_1 = require("../controllers/registroController");
const router = express_1.default.Router();
router.route("/registros").post(registroController_1.storeRegistro);
router.route("/registros").get(registroController_1.getRegistros);
router.route("/registros/:id").get(registroController_1.getRegistroById);
router.route("/registros").delete(registroController_1.delRegistro);
exports.default = router;
