#!/bin/bash

set -Eeuo pipefail
set -x

if [[ $# -ne 1 ]]; then
	echo 'Usage: ./test.sh [ insert | delete | dump ]'
	exit 1
fi

arg=$1

if [[ $arg == "insert" ]]; then
	curl -d '{"transactionName":"test2", "transactionAmount":"21","transactionType":"-","transactionDate":"charlie"}' -H "Content-Type: application/json" -X POST http://localhost:3005/new-transaction
fi

if [[ $arg == "dump" ]]; then
	http http://localhost:3005/all-transactions/
fi
