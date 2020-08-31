'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.getBySlug = async (req, res, next) => {
  try {
    const data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição.'
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição.'
    });
  }
};

exports.getByTag = async (req, res, next) => {
  try {
    const data = await repository.getByTag(req.params.tag);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição.'
    });
  }
};

exports.get = async (req, res, next) => {
  try {
    const data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição.'
    });
  }
};

exports.post = async (req, res, next) => {
  const validator = new ValidationContract();

  validator.hasMinLen(req.body.title, 3, 'Título deve ter ao menos 3 caracteres.');
  validator.hasMinLen(req.body.slug, 3, 'Slug deve ter ao menos 3 caracteres.');
  validator.hasMinLen(req.body.description, 10, 'Descrição deve ter no minímo 10 caracteres');

  if (!validator.isValid()) {
    res.status(400).send(validator.errors()).end();
    return;
  }

  try {
    await repository.create(req.body);
    res.status(201).send({
      message: 'Produto cadastrado com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição.'
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(201).send({
      message: 'Produto cadastrado com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição.'
    });
  }
};

exports.delete = (req, res, next) => {
  try {
    repository.delete(req.params.id);
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição.'
    });
  }
};
