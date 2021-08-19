"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistroById = exports.delRegistro = exports.getRegistros = exports.storeRegistro = void 0;
const registros_entities_1 = require("../db/entities/registros.entities");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// Cria um novo registro no banco de dados
const storeRegistro = express_async_handler_1.default(async (req, res) => {
    const { type, message, isIdentified, deleted, whistleblowerName, whistleblowerBirth, } = req.body;
    const registro = await new registros_entities_1.Registro(type, message, isIdentified, new Date(Date.now()), deleted, whistleblowerName, whistleblowerBirth).save();
    return res.status(200).json(registro);
});
exports.storeRegistro = storeRegistro;
const getRegistros = express_async_handler_1.default(async (req, res) => {
    /*let kek = await createQueryBuilder(Registro, "registros")
        .orderBy("registros.create", "ASC")
        .getMany();
    console.log(kek);*/
    /* Aqui a string da query é construida baseado na quantidade de parâmetros
       enviados pelo usuário na URL. Dessa forma, ele pode filtar por type, deleted, id, ou qualquer combinação */
    const queryBuilder = () => {
        let queryObject = `{`;
        if (Object.keys(req.query).length > 0) {
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                queryObject += `"${[Object.keys(req.query)[i]]}" : "${Object.values(req.query)[i]}"`;
                if (i == Object.keys(req.query).length - 1) {
                    queryObject += `}`;
                }
                else {
                    queryObject += ", ";
                }
            }
            queryObject = JSON.parse(queryObject);
        }
        return queryObject;
    };
    const query = queryBuilder();
    // Dá um find(parametros) caso hajam parâmetros de query, ou find all caso a url venha vazia
    let registros = [];
    if (Object.keys(req.query).length === 0) {
        registros = await registros_entities_1.Registro.find();
    }
    else {
        registros = await registros_entities_1.Registro.find({
            where: query,
        });
    }
    return res.status(200).json(registros);
});
exports.getRegistros = getRegistros;
// Alternativa para o método GET, ao invés de usar url query, usa parâmetros
const getRegistroById = express_async_handler_1.default(async (req, res) => {
    const { id } = req.params;
    const registro = await registros_entities_1.Registro.find({ where: { id: id } });
    return res.status(200).json(registro);
});
exports.getRegistroById = getRegistroById;
// Simplesmente deleta um registro pelo ID.
const delRegistro = express_async_handler_1.default(async (req, res) => {
    const { id } = req.body;
    // Mas antes de deletar, verifica no DB se existe mesmo um registro com esse ID
    const findIf = await registros_entities_1.Registro.find({ id: id });
    if (findIf.length === 0) {
        return res.status(200).json(`Registro não existe no banco de dados`);
    }
    else {
        const registroById = await registros_entities_1.Registro.delete(id);
        console.log(registroById);
        return res.status(200).json(`Deletado o registro #${id}`);
    }
});
exports.delRegistro = delRegistro;
