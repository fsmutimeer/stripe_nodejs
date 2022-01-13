const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/create', async(req, res) => {
    try {
        const subscription = await stripe.subscriptions.create({
            customer: req.body.customer_id,
            items: [
                { price: req.body.price },
            ],
        });
        res.json(subscription);
    } catch (error) {
        console.log(error)

    }
});

router.get('/view/:id', async(req, res) => {
    try {
        const subscription = await stripe.subscriptions.retrieve(
            req.params.id
        );
        res.send(subscription)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get('/view', async(req, res) => {
    try {
        const subscriptions = await stripe.subscriptions.list({
            limit: 3,
        });
        res.send(subscriptions)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.post('/update/:id', async(req, res) => {
    try {
        const subscription = await stripe.subscriptions.update(
            req.params.id, { metadata: { order_id: req.body.order_id } }
        );
        res.json(subscription);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});
router.delete('/cancel/:id', async(req, res) => {
    try {
        const deleted = await stripe.subscriptions.del(
            req.params.id
        );
        res.send(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;