const router = require('express').Router();
const verify = require('./verifyToken');
const Order = require('../models/Order');


router.get('/all', verify, async (req, res) => {
    try {
        const orders = await Order.find({ userID: req.body.userID });
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/add', verify, async (req, res) => {
    const order = new Order({
        userId: req.body.userId,
        clientName: req.body.clientName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        notes: req.body.notes,
        catalogNumber: req.body.catalogNumber,
        size: req.body.size,
        productName: req.body.productName,
        isPaid: req.body.isPaid,
        paymentMethod: req.body.paymentMethod,
        image: req.body.image,
    });
    try {
        const savedOrder = await order.save();
        res.status(200).send(savedOrder);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch('/update', verify, async (req, res) => {

});

module.exports = router;