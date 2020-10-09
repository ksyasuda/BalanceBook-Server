"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let db = new sqlite3.Database("./database.db");
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
app.get("/", (req, res) => {
    let stmt = "INSERT INTO transactions(transactionName, transactionAmount, transactionType, transactionDate) VALUES(?,?,?,?)";
    //db.run(stmt, ['test', 21, '+', 'freud'], (err, res) => {
    //	if(err) {
    //		console.log(err.message)
    //		throw new Error('something went wrong')
    //		return
    //	}
    //	cosole.log(res)
    //})
    res.send('<h1 style="text-align: center; font-weight: bold;">Sudacode BalanceBook API</h1>');
});
app.post("/new-transaction", (req, res) => {
    // console.log(req)
    const stuff = req.body;
    // console.log(stuff)
    const tname = stuff.transactionName;
    const tamount = stuff.transactionAmount;
    const ttype = stuff.transactionType;
    const tdate = stuff.transactionDate;
    console.log(tname, tamount, ttype, tdate);
    let stmt = "INSERT INTO transactions(transactionName, transactionAmount, transactionType, transactionDate) VALUES(?,?,?,?)";
    db.run(stmt, [tname, tamount, ttype, tdate], (err) => {
        if (err) {
            console.log(err.message);
            throw new Error("something went wrong in post");
            return;
        }
    });
    res.send("Data Inserted Successfully");
});
app.get("/all-transactions", (req, res) => {
    const allTransactions = [];
    db.each("SELECT * from transactions;", (err, data) => {
        // console.log(data)
        if (err) {
            console.error("Something went wrong fetching all transactions");
            throw new Error("yeah not right");
        }
        allTransactions.push(data);
    }, (err, response) => {
        res.json({
            response: 200,
            yannick: "is indeed freud",
            data: allTransactions,
        });
    });
});
//# sourceMappingURL=index.js.map