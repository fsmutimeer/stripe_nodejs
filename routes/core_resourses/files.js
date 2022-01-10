const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);
const fs = require('fs');


router.post('/create', async(req, res) => {
    try {
        var fp = fs.readFileSync('../file.jpg');
        var file = await stripe.files.create({
            purpose: 'dispute_evidence',
            file: {
                data: fp,
                name: 'file.jpg',
                type: 'application/octet-stream',
            },
        });
        res.send({ msg: "files uploaded", file: file });
    } catch (error) {
        console.log(error)
    }

});
router.get('/view', async(req, res) => {
    try {
        const files = await stripe.files.list({ limit: 10 });
        res.send({ msg: "files uploaded", file: files });
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const file = await stripe.files.retrieve(
            req.params.id
        );
        res.send({ file: file })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;