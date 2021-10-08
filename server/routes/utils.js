const router = require('express').Router();
const verify = require('./verifyToken');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { default: axios } = require('axios');

router.post('/get_product_details', (req, res) => {
    axios.get(`https://megasport.co.il/${req.body.catalogNumber}.html`).then((response) => {
        const dom = new JSDOM(response.data);
        const name = dom.window.document.getElementsByClassName('base l987').item(0).innerHTML;
        const image = dom.window.document.getElementsByClassName('pab_right').item(0)
            .getElementsByTagName('img').item(0).getAttribute('src');
        res.status(200).json({ name, image });
    }).catch((err) => console.log(err.message));
})

module.exports = router;