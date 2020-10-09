#!/bin/bash
curl -d '{"transactionName":"test7", "transactionAmount":"21","transactionType":"-","transactionDate":"charlie"}' -H "Content-Type: application/json" -X POST http://localhost:3005/new-transaction

