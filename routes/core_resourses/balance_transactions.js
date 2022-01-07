const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);

router.get('/view', async(req, res) => {
    try {
        const balanceTransactions = await stripe.balanceTransactions.list({ limit: 10, });
        res.send({ total_transactions: balanceTransactions });
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const balanceTransaction = await stripe.balanceTransactions.retrieve(req.params.id);
        res.send({ transactiono: balanceTransaction })
    } catch (error) {
        console.log(error)
    }
});
module.exports = router;