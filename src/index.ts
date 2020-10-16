import express = require("express")

// const cors = require("cors")
import cors = require("cors")
const app = express()
// const sqlite3 = require("sqlite3")
import sqlite3 = require("sqlite3")
// const bodyParser = require("body-parser")
import bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = new sqlite3.Database("./database.db")
// db.run('CREATE TABLE transactions( \
// 	transactionId INTEGER PRIMARY KEY NOT NULL,\
// 	transactionName VARCHAR(40) NOT NULL,\
// 	transactionAmount INTEGER(9999) NOT NULL,\
// 	transactionType VARCHAR(1) NOT NULL,\
// 	transactionDate VARCHAR(20) NOT NULL\
// )')

const port = process.env.PORT || 3005
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

app.get("/", (req: express.Request, res: express.Response) => {
	const stmt =
		"INSERT INTO transactions(transactionName, transactionAmount, transactionType, transactionDate) VALUES(?,?,?,?)"
	// db.run(stmt, ['test', 21, '+', 'freud'], (err, res) => {
	// 	if(err) {
	// 		console.log(err.message)
	// 		throw new Error('something went wrong')
	// 		return
	// 	}
	// 	cosole.log(res)
	// })
	res.send(
		'<h1 style="text-align: center; font-weight: bold;">Sudacode BalanceBook API</h1>'
	)
})

app.post(
	"/remove-transaction",
	(req: express.Request, res: express.Response) => {
		// console.log(req.body)
		const { type, transactionId } = req.body
		if (type !== "DELETE") {
			res.send("<h2>Method not allowed</h2>")
		}
		// console.log("name", transactionId)
		const stmt = "DELETE FROM transactions WHERE transactionId=?"
		db.run(stmt, transactionId, (err: any) => {
			if (err) {
				// return console.error(err.message)
				throw new Error(err.message)
			}
			// console.log(`Row(s) deleted ${changes}`)
			const data = {
				status: 204,
				message: "Successfull Yannick and Nandury",
			}
			return res.json(data)
		})
	}
)

app.post("/new-transaction", (req: express.Request, res: express.Response) => {
	// console.log(req.body)
	const stuff = req.body.body
	// console.log(stuff)
	const tname = stuff.transactionName
	const tamount = stuff.transactionAmount
	const ttype = stuff.transactionType
	const tdate = stuff.transactionDate
	// console.log(tname, tamount, ttype, tdate)
	const stmt =
		"INSERT INTO transactions(transactionName, transactionAmount, transactionType, transactionDate) VALUES(?,?,?,?)"
	db.run(stmt, [tname, tamount, ttype, tdate], (err: any) => {
		if (err) {
			// console.log(err.message)
			throw new Error("something went wrong in post " + err.message)
		}
	})
	res.send("Data Inserted Successfully")
})

app.get("/all-transactions", (req: express.Request, res: express.Response) => {
	const allTransactions: object[] = []
	db.each(
		"SELECT * from transactions;",
		(err: any, data: any) => {
			// console.log(data)
			if (err) {
				// console.error("Something went wrong fetching all transactions")
				throw new Error("yeah not right " + err.message)
			}
			allTransactions.push(data)
		},
		(err: any) => {
			if (err) {
				alert("something went wrong " + err.message)
			}
			res.json({
				response: 200,
				yannick: "is indeed freud",
				data: allTransactions,
			})
		}
	)
})
