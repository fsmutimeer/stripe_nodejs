const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const setupIntents = await stripe.setupIntents.list({
            limit: 10,
        });
        res.send(setupIntents);
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.retrieve(
            req.params.id
        );
        res.send(setupIntent)
    } catch (error) {
        console.log(error)
    }
});

router.post('/create', async(req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.create({
            payment_method_types: ['card'],
        });
        res.status(201).json({ msg: setupIntent });
    } catch (error) {
        console.log(error)

    }
});
router.post('/update/:id', async(req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.update(
            req.params.id,
            req.body
        );
        res.status(200).json(setupIntent);
    } catch (error) {
        console.log(error)

    }
});
router.post('/:id/confirm', async(req, res) => {
    try {
        const setupIntent = await stripe.setupIntents.confirm(
            req.params.id, { payment_method: req.body.payment_method }
        );
        res.json(setupIntent);
    } catch (error) {
        console.log(error)
    }
});
router.post('/:id/cancel', async(req, res) => {
    try {
        const setupIntents = await stripe.setupIntents.cancel(
            req.params.id
        );
        res.json({ msg: "canceled", setupIntents: setupIntents });
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;