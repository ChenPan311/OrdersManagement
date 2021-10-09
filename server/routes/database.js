const router = require('express').Router();
const verify = require('./verifyToken');
const Order = require('../models/Order');


router.post('/all', async (req, res) => {
    try {
        const orders = await Order.find({ userID: req.body.userID });
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/add', async (req, res) => {
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

router.post('/update', async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({ _id: req.body._id }, { status: req.body.status },
            { new: true });
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send("Error");
    }
});

router.post('/delete', async (req, res) => {
    try {
        Order.findOneAndDelete({ _id: req.body._id }, (err, success) => {
            if (err)
                return res.status(400).send("Error in Deletion");
            else return res.status(200).send(success._id);
        })
    } catch (error) {
        return res.status(400).send("Error in Deletion");
    }

});

module.exports = router;