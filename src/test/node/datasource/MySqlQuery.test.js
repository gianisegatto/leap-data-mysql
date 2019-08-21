const expect = require("chai").expect;
const sinon = require("sinon");

const SqlErrorBuilder = require("leap-data").SqlErrorBuilder;
const MySqlQuery = require("../../../main/node/datasource/MySqlQuery");

describe("MySqlQuery", () => {

    it("should execute query successful without rowMapper", async () => {

        const sql = "SELECT * FROM table";
        const values = null;

        const expectedResult = [{test: "test"}];

        const connection = {
            query(sql, values, callback) {
                callback(null, expectedResult);
            },
            release() {
            }
        };

        const mockedConnection = sinon.mock(connection);
        mockedConnection.expects("release");

        const mysqlQuery = new MySqlQuery();

        const result = await mysqlQuery.query(connection, sql, values);

        mockedConnection.verify();
        expect(result).to.deep.equal(expectedResult);
    });

    it("should execute query successful with rowMapper", async () => {

        const sql = "SELECT * FROM table";
        const values = null;

        const mappedRow = {testMapped: "test"};
        const expectedResult = [mappedRow];

        const row = {test: "test"};
        const mysqlResult = [row];

        const rowMapper = {
            map(row) {
            }
        };

        const connection = {
            query(sql, values, callback) {
                callback(null, mysqlResult);
            },
            release() {
            }
        };

        const mockedConnection = sinon.mock(connection);
        mockedConnection.expects("release");

        const mockedRowMapper = sinon.mock(rowMapper);
        mockedRowMapper.expects("map").withArgs(row).returns(mappedRow);

        const mysqlQuery = new MySqlQuery();

        const result = await mysqlQuery.query(connection, sql, values, rowMapper);

        mockedConnection.verify();
        expect(result).to.deep.equal(expectedResult);
    });

    it("should fail to execute query", async () => {

        const sql = "SELECT * FROM table";
        const values = null;

        const error = "Error";

        const connection = {
            query(sql, values, callback) {
                callback(error, null);
            },
            release() {
            }
        };

        const expectedException = SqlErrorBuilder.build("DATABASE_QUERY", "Error during execute query", error);

        const mockedConnection = sinon.mock(connection);
        mockedConnection.expects("release");

        const mysqlQuery = new MySqlQuery();

        try {
            await mysqlQuery.query(connection, sql, values);
        } catch (e) {
            mockedConnection.verify();
            expect(e).to.deep.equal(expectedException);
        }
    });

});
