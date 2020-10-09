import express = require('express');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3');
app.use(cors());

let db = new sqlite3.Database('./database.db')
//db.run('CREATE TABLE transactions( \
//	transactionName VARCHAR(40) NOT NULL,\
//	transactionAmount INTEGER(9999) NOT NULL,\
//	transactionType VARCHAR(1) NOT NULL,\
//	transactionDate VARCHAR(20) NOT NULL,\
//	PRIMARY KEY(transactionName)\
//)')

const port = process.env.PORT || 3005
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

app.get('/', (req: express.Request, res: express.Response) => {
	let stmt = 'INSERT INTO transactions(transactionName, transactionAmount, transactionType, transactionDate) VALUES(?,?,?,?)'
	//db.run(stmt, ['test', 21, '+', 'freud'], (err, res) => {
	//	if(err) {
	//		console.log(err.message)
	//		throw new Error('something went wrong')
	//		return
	//	}
	//	cosole.log(res)
	//})
	res.send(
		'<h1 style="text-align: center; font-weight: bold;">Sudacode BalanceBook API</h1>'
	)
})

app.post('/new-transaction', (req: express.Request, res: express.Response) => {
	console.log(req)
})

app.get('/all-transactions', (req: express.Request, res: express.Response) => {
	db.each('SELECT * from transactions;', (err: any, data: any) => {
		console.log(data)
		res.send(data)
	})
})
