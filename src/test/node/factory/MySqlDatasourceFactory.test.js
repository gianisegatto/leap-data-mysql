const sinon = require("sinon");
const expect = require("chai").expect;

const mockedMysql = sinon.mock(require("mysql"));
const MySqlDatasourceFactory = require("./../../../main/node/factory/MySqlDatasourceFactory");

describe("MySqlDatasourceFactory", () => {

    it("should create MysqlDatasource", () => {
        
        const host = "host";
        const user = "user";
        const pass = "pass";
        const connectionLimit = 1;
        const database = "database";

        const configuration = { host: host, user: user, pass: pass, database: database, connectionLimit: connectionLimit };
        const connectionPool = {};

        mockedMysql.expects("createPool").withExactArgs(configuration).returns(connectionPool);

        const mysqlDatasourceFactory = new MySqlDatasourceFactory(configuration);

        const mysqlDatasource = mysqlDatasourceFactory.create();

        expect(mysqlDatasource).to.not.be.null;
    });
});