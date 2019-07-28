const SqlErrorBuilder = require("leap-data").SqlErrorBuilder;

class MySqlDatasource {

    constructor(connectionPool, mySqlQuery) {
        this.connectionPool = connectionPool;
        this.mySqlQuery = mySqlQuery;
    }

    query(sql, values, rowMapper) {

        return new Promise((resolve, reject) => {

            this.connectionPool.getConnection((err, connection) => {

                if (err) {
                    return reject(SqlErrorBuilder.build("DATABASE_CONNECTION", "Error during open connection", err));
                }

                return this.mySqlQuery.query(connection, sql, values, rowMapper)
                    .then(result => resolve(result))
                    .catch(exception => reject(exception))

            });
        });
    }
}

module.exports = MySqlDatasource;