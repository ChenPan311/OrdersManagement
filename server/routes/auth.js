const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        branch_name: req.body.branch_name,
        branch_number: req.body.branch_number
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', (req, res) => {
    res.send('Login');
});

module.exports = router;