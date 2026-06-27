const itemService = require('../services/itemService');

const getAll = async (req, res, next) => {
  try {
    const data = await itemService.getAllItems();
    res.status(200).json({ success: true, count: data.length, data });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const data = await itemService.getItemById(req.params.id);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const data = await itemService.createItem(name, description);
    res.status(201).json({ success: true, message: 'Item created', data });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const data = await itemService.updateItem(req.params.id, name, description);
    res.status(200).json({ success: true, message: 'Item updated', data });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const data = await itemService.deleteItem(req.params.id);
    res.status(200).json({ success: true, message: 'Item deleted', data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne, create, update, remove };
