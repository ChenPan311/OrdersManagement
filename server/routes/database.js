const router = require('express').Router();
const verify = require('./verifyToken');
const Order = require('../models/Order');

router.get('/:userId', verify, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/', verify, async (req, res) => {
    const order = new Order(req.body);
    try {
        const savedOrder = await order.save();
        res.status(200).send(savedOrder);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch('/:id', verify, async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status },
            { new: true });
        res.status(200).send(order);
    } catch (error) {
        res.status(400).send("Error");
    }
});

router.delete('/:id', verify, async (req, res) => {
    try {
        Order.findOneAndDelete({ _id: req.params.id }, (err, success) => {
            if (err)
                return res.status(400).send("Error in Deletion");
            else return res.status(200).send(success._id);
        })
    } catch (error) {
        return res.status(400).send("Error in Deletion");
    }

});

module.exports = router;