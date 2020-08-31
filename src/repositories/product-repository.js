'use strict';
const moongose = require('mongoose');
const Product = moongose.model('Product');

exports.get = async () => {
  const res = await Product.find({
    active: true
  }, 'title price slug');
  return res;
};

exports.getBySlug = async (slug) => {
  const res = await Product.findOne({
    active: true,
    slug: slug
  }, 'title description price slug tags');
  return res;
};

exports.getById = async (id) => {
  const res = await Product.findById(id);
  return res;
};

exports.getByTag = async (tag) => {
  const res = await Product.find({
    tags: tag,
    active: true
  }, 'title description price slug tags');
  return res;
};

exports.create = async (data) => {
  var product = new Product(data);
  await product.save();
};

exports.update = async (id, data) => {
  await Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug
    }
  });
};

exports.delete = async (id) => {
  await Product.findOneAndRemove(id);
};