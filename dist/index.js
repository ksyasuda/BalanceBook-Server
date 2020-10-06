"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3');
app.use(cors());
let db = new sqlite3.Database('./database.db');
//db.run('CREATE TABLE transactions( \
//	transactionName VARCHAR(40) NOT NULL,\
//	transactionAmount INTEGER(9999) NOT NULL,\
//	transactionType VARCHAR(1) NOT NULL,\
//	transactionDate VARCHAR(20) NOT NULL,\
//	PRIMARY KEY(transactionName)\
//)')
const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.get('/', (req, res) => {
    let stmt = 'INSERT INTO transactions(transactionName, transactionAmount, transactionType, transactionDate) VALUES(?,?,?,?)';
    //db.run(stmt, ['test', 21, '+', 'freud'], (err, res) => {
    //	if(err) {
    //		console.log(err.message)
    //		throw new Error('something went wrong')
    //		return
    //	}
    //	cosole.log(res)
    //})
    db.each('SELECT * from transactions;', (err, data) => {
        console.log(data);
    });
    res.send('<h1>YANNICK NANDURY</h1>');
});
//# sourceMappingURL=index.js.map