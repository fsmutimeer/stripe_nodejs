const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const balance = await stripe.balance.retrieve();
        res.send({ current_balance: balance });

    } catch (error) {
        console.log(error)
    }

});


module.exports = router;