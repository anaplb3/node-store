'use strict';

const moongose = require('mongoose');
const Customer = moongose.model('Customer');

exports.get = async () => {
  const res = await Customer.find({}, 'name email');
  return res;
};

exports.getById = async (id) => {
  const res = await Customer.findById(id, 'name email');
  return res;
};

exports.create = async (data) => {
  const customer = new Customer(data);
  await customer.save();
};

exports.update = async (id, data) => {
  await Customer.findById(id, {
    $set: {
      name: data.name,
      email: data.email,
      password: data.password
    }
  });
};

exports.delete = async (id) => {
  await Customer.findOneAndRemove(id);
};
