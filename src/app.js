'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

const indexRoutes = require('./routes/index-routes');
const productsRoutes = require('./routes/product-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/products', productsRoutes);

module.exports = app;
