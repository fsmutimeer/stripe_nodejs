const express = require('express');
require('dotenv').config();
//routes
//
const customerRoute = require('./routes/core_resourses/customer');
const balanceRoute = require('./routes/core_resourses/balance');
const balanceTransactionsRoute = require('./routes/core_resourses/balance_transactions');


const port = process.env.PORT || 7000;
const api = process.env.api

const app = express();
app.use(express.json())
app.get('/', (req, res, next) => {
    res.json('node server is running')
});

app.use(`${api}/customer`, customerRoute);
app.use(`${api}/balance`, balanceRoute);
app.use(`${api}/balance_transactions`, balanceTransactionsRoute);

app.listen(port, () => console.log(`stripe server is running at http://localhost:${port}`))