const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const coupons = await stripe.coupons.list();
        res.send(coupons);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const coupon = await stripe.coupons.retrieve(
            req.params.id
        );
        res.send(coupon)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

router.post('/create', async(req, res) => {
    try {
        const coupon = await stripe.coupons.create(req.body);
        res.status(201).json(coupon);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});
router.post('/update/:id', async(req, res) => {
    try {
        const coupon = await stripe.coupons.update(
            req.params.id, { metadata: { order_id: req.body.order_id } }
        );
        res.status(200).json(coupon);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)

    }
});
router.delete('/delete/:id', async(req, res) => {
    try {
        const deleted = await stripe.coupons.del(
            req.params.id
        );
        res.send(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

module.exports = router;