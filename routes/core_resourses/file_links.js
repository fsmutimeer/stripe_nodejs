const router = require('express').Router();
require('dotenv/config')
const Stripe = require('stripe');
const stripe = Stripe(process.env.SK);
const fs = require('fs');


router.post('/create', async(req, res) => {
    try {
        const fileLink = await stripe.fileLinks.create({
            file: req.body.file_id
        });
        res.send({ fileLink, fileLink });
    } catch (error) {
        console.log(error)
    }

});
router.get('/view', async(req, res) => {
    try {
        const fileLinks = await stripe.fileLinks.list({
            limit: 3,
        });
        res.send(fileLinks);
    } catch (error) {
        console.log(error)
    }

});
router.get('/view/:id', async(req, res) => {
    try {
        const fileLink = await stripe.fileLinks.retrieve(
            req.params.id
        );
        res.send({ fileLink: fileLink })
    } catch (error) {
        console.log(error)
    }
});
router.get('/update/:id', async(req, res) => {
    try {
        const fileLink = await stripe.fileLinks.update(
            req.params.id,
            req.body
        );
        res.send({ fileLink: fileLink })
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;