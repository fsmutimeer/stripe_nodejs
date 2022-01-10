const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const paymentIntents = await stripe.paymentIntents.list({
            limit: 10,
        });
        res.send(paymentIntents);
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
            req.params.id
        );
        res.send(paymentIntent)
    } catch (error) {
        console.log(error)
    }
});

router.post('/create', async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create(req.body);
        res.status(201).json({ msg: paymentIntent });
    } catch (error) {
        console.log(error)

    }
});
router.post('/update/:id', async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.update(
            req.params.id,
            req.body
        );
        res.status(200).json(paymentIntent);
    } catch (error) {
        console.log(error)

    }
});
router.post('/:id/confirm', async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(
            req.params.id, { payment_method: req.body.payment_method }
        );
        res.json(paymentIntent);
    } catch (error) {
        console.log(error)
    }
});
router.post('/:id/capture', async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.capture(
            req.params.id
        );
        res.json(paymentIntent);
    } catch (error) {
        console.log(error)
    }
});
router.post('/:id/cancel', async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.cancel(
            req.params.id
        );
        res.json({ msg: "canceled", payment: paymentIntent });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;