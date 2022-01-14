const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.post('/pay', async(req, res) => {
    const { email } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000,
            currency: 'usd',
            metadata: { integration_check: 'accept_a_payment' },
            receipt_email: email,
        });
        res.json({ 'client_secret': paymentIntent['client_secret'] });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);

    }
});
router.post('/sub', async(req, res) => {
    const { email, payment_method } = req.body;
    try {
        const customer = await stripe.customers.create({
            payment_method: payment_method,
            email: email,
            invoice_setting: {
                default_payment_method: payment_method,
            },
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: '' }],
            expand: ['latest_invoice.payment_intent']
        });

        const status = subscription['latest_invoice']['payment_intent']['status'];
        const client_secret = subscription['latest_invoice']['payment_intent']['client_secret'];

        res.json({ 'client_secret': client_secret, 'status': status })

    } catch (error) {

    }
})
module.exports = router;