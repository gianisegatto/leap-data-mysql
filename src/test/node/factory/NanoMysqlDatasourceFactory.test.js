const sinon = require("sinon");
const expect = require("chai").expect;

const mockedMysql = sinon.mock(require("mysql"));
const MysqlDatasourceFactory = require("../../../main/node/factory/MysqlDatasourceFactory");

describe("MysqlDatasourceFactory", () => {

    it("should create MysqlDatasource", () => {
        const configuration = {}
        const connectionPool = {};

        mockedMysql.expects("createPool").withExactArgs(configuration).returns(connectionPool);

        const mysqlDatasourceFactory = new MysqlDatasourceFactory(configuration);

        const mysqlDatasource = mysqlDatasourceFactory.create();

        expect(mysqlDatasource).to.not.be.null;
    });
});