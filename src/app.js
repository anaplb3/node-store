'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

// Isso tem que ficar aqui, senão o model não é reconhecido
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

const indexRoutes = require('./routes/index-routes');
const productsRoutes = require('./routes/product-routes');
const customersRoutes = require('./routes/customer-routes');
const ordersRoutes = require('./routes/order-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/products', productsRoutes);
app.use('/customers', customersRoutes);
app.use('/orders', ordersRoutes);

module.exports = app;
