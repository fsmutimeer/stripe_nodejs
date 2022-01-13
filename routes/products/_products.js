const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/create', async(req, res) => {
    try {
        const product = await stripe.products.create(req.body);

        res.json(product);
    } catch (error) {
        console.log(error)

    }
});

router.get('/view/:id', async(req, res) => {
    try {
        const product = await stripe.products.retrieve(
            req.params.id
        );
        res.send(product)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})

router.get('/view', async(req, res) => {
    try {
        const products = await stripe.products.list();
        res.send(products)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
});

router.post('/update/:id', async(req, res) => {
    try {
        const product = await stripe.products.update(
            req.params.id, { metadata: { order_id: req.body.order_id } }
        );
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});

router.delete('/delete/:id', async(req, res) => {
    try {
        const deleted = await stripe.products.del(
            req.params.id
        );
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
module.exports = router;