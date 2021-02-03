'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');

exports.getById = async (req, res, next) => {
  try {
    const data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(404).send({
      message: 'Cliente não encontrado. Verifique id.'
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

  validator.hasMinLen(req.body.name, 3, 'Nome não pode ser menor que 3 caracteres.');
  validator.isEmail(req.body.email, 'Email não é válido.');
  validator.hasMinLen(req.body.password, 6, 'Senha não pode conter menos de 6 caracteres.');

  if (!validator.isValid()) {
    res.status(400).send(validator.errors()).end();
    return;
  }

  try {
    await repository.create(req.body);
    res.status(201).send({
      message: 'Cliente cadastrado com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Erro ao processar requisição'
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
      message: 'Cliente atualizado com sucesso!'
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
      message: 'Cliente removido com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar requisição.'
    });
  }
};
