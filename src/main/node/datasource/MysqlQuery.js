const SqlErrorBuilder = require("leap-data").SqlErrorBuilder;

class MySqlQuery {

    query(connection, sql, values, rowMapper) {

        return new Promise((resolve, reject) => {

            connection.query(sql, values, (error, results, fields) => {

                connection.release();
                if (error) {
                    return reject(SqlErrorBuilder.build("DATABASE_QUERY", "Error during execute query", error));
                }

                if (rowMapper) {
                    return resolve(results.map(rowMapper.map));
                } else {
                    return resolve(results);
                }

            });
        });
    }
}

module.exports = MySqlQuery;