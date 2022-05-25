"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHandler = void 0;
const mysql = require("mysql");
/**
 * This class represents service used to work with database and queries
 */
class DatabaseHandler {
    constructor(config) {
        this.config = config;
        this.connection = mysql.createConnection({
            host: this.config.dbHost,
            user: this.config.dbUsername,
            password: this.config.dbPassword,
            database: this.config.dbSchema,
        });
        // open the MySQL connection
        this.connection.connect((error) => {
            if (error)
                throw error;
            console.log("Successfully connected to the database.");
        });
    }
    getObjectById(id, type) {
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from ${type} where Id = '${id}';`, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    deleteObjectById(id, type) {
        return new Promise((resolve, reject) => {
            this.connection.query(`delete from ${type} where Id = '${id}';`, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    getAllObjects(type, condition) {
        let sql = `select * from ${type}`;
        if (condition) {
            sql += sql + ' where ' + condition + ';';
        }
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    addObject(type, data) {
        return new Promise((resolve, reject) => {
            this.connection.query(`Insert into ${type} values (${data});`, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    updateObject(type, data, id) {
        const sql = `Update ${type} set ${data} where id = '${id}';`;
        console.log("sql", sql);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}
exports.DatabaseHandler = DatabaseHandler;
//# sourceMappingURL=DatabaseHandler.js.map