import { IConfig } from "../config";
import * as mysql from "mysql";
import { Sequelize } from "sequelize";

/**
 * This class represents service used to work with database and queries
 */
export class DatabaseHandler {
  public config: IConfig;
  public connection: any;
  public sequelize: any;

  constructor(config: IConfig) {
    this.config = config;
    this.connection = mysql.createConnection({
      host: this.config.dbHost,
      user: this.config.dbUsername,
      password: this.config.dbPassword,
      database: this.config.dbSchema,
    });

    // open the MySQL connection
    this.connection.connect((error) => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
    });
  }

  public getObjectById (id: string, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.query(`select * from ${type} where Id = '${id}';`, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    })
  }

  public deleteObjectById (id: string, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.query(`delete from ${type} where Id = '${id}';`, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    })
  }

  public getAllObjects( type: string, condition?: string): Promise<any> {
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
      })
    })
  }


  public addObject( type: string, data: string): Promise<any> {
   return new Promise((resolve, reject) => {
      this.connection.query(`Insert into ${type} values (${data});`, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      })
    })
  }

  public updateObject( type: string, data: string, id: string): Promise<any> {
    const sql = `Update ${type} set ${data} where id = '${id}';`;
    console.log("sql", sql);
    return new Promise((resolve, reject) => {
       this.connection.query(sql, (err, data) => {
         if (err) {
           reject(err);
         }
         resolve(data);
       })
     })
   }
}
