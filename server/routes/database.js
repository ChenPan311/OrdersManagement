const router = require('express').Router();
const verify = require('./verifyToken');
const Order = require('../models/Order');


router.get('/all', verify, async (req, res) => {
    const orders = await Order.find();
    res.status(200).send(orders);
});

module.exports = router;