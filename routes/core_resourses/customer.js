const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const customers = await stripe.customers.list();
        res.send({ customers: customers });
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const customer = await stripe.customers.retrieve(req.params.id);
        if (!customer) {
            return res.status(200).send('no customer found')
        }
        res.send({ customers: customer })
    } catch (error) {
        console.log(error)
    }
});

router.post('/create', async(req, res) => {
    try {
        await stripe.customers.create({
            name: req.body.name,
            email: req.body.email
        });
        res.status(201).json({ msg: "new customer created" });
    } catch (error) {
        console.log(error)

    }
});
router.put('/update/:id', async(req, res) => {
    try {
        const customer = await stripe.customers.update(req.params.id, req.body);
        res.status(200).json({ msg: "customer updated", customer: customer });
    } catch (error) {
        console.log(error)

    }
});
router.delete('/delete/:id', async(req, res) => {
    try {
        const customer = await stripe.customers.del(
            req.params.id
        );
        res.status(200).json({ msg: "customer deleted", customer: customer });
    } catch (error) {
        console.log(error)

    }
});

module.exports = router;