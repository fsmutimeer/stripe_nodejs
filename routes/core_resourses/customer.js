const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);
const { v4: uuidv4 } = require('uuid');
const uuid = require('uuid')

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
        }, { idempotencyKey: "uuidv4()" });
        res.status(201).json({ msg: "new customer created" });
    } catch (error) {
        console.log(error)

    }
});
router.post('/update/:id', async(req, res) => {
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
//source
router.post('/:id/sources', async(req, res) => {
    try {
        const card = await stripe.customers.createSource(
            req.params.id, { source: req.body.source }
        );
        res.status(201).json(card);
    } catch (error) {
        console.log(error)

    }
});
router.get('/:customer_id/sources/:source_id', async(req, res) => {
    try {
        const card = await stripe.customers.retrieveSource(
            req.params.customer_id,
            req.params.source_id
        );
        res.status(200).json(card);
    } catch (error) {
        console.log(error)

    }
});
router.post('/:customer_id/sources/:source_id', async(req, res) => {
    try {
        const card = await stripe.customers.updateSource(
            req.params.customer_id,
            req.params.source_id,
            req.body
        );

        res.status(200).json(card);
    } catch (error) {
        console.log(error)

    }
});
router.post('/:customer_id/sources/:source_id', async(req, res) => {
    try {
        const deleted = await stripe.customers.deleteSource(
            req.params.customer_id,
            req.params.source_id,
        );
        res.json(deleted);
    } catch (error) {
        console.log(error)

    }
});
router.get('/:customer_id/sources?object=card', async(req, res) => {
    try {
        const cards = await stripe.customers.listSources(
            req.params.customer_id, { object: 'card' }
        );
        res.json(cards);
    } catch (error) {
        console.log(error)

    }
});



module.exports = router;