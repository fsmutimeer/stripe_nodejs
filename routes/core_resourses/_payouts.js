const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const payouts = await stripe.payouts.list({
            limit: 10,
        });
        res.send(payouts);
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const payout = await stripe.payouts.retrieve(
            req.params.id
        );
        res.send(payout)
    } catch (error) {
        console.log(error)
    }
});

router.post('/create', async(req, res) => {
    try {
        const payout = await stripe.payouts.create(req.body);
        res.status(201).json(payout);
    } catch (error) {
        console.log(error)

    }
});
router.post('/update/:id', async(req, res) => {
    try {
        const payout = await stripe.payouts.update(
            req.params.id, { metadata: { order_id: req.body.order_id } }
        );
        res.status(200).json(payout);
    } catch (error) {
        console.log(error)

    }
});

router.post('/:id/cancel', async(req, res) => {
    try {
        const payout = await stripe.payouts.cancel(req.params.id);
        res.json(payout);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;