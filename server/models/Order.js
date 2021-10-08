const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    clientName: {
        type: String,
        required: true,
        max: 255,
    },
    phoneNumber: {
        type: String,
        required: true,
        max: 255,
    },
    address: {
        type: String,
        max: 255,
    },
    notes: {
        type: String,
        max: 255,
    },
    catalogNumber: {
        type: String,
        required: true,
        max: 255,
    },
    size: {
        type: String,
        max: 255,
    },
    productName: {
        type: String,
        max: 255,
    },
    isPaid: {
        type: Boolean,
        required: true,
    },
    paymentMethod: {
        type: String,
        max: 255,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        default: 'open'
    }
});

module.exports = mongoose.model('Order', orderSchema);