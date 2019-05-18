Welcome to leap mysql!
===================

* Hi mate. I'm here for helping you to execute operations on Mysql
Given you these kinds of functionality:
 - [connection pool](https://github.com/mysqljs/mysql#pooling-connections)
 - [query](https://github.com/mysqljs/mysql#introduction)
 - [prepared statement query](https://github.com/mysqljs/mysql#preparing-queries)

Tips
-------------
I'm wrapping the mysqljs lib providing you the beauty of promises. So you are free of callbacks and can code in very beautiful way.

[If you are not familiar with promise have a look on this link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

My stack is based on:
-------------
* [Javascript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
* [NodeJS](https://nodejs.org/en/)
* [MysqlJS](https://github.com/mysqljs/mysql)

## How to use me

Add nano-mysql as a dependency into your project.

```bash
npm install leap-mysql
```

### Without parameters
```javascript

const QUERY = "SELECT * FROM table";

const MysqlDatasourceFactory = require("leap-mysql").MysqlDatasourceFactory;

const mysqlDatasourceFactory = new MysqlDatasourceFactory("host", "user", "pass", 1, "database"});
const datasource = mysqlDatasourceFactory.create();

// Note this query doesn't need parameters
const resultPromise = datasource.query(QUERY);

resultPromise.then(results => console.log(results))
             .catch(exception => console.log(results));

```
### With parameters
```javascript

// Note the same can be applied for INSERT, UPDATE and DELETE
const QUERY = "SELECT * FROM table WHERE id = ?";

const MysqlDatasourceFactory = require("leap-mysql").MysqlDatasourceFactory;

const mysqlDatasourceFactory = new MysqlDatasourceFactory("host", "user", "pass", 1, "database"});
const datasource = mysqlDatasourceFactory.create();

const id = 1;

// Note this query doesn't need parameters
const resultPromise = datasource.query(QUERY, [id]);

resultPromise.then(results => console.log(results))
             .catch(exception => console.log(results));

```

### With parameters and rowMapper
```javascript

// Note the same can be applied for INSERT, UPDATE and DELETE
const QUERY = "SELECT id, user_name FROM table WHERE id = ?";

const MysqlDatasourceFactory = require("leap-mysql").MysqlDatasourceFactory;

const mysqlDatasourceFactory = new MysqlDatasourceFactory("host", "user", "pass", 1, "database"});
const datasource = mysqlDatasourceFactory.create();

const id = 1;


const rowMapper = (row) => {
    return {
        id: row.id,
        userName: row.user_name
    }
}

// Note this query doesn't need parameters
const resultPromise = datasource.query(QUERY, [id], rowMapper);

resultPromise.then(results => console.log(results))
             .catch(exception => console.log(results));

```

