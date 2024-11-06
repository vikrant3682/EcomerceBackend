const express = require('express')
const mongoose = require('mongoose')
require('./config/db')
const cors = require('cors')
const router = require('./route/auth.route')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',require('./route/auth.route'));
app.use('/api/product',require('./route/product.route'))
app.use('/api/cart',require('./route/cart.route'))
app.use('/api/order',require('./route/order.route'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
