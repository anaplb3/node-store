'use strict';

const moongose = require('mongoose');
const Order = moongose.model('Order');

exports.get = async () => {
  const res = await Order.find({});
  return res;
};

exports.getById = async (id) => {
  const res = await Order.findById(id);
  return res;
};

exports.create = async (data) => {
  const order = new Order(data);
  await order.save();
};
