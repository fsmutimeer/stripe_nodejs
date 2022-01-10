const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const events = await stripe.events.list({
            limit: 3,
        });
        res.send({ events: events });
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const event = await stripe.events.retrieve(
            req.params.id
        );
        res.send({ event: event })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;