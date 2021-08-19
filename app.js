"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./db/connection"));
const registroRoutes_1 = __importDefault(require("./routes/registroRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const PORT = 8000;
const app = express_1.default();
const db = new connection_1.default().openConnection();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rotas
app.use("/", registroRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API online!");
});
// Middleware
app.use(errorMiddleware_1.errorHandler);
app.use(errorMiddleware_1.notFound);
app.listen(PORT, () => {
    return console.log(`servidor rodando na porta ${PORT}`);
});
