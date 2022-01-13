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
const fileLinkRoute = require('./routes/core_resourses/file_links');
const mandateRoute = require('./routes/core_resourses/mandates');
const paymentIntents = require('./routes/core_resourses/payment_intents');
const setupIntents = require('./routes/core_resourses/setup_intents');
const setupAttempts = require('./routes/core_resourses/setup_attempts');
const refundRoute = require('./routes/core_resourses/_refund');
const tokensRoute = require('./routes/core_resourses/_tokens');
const paymentRoute = require('./routes/payment/payment');
const productRoute = require('./routes/products/_products');
const priceRoute = require('./routes/price/_price');
const couponRoute = require('./routes/coupon/_coupon');
const subscriptionsRoute = require('./routes/subscription/_subscription');


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
app.use(`${api}/file_link`, fileLinkRoute);
app.use(`${api}/mandates`, mandateRoute);
app.use(`${api}/payment_intents`, paymentIntents);
app.use(`${api}/setup_intents`, setupIntents);
app.use(`${api}/setup_attempts`, setupAttempts);
app.use(`${api}/refunds`, refundRoute);
app.use(`${api}/tokens`, tokensRoute);
app.use(`${api}/payment`, paymentRoute);
app.use(`${api}/products`, productRoute);
app.use(`${api}/prices`, priceRoute);
app.use(`${api}/coupon`, couponRoute);
app.use(`${api}/subscriptions`, subscriptionsRoute);

app.listen(port, () => console.log(`stripe server is running at http://localhost:${port}`))