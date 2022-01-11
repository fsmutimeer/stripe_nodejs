const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/create', async(req, res) => {
    try {
        // const { product } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
                price_data: {
                    // currency: product.currency,
                    currency: "USD",
                    product_data: {
                        name: "dummy dal dya",
                        // images: "something.jpg",
                    },
                    unit_amount: 3 * 100,
                },
                quantity: 4,
            }, ],
            mode: "payment",
            success_url: `http://localhost:7000`,
            cancel_url: `http://localhost:7000`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.log(error)

    }
});

router.get('/view/:id', async(req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(
            req.params.id
        );
        res.send(session)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})
router.get('/checkout/:id/line_item', async(req, res) => {
    try {
        const lineItems = await stripe.checkout.sessions.listLineItems(
            req.params.id, { limit: 5 },
        );
        res.send(lineItems)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})
router.get('/view', async(req, res) => {
    try {
        const session = await stripe.checkout.sessions.list(

        );
        res.send(session)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
});

router.post('/checkout/:id/expire', async(req, res) => {
    try {
        const session = await stripe.checkout.sessions.expire(
            req.params.id
        );
        res.json(session);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});

module.exports = router;