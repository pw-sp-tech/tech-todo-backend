const mysql = require('mysql2');
const pool = mysql.createPool({
    host: "internaltools.cri1xqkewqkn.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "FreeCo070120",
    database: "bugs",
    multipleStatements: true
});

module.exports.pool = pool.promise();