const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);

router.get('/view', async(req, res) => {
    try {
        const setupAttempts = await stripe.setupAttempts.list({
            limit: 3,
        });
        res.send(setupAttempts)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;