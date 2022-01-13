const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/:id/usage_records', async(req, res) => {
    try {
        const usageRecord = await stripe.subscriptionItems.createUsageRecord(
            req.params.id, { quantity: req.body.quantity, timestamp: req.params.timestamp }
        );
        res.json(usageRecord);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});

router.get('/usage_record/:id/summaries', async(req, res) => {
    try {
        const usageRecordSummaries = await stripe.subscriptionItems.listUsageRecordSummaries(
            req.params.id, { limit: 10 }
        );
        res.send(usageRecordSummaries)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})



module.exports = router;