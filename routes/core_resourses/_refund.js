const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const refunds = await stripe.refunds.list({
            limit: 10,
        });
        res.send(refunds);
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const refund = await stripe.refunds.retrieve(
            req.params.id
        );
        res.send(refund)
    } catch (error) {
        console.log(error)
    }
});

router.post('/create', async(req, res) => {
    try {
        const refund = await stripe.refunds.create({
            charge: req.body.charge,
        });
        res.status(201).json(refund);
    } catch (error) {
        console.log(error)

    }
});
router.post('/update/:id', async(req, res) => {
    try {
        const refund = await stripe.refunds.update(
            req.params.id, { metadata: { order_id: req.body.order_id } }
        );
        res.status(200).json(refund);
    } catch (error) {
        console.log(error)

    }
});

module.exports = router;