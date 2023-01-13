"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MythicalWeaponStore = void 0;
const database_1 = __importDefault(require("../database"));
class MythicalWeaponStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM mythical_weapons';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`This didn't work cannont get ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM mythical_weapons WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find weapon ${id}. Error: ${err}`);
        }
    }
    async create(w) {
        try {
            const sql = 'INSERT INTO mythical_weapons (name, type, weight) VALUES($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sql, [w.name, w.type, w.weight]);
            const weapon = result.rows[0];
            conn.release();
            return weapon;
        }
        catch (err) {
            throw new Error(`Could not add new book ${w.name}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM mythical_weapons WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const weapon = result.rows[0];
            conn.release();
            return weapon;
        }
        catch (err) {
            throw new Error(`Could not delete weapon ${id}. Error: ${err}`);
        }
    }
}
exports.MythicalWeaponStore = MythicalWeaponStore;
