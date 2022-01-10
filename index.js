const express = require('express');
require('dotenv').config();
//routes
//
const customerRoute = require('./routes/core_resourses/customer');
const balanceRoute = require('./routes/core_resourses/balance');
const balanceTransactionsRoute = require('./routes/core_resourses/balance_transactions');
const chargesRoute = require('./routes/core_resourses/charges');
const disputesRoute = require('./routes/core_resourses/disputes');
const eventsRoute = require('./routes/core_resourses/events');
const filesRoute = require('./routes/core_resourses/files');
const fileLinkRoute = require('./routes/core_resourses/');


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
app.use(`${api}/charges`, chargesRoute);
app.use(`${api}/disputes`, disputesRoute);
app.use(`${api}/events`, eventsRoute);
app.use(`${api}/files`, filesRoute);

app.listen(port, () => console.log(`stripe server is running at http://localhost:${port}`))