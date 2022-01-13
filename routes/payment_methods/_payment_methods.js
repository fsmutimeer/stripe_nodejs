const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/create', async(req, res) => {
    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: req.body.type,
            card: {
                number: req.body.number,
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc,
            },
        });

        res.json(paymentMethod);
    } catch (error) {
        console.log(error)

    }
});

router.get('/view/:id', async(req, res) => {
    try {
        const paymentMethod = await stripe.paymentMethods.retrieve(
            req.params.id
        );

        res.send(paymentMethod)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})
router.post('/update/:id', async(req, res) => {
    try {
        const paymentMethod = await stripe.paymentMethods.update(
            req.params.id, { metadata: { order_id: req.body.order_id } }
        );
        res.send(paymentMethod)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})
router.get('/view', async(req, res) => {
    try {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: req.body.customer,
            type: req.body.type,
        });
        res.send(paymentMethods)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
});

router.get('/:id/customer', async(req, res) => {
    try {
        const paymentMethods = await stripe.customers.listPaymentMethods(
            req.params.id, { type: req.body.card }
        );
        res.json(paymentMethods);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});
router.post('/:id/attach', async(req, res) => {
    try {
        const paymentMethod = await stripe.paymentMethods.attach(
            req.params.id, { customer: req.body.customer }
        );
        res.json(paymentMethod);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});
router.post('/:id/detach', async(req, res) => {
    try {
        const paymentMethod = await stripe.paymentMethods.detach(
            req.params.id
        );
        res.json(paymentMethod);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});

module.exports = router;