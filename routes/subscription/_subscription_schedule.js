const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/create', async(req, res) => {
    try {
        const subscriptionSchedule = await stripe.subscriptionSchedules.create({
            customer: req.body.customer_id,
            start_date: req.params.start_date,
            end_behavior: req.params.end_behavior,
            phases: [{
                items: [{ price: req.body.price, quantity: req.body.quantity }],
                iterations: req.body.iteration || 12,
            }, ],
        });
        res.json(subscriptionSchedule);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});

router.get('/view/:id', async(req, res) => {
    try {
        const subscriptionSchedule = await stripe.subscriptionSchedules.retrieve(
            req.params.id
        );
        res.send(subscriptionSchedule)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

router.get('/view', async(req, res) => {
    try {
        const subscriptionSchedules = await stripe.subscriptionSchedules.list({
            limit: 10,
        });
        res.send(subscriptionSchedules)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.post('/update/:id', async(req, res) => {
    try {
        const subscriptionSchedule = await stripe.subscriptionSchedules.update(
            req.params.id, {
                end_behavior: req.body.end_behavior
            }
        );
        res.json(subscriptionSchedule);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});
router.post('/release/:id', async(req, res) => {
    try {
        const subscriptionSchedule = await stripe.subscriptionSchedules.release(
            req.params.id
        );
        res.json(subscriptionSchedule);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});
router.post('/cancel/:id', async(req, res) => {
    try {
        const subscriptionSchedule = await stripe.subscriptionSchedules.cancel(
            req.params.id
        );
        res.send(subscriptionSchedule)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;