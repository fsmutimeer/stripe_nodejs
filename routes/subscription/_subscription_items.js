const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/create', async(req, res) => {
    try {
        const subscriptionItem = await stripe.subscriptionItems.create({
            subscription: req.body.subscription,
            price: req.body.price,
            quantity: req.body.quantity,
        });
        res.json(subscriptionItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});

router.get('/view/:id', async(req, res) => {
    try {
        const subscriptionItem = await stripe.subscriptionItems.retrieve(
            req.params.id
        );
        res.send(subscriptionItem)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get('/view', async(req, res) => {
    try {
        const subscriptionItems = await stripe.subscriptionItems.list({
            subscription: req.body.subscription_id, //The ID of the subscription whose items will be retrieved.
        });
        res.send(subscriptionItems)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.post('/update/:id', async(req, res) => {
    try {
        const subscriptionItem = await stripe.subscriptionItems.update(
            req.params.id, { metadata: { order_id: req.body.order_id } }
        );
        res.json(subscriptionItem);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});
router.delete('/delete/:id', async(req, res) => {
    try {
        const deleted = await stripe.subscriptionItems.del(
            req.params.id
        );
        res.send(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

//subscription usage

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