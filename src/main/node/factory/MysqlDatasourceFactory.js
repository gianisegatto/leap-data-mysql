const mysql = require("mysql");

const MysqlQuery = require("../datasource/MySqlQuery");
const MysqlDatasource = require("../datasource/MySqlDatasource");

class MySqlDatasourceFactory {

    constructor(configuration) {
        this.connectionPool = mysql.createPool(configuration);
        this.mysqlQuery = new MysqlQuery();
    }

    create() {
        return new MysqlDatasource(this.connectionPool, this.mysqlQuery);
    }
}

module.exports = MySqlDatasourceFactory;