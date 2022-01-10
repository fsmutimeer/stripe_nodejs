const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);
const fs = require('fs');




router.get('/view/:id', async(req, res) => {
    try {
        const mandate = await stripe.mandates.retrieve(
            req.params.id
        );
        res.send(mandate)
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;