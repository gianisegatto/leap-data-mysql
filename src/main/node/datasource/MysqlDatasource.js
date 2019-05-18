const ErrorBuilder = require("leap-core").ErrorBuilder;

class MysqlDatasource {

    constructor(mysqlConnectionPool, mysqlQuery) {
        this.connectionPool = mysqlConnectionPool;
        this.mysqlQuery = mysqlQuery;
    }

    query(sql, values, rowMapper) {

        return new Promise((resolve, reject) => {

            this.connectionPool.getConnection((err, connection) => {

                if (err) {
                    return reject(ErrorBuilder.build("DATABASE_CONNECTION", "Error during open connection", err));
                }

                return this.mysqlQuery.query(connection, sql, values, rowMapper)
                    .then(result => resolve(result))
                    .catch(exception => reject(exception))

            });
        });
    }
}

module.exports = MysqlDatasource;