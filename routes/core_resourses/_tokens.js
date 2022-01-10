const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view/:id', async(req, res) => {
    try {
        const token = await stripe.tokens.retrieve(
            req.params.id
        );
        res.send(token)
    } catch (error) {
        console.log(error)
    }
});

//create a card token
router.post('/create/card/token', async(req, res) => {
    try {
        const token = await stripe.tokens.create({
            card: {
                number: req.body.number,
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc,
            },
        });
        res.status(201).json(token);
    } catch (error) {
        console.log(error)

    }
});
//create a banck account token
router.post('/create/bank/token', async(req, res) => {
    try {
        const token = await stripe.tokens.create({
            bank_account: {
                country: req.body.country,
                currency: req.body.currency,
                account_holder_name: req.body.account_holder_name,
                account_holder_type: req.body.account_holder_type,
                routing_number: req.body.routing_number,
                account_number: req.body.account_number,
            },
        });
        res.status(201).json(token);
    } catch (error) {
        console.log(error)

    }
});
//create personally identifiable information
router.post('/create/pii/token', async(req, res) => {
    try {
        const token = await stripe.tokens.create({
            pii: { id_number: req.body.id_number },
        });
        res.status(201).json(token);
    } catch (error) {
        console.log(error)

    }
});
//Create an account token
router.post('/create/account/token', async(req, res) => {
    try {
        const token = await stripe.tokens.create({
            account: {
                individual: {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                },
                tos_shown_and_accepted: true,
            },
        });
        res.status(201).json(token);
    } catch (error) {
        console.log(error)

    }
});
//Create a person token
router.post('/create/person/token', async(req, res) => {
    try {
        const token = await stripe.tokens.create({
            person: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                relationship: { owner: true },
            },
        });
        res.status(201).json(token);
    } catch (error) {
        console.log(error)

    }
});
//Create a cvc update token
router.post('/create/cvc_update/token', async(req, res) => {
    try {
        const token = await stripe.tokens.create({
            cvc_update: { cvc: req.body.cvc },
        });
        res.status(201).json(token);
    } catch (error) {
        console.log(error)

    }
});

module.exports = router;