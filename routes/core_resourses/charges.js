const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const charges = await stripe.charges.list();
        res.send({ charges: charges });
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const charge = await stripe.charges.retrieve(req.params.id);

        res.send({ charge: charge })
    } catch (error) {
        console.log(error)
    }
});

router.post('/create', async(req, res) => {
    try {
        const charge = await stripe.charges.create({
            amount: req.body.amount,
            currency: req.body.currency,
            source: req.body.source,
            description: req.body.description,
        });
        res.status(201).json({ msg: "new charge created", charge: charge });
    } catch (error) {
        console.log(error)

    }
});
router.put('/update/:id', async(req, res) => {
    try {
        const charge = await stripe.charges.update(req.params.id, req.body);
        res.status(200).json({ msg: "charge updated", charge: charge });
    } catch (error) {
        console.log(error)

    }
});
router.post('/capture/:id', async(req, res) => {
    try {
        const charge = await stripe.charges.capture(req.params.id);
        res.status(200).json({ msg: "charge updated", charge: charge });
    } catch (error) {
        console.log(error)

    }
});

module.exports = router;