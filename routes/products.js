const router = require('express').Router();
const ErrorHandler = require('../errors/errorHandler');
let products = require('../productData');

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'My Product Page'
    })
})

router.get('/api/products', (req, res) => {
    res.json(products)
})

router.post('/api/products', (req, res, next) => {
    const {name, price} = req.body;
    if(!name || !price) {
        next(ErrorHandler.validationError());
        // throw new Error('All fields are required!');
        // return res.status(422).json({error: 'All fields are required'}); // unprocessable entity
    }
    const product = {
        name,
        price,
        id: new Date().getTime().toString()
    }
    products.push(product)
    res.json(product)
})

router.delete('/api/products/:productId', (req, res) => {
    products = products.filter(item => item.id !== req.params.productId);
    res.json({status: 'OK'});
})

module.exports = router;