const mysql = require("mysql");

const MysqlQuery = require("../datasource/MysqlQuery");
const MysqlDatasource = require("../datasource/MysqlDatasource");

class MysqlDatasourceFactory {

    constructor(host, user, pass, connectionPool, database) {


        const configuration = {
            host: host,
            user: user,
            pass: pass,
            connectionLimit: connectionPool,
            database: database
        };
        this.connectionPool = mysql.createPool(configuration);
        this.mysqlQuery = new MysqlQuery();
    }

    create() {
        return new MysqlDatasource(this.connectionPool, this.mysqlQuery);
    }
}

module.exports = MysqlDatasourceFactory;