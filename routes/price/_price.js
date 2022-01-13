const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/create', async(req, res) => {
    try {
        const price = await stripe.prices.create(req.body);
        res.json(price);
    } catch (error) {
        console.log(error)

    }
});

router.get('/view/:id', async(req, res) => {
    try {
        const price = await stripe.prices.retrieve(
            req.params.id
        );
        res.send(price)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

router.get('/view', async(req, res) => {
    try {
        const prices = await stripe.prices.list();
        res.send(prices)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
});

router.post('/update/:id', async(req, res) => {
    try {
        const price = await stripe.prices.update(
            req.params.id, { metadata: { order_id: req.body.order_id } }
        );
        res.json(price);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});


module.exports = router;