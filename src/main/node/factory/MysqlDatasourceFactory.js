const mysql = require("mysql");

const MysqlQuery = require("../datasource/MysqlQuery");
const MysqlDatasource = require("../datasource/MysqlDatasource");

class MysqlDatasourceFactory {

    constructor(host, user, pass, database, connectionLimit) {


        const configuration = {
            host: host,
            user: user,
            pass: pass,
            connectionLimit: connectionLimit ? connectionLimit : 10,
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