const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);


router.get('/view', async(req, res) => {
    try {
        const disputes = await stripe.disputes.list({
            limit: 3,
        });
        res.send({ disputes: disputes });
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const dispute = await stripe.disputes.retrieve(
            req.params.id
        );
        res.send({ dispute: dispute })
    } catch (error) {
        console.log(error)
    }
});
router.put('/update/:id', async(req, res) => {
    try {
        const dispute = await stripe.disputes.update(
            req.params.id,
            req.body
        );
        res.status(200).json({ msg: "dispute updated", customer: customer });
    } catch (error) {
        console.log(error)

    }
});
router.post('/close/:id/close', async(req, res) => {
    try {
        const dispute = await stripe.disputes.close(
            req.params.id
        );
        res.status(200).json({ msg: "dispute closed", close: dispute });
    } catch (error) {
        console.log(error)

    }
});

module.exports = router;